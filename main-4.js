var wrapper = document.querySelectorAll('[data-carousel]');
Array.prototype.forEach.call(wrapper, function(carousel, i) {
  var $carousel = $(carousel);
  var container = carousel.querySelector('ul');
  var items = carousel.querySelectorAll('li');

  var itemWidth = container.querySelector('li').offsetWidth;
  var fullWidth = items.length * itemWidth;
  
  container.style.width = fullWidth + 'px';

  function snapTo() {
    var snapPosition = itemWidth * Math.round(carousel.scrollLeft / itemWidth);
    $carousel.animate({ scrollLeft: snapPosition }, 250);
  }

  $carousel.on('touchend', function(e) {
    snapTo();
  });
});
