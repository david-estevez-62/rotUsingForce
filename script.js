// Code goes here

  var transformProp = Modernizr.prefixed('transform');

  function Carousel3D(ele) {
    this.element = $(ele);
    this.rotation = 0;
    this.panelCount = 0;
    this.totalPanelCount = this.element.children().length;
    this.delta = 0;
    this.isHorizontal = true;
  }

  Carousel3D.prototype.modify = function() {
    this.panelSize = this.isHorizontal ? this.element.outerWidth() : this.element.outerHeight();
    this.rotateAxis = this.isHorizontal ? 'rotateY' : 'rotateX';
    this.delta = 1;
    this.radius = Math.round((this.panelSize / 2) / Math.tan(Math.PI / this.panelCount));
    this.rotation = 0;
    var panel, i;
    for (i = 0; i < this.panelCount; i++) {
      panel = this.element.children().eq(i);
      var angle = this.delta * i;
      panel.css({
        'opacity': 1,
        'background-color': 'hsla(' + angle + ', 100%, 50%, 0.8)'
      });
      panel.css(transformProp, this.rotateAxis + '(' + angle + 'deg) translateZ(' + this.radius + 'px)');
    }
    for (; i < this.totalPanelCount; i++) {
      panel = this.element.children().eq(i);
      panel.css({
        'opacity': 0,
        transformProp: 'none'
      });
      panel.css(transformProp, 'none');
    }
    this.transform();
  };

  Carousel3D.prototype.transform = function() {
    this.element.css(transformProp, 'translateZ(-' + this.radius + 'px) rotateX(7deg) ' + this.rotateAxis + '(' + this.rotation
  + 'deg)');
  };

  $(function() {

    var carousel = new Carousel3D($('.carousel').eq(0));
    carousel.panelCount = 5;
    carousel.modify();
    
    $(document).on('mousemove', function(event){
      mouseX = event.clientX || mouseX;
      if(mouseX < (window.innerWidth/2)){
        carousel.rotation -= 1;
        carousel.transform();
      }else{
        carousel.rotation += 1;
        carousel.transform();
      }
    })
  
  function repeat(){
    
    $(document).trigger('mousemove')
  }
  
  $(document).on('mouseenter', function(){
    timer = setInterval(repeat, 20)
  });
  
  $(document).on('mouseleave', function(){
    clearInterval(timer);
  });
  
    
    $('#toggle-backface-visibility').on('click', function() {
      carousel.element.toggleClass('panels-backface-invisible');
    });
  });