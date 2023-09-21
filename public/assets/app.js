const signInButton = document.querySelector('.toggle span:nth-child(1)');
const signUpButton = document.querySelector('.toggle span:nth-child(2)');
const signInForm = document.querySelector('.sign-in');
const signUpForm = document.querySelector('.sign-up');

signInButton.addEventListener('click', () => {
    signInForm.style.display = 'flex';
    signUpForm.style.display = 'none';
    signInButton.classList.add('active');
    signUpButton.classList.remove('active');
});

signUpButton.addEventListener('click', () => {
    signUpForm.style.display = 'flex';
    signInForm.style.display = 'none';
    signUpButton.classList.add('active');
    signInButton.classList.remove('active');
});





