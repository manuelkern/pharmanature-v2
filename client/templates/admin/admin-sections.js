//
// Subscriptions
//
Template.adminSections.onCreated(function(){
  Meteor.subscribe('sections');
  Meteor.subscribe('pagesTitle');
});
//
// Ui hooks
//
Template.adminSections.onRendered(function(){
  this.find('.tiles-wrapper')._uihooks = {
    insertElement: function(node, next){
      adminAnimations.tileInserted($(node), $(next));
    },
    removeElement: function(node){
      adminAnimations.tileRemoved($(node));
    }
  };
});
//
// Helpers
//
Template.adminSections.helpers({
  sections: function () {
    return Sections.find({}, {sort: {order: 1}});
  },
  pages: function(){
    return Pages.find();
  },
  // Sortable tiles
  sortableOptions: {
    group: {
      name: 'adminSections',
      draggable: '.admin-tile',
    },
    onSort: function(){
      adminAnimations.badgeUpdated();
    }
  }
});
//
// Events
//
Template.adminSections.events({
  // Inserting new section
  'submit #section-form': function(event, template){
    event.preventDefault();
    var sectionTitle = template.$('#section-form .title-form').val();
    var doc = {
      title: sectionTitle,
    };
    Meteor.call('insertSection', doc, function(error, result) {
      if(error){
        sAlert.error(error.reason);
      } else {
        sAlert.success('section created');
        event.target.title.value = '';
      }
    });
  },
  // Activate section
  'click .toggle-active': function(event){
    var checked = event.target.checked;
    Meteor.call('setActiveSection', this._id, checked);
  },
  // Delete section
  'click .delete-control': function(event, template){
    var sectionTitle = this.title;
    var order = this.order;
    if (confirm("Delete this section: " + sectionTitle + "?")) {
      Meteor.call('deleteSection', this._id, function(error, result){
        if(error){
          sAlert.error(error.reason);
        } else {
          sAlert.info('section deleted');
          Meteor.call('decreaseOrder', order);
          Meteor.setTimeout(function(){
            adminAnimations.badgeUpdated();
          }, 300);
        }
      });
    }
  },
});