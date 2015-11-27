//
// Subscriptions
//
Template.adminSections.onCreated(function(){
  $('.admin-nav-wrapper').removeClass('hidden');
  var self = this;
  self.ready = new ReactiveVar();
  self.autorun(function(){
    var handle = SectionsSubs.subscribe('sections');
    self.ready.set(handle.ready());
  });
});
//
// Ui hooks
//
Template.adminSections.onRendered(function(){
  var self = this;
  self.autorun(function(){
    if(Template.instance().ready.get()){

      Tracker.afterFlush(function(){
        // Tiles appears
        var $tiles = this.$('.tiles-wrapper').children();
        adminAnimations.tilesInserted($tiles, 150);
        // Ui Hooks for tiles
        self.find('.tiles-wrapper')._uihooks = {
          insertElement: function(node, next){
            adminAnimations.tileInserted($(node), $(next));
          },
          removeElement: function(node){
            adminAnimations.tileRemoved($(node));
          }
        };
      });

    }
  });
});
//
// Helpers
//
Template.adminSections.helpers({
  sectionsReady: function(){
    return Template.instance().ready.get();
  },
  sections: function () {
    return Sections.find({parent: null}, {sort: {order: 1}});
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
    var sectionSlug = createURLSlug(sectionTitle);
    var doc = {
      title: sectionTitle,
      slug: sectionSlug,
      parent: null,
      path: []
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
  'click .tile-title': function(event){
    event.preventDefault();
    //////// VARS ////////
    var tile = $(event.currentTarget).closest('.admin-tile');
    var tileContent = $(event.currentTarget).closest('.tile-content');
    var route = this._id;
    adminAnimations.openTile(tile, tileContent, route);
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

    if (Roles.userIsInRole(Meteor.user(), ['admin'])) {
      if (confirm("Delete this section: " + sectionTitle + "?")){
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
    } else {
      sAlert.error('Access Denied');
    }
  },
});