(function () {
  const mobile_header = document.querySelector('.mobile_header');
    const icon = document.querySelector('.icon-container');
    icon.onclick = function () {
        mobile_header.classList.toggle('menu-open');
    }
}());

// isotope
$(document).ready( function() {

  var itemSelector = '.grid-item'; 

  var $container = $('#container').isotope({
    itemSelector: itemSelector,
    masonry: {
      columnWidth: itemSelector,
      isFitWidth: true
    }
  });

  //Ascending order
  var responsiveIsotope = [
    [480, 7],
    [720, 10]
  ];

  var itemsPerPageDefault = 12;
  var itemsPerPage = defineItemsPerPage();
  var currentNumberPages = 1;
  var currentPage = 1;
  var currentFilter = '*';
  var filterAtribute = 'data-filter';
  var pageAtribute = 'data-page';
  var pagerClass = 'isotope-pager';

  function changeFilter(selector) {
    $container.isotope({
      filter: selector
    });
  }


  function goToPage(n) {
    currentPage = n;

    var selector = itemSelector;
      selector += ( currentFilter != '*' ) ? '['+filterAtribute+'="'+currentFilter+'"]' : '';
      selector += '['+pageAtribute+'="'+currentPage+'"]';

    changeFilter(selector);
  }

  function defineItemsPerPage() {
    var pages = itemsPerPageDefault;

    for( var i = 0; i < responsiveIsotope.length; i++ ) {
      if( $(window).width() <= responsiveIsotope[i][0] ) {
        pages = responsiveIsotope[i][1];
        break;
      }
    }

    return pages;
  }
  
  function setPagination() {

    var SettingsPagesOnItems = function(){

      var itemsLength = $container.children(itemSelector).length;
      
      var pages = Math.ceil(itemsLength / itemsPerPage);
      var item = 1;
      var page = 1;
      var selector = itemSelector;
        selector += ( currentFilter != '*' ) ? '['+filterAtribute+'="'+currentFilter+'"]' : '';
      
      $container.children(selector).each(function(){
        if( item > itemsPerPage ) {
          page++;
          item = 1;
        }
        $(this).attr(pageAtribute, page);
        item++;
      });

      currentNumberPages = page;

    }();

    var CreatePagers = function() {

      var $isotopePager = ( $('.'+pagerClass).length == 0 ) ? $('<div class="'+pagerClass+'"></div>') : $('.'+pagerClass);

      $isotopePager.html('');
      
      for( var i = 0; i < currentNumberPages; i++ ) {
        var $pager = $('<a href="javascript:void(0);" class="pager" '+pageAtribute+'="'+(i+1)+'"></a>');
          $pager.html(i+1);
          
          $pager.click(function(){
            var page = $(this).eq(0).attr(pageAtribute);
            goToPage(page);
          });

        $pager.appendTo($isotopePager);
      }

      $container.after($isotopePager);

    }();

  }
  setPagination();
  goToPage(1);
  //Adicionando Event de Click para as categorias
  $('.filters a').click(function(){
    var filter = $(this).attr(filterAtribute);
    currentFilter = filter;

    setPagination();
    goToPage(1);
  });
  //Evento Responsivo
  $(window).resize(function(){
    itemsPerPage = defineItemsPerPage();
    setPagination();
  });
});
 $(document).ready( function() {   

// filter items on button click
$('.filter-button-group').on( 'click', 'li', function() {
  var filterValue = $(this).attr('data-filter');
  $('.grid').isotope({ filter: filterValue });
  $('.filter-button-group li').removeClass('active');
  $(this).addClass('active');
});
    })
  

 $(document).ready( function() {   

// filter items on button click
$('.isotope-pager').on( 'click', 'a', function() {
  var filterValue = $(this).attr('data-page');

  $('.isotope-pager a').removeClass('active');
  $(this).addClass('active');
});
    })
$(document).ready(function(){
$('.popupimg').magnificPopup({
  type: 'image',
  mainClass: 'mfp-with-zoom', 
  gallery:{
      enabled:true
    },

  zoom: {
    enabled: true, 

    duration: 300, // duration of the effect, in milliseconds
    easing: 'ease-in-out', // CSS transition easing function

    opener: function(openerElement) {

      return openerElement.is('img') ? openerElement : openerElement.find('img');
  }
}

});

});

// counter
(function ($) {
  $.fn.countTo = function (options) {
    options = options || {};
    
    return $(this).each(function () {
      // set options for current element
      var settings = $.extend({}, $.fn.countTo.defaults, {
        from:            $(this).data('from'),
        to:              $(this).data('to'),
        speed:           $(this).data('speed'),
        refreshInterval: $(this).data('refresh-interval'),
        decimals:        $(this).data('decimals')
      }, options);
      
      // how many times to update the value, and how much to increment the value on each update
      var loops = Math.ceil(settings.speed / settings.refreshInterval),
        increment = (settings.to - settings.from) / loops;
      
      // references & variables that will change with each update
      var self = this,
        $self = $(this),
        loopCount = 0,
        value = settings.from,
        data = $self.data('countTo') || {};
      
      $self.data('countTo', data);
      
      // if an existing interval can be found, clear it first
      if (data.interval) {
        clearInterval(data.interval);
      }
      data.interval = setInterval(updateTimer, settings.refreshInterval);
      
      // initialize the element with the starting value
      render(value);
      
      function updateTimer() {
        value += increment;
        loopCount++;
        
        render(value);
        
        if (typeof(settings.onUpdate) == 'function') {
          settings.onUpdate.call(self, value);
        }
        
        if (loopCount >= loops) {
          // remove the interval
          $self.removeData('countTo');
          clearInterval(data.interval);
          value = settings.to;
          
          if (typeof(settings.onComplete) == 'function') {
            settings.onComplete.call(self, value);
          }
        }
      }
      
      function render(value) {
        var formattedValue = settings.formatter.call(self, value, settings);
        $self.html(formattedValue);
      }
    });
  };
  
  $.fn.countTo.defaults = {
    from: 0,               // the number the element should start at
    to: 0,                 // the number the element should end at
    speed: 1000,           // how long it should take to count between the target numbers
    refreshInterval: 100,  // how often the element should be updated
    decimals: 0,           // the number of decimal places to show
    formatter: formatter,  // handler for formatting the value before rendering
    onUpdate: null,        // callback method for every time the element is updated
    onComplete: null       // callback method for when the element finishes updating
  };
  
  function formatter(value, settings) {
    return value.toFixed(settings.decimals);
  }
}(jQuery));

jQuery(function ($) {
  // custom formatting example
  $('.count-number').data('countToOptions', {
  formatter: function (value, options) {
    return value.toFixed(options.decimals).replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
  }
  });
  
  // start all the timers
  $('.timer').each(count);  
  
  function count(options) {
  var $this = $(this);
  options = $.extend({}, options || {}, $this.data('countToOptions') || {});
  $this.countTo(options);
  }
});