const socket = io('http://localhost:3000');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp')
const messageContainer = document.querySelector(".container")

const append =(message,_position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(_position);
    messageContainer.append(messageElement);
}

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`you: ${message}`,'right');
    socket.emit('send', message);
    messageInput.value='';
})
const Name = prompt("enter your name to join");
socket.emit('new-user-joined', Name);
socket.on('user-joined',_data =>{
append(`${Name} joined the chat`,'right')
})

socket.on('receive', data =>{
    append(`${data.Name}:${data.message}`,'left')

})

socket.on(`left`, Name =>{
    append(`${Name} left the chat`, 'left');

})









