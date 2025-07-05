document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const showSignupLink = document.getElementById('show-signup');
    const showLoginLink = document.getElementById('show-login');

    // Event listener to switch to the Sign Up form
    showSignupLink.addEventListener('click', (e) => {
        e.preventDefault(); // Prevents the link from navigating
        loginForm.classList.add('hidden');
        signupForm.classList.remove('hidden');
    });

    // Event listener to switch to the Login form
    showLoginLink.addEventListener('click', (e) => {
        e.preventDefault(); // Prevents the link from navigating
        signupForm.classList.add('hidden');
        loginForm.classList.remove('hidden');
    });
});
