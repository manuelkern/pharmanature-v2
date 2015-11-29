Template.sectionPage.helpers({
  sectionPage: function () {
    console.log(this._id);
    return Pages.find({section_id: this._id});
  }
});