window.onload = () => {

    const socket = io();

    // Console log any data sent as a message event
    socket.on('message', message => {
        console.log(message);
    });

    // Create reference to the form element
    const form = document.getElementById('form');
    
    form.addEventListener('submit', e => {
        
        // Make the browser not reload
        e.preventDefault();

        const formData = new FormData(form);
        
        // convert iterator to array
        const data = Array.from(formData.entries());

        // Send the array to server
        socket.emit('form-submitted', data);
    })


};