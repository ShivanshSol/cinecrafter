const BACKEND_URL = "http://localhost:3000";

const LoginBtn = document.getElementById('toLogin');
const SignupBtn = document.getElementById('toSignup');

const Login = document.getElementsByClassName('login')[0];
const Signup = document.getElementsByClassName('signup')[0];

Signup.style.display = 'none';

SignupBtn.addEventListener('click', () => {
    Signup.style.display = 'block';
    Login.style.display = 'none';
});

LoginBtn.addEventListener('click', () => {
    Login.style.display = 'block';
    Signup.style.display = 'none';
});

function togglePassword(id, className) {
    const passwordField = document.getElementById(id);
    const eye = document.getElementsByClassName(className)[0];
    if (passwordField.type === "password") {
        passwordField.type = "text";
        eye.style.filter= "brightness(0) saturate(98%) invert(81%) sepia(90%) saturate(720%) hue-rotate(20deg) brightness(104%) contrast(80%)";
    } else {
        passwordField.type = "password";
        eye.style.filter= "brightness(0) saturate(100%) invert(56%) sepia(0%) saturate(0%) hue-rotate(180deg) brightness(100%) contrast(90%)";
    }
}

function goTOLanding() {
    window.location.href = '../cinecrafter/welcome.html';
}
document.addEventListener("DOMContentLoaded", () => {
    const signupForm = document.getElementById("signup-form");
    const loginForm = document.getElementById("login-form");

    if (signupForm) {
        signupForm.addEventListener("submit", async function (event) {
            event.preventDefault();
            const errorElement = document.getElementById("signup-error");
            errorElement.textContent = ""; // Clear previous error

            const username = document.getElementById("signup-username")?.value.trim();
            const email = document.getElementById("signup-email")?.value.trim();
            const password = document.getElementById("signup-password")?.value;
            const confirmPassword = document.getElementById("confirm-password")?.value;

            if (!username || !email || !password || !confirmPassword) {
                errorElement.textContent = "All fields are required!";
                return;
            }

            if (password.length < 6) {
                errorElement.textContent = "Password must be at least 6 characters!";
                return;
            }

            if (password !== confirmPassword) {
                errorElement.textContent = "Passwords do not match!";
                return;
            }

            try {
                const response = await fetch(`${BACKEND_URL}/signup`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ username, email, password })
                });

                const data = await response.json();
                if (response.ok) {
                    alert(data.message);
                    window.location.href = "../cinecrafter/home.html";
                } else {
                    errorElement.textContent = data.message || "Signup failed!";
                }
            } catch (error) {
                console.error("Error during signup:", error);
                errorElement.textContent = "Server error! Try again later.";
            }
        });
    }

    if (loginForm) {
        loginForm.addEventListener("submit", async function (event) {
            event.preventDefault();
            const errorElement = document.getElementById("login-error");
            errorElement.textContent = ""; // Clear previous error

            const inputvalue = document.getElementById("login-input")?.value.trim();
            const password = document.getElementById("login-password")?.value;

            if (!inputvalue || !password) {
                errorElement.textContent = "email/username and password are required!";
                return;
            }

            try {
                const response = await fetch(`${BACKEND_URL}/login`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include", // Allow cookies (JWT in HTTP-Only cookie)
                    body: JSON.stringify({ inputvalue, password })
                });

                const data = await response.json();
                if (response.ok) {
                    alert("Login successful!");
                    window.location.href = "../cinecrafter/home.html";
                } else {
                    errorElement.textContent = data.message || "Invalid credentials!";
                }
            } catch (error) {
                console.error("Error during login:", error);
                errorElement.textContent = "Server error! Try again later.";
            }
        });
    }
});
