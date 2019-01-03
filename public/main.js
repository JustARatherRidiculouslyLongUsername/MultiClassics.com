window.onload = () => {
    const socket = io();
    
    // Console log any data sent as a message event
    socket.on('message', message => {
        console.log(message);
    });

    // Create references to the html elements
    const loginForm = document.querySelector('#login-form');
    const loginFormElems = loginForm.elements;
    const tabsElem = document.querySelector('#tabs');
    const tabsUL = tabsElem.children[0];
    
    // For each <li> in the <ul> of #tabs,
    for (let li of tabsUL.children) {
        // If the <a> inside it is clicked
        li.children[0].addEventListener('click', e => {

            // Make this tab selected
            li.classList.add('is-active');
            
            // Make everything else not selected
            for (let otherLi of tabsUL.children) {
                if (li !== otherLi) {
                    otherLi.classList.remove('is-active');
                }
            }
            
        });
    }

    const signUpBtn = document.querySelector('#sign-up-btn');
    signUpBtn.addEventListener('click', e => {
        // Hide the login form
        const loginForm = document.querySelector('#login-form')
        loginForm.style.display = 'none';

        // Show the sign up form
        const signUpForm = document.querySelector('#sign-up-form');
        signUpForm.style.display = 'block';

        // Change the title and subtitle
        document.querySelector('#title').innerHTML = 'Sign Up';
        document.querySelector('#subtitle').innerHTML = 'and create your very own account';
    });

    const LoginBtn = document.querySelector('#login-btn');
    LoginBtn.addEventListener('click', e => {
        // Hide the sign up form
        const signUpForm = document.querySelector('#sign-up-form');
        signUpForm.style.display = 'none';
        
        // Show the login form
        const loginForm = document.querySelector('#login-form')
        loginForm.style.display = 'block';
        
        // Change the title and subtitle
        document.querySelector('#title').innerHTML = 'Login';
        document.querySelector('#subtitle').innerHTML = 'to access all your game data';
    });
    
    // When the login form is submitted
    loginForm.addEventListener('submit', e => {
        
        // Make the browser not reload
        e.preventDefault();
        
        console.log('form submitted');

        // And send the data to the server
        socket.emit('login-form-submitted', {
            username: loginFormElems.username.value,
            password: loginFormElems.password.value,
            remember: loginFormElems.remember.checked
        });

    });



};