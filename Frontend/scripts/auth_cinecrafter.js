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
        eye.style.color = "#BDF71E";
    } else {
        passwordField.type = "password";
        eye.style.color = "#4c4c4c";
    }
}

function goTOLanding() {
    window.location.href = '../index/landing_cinecrafter.html';
}

document.addEventListener("DOMContentLoaded", () => {
    const signupForm = document.getElementById("signup-form");
    const loginForm = document.getElementById("login-form");

    if (signupForm) {
        signupForm.addEventListener("submit", async function (event) {
            event.preventDefault();

            const name = document.getElementById("signup-username")?.value.trim();
            const email = document.getElementById("signup-email")?.value.trim();
            const password = document.getElementById("signup-password")?.value;
            const confirmPassword = document.getElementById("confirm-password")?.value;
            const errorElement = document.getElementById("signup-error");

            if (!name || !email || !password || !confirmPassword) {
                errorElement.textContent = "All fields are required!";
                return;
            }

            if (password !== confirmPassword) {
                errorElement.textContent = "Passwords do not match!";
                return;
            }

            errorElement.textContent = "";

            try {
                const response = await fetch(`${BACKEND_URL}/signup`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ name, email, password })
                });

                const data = await response.json();

                if (response.ok) {
                    alert(data.message);
                    window.location.href = "../html/cinecrafter.html";
                } else {
                    errorElement.textContent = data.error || "Signup failed!";
                }
            } catch (error) {
                console.error("Error:", error);
                errorElement.textContent = "Server error! Try again later.";
            }
        });
    }

    if (loginForm) {
        loginForm.addEventListener("submit", async function (event) {
            event.preventDefault();

            const email = document.getElementById("login-email")?.value.trim();
            const password = document.getElementById("login-password")?.value;
            const errorElement = document.getElementById("login-error");

            if (!email || !password) {
                errorElement.textContent = "Both email and password are required!";
                return;
            }

            try {
                const response = await fetch(`${BACKEND_URL}/login`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, password })
                });

                const data = await response.json();

                if (response.ok) {
                    alert("Login successful!");
                    window.location.href = "../html/cinecrafter.html";
                } else {
                    errorElement.textContent = data.error || "Invalid credentials!";
                }
            } catch (error) {
                console.error("Error:", error);
                errorElement.textContent = "Server error! Try again later.";
            }
        });
    }
});
