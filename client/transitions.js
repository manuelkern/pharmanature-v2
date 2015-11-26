Momentum.registerPlugin('longFade', function(options) {
  return {
    insertElement: function(node, next) {
      $(node)
        .hide()
        .insertBefore(next)
        .velocity('fadeIn', {duration: 400});
    },
    removeElement: function(node) {
      $(node).velocity('fadeOut', function() {
        $(this).remove();
      });
    }
  };
});

Transitioner.setTransitions({
  'default': 'longFade'
});