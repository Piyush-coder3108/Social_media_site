

const socket=io();

var username=document.getElementById('my-username').value;




const append=(to_name,name,message,position)=>{
    const messageElement= document.createElement('div');
    messageElement.innerHTML=name+message;
    messageElement.classList.add("message");
    messageElement.classList.add(position);
    var x=to_name.split("@")[0];
    $(`.container_${x}`).append(messageElement);
}


$('.send_container').submit(function(e) {
    
    e.preventDefault();
    
    // $(this).serialize(); will be the serialized form
    var receiver_user=$(this).serializeArray()[0].value;
    var sender_user=$(this).serializeArray()[1].value;
    var message=$(this).serializeArray()[2].value;
    var sender_name=$(this).serializeArray()[3].value;
    $(this)[0].reset();
    append(receiver_user,'You: ',message,'right');
    
    socket.emit('send',{
        username: receiver_user,
        sendername: sender_user,
        message: message,
        send: sender_name
    });
});

    
socket.on('receive',(data)=>{
    new Noty({
        theme: 'relax',
        text: `You have message from ${data.name}`,
        type: 'success',
        layout: 'topRight',
        timeout: 1500
      }).show();
    append(data.user,data.name+': ',data.message,'left');
})
// });
console.log(username);
socket.emit('user-joined',username);


