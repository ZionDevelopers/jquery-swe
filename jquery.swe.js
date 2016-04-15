/*!
 * jQuery Show when empty v2
 * http://jquery.com/
 *
 * Copyright 2016 Júlio César <talk@juliocesar.me>
 * Released under the MIT license
 * http://jquery.org/license
 *
 *
 */
(function ( $ ) {
    // Init Plugin Statement
    $.fn.swe = function() {
        /**
         * Show message
         * @param {object} e
         * @param {object} master
         * @param {array} effects
         */
        var show = function(e, master, effects) {
            var hideCallback = master.data('swe-hide-callback');
            
            // Run the effect
            $(e)[effects[0]]();
            
            // Check if callback exists
            if (typeof window[hideCallback] === 'function') {
                window[hideCallback]();
            }
        };
        
        /**
         * Hide message
         * @param {object} e
         * @param {object} master
         * @param {array} effects
         */
        var hide = function (e, master, effects) {
            var showCallback = master.data('swe-show-callback');
            
            // Run the effect
            $(e)[effects[1]]();
                                    
            // Check if callback exists
            if (typeof window[showCallback] === 'function') {
                window[showCallback]();
            }
        };       

        // Loop by each element
        this.each(function () {
            // Get Master Element (Element that is checked if is empty)
            var master = $(this);
            // Define children element
            var children = null;
            
            // Check if master have swe (Show when empty data)
            if(master.data('swe')) {                
                // Get Show element
                var e = master.data('swe');
                                
                // Get effects from data
                var effects = master.data('swe-effect') ? master.data('swe-effect') : 'show/hide';
                // Split effects
                effects = effects.split('/');
                
                // Check for swe custom children
                if(master.data('swe-children')) {
                    children = $(master.data('swe-children'))
                } else {
                    children = $(master).children();
                }
                
                // Check if swe exists
                if($(e).length) {
                    // Check if master have children
                    if(children.length === 0) {
                        // Show message
                        show(e, master, effects);
                    } else {
                        // Hide message
                        hide(e, master, effects);
                    }                    
                }
            }
        });
        return this;
    };
    
    // Define elements to track
    var targets = $('[data-swe!=""]');
    
    // Define mutation config
    var observerConfig = {childList: true};
    
    // Define MutationObserver
    var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

    // create an observer instance
    var observer = new MutationObserver(function (records) {
        // Run the plugin
        $(records[0].target).swe();
    });
    
    // Loop by targerts
    targets.each (function () {
        // Track element
        observer.observe(this, observerConfig);
    });
    
    $(document).ready(function () {
        // Run the plugin
        $('[data-swe!=""]').swe();
    });
}( jQuery ));
