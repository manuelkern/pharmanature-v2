Template.subSectionsList.helpers({
  subSections: function(){
    console.log(this._id);
    return Sections.find({parent: this._id});
  },
  haveChildren: function () {
    return Sections.find({parent: this._id}).count() > 0;
  }
});