// Generated by CoffeeScript 1.10.0
(function() {
  var LinkGrammar, linkGrammar, linkage;

  LinkGrammar = require(__dirname + '/../../build/index.js');

  require('should');

  linkGrammar = new LinkGrammar();

  linkage = linkGrammar.parse('turn off the light');

  it('should have the correct number of links', function() {
    linkage.links[2].left.word.should.equal('turn');
    return linkage.links.length.should.equal(5);
  });

  it('should have the correct tree', function() {
    return linkage.tree.child.child.label.should.equal('turn');
  });

  it('should have word list', function() {
    return linkage.words.length.should.equal(6);
  });

  it('should get link list by label', function() {
    linkage.linksByLabel('MV').length.should.equal(1);
    return linkage.linksByLabel(/J/).length.should.equal(1);
  });

  it('should get connector words', function() {
    var connectors;
    connectors = linkage.getConnectorWords('off');
    connectors[0].source.label.should.equal('MVp');
    connectors[0].target.label.should.equal('MV');
    connectors[0].target.word.should.equal('turn');
    connectors[0].target.type.should.equal('v');
    connectors[1].source.label.should.equal('J');
    connectors[1].target.label.should.equal('Jp');
    connectors[1].target.word.should.equal('light');
    return connectors[1].target.type.should.equal('n');
  });

}).call(this);
