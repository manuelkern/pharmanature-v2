BlazeLayout.setRoot('body');

Template.adminLayout.onRendered(function(){
  this.find('.admin-content')._uihooks = {
    insertElement: function(node, next) {
      $(node)
        .hide()
        .insertBefore(next)
        .velocity('fadeIn');
    },
    removeElement: function(node) {
      $(node).remove();
    }
  };
});
