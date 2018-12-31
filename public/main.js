// =============
// Set up the socket and its event listeners
// =============

window.onload = () => {

    const socket = io();

    socket.on('message', message => {
        console.log(message);
    });

    const form = document.getElementById('form');
    
    form.addEventListener('submit', e => {
        e.preventDefault();
        const formData = new FormData(form);
        
        const data = Array.from(formData.entries());

        socket.emit('form-submitted', data);
    })


};