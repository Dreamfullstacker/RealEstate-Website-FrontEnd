 /*
 * AIOS Double Tap v2.0
 * Description: Adds a double tap event on the link target element before redirecting.
 * Copyright: http://www.agentimage.com
 * License: Proprietary
 */

(function ($) {
    
    'use-strict';
    
    $.fn.aiosDoubleTap = function (settings) {
		
		settings = $.extend({
            addedClass: 'aios-double-tap-active',
		}, settings);
        
        aiosDoubleTapEvents($(this), settings);
		return this;
	}
    
    function aiosDoubleTapEvents($target, settings) {
        
        var plugin = this;

        plugin.isMobile = function () {
            var ua = navigator.userAgent.toLowerCase(),
                mobileRegExp = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini|mobile/i;

            return mobileRegExp.test(ua);
        }

        plugin.goToLink = function (link, targetType) {
            if (typeof link != "undefined") {
                window.open(link, targetType);
            }
        }

        plugin.outsideClick = function ($target, settings) {
            $(document).mouseup(function (e) {
                if (!$target.is(e.target) && $target.has(e.target).length === 0) {
                    $target.removeClass(settings.addedClass);
                }
            });
        }

        plugin.targetClick = function ($target, settings) {
            
            $target.bind('click', function (e) {
                e.preventDefault();

                var windowWidth = window.outerWidth,
                    $this = jQuery(e.currentTarget),
                    addedClass = settings.addedClass,
                    link = $this.attr('href'),
                    targetType = typeof $target.attr("target") == 'undefined' ? '_self' : $target.attr("target"),
                    isMobile = plugin.isMobile();
                
                console.log(isMobile);
                
                if (isMobile) {
                    if (!$this.hasClass(addedClass)) {
                        $target.removeClass(addedClass);
                        $this.addClass(addedClass);
                    }
                    else {
                        plugin.goToLink(link, targetType);
                    }
                }
                else {
                    plugin.goToLink(link, targetType);
                }
            });
        }

        plugin.init = function ($target, settings) {
            plugin.outsideClick($target, settings);
            plugin.targetClick($target, settings);
        }
        plugin.init($target, settings);
    }

    $(document).ready(function () {
        $('[data-aios-double-tap]').aiosDoubleTap();
    });
    
})(jQuery);
