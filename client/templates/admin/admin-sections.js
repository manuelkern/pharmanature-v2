//
// Subscriptions
//
Template.adminSections.onCreated(function(){
  $('.admin-nav-wrapper').removeClass('hidden');
  Meteor.subscribe('sections');
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
    var sectionSlug = createURLSlug(sectionTitle);
    var doc = {
      title: sectionTitle,
      slug: sectionSlug
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
    // Vars
    var $tile = $(event.currentTarget).closest('.admin-tile');
    var $tileContent = $(event.currentTarget).closest('.tile-content');
    var tileWidth = $tile.width();
    var tileLeft = $tile.position().left;
    var tileTop = $tile.position().top;
    var width = $(window).width();
    var height = $(window).height();
    var route = this._id;
    // Set tile
    $tile.addClass('open');
    $tile.css({
      'width': tileWidth,
      'left': tileLeft,
      'top': tileTop
    });
    // Animate nav and other tiles
    $('.admin-nav-wrapper').addClass('hidden');
    $('.tiles-list').velocity({marginLeft: '100%'}, {duration: 100});
    // Animate tile
    $tileContent.velocity({'opacity': '0'});
    $tile.velocity({
      top: '0',
      left: '0',
      width: width,
      height: height
    }, {
      delay: 200,
      complete: function(){
        FlowRouter.go('/admin/sections/edit/' + route);
      },
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