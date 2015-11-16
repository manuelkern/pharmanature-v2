Template.sections.onCreated(function(){
  var instance = this;
  instance.autorun(function(){
    var section = Router.current().params.id;
    instance.subscribe('section', section);
    instance.subscribe('pagesFromSection', section);
  });
});

Template.sections.helpers({
  template: function () {
    return Router.current().params.id;
  }
});

Template.About.helpers({
  pages: function () {
    return Pages.find();
  },
  section: function(){
    var section = Router.current().params.id;
    // console.log(section);
    return Sections.findOne({title: section});
  }
});