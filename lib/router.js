
//
// Login
//
AccountsTemplates.configureRoute('signIn', {
  name: 'admin',
  path: '/admin',
  layoutTemplate: 'loginLayout',
  contentRegion: 'content'
});

AccountsTemplates.configureRoute('signUp', {
  name: 'admin',
  path: '/admin',
  layoutTemplate: 'loginLayout',
  contentRegion: 'content'
});

//
// Admin
//
var adminSection = FlowRouter.group({
    prefix: "/admin"
});

adminSection.route('/dashboard', {
  name: 'adminDashboard',
  action: function(){
    BlazeLayout.render('adminLayout', {
      nav: 'adminNav',
      content: 'adminDashboard'
    });
  }
});

adminSection.route('/sections', {
  name: 'adminSections',
  action: function(){
    BlazeLayout.render('adminLayout', {
      nav: 'adminNav',
      content: 'adminSections'
    });
  }
});

adminSection.route('/sections/edit/:sectionId', {
  name: 'adminEditSection',
  action: function(params, queryParams){

      BlazeLayout.render('adminLayoutEditSection', {
        content: 'adminEditSection'
      });

  }
});

// Router.route('/admin/sections/:_id', {
//   layoutTemplate: 'adminLayout',
//   name: 'adminSectionPages',
//   waitOn: function(){
//     return [
//       Meteor.subscribe('sections'),
//       Meteor.subscribe('pages')
//     ];
//   },
//   data: function(){ 
//     return Sections.findOne(this.params._id);
//   }
// });

// Router.route('/admin/sections/edit/:_id', {
//   layoutTemplate: 'adminLayout',
//   name: 'adminEditSection',
//   waitOn: function(){
//     return [
//       Meteor.subscribe('sections'),
//       Meteor.subscribe('pages'),
//       Meteor.subscribe('uploads')
//     ];
//   },
//   data: function(){
//     return Sections.findOne(this.params._id);
//   }
// });

//
// App
//
// Router.route('/:id', {
//   name: 'sections',
//   data: function(){
//     return Sections.findOne(this.params._id);
//   }
// });