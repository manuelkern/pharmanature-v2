adminAnimations = {};

adminAnimations.tileInserted = function(node, next){
  node
    .hide()
    .insertBefore(next)
    .velocity('fadeIn', {duration: 300});
};

adminAnimations.tileRemoved = function(node){
  var height = node.height() + 55;
  node.velocity({
    marginTop: -height,
    opacity: '0'
  }, {
    duration: 400,
    easing: 'swing'
  });
  setTimeout(function() {
    node.remove();
  }, 1000);
};

adminAnimations.badgeUpdated = function(){
  var $badges = $('.tile-order-badge');
  $badges
    .velocity({    
      backgroundColor: '#000',
      color: '#fff'
    }, {
      duration: 200
    })
    .velocity('reverse');
};
