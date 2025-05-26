jQuery(window).load(function() {
	
	"use strict";

	var preloader = jQuery('#loader-wrapper'),
	loader = preloader.find('.cssload-loader');
	loader.fadeOut();
	preloader.delay(400).fadeOut('slow');

});

jQuery(document).ready(function( $ ) {
	"use strict";

	var column = $('#archive-grid-container').data('columnnum');
	var layout_mode = $('#archive-grid-container').data('layout');
	var gridContainer = $('#archive-grid-container'), filtersContainer = $('#filters-container'), wrap, filtersCallback;
	
	$('#archive-grid-container').each( function() {
	
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
	
	$('p').each(function() {
        var $this = jQuery(this);
        if($this.html().replace(/\s|&nbsp;/g, '').length == 0) {
            $this.remove();
        }
    });
	
	/*=============================================
	=    		Mobile Menu			      =
	=============================================*/
	//SubMenu Dropdown Toggle
	if ($('.navbar li.dropdown ul').length) {
		$('.navbar .navbar-nav li.dropdown').append('<div class="dropdown-btn"><span class="fas fa-angle-down"></span></div>');
	
	}
	
	//Mobile Nav Hide Show
	if ($('.mobile-menu').length) {
	
		var mobileMenuContent = $('.navbar .navbar-collapse').html();
		$('.mobile-menu .menu-box .menu-outer').append(mobileMenuContent);
	
		//Dropdown Button
		$('.mobile-menu li.dropdown .dropdown-btn').on('click', function () {
			$(this).toggleClass('open');
			$(this).prev('ul').slideToggle(500);
		});
		//Menu Toggle Btn
		$('.mobile-nav-toggler').on('click', function () {
			$('body').addClass('mobile-menu-visible');
		});
	
		//Menu Toggle Btn
		$('.mobile-menu .menu-backdrop,.mobile-menu .close-btn').on('click', function () {
			$('body').removeClass('mobile-menu-visible');
		});
	}
	
	$('.ts-button').each(function () {
		var hoverback = $(this).data('hoverback');
		var currentbg = $(this).data('currentbg');
		var currentbor = $(this).data('currentbor');
		var hoverbor = $(this).data('hoverbor');
		var currentcolor = $(this).data('currentcolor');
		var hovercolor = $(this).data('hovercolor');
		$(this).on('mouseenter',function() {
			$(this).css({'background': hoverback, 'border-color': hoverbor, 'color': hovercolor});
		});
		$(this).on('mouseleave',function() {
			$(this).css({'background': currentbg, 'border-color': currentbor, 'color': currentcolor});
		});
	});
	
	$('.site-colors ul > li > a').each(function () {
		var backgroundcolor = $(this).data('backgroundcolor');
		$(this).css({'background': backgroundcolor});
	});
	
	$('.element').each(function () {
		var text1 = $(this).data('text1');
		var text2 = $(this).data('text2');
		var text3 = $(this).data('text3');
		var text4 = $(this).data('text4');
	$(function(){
	  $(".element").typed({
		strings: [text1, text2, text3, text4],
		typeSpeed: 300
	  });
	});
	});
	
	$(".content").fitVids();
	
	// Counter
	$(".count-number").appear(function(){
		$('.count-number').each(function(){
			var datacount = $(this).attr('data-count');
			$(this).find('.counter').delay(8000).countTo({
				from: 10,
				to: datacount,
				speed: 4000,
				refreshInterval: 50,
			});
		});
	});
	
	/* ==============================================
    BACK TOP
    =============================================== */
	
	// Scroll top top
	var offset = 200,
		offset_opacity = 1200,
		scroll_top_duration = 700,
		$back_to_top = $('.dmtop');

	$(window).scroll(function(){
		( $(this).scrollTop() > offset ) ? $back_to_top.addClass('dmtop dmtop-show') : $back_to_top.removeClass('dmtop-show cd-fade-out');
		if( $(this).scrollTop() > offset_opacity ) { 
			$back_to_top.addClass('cd-fade-out');
		}
	});

	$back_to_top.on('click', function(event){
		event.preventDefault();
		$('body,html').animate({
			scrollTop: 0 ,
		 	}, scroll_top_duration
		);
	});

	if($('.layout-full .stretch-content').find('div.row').length != 0) {
		$('.layout-full .stretch-content .row').css('margin', '0'); 	
	}
  
  var authorContainer = $('body');
    // This will handle stretching the cells.
	
    $('.layout-full .stretch-content').each(function(){
		
        var $$ = $(this);

        var onResize = function(){

            $$.css({
                'margin-left' : 0,
                'margin-right' : 0,
                'padding-left' : 0,
                'padding-right' : 0
            });

            var leftSpace = $$.offset().left - authorContainer.offset().left;
            var rightSpace = authorContainer.outerWidth() - leftSpace - $$.parent().outerWidth();

            $$.css({
                'margin-left' : -leftSpace,
                'margin-right' : -rightSpace,
                'padding-left' : $$.data('stretch-type') === 'full' ? leftSpace : 0,
                'padding-right' : $$.data('stretch-type') === 'full' ? rightSpace : 0
            });
        };

        $(window).resize( onResize );
        onResize();

        $$.css({
            'border-left' : 0,
            'border-right' : 0
        });
    });
	
	/*======================= tooltip==============*/
	
	$(function() {
        $('[data-toggle="tooltip"]').tooltip()
    })
    $('.dmtop').click(function(){
        $('html, body').animate({scrollTop: '0px'}, 800);
        return false;
    });
    $(document).ready(function() {
        setTimeout(function(){
            $('body').addClass('loaded');
        }, 3000);
    });
    $(document).ready(function() {
        $('#nav-expander').on('click', function(e) {
            e.preventDefault();
            $('body').toggleClass('nav-expanded');
        });
        $('#nav-close').on('click', function(e) {
            e.preventDefault();
            $('body').removeClass('nav-expanded');
        });
    });
	
	if($('.layout-full .stretch-content').find('div.row').length != 0) {
		$('.layout-full .stretch-content .row').css('margin', '0'); 	
	}
  
  var authorContainer = $('body');
    // This will handle stretching the cells.
	
    $('.layout-full .stretch-content').each(function(){
		
        var $$ = $(this);

        var onResize = function(){

            $$.css({
                'margin-left' : 0,
                'margin-right' : 0,
                'padding-left' : 0,
                'padding-right' : 0
            });

            var leftSpace = $$.offset().left - authorContainer.offset().left;
            var rightSpace = authorContainer.outerWidth() - leftSpace - $$.parent().outerWidth();

            $$.css({
                'margin-left' : -leftSpace,
                'margin-right' : -rightSpace,
                'padding-left' : $$.data('stretch-type') === 'full' ? leftSpace : 0,
                'padding-right' : $$.data('stretch-type') === 'full' ? rightSpace : 0
            });
        };

        $(window).resize( onResize );
        onResize();

        $$.css({
            'border-left' : 0,
            'border-right' : 0
        });
    });
	
	$('.gallery-carousel').each(function() {		
		var margin = $(this).data('margin');
		var items = $(this).data('items');
		var nav = $(this).data('nav');
		var dots = $(this).data('dots');
		var autoplay = $(this).data('autoplay');
		var items_tablet = 1;
		$('.gallery-carousel').owlCarousel({
			loop:true,
			margin: margin,
			nav: nav,
			autoplay: autoplay,
			dots: dots,
			navText : ['<i class="fal fa-arrow-left"></i>','<i class="fal fa-arrow-right"></i>'],
			responsive : {
	        0 : {
	          items : 1,
	        },
	        480 : {
	          items : 1,
	        },
	        768 : {
	          items : items_tablet,
	        },
	        992 : {
	          items : items,
	        }
	      }
		});
	});
	
	/*----------------------------------------------------*/
	/*	Video Link Lightbox
	/*----------------------------------------------------*/		
	$('.video-popup').each(function(){
		var url = $(this).data('url');
		$('.video-popup').magnificPopup({
			type: 'iframe',				  
			iframe: {
				patterns: {
					youtube: {				   
					index: 'youtube.com',
					src: url
					}
				}
			}		  		  
		});
	});

	$('.image-link').magnificPopup({
		type: 'image'
	});	
	
	/*----------------------------------------------------*/
	/*	Video Link Lightbox
	/*----------------------------------------------------*/		
	$('.gallery-content').each(function() { // the containers for all your galleries
		$(this).magnificPopup({
		delegate: 'a', // the selector for gallery item
		type: 'image',
		gallery: {
			enabled:true
		}
		});
	});

	$('.service-des h5 a').each(function(){
		var text = $(this).text().split(' ');
		var text1 = $(this).text();
		var numbertext = parseInt(wordcount(text1)/2);
		for (var i = 0; i < numbertext; i++) {
			text[i] = '<span class="bold-font">'+text[i]+'</span>';
			$(this).html( text.join(' ') );
		}
	});

	$('#reviews-1 .flexslider').flexslider({
		animation: "fade",
		controlNav: true,
		directionNav: false,  
		slideshowSpeed: 5000,   
		animationSpeed: 2000,  
		start: function(slider){
			$('body').removeClass('loading');
		}
	});

	$('ul.tabs-2 li').click(function(){
		var tab_id = $(this).attr('data-tab');

		$('ul.tabs-2 li').removeClass('displayed');
		$('.tab-content').removeClass('displayed');

		$(this).addClass('displayed');
		$("#"+tab_id).addClass('displayed');
	});

	$('.main_search_btn').on('click', function() {
		$(this).toggleClass('active');
	});
	
});

function wordcount(paragraph) {
    var totalSpaces = 0;
    var letter;

    for (var i = 0; i < paragraph.length; i++) {
        letter = paragraph.substr(i, 1);
        if (letter === ' ') {
            totalSpaces = totalSpaces + 1;
        }
    }

    return totalSpaces+1;
}