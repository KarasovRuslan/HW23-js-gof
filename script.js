$(document).ready(function(){
    console.log(jQuery.fn.jquery);
});

(function( $ ) {
    var o = $( {} );

    $.each({
        trigger: 'publish',
        on: 'subscribe',
        off: 'unsubscribe'
    }, function( key, val ) {
        jQuery[val] = function() {
            o[key].apply( o, arguments );
        };
    });
})( jQuery );
  
let rose = {
    initListeners: function() {
        $.subscribe('Jack-Rose', function() {
            console.group('Jack to Rose')
            console.log('Message > Jack to Rose: Hello Rose this is Jack. lets date!');
            console.groupEnd();
            $.publish('Rose-Jack');
            $.publish('Rose-Billy');         
        }),
        $.subscribe('Billy-Rose', function() {
            console.group('Billy to Rose')
            console.log('Message > Billy to Rose: Hello Rose this is Billy, I understand you and run away! Godluck!');
            console.groupEnd();
        });
    }
};
  
let jack = {
    message: 'Jack-Rose',
    notify: function() {
        $.publish(this.message);
    },
    initListeners: function() {
        $.subscribe('Rose-Jack', function() {
            console.group('Rose to Jack');
            console.log('Message > Rose to Jack: Yes, lovely Jack!');
            console.groupEnd();
        });
    }
};
  
let billy = {
    initListeners: function() {
        $.subscribe('Rose-Billy', function() {
            console.group('Rose to Billy')
            console.log('Message > Rose to Billy: Hello Billy I am with Jack now!');
            console.groupEnd();
            $.publish('Billy-Rose');
        });
    }
};

$('button').on('click', function() {
    rose.initListeners();
    billy.initListeners();
    jack.initListeners();
    jack.notify();
});