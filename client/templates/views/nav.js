Template.nav.onCreated(function(){
  this.subscribe('sectionsForNav');
});

Template.nav.helpers({
  sections: function(){
    return Sections.find();
  }
});