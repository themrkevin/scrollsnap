var $wrapper = $('.group0, .group1, .recirc');
$wrapper.each(function() {
  var $this = $(this);
  var $container = $this.find('ul');
  var $items = $this.find('li');

  var itemWidth = $items.width();
  var fullWidth = $items.length * itemWidth;
  var scrolling = null;
  var touching = null;

  $container.width(fullWidth);

  function snapTo() {
    if(scrolling || touching) {
      return false;
    }
    var scrollPosition = $this.scrollLeft();
    var snapPosition = itemWidth * Math.round(scrollPosition / itemWidth)
    $this.animate({ scrollLeft: snapPosition }, 250);
  }

  $this.on('scroll', function() {
    if(scrolling) {
      clearTimeout(scrolling);
    }
    scrolling = setTimeout(function() {
      $this.trigger('scrollstop');
    }, 100);
  });

  $this.on('scrollstop', function() {
    scrolling = null;
    snapTo();
  });
    
  $this.on('touchstart', function() {
    touching = true;
  });

  $this.on('touchend', function(e) {
    touching = false;
    snapTo();
  });
});
