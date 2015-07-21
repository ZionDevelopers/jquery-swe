/*!
 * jQuery Show when empty
 * http://jquery.com/
 *
 * Copyright 2015 Júlio César <talk@juliocesar.me>
 * Released under the MIT license
 * http://jquery.org/license
 *
 *
 */
(function ( $ ) {
 
    // Init Plugin Statement
    $.fn.swe = function() {
        // Loop by each element
        this.each(function () {
            // Get Master Element (Element that is checked if is empty)
            var master = $(this);
            
            // Check if master have swe (Show when empty data)
            if(master.data('swe')) {                
                // Get Show element
                var e = master.data('swe');
                // Get effects from data
                var effects = master.data('swe-effect') ? master.data('swe-effect') : 'show/hide';
                // Split effects
                effects = effects.split('/');
                
                // Check if swe exists
                if($(e).length) {
                    // Check if master have children
                    if($(master).children().length == 0) {
                        // Run the effect
                        $(e)[effects[0]]();
                    } else {
                        // Run the effect
                        $(e)[effects[1]]();
                    }
                }
            }
        });
        return this;
    };    

    // Apply SWE to all elements with swe data
    $(document).on('DOMSubtreeModified', '[data-swe!=""]', function () {
        // Run the plugin
        $(this).swe();
    });

}( jQuery ));