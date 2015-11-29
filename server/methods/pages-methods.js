Meteor.methods({
  insertPage: function(doc){
    Pages.insert(doc);
  },
  deletePage: function(pageId){
    var page = Pages.findOne(pageId);
    Pages.remove(pageId);
  },
  deletePageOfSection: function(pageId, sectionId){
    var page = Pages.findOne(pageId);
    Sections.update({_id: sectionId}, {$pull: {'pagesIds': pageId}});
  },
  setActivePage: function(pageId, value){
    var page = Pages.findOne(pageId);
    if (Roles.userIsInRole(Meteor.user(), ['admin'])) {
      Pages.update(pageId, {$set: {active: value}});
    }
  },
});