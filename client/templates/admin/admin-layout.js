BlazeLayout.setRoot('body');

Template.adminLayout.onRendered(function(){
  self = this;
  self.autorun(function(){
    var routeName = FlowRouter.getRouteName();
    if(routeName === 'adminEditSection'){
      $('.admin-page').addClass('edit');
      $('.admin-nav-wrapper').addClass('hidden');
    } else {
      $('.admin-page').removeClass('edit');
    }
  });
});