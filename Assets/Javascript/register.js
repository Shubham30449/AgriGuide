
// Password Toggle Functionality
document.getElementById('toggleRegPassword').addEventListener('click', function () {
    const passwordInput = document.getElementById('regPassword');
    const type = passwordInput.type === 'password' ? 'text' : 'password';
    passwordInput.type = type;
    this.classList.toggle('fa-eye-slash');
});

document.getElementById('toggleConfirmPassword').addEventListener('click', function () {
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const type = confirmPasswordInput.type === 'password' ? 'text' : 'password';
    confirmPasswordInput.type = type;
    this.classList.toggle('fa-eye-slash');
});


document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("registerForm").addEventListener("submit", function (event) {
        event.preventDefault();

        const username = document.getElementById("regUsername").value.trim();
        const mobile = document.getElementById("mobile").value.trim();
        const password = document.getElementById("regPassword").value.trim();
        const confirmPassword = document.getElementById("confirmPassword").value.trim();
        const errorDiv = document.getElementById("regError");

        // Clear previous errors
        errorDiv.textContent = "";

        // **Validation**
        if (!username) {
            errorDiv.textContent = "Username is required.";
            return;
        }

        if (!mobile || !/^\d{10}$/.test(mobile)) {
            errorDiv.textContent = "Mobile number must be a 10-digit numeric value.";
            return;
        }

        if (!password || password.length < 6) {
            errorDiv.textContent = "Password must be at least 6 characters long.";
            return;
        }

        if (password !== confirmPassword) {
            errorDiv.textContent = "Passwords do not match.";
            return;
        }

        // **User Data**
        let userData = {
            name: username,
            mobileNo: Number(mobile),
            password: password
        };

        // **Send request to backend**
        fetch("http://localhost:8080/api/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData)
        })
        .then(response => response.json()) // ✅ Expect JSON response
        .then(data => {
            if (data.success) {
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('userMobile', mobile);
                document.getElementById("registerMessage").style.color = "green";
                document.getElementById("registerMessage").innerText = data.message;
                setTimeout(() => window.location.href = "login.html", 1000);
            } else {
                document.getElementById("registerMessage").style.color = "red";
                document.getElementById("registerMessage").innerText = data.message;
            }
        })
        .catch(error => {
            console.error("❌ Error:", error);
            document.getElementById("registerMessage").style.color = "red";
            document.getElementById("registerMessage").innerText = "Registration failed. Please try again.";
        });
    });
});
