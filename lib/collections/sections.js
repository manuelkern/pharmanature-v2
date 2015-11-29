Sections = new Mongo.Collection('sections');

Sections.after.insert(function(doc, fieldNames){
  id = this._id;
  Sections.update(id, {$push: {path: id}});
});

Sections.helpers({
  pages: function() {
    return Pages.find({ sectionId: this._id });
  }
});