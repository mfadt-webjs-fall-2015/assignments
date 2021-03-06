// Generated by CoffeeScript 1.9.1
(function() {
  var CNode, CNodePtr, Dictionary, LinkGrammar, Linkage, ParseOptions, Sentence, Struct, _, apiTemplate, defaultConfig, defaultDataPath, ffi, getNodePtrFromPtr, int, lib, libPath, pointerType, ref, string;

  ffi = require('ffi');

  ref = require('ref');

  Struct = require('ref-struct');

  _ = require('underscore');

  pointerType = 'pointer';

  string = ref.types.CString;

  int = ref.types.int;

  ParseOptions = pointerType;

  Dictionary = pointerType;

  Sentence = pointerType;

  Linkage = pointerType;

  CNode = Struct({
    label: ref.types.CString,
    child: pointerType,
    next: pointerType,
    start: ref.types.int,
    end: ref.types.int
  });

  CNodePtr = ref.refType(CNode);

  apiTemplate = {
    parse_options_create: [ParseOptions, []],
    parse_options_set_null_block: [ref.types["void"], [ParseOptions, int]],
    parse_options_set_islands_ok: [ref.types["void"], [ParseOptions, int]],
    parse_options_set_verbosity: [ref.types["void"], [ParseOptions, int]],
    parse_options_set_allow_null: [ref.types["void"], [ParseOptions, int]],
    parse_options_set_max_null_count: [ref.types["void"], [ParseOptions, int]],
    dictionary_create: [Dictionary, [string, string, string, string]],
    sentence_create: [Sentence, [string, Dictionary]],
    sentence_parse: [int, [Sentence, ParseOptions]],
    sentence_length: [int, [Sentence]],
    sentence_get_word: [string, [Sentence, int]],
    linkage_create: [Linkage, [int, Sentence, ParseOptions]],
    linkage_print_diagram: [string, [Linkage]],
    linkage_constituent_tree: [CNodePtr, [Linkage]],
    linkage_print_constituent_tree: [string, [Linkage, int]],
    linkage_get_num_links: [int, [Linkage]],
    linkage_get_link_label: [string, [Linkage, int]],
    linkage_get_link_llabel: [string, [Linkage, int]],
    linkage_get_link_rlabel: [string, [Linkage, int]],
    linkage_get_word: [string, [Linkage, int]],
    linkage_get_link_lword: [int, [Linkage, int]],
    linkage_get_link_rword: [int, [Linkage, int]]
  };

  libPath = __dirname + '/../lib/libparser';

  lib = ffi.Library(libPath, apiTemplate);

  defaultDataPath = __dirname + '/../data/';

  getNodePtrFromPtr = function(ptr) {
    var tempPtr;
    tempPtr = ref.alloc(CNodePtr);
    ref.writePointer(tempPtr, 0, ptr);
    return tempPtr.deref();
  };

  defaultConfig = {
    dictPath: defaultDataPath + '4.0.dict',
    ppPath: defaultDataPath + '4.0.knowledge',
    consPath: defaultDataPath + '4.0.constituent-knowledge',
    affixPath: defaultDataPath + '4.0.affix',
    verbose: false
  };

  LinkGrammar = (function() {
    function LinkGrammar(config) {
      this.config = _.extend(config || {}, defaultConfig);
      this.options = lib.parse_options_create();
      lib.parse_options_set_verbosity(this.options, (this.config.verbose ? 1 : 0));
      lib.parse_options_set_allow_null(this.options, 1);
      lib.parse_options_set_max_null_count(this.options, 3);
      this.dictionary = lib.dictionary_create(this.config.dictPath, this.config.ppPath, this.config.consPath, this.config.affixPath);
    }

    LinkGrammar.prototype.parse = function(input, index) {
      var numLinkages, sentence;
      sentence = lib.sentence_create(input, this.dictionary);
      numLinkages = lib.sentence_parse(sentence, this.options);
      if (numLinkages > 0) {
        return new Linkage(lib.linkage_create(index || 0, sentence, this.options));
      } else {
        throw new Error("No links found for '" + input + "'");
      }
    };

    return LinkGrammar;

  })();

  Linkage = (function() {
    function Linkage(linkage) {
      this.linkage = linkage;
      this.links = this.getLinks();
      this.tree = this.getTree();
      this.words = this.getWords();
    }

    Linkage.prototype.buildNode = function(node) {
      var n;
      n = {
        label: node.label
      };
      if (!ref.isNull(node.child)) {
        n.child = this.buildNode(getNodePtrFromPtr(node.child).deref());
      }
      if (!ref.isNull(node.next)) {
        n.next = this.buildNode(getNodePtrFromPtr(node.next).deref());
      }
      return n;
    };

    Linkage.prototype.getTree = function() {
      var rootPtr;
      rootPtr = lib.linkage_constituent_tree(this.linkage);
      return this.buildNode(rootPtr.deref(), this.linkage);
    };

    Linkage.prototype.getLinks = function() {
      return _(lib.linkage_get_num_links(this.linkage)).times((function(index) {
        var leftIndex, link, rightIndex, temp;
        leftIndex = lib.linkage_get_link_lword(this.linkage, index);
        rightIndex = lib.linkage_get_link_rword(this.linkage, index);
        link = {
          label: lib.linkage_get_link_label(this.linkage, index),
          left: {
            label: lib.linkage_get_link_llabel(this.linkage, index),
            word: lib.linkage_get_word(this.linkage, leftIndex),
            index: leftIndex
          },
          right: {
            label: lib.linkage_get_link_rlabel(this.linkage, index),
            word: lib.linkage_get_word(this.linkage, rightIndex),
            index: rightIndex
          }
        };
        if (link.left.word.indexOf('.' !== -1)) {
          temp = link.left.word.split('.');
          link.left.word = temp[0];
          link.left.type = temp[1];
        }
        if (link.right.word.indexOf('.' !== -1)) {
          temp = link.right.word.split('.');
          link.right.word = temp[0];
          link.right.type = temp[1];
        }
        return link;
      }), this);
    };

    Linkage.prototype.getWords = function() {
      return _.chain(this.links).map(function(link) {
        return [link.left, link.right];
      }).flatten().uniq(function(link) {
        return link.word;
      }).value();
    };

    Linkage.prototype.linksByLabel = function(labelPattern) {
      if (typeof labelPattern === 'string') {
        labelPattern = new RegExp(labelPattern);
      }
      return this.links.filter(function(link) {
        return labelPattern.test(link.left.label || labelPattern.test(link.right.label));
      });
    };

    Linkage.prototype.getConnectorWords = function(common) {
      var words;
      words = [];
      this.links.forEach(function(link) {
        if (link.left.word === common) {
          words.push({
            source: link.left,
            target: link.right
          });
        }
        if (link.right.word === common) {
          return words.push({
            source: link.right,
            target: link.left
          });
        }
      });
      return words;
    };

    return Linkage;

  })();

  module.exports = LinkGrammar;

}).call(this);
