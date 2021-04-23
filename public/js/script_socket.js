

const socket=io();

var username=document.getElementById('my-username').value;

const form=document.getElementById('send-container');


const append=(to_name,message,position)=>{
    const messageElement= document.createElement('div');
    messageElement.innerHTML=message;
    messageElement.classList.add("message");
    messageElement.classList.add("position");
    document.querySelector(`.container-${to_name}`).append(messageElement);
}


form.addEventListener('submit',(e)=>{
    e.preventDefault();
    console.log(formData)
    var message= document.getElementById('send-message').value;
    document.getElementById('send-message').value='';
   
    

});
console.log(username);
socket.emit('user-joined',username);


