document.getElementById('desiredCropForm').addEventListener('submit', function (event) {
    event.preventDefault();

    // Collect input values
    const temperature = document.getElementById('temperature').value;
    const humidity = document.getElementById('humidity').value;
    const soilPh = document.getElementById('soilPh').value;
    const nitrogen = document.getElementById('nitrogen').value || null;
    const phosphorus = document.getElementById('phosphorus').value || null;
    const potassium = document.getElementById('potassium').value || null;
    const desiredCrop = document.getElementById('desiredCrop').value;

    // Validation for required fields
    if (!temperature || !humidity || !soilPh || !desiredCrop) {
        alert("Please fill all required fields: Temperature, Humidity, Soil pH, and Desired Crop.");
        return;
    }

    // Prepare data object
    const requestData = {
        temperature,
        humidity,
        soilPh,
        nitrogen,
        phosphorus,
        potassium,
        desiredCrop
    };

    // Send request to backend
    fetch("http://localhost:8080/api/compost/recommend", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(requestData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Failed to fetch compost recommendation");
        }
        return response.text(); // Assuming plain text message
    })
    .then(data => {
        displayCompostRecommendation(data);
    })
    .catch(error => {
        console.error("Error:", error);
        alert("Something went wrong while processing your request.");
    });
});

function displayCompostRecommendation(message) {
    const outputDiv = document.getElementById('compostRecommendations');
    outputDiv.innerHTML = `
        <div class="recommendation-box">
            <h3>Compost Recommendation</h3>
            <p>${message}</p>
        </div>
    `;
}
