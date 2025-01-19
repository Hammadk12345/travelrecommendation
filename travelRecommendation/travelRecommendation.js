const resultDiv = document.getElementById('result');
function searchRecommendation() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    resultDiv.innerHTML = ''; // Clear previous results

    fetch('./travelRecommendation_api.json') // Ensure the correct path
        .then(response => response.json())
        .then(data => {

            if (input === 'countries') {
                const recommendations = data[input];
                recommendations.forEach(recommendation => {
                    const { name, cities } = recommendation;

                    // Display country name
                    const countryDiv = document.createElement('div');
                    countryDiv.innerHTML = `<h2>${name}</h2>`;
                    resultDiv.appendChild(countryDiv);

                    // Display cities if available
                    if (cities) {
                        cities.forEach(city => {
                            const cityDiv = document.createElement('div');
                            cityDiv.innerHTML = `
                                <h3>${city.name}</h3>
                                <img src="${city.imageUrl}" alt="${city.name}" style="width: 200px; height: auto;">
                                <p>${city.description}</p>
                            `;
                            resultDiv.appendChild(cityDiv);
                        });
                    }
                });
            } else if(input === 'temples' || input === 'beaches') {
                const recommendations = data[input];
                recommendations.forEach(recommendation => {
                    const {name, imageUrl, description} = recommendation;
                    const otherDiv = document.createElement('div');
                    otherDiv.innerHTML = `<h2>${name}</h2>
                                            <img src ="${imageUrl}">
                                            <p>${description}</p>`
                    resultDiv.appendChild(otherDiv)
                })

            }
            else {
                resultDiv.innerHTML = `<p>No recommendations found for "${input}". Please try a valid category like "countries", "temples", or "beaches".</p>`;
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            resultDiv.innerHTML = `<p>There was an error fetching the recommendations. Please try again later.</p>`;
        });
}



function resetRecommendation(){
    document.getElementById('searchInput').value = '';
    resultDiv.innerHTML = '';
}

document.getElementById('searchButton').addEventListener('click', searchRecommendation);
document.getElementById('resetButton').addEventListener('click', resetRecommendation);