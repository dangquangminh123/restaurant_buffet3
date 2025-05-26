(function($){
'use strict';	
	$( window ).on( 'elementor/frontend/init', function() {
		
		var owl_carousel = function(){
		$('.owl-carousel-main').each( function() {
	    var $carousel = $(this);
      var $rtl = ($carousel.data('rtl') !== undefined) ? $carousel.data('rtl') : false;
	    var $items = ($carousel.data('items') !== undefined) ? $carousel.data('items') : 1;
	    var $items_tablet = ($carousel.data('items-tablet') !== undefined) ? $carousel.data('items-tablet') : 1;
	    var $items_mobile_landscape = ($carousel.data('items-mobile-landscape') !== undefined) ? $carousel.data('items-mobile-landscape') : 1;
	    var $items_mobile_portrait = ($carousel.data('items-mobile-portrait') !== undefined) ? $carousel.data('items-mobile-portrait') : 1;
	    $carousel.owlCarousel ({
        rtl: $rtl,
	      loop : ($carousel.data('loop') !== undefined) ? $carousel.data('loop') : true,
	      items : $carousel.data('items'),
	      margin : ($carousel.data('margin') !== undefined) ? $carousel.data('margin') : 30,
	      dots : ($carousel.data('dots') !== undefined) ? $carousel.data('dots') : true,
	      nav : ($carousel.data('nav') !== undefined) ? $carousel.data('nav') : false,
	      navText : ['<i class="fal fa-long-arrow-up"></i>', '<i class="fal fa-long-arrow-down"></i>'],
	      autoplay : ($carousel.data('autoplay') !== undefined) ? $carousel.data('autoplay') : true,
	      autoplayTimeout : ($carousel.data('autoplay-timeout') !== undefined) ? $carousel.data('autoplay-timeout') : 4500,
	      animateIn : ($carousel.data('animatein') !== undefined) ? $carousel.data('animatein') : false,
	      animateOut : ($carousel.data('animateout') !== undefined) ? $carousel.data('animateout') : false,
	      mouseDrag : ($carousel.data('mouse-drag') !== undefined) ? $carousel.data('mouse-drag') : true,
	      autoWidth : ($carousel.data('auto-width') !== undefined) ? $carousel.data('auto-width') : false,
	      autoHeight : ($carousel.data('auto-height') !== undefined) ? $carousel.data('auto-height') : false,
	      center : ($carousel.data('center') !== undefined) ? $carousel.data('center') : false,
	      responsiveClass: true,
	      dotsEachNumber: true,
	      smartSpeed: 3000,
	      autoplayHoverPause: true,
	      responsive : {
	        0 : {
	          items : $items_mobile_portrait,
	        },
	        480 : {
	          items : $items_mobile_landscape,
	        },
	        768 : {
	          items : $items_tablet,
	        },
	        992 : {
	          items : $items,
	        }
	      }
	    });
	    var totLength = $('.owl-dot', $carousel).length;
	    $('.total-no', $carousel).html(totLength);
	    $('.current-no', $carousel).html(totLength);
	    $carousel.owlCarousel();
	    $('.current-no', $carousel).html(1);
	    $carousel.on('changed.owl.carousel', function(event) {
	      var total_items = event.page.count;
	      var currentNum = event.page.index + 1;
	      $('.total-no', $carousel ).html(total_items);
	      $('.current-no', $carousel).html(currentNum);
	    });
	  });
  }; // end

var synccarosel_box = function(){
  var sync1 = $("#sync1");
  var sync2 = $("#sync2");
  var slidesPerPage = 3; //globaly define number of elements per page
  var syncedSecondary = true;

  sync1.owlCarousel({
    items: 1,
    slideSpeed: 2000,
    nav: false,
    autoplay: true, 
    dots: true,
    loop: true,
    responsiveRefreshRate: 200,
    navText: ['', ''],
  }).on('changed.owl.carousel', syncPosition);

  sync2.on('initialized.owl.carousel', function() {
    sync2.find(".owl-item").eq(0).addClass("current");
  })
  .owlCarousel({
    items: slidesPerPage,
    dots: true,
    nav: false,
    smartSpeed: 200,
    slideSpeed: 500,
    slideBy: slidesPerPage,
    responsiveRefreshRate: 100
  }).on('changed.owl.carousel', syncPosition2);

  function syncPosition(el) {
    var count = el.item.count - 1;
    var current = Math.round(el.item.index - (el.item.count / 2) - .5);

    if (current < 0) {
      current = count;
    }
    if (current > count) {
      current = 0;
    } //end block

    sync2.find(".owl-item").removeClass("current").eq(current).addClass("current");
      var onscreen = sync2.find('.owl-item.active').length - 1;
      var start = sync2.find('.owl-item.active').first().index();
      var end = sync2.find('.owl-item.active').last().index();

    if (current > end) {
      sync2.data('owl.carousel').to(current, 100, true);
    }
    if (current < start) {
      sync2.data('owl.carousel').to(current - onscreen, 100, true);
    }
  } // end full script

  function syncPosition2(el) {
    if (syncedSecondary) {
    var number = el.item.index;
    sync1.data('owl.carousel').to(number, 100, true);
    }
  }

  sync2.on("click", ".owl-item", function(e) {
    e.preventDefault();
    var number = $(this).index();
    sync1.data('owl.carousel').to(number, 300, true);
  });
};
	
	var cbp_cubeportfolio = function(){
		var column = $('#grid-container').data('columnnum');
		var layout_mode = $('#grid-container').data('layout');
		var gridContainer = $('#grid-container'), filtersContainer = $('#filters-container'), wrap, filtersCallback;
		
		$('#grid-container').each( function() {
		
		/*********************************
        init cubeportfolio
     *********************************/
	 if(layout_mode == 'grid'){
    gridContainer.cubeportfolio({
        layoutMode: 'grid',
        rewindNav: true,
        scrollByPage: false,
        defaultFilter: '*',
        animationType: 'flipOutDelay',
        gapHorizontal: 30,
        gapVertical: 30,
        gridAdjustment: 'responsive',
        mediaQueries: [{
            width: 1100,
            cols: column
        }, {
            width: 800,
            cols: column
        }, {
            width: 500,
            cols: 2
        }, {
            width: 320,
            cols: 1
        }],
        caption: 'overlayBottomReveal',
        displayType: 'lazyLoading',
        displayTypeSpeed: 100,

        // lightbox
        lightboxDelegate: '.cbp-lightbox',
        lightboxGallery: true,
        lightboxTitleSrc: 'data-title',
        lightboxCounter: '<div class="cbp-popup-lightbox-counter">{{current}} of {{total}}</div>',

        // singlePage popup
        singlePageDelegate: '.cbp-singlePage',
        singlePageDeeplinking: true,
        singlePageStickyNavigation: true,
        singlePageCounter: '<div class="cbp-popup-singlePage-counter">{{current}} of {{total}}</div>',
        singlePageCallback: function(url, element) {
            // to update singlePage content use the following method: this.updateSinglePage(yourContent)
            var t = this;

            jQuery.ajax({
                    url: url,
                    type: 'GET',
                    dataType: 'html',
                    timeout: 5000
                })
                .done(function(result) {
                    t.updateSinglePage(result);
                })
                .fail(function() {
                    t.updateSinglePage("Error! Please refresh the page!");
                });
        },

        // single page inline
        singlePageInlineDelegate: '.cbp-singlePageInline',
        singlePageInlinePosition: 'above',
        singlePageInlineInFocus: true,
        singlePageInlineCallback: function(url, element) {
            // to update singlePage Inline content use the following method: this.updateSinglePageInline(yourContent)
        }
    });


    /*********************************
        add listener for filters
     *********************************/
    if (filtersContainer.hasClass('cbp-l-filters-dropdown')) {
        wrap = filtersContainer.find('.cbp-l-filters-dropdownWrap');

        wrap.on({
            'mouseover.cbp': function() {
                wrap.addClass('cbp-l-filters-dropdownWrap-open');
            },
            'mouseleave.cbp': function() {
                wrap.removeClass('cbp-l-filters-dropdownWrap-open');
            }
        });

        filtersCallback = function(me) {
            wrap.find('.cbp-filter-item').removeClass('cbp-filter-item-active');
            wrap.find('.cbp-l-filters-dropdownHeader').text(me.text());
            me.addClass('cbp-filter-item-active');
            wrap.trigger('mouseleave.cbp');
        };
    } else {
        filtersCallback = function(me) {
            me.addClass('cbp-filter-item-active').siblings().removeClass('cbp-filter-item-active');
        };
    }

    filtersContainer.on('click.cbp', '.cbp-filter-item', function() {
        var me = jQuery(this);

        if (me.hasClass('cbp-filter-item-active')) {
            return;
        }

        // get cubeportfolio data and check if is still animating (reposition) the items.
        if (!jQuery.data(gridContainer[0], 'cubeportfolio').isAnimating) {
            filtersCallback.call(null, me);
        }

        // filter the items
        gridContainer.cubeportfolio('filter', me.data('filter'), function() {});
    });


    /*********************************
        activate counter for filters
     *********************************/
    gridContainer.cubeportfolio('showCounter', filtersContainer.find('.cbp-filter-item'), function() {
        // read from url and change filter active
        var match = /#cbpf=(.*?)([#|?&]|$)/gi.exec(location.href),
            item;
        if (match !== null) {
            item = filtersContainer.find('.cbp-filter-item').filter('[data-filter="' + match[1] + '"]');
            if (item.length) {
                filtersCallback.call(null, item);
            }
        }
    });


    /*********************************
        add listener for load more
     *********************************/
    jQuery('.cbp-l-loadMore-button-link').on('click.cbp', function(e) {
        e.preventDefault();
        var clicks, me = jQuery(this),
            oMsg;

        if (me.hasClass('cbp-l-loadMore-button-stop')) {
            return;
        }

        // get the number of times the loadMore link has been clicked
        clicks = jQuery.data(this, 'numberOfClicks');
        clicks = (clicks) ? ++clicks : 1;
        jQuery.data(this, 'numberOfClicks', clicks);

        // set loading status
        oMsg = me.text();
        me.text('LOADING...');

        // perform ajax request
        jQuery.ajax({
            url: me.attr('href'),
            type: 'GET',
            dataType: 'HTML'
        }).done(function(result) {
            var items, itemsNext;

            // find current container
            items = jQuery(result).filter(function() {
                return jQuery(this).is('div' + '.cbp-loadMore-block' + clicks);
            });

            gridContainer.cubeportfolio('appendItems', items.html(),
                function() {
                    // put the original message back
                    me.text(oMsg);

                    // check if we have more works
                    itemsNext = jQuery(result).filter(function() {
                        return jQuery(this).is('div' + '.cbp-loadMore-block' + (clicks + 1));
                    });

                    if (itemsNext.length === 0) {
                        me.text('NO MORE WORKS');
                        me.addClass('cbp-l-loadMore-button-stop');
                    }

                });

        }).fail(function() {
            // error
        });

    });
	 }
		
		});
	}; // end
	
	//portfolios
  elementorFrontend.hooks.addAction( 'frontend/element_ready/testo-projects.default', function($scope, $){
    var delay = 0;
	$('.progress-bar').each(function(i) {
      $(this).delay( delay*i ).animate ({
        width: $(this).attr('aria-valuenow') + '%'
      }, delay);
      $(this).prop('Counter',0).animate ({
        Counter: $(this).text()
      },
      {
        duration: delay,
        easing: 'swing',
      });
    });
    
  } );
  
  //portfolios
  elementorFrontend.hooks.addAction( 'frontend/element_ready/testo-feature-lists.default', function($scope, $){
    /*---------------featured lists---------*/
	if ($('.featured-lists-content').length) {
    $('.featured-lists-content').each(function(){
      var $circle = $(this).find('.services_item-icon');

      var agle = 360 / $circle.length;
      var agleCounter = -1;

      $circle.each(function() {
        var $this = $(this);

        $(this).parents('.services_item-wrap:first-child').addClass('active');
        $this.on('hover', function(){
          $(this).parents('.services_item-wrap').addClass('active').siblings().removeClass('active');
        })

        var percentWidth = (100 * parseFloat($this.css('width')) / parseFloat($this.parent().css('width')));
        var curAgle = agleCounter * agle;
        var radAgle = curAgle * Math.PI / 180;
        var x = (50 + ((50 - (percentWidth / 2)) * Math.cos(radAgle))) - (percentWidth / 2);
        var y = (50 + ((50 - (percentWidth / 2)) * Math.sin(radAgle))) - (percentWidth / 2);
            
        $this.css({
          left: x + '%',
          top: y + '%'
        });
        
        agleCounter++;
      });

    });
  }

    
  } );
		
		elementorFrontend.hooks.addAction( 'frontend/element_ready/testo-portfolios.default', function($scope, $){
			cbp_cubeportfolio();
    } );
    
    elementorFrontend.hooks.addAction( 'frontend/element_ready/testo-testmonials.default', function($scope, $){
			synccarosel_box();
		} );
		
		elementorFrontend.hooks.addAction( 'frontend/element_ready/testo-testmonials.default', function($scope, $){
			owl_carousel();
		} );

    elementorFrontend.hooks.addAction( 'frontend/element_ready/testo-partner.default', function($scope, $){
			owl_carousel();
		} );
		
		elementorFrontend.hooks.addAction( 'frontend/element_ready/testo-slider.default', function($scope, $){
			
			$('.slider').slider({
        full_width: false,
        interval:6000,
        transition:1000,
        draggable: false,
        indicators: true,
      });
			
    } );

    elementorFrontend.hooks.addAction( 'frontend/element_ready/testo-products-tab.default', function($scope, $){
			
			$('ul.tabs-1 li').on('click', function(){
        var tab_id = $(this).data('tab');
    
        $('ul.tabs-1 li').removeClass('current');
        $('.tab-content').removeClass('current');
    
        $(this).addClass('current');
        $("#"+tab_id).addClass('current');
      });
			
    } );

    elementorFrontend.hooks.addAction( 'frontend/element_ready/testo-imagescroll.default', function($scope, $){			
			$( '.scroll-images' ).each( function () {
        $('.scroll-section').mousemove(function(event){
          var moveX = (($(window).width() / 2) - event.pageX) * 0.1;
          var moveY = (($(window).height() / 2) - event.pageY) * 0.1;
          $('.scroll-images').css('margin-left', moveX + 'px');
          $('.scroll-images').css('margin-top', moveY + 'px');
          $('.scroll-images').css('margin-left', -moveX + 'px');
          $('.scroll-images').css('margin-top', -moveY + 'px');
        });
			});
			
    } );
		
		elementorFrontend.hooks.addAction( 'frontend/element_ready/testo-gallery.default', function($scope, $){
			
			owl_carousel();
			
		} );
		
	});
	
	

})(jQuery);