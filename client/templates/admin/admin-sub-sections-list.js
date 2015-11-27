Template.subSectionsList.helpers({
  subSections: function(){
    return Sections.find({parent: this._id});
  },
  haveChildren: function () {
    return Sections.find({parent: this._id}).count() > 0;
  }
});