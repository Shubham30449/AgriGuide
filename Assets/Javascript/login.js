document.getElementById('togglePassword').addEventListener('click', function () {
    const passwordInput = document.getElementById('password');
    const type = passwordInput.type === 'password' ? 'text' : 'password';
    passwordInput.type = type;
    this.classList.toggle('fa-eye-slash'); // Toggle icon
});


document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const mobileNo = document.getElementById('mobile').value.trim();
    const password = document.getElementById('password').value.trim();
    const errorDiv = document.getElementById('error');

    // Clear previous errors
    errorDiv.textContent = '';

    if (!mobileNo || !/^\d{10}$/.test(mobileNo)) {
        errorDiv.textContent = 'Enter a valid 10-digit mobile number.';
        return;
    }

    if (!password) {
        errorDiv.textContent = 'Password is required.';
        return;
    }

    fetch("http://localhost:8080/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobileNO: mobileNo, password }) 
    })
    .then(response => response.json()) // ✅ Expect JSON response
    .then(data => {
        if (data.success) {
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userMobile', mobileNo);
            alert("Login successful!");
            window.location.href = "dashboard.html"; // ✅ Redirect to dashboard
        } else {
            throw new Error(data.message);
        }
    })
    .catch(error => {
        errorDiv.textContent = error.message || 'Login failed!';
    });
});
