// Template.adminLayout.onRendered(function(){
//   this.find('.admin-content')._uihooks = {
//     insertElement: function(node, next) {
//       $(node)
//         .hide()
//         .insertBefore(next)
//         .fadeIn();
//     },
//     removeElement: function(node) {
//       var deletePage = new TimelineMax();
//       var $node = $(node);
//       function removeNode(){
//         $(node).remove();
//       }
//       deletePage
//         .to($node, 1, {left: '100%', opacity: 0, onComplete: removeNode});
//     }
//   };
// });