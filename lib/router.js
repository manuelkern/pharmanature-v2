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
    BlazeLayout.render('adminLayout', {
      nav: 'adminNav',
      content: 'adminEditSection'
    });
  }
});