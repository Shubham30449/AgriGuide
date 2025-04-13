document.addEventListener("DOMContentLoaded", function () {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const userMobile = localStorage.getItem('userMobile');

    if (!isLoggedIn || !userMobile) {
        window.location.href = "login.html"; // ✅ Redirect to login page if not logged in
    }
});

// ✅ Logout function
function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userMobile');
    window.location.href = 'login.html';
}
