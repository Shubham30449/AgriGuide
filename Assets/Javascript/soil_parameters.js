document.getElementById('soilForm').addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevent default form submission

    const temperature = document.getElementById('temperature').value;
    const humidity = document.getElementById('humidity').value;
    const soilPh = document.getElementById('soilPh').value;
    const nitrogen = document.getElementById('nitrogen').value;
    const phosphorus = document.getElementById('phosphorus').value;
    const potassium = document.getElementById('potassium').value;

    // Check if mandatory fields are selected
    if (!temperature || !humidity || !soilPh) {
        alert('Please select Temperature, Humidity, and Soil pH.');
        return;
    }

    // Collect selected values
    const soilData = {
        temperature,
        humidity,
        soilPh,
        nitrogen: nitrogen || "Not provided",
        phosphorus: phosphorus || "Not provided",
        potassium: potassium || "Not provided"
    };

    console.log("Soil Parameters Submitted:", soilData);

    try {
        // Send soil data to backend
        const response = await fetch('http://localhost:8080/api/soil-parameters', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(soilData)
        });

        if (!response.ok) {
            throw new Error('Failed to submit soil data');
        }

        const data = await response.json();
        console.log('Success:', data);
        alert(data.message); // Display success message

        // Fetch crop recommendations after successful submission
        await fetchCropRecommendations(soilData);
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while submitting soil data');
    }
});

// Function to fetch crop recommendations
async function fetchCropRecommendations(soilData) {
    try {
        const response = await fetch('http://localhost:8080/api/crop-recommendation', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(soilData)
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch crop recommendations. Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Received Data:', data);

        // ✅ Ensure 'data' contains an array before displaying
        if (!data || !Array.isArray(data) || data.length === 0) {
            console.warn('No crops found for the given soil parameters.');
            displayCropRecommendations([]);
        } else {
            displayCropRecommendations(data);
        }
    } catch (error) {
        console.error('Error fetching crop recommendations:', error);
        alert('Could not retrieve crop recommendations');
    }
}


// Function to display recommended crops
function displayCropRecommendations(crops) {
    const resultDiv = document.getElementById('cropRecommendations');

    if (!resultDiv) {
        console.error("Element with ID 'cropRecommendations' not found.");
        return;
    }

    resultDiv.innerHTML = "<h3>Recommended Crops:</h3>";

    // ✅ Check if crops is an array and contains values
    if (!crops || !Array.isArray(crops) || crops.length === 0) {
        resultDiv.innerHTML += "<p>No suitable crops found for the given parameters.</p>";
        return;
    }

    const ul = document.createElement('ul');
    crops.forEach(crop => {
        if (crop) { // ✅ Prevent displaying null values
            const li = document.createElement('li');
            li.textContent = crop;
            ul.appendChild(li);
        }
    });

    resultDiv.appendChild(ul);
}

