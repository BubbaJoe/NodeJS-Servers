jQuery(function($){
    var socket = io.connect();
    var $submit = $('#send');
    var $message = $('#message');
    var $chat = $('#chat');

    // Send and append message
    $submit.click(function() {
        var msg = $message.val().trim(); // removes excess white space from string
        if(msg != '') {
            socket.emit('send',msg); // send to the socket server
            $chat.append("<div id='me'>"+msg+"<br/><div>"); // adds my message 
            $chat.scrollTop($chat.height());
        }
        $message.val('');
        $message.select();
    });

    $message.click(function(e) {

    });

    // Enter to send
    $message.keypress(function(e){
        if(e.which == 13) { // 13 = enter key
            $submit.click();
            return false;
        }
    });

    // append new message
    socket.on('message',function(data) {
        if(data.trim() != '') {
            $chat.append("<div id='other'>"+data+"<br/><div>"); // adds new message
            $chat.scrollTop($chat.height()); // Scrolls down to the bottom
        }
    });
});