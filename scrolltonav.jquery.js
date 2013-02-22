

//  Jquery ScrollToNav v.0.0.3
// @Author Etienne Dion


/* jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 *
 * Uses the built in easing capabilities added In jQuery 1.1
 * to offer multiple easing options
 *
 * TERMS OF USE - jQuery Easing
 * 
 * Open source under the BSD License. 
 * 
 * Copyright © 2008 George McGinley Smith
 * All rights reserved.
 */
jQuery.extend( jQuery.easing,
{
	easeInOutExpo: function (x, t, b, c, d) {
		if (t==0) return b;
		if (t==d) return b+c;
		if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
		return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
	}
});


// Jquery Throttle Debounce 
/*
 * jQuery throttle / debounce - v1.1 - 3/7/2010
 * http://benalman.com/projects/jquery-throttle-debounce-plugin/
 * 
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */
(function(b,c){var $=b.jQuery||b.Cowboy||(b.Cowboy={}),a;$.throttle=a=function(e,f,j,i){var h,d=0;if(typeof f!=="boolean"){i=j;j=f;f=c}function g(){var o=this,m=+new Date()-d,n=arguments;function l(){d=+new Date();j.apply(o,n)}function k(){h=c}if(i&&!h){l()}h&&clearTimeout(h);if(i===c&&m>e){l()}else{if(f!==true){h=setTimeout(i?k:l,i===c?e-m:e)}}}if($.guid){g.guid=j.guid=j.guid||$.guid++}return g};$.debounce=function(d,e,f){return f===c?a(d,e,false):a(d,f,e!==false)}})(this);


(function($){
    $.fn.scrollToNav = function( options ){

        var settings = {
            anchorsSelector:"nav a"
        }
        var $self = $(this);
      
        $.extend( settings, options );
       

		$(settings.anchorsSelector).click(function(evt){
			evt.preventDefault();

			var goto = $($(this).attr('href')).offset().top-150;
			var currentScroll = $(window).scrollTop();
			var time = 0;

			if (goto > currentScroll){
				time = goto - currentScroll;
			} else {
				time =  currentScroll - goto;
			}
			if(goto < 0){
				goto = 0;
			}

			$('html, body').animate({
				scrollTop: goto
			}, (time*1.5) , 'easeInOutExpo');

		});


		$(window).scroll(

			$.throttle( 200, function(e){
				var currentScroll = $(this).scrollTop();

				var anchorPos = [];
				$(settings.anchorsSelector).each(function(index){
					var position = $($(this).attr('href')).offset().top;
					anchorPos.push({ index:index, position:position });
				});
				
				anchorPos = sortByProp(anchorPos, "index");
				
				var currentPos = 0;
				$.each(anchorPos, function(i){
					if(currentScroll >= anchorPos[i].position-200 && currentScroll <= anchorPos[i+1].position){
						currentPos = anchorPos[i].index;
					}
					if(currentScroll > anchorPos[anchorPos.length-1].position-200){
						currentPos = anchorPos[anchorPos.length-1].index;
					}
				});

				if(!($(settings.anchorsSelector).eq(currentPos).hasClass("active"))){
					$(settings.anchorsSelector).removeClass("active");
					$(settings.anchorsSelector).eq(currentPos).addClass("active");
				}

			}) 

		);
		
		//sort Array By Property
		function sortByProp(array, p){
			return array.sort(function(a,b){
				return (a[p] < b[p]) ? 1 : (a[p] > b[p]) ? -1 : 0;
			});
		}
	

})(jQuery);