Sections = new Mongo.Collection('sections');

Sections.helpers({
  pages: function() {
    return Pages.find({ sectionId: this._id });
  }
});