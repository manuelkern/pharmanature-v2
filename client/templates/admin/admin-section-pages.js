Template.adminSectionPages.helpers({
  pages: function(){
    var sectionId = this._id;
    return Pages.find({sectionId: sectionId});
  }
});

Template.adminSectionPages.events({
  'submit #section-page-form': function(event, template){
    event.preventDefault();
    var pageTitle = template.$('#section-page-form .title-form').val();
    var sectionId = template.data._id;

    Pages.insert({title: pageTitle, sectionId: sectionId}, function(err){
      if(err){
        FlashMessages.sendError('There was en error');
      } else {
        FlashMessages.sendSuccess('Page created');
        event.target.title.value = '';
      }
    });
  },
  'click .toggle-active': function(event){
    var checked = event.target.checked;
    Meteor.call('setActivePage', this._id, checked);
  },
  'click .delete-control': function(template){
    pageTitle = this.title;
    var sectionId = this.sectionId;
    if (confirm("Delete this section: " + pageTitle + "?")) {
      Meteor.call('deletePage', this._id, sectionId);
      Meteor.call('deletePageOfSection', this._id, sectionId);
    }
  }
});



