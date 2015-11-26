adminAnimations = {};

adminAnimations.tilesInserted = function(elements, duration){
  elements.velocity('transition.slideUpIn', {stagger: duration});
};

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

adminAnimations.openTile = function(tile, tileContent, route){
  //////// GET DIMENSIONS ////////
  var tileWidth = tile.width();
  var tileLeft = tile.position().left;
  var tileTop = tile.position().top;
  var width = $(window).width();
  var height = $(window).height();
  //////// SET TILE  ////////
  tile
    .addClass('open')
    .css({
      'width': tileWidth,
      'left': tileLeft,
      'top': tileTop
    });
  //////// ANIMATE LEAVING OBJECTS ////////
  $('.admin-nav-wrapper').addClass('hidden');
  $('.tiles-list').velocity({marginLeft: '100%'}, {duration: 100});
  //////// ANIMATE TILE ////////
  tileContent.velocity({'opacity': '0'});
  tile.velocity({
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
};