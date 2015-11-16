Router.configure({
  layoutTemplate: 'masterLayout'
});

//
// Login
//
AccountsTemplates.configureRoute('signIn', {
  name: 'admin',
  layoutTemplate: 'loginLayout',
  path: '/admin',
});

AccountsTemplates.configureRoute('signUp');

Router.route('/', {
  name: 'home'
});

//
// Admin
//
Router.route('/admin/dashboard', {
  layoutTemplate: 'adminLayout',
  name: 'adminDashboard',
});

Router.route('/admin/sections/', {
  layoutTemplate: 'adminLayout',
  name: 'adminSections',
  action: function(){
    this.render('adminSections');
  },
});

Router.route('/admin/sections/:_id', {
  layoutTemplate: 'adminLayout',
  name: 'adminSectionPages',
  waitOn: function(){
    return [
      Meteor.subscribe('sections'),
      Meteor.subscribe('pages')
    ];
  },
  data: function(){ 
    return Sections.findOne(this.params._id);
  }
});

Router.route('/admin/sections/edit/:_id', {
  layoutTemplate: 'adminLayout',
  name: 'adminEditSection',
  waitOn: function(){
    return [
      Meteor.subscribe('sections'),
      Meteor.subscribe('pages'),
      Meteor.subscribe('uploads')
    ];
  },
  data: function(){
    return Sections.findOne(this.params._id);
  }
});

//
// App
//
Router.route('/:id', {
  name: 'sections',
  data: function(){
    return Sections.findOne(this.params._id);
  }
});