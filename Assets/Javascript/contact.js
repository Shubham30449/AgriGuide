document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
        alert("All fields are required.");
        return;
    }

    const contactData = { name, email, message };

    fetch("http://192.168.192.238:8080/api/contact/send", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(contactData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Failed to send message");
        }
        return response.text();
    })
    .then(data => {
        alert(data);
        document.getElementById("contactForm").reset();
    })
    .catch(error => {
        console.error("Error:", error);
        alert("An error occurred. Please try again.");
    });
});
