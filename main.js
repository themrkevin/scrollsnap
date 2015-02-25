$(function() {
  var $wrapper = $('.slideshow');
  var $container = $wrapper.find('ul');
  var $items = $wrapper.find('li');

  var itemWidth = $items.width();
  var fullWidth = $items.length * itemWidth;
  var scrolling = null;
  var touching = null;

  $container.width(fullWidth);

  function snapTo() {
    if(scrolling || touching) {
      return false;
    }
    var scrollPosition = $wrapper.scrollLeft();
    var snapPosition = itemWidth * Math.round(scrollPosition / itemWidth)
    $wrapper.animate({ scrollLeft: snapPosition }, 250);
  }

  $wrapper.on('scroll', function() {
    if(scrolling) {
      clearTimeout(scrolling);
    }
    scrolling = setTimeout(function() {
      $wrapper.trigger('scrollstop');
    }, 100);
  });

  $wrapper.on('scrollstop', function() {
    scrolling = null;
    snapTo();
  });
    
  $wrapper.on('touchstart', function() {
    touching = true;
  });

  $wrapper.on('touchend', function(e) {
    touching = false;
    snapTo();
  });
});
