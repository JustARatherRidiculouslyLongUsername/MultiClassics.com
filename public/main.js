window.onload = () => {
    const socket = io();

    // Console log any data sent as a message event
    socket.on('message', message => {
        console.log(message);
    });

    // Create reference to the form element
    const form = document.querySelector('#login-form');
    const formElems = form.elements;
    
    // When the form is submitted
    form.addEventListener('submit', e => {
        
        // Make the browser not reload
        e.preventDefault();
        
        // And send the data to the server
        socket.emit('login-form-submitted', {
            username: formElems.username.value,
            password: formElems.password.value,
            remember: formElems.remember.checked
        });

    });

};