/**
 *
 * The logout functionality is implemented by redirecting the user to the landing page ("/"). This process involves
 * clearing the session or executing any other essential tasks associated with logout.
 * Finally, the user is redirected to the landing page to conclude the logout process.
 */
function logout() {
    // Perform logout functionality

    // Redirect to the landing page
    window.location.href = "/";
}

showSpinner();

fetch('/ads')
    .then(response =>{
        hideSpinner();
        return response.json()
    })
    .then(ads => {
        const adsContainer = document.getElementById('ads-container');
        ads.forEach(ad => {
            const adElement = document.createElement('div');
            adElement.innerHTML = `
            <br>
            <fieldset>
            <h2>${ad.title}</h2>
            <p>${ad.description}</p>
            <p>Price: ${ad.price}</p>
            <p>Contact: ${ad.phoneNumber} | ${ad.email}</p>
            <button onclick="deleteAd(${ad.id})">Delete</button>
            <button id="approveButton${ad.id}" onclick="approveAd(${ad.id})">Approve</button>
            </fieldset>
          `;
            adsContainer.appendChild(adElement);
        });
    })
    .catch(error =>{
        hideSpinner();
     console.error('Error fetching ads:', error)});


function deleteAd(adId) {
    showSpinner();
    fetch(`/ads/${adId}`, { method: 'DELETE' })
        .then(response => {
            hideSpinner();
            if (response.ok) {
                // If deletion is successful, remove the ad element from the UI
                const adElement = document.getElementById(`ad-${adId}`);
                if (adElement) {
                    adElement.parentNode.removeChild(adElement);
                }
            } else {
                console.error('Error deleting ad:', response.statusText);
            }
        })
        .catch(error => {
            hideSpinner();
            console.error('Error deleting ad:', error)
        });
}

/**
 *
 * The approval of the specified ad is facilitated by sending a PUT request to the server.
 * This request signals the server to update the status of the ad accordingly, marking it as approved.
 * @param {number} adId - The ID of the ad to be approved.
 */
function approveAd(adId) {
    showSpinner();
    fetch(`/ads/${adId}/approve`, { method: 'PUT' })
        .then(response => {
            hideSpinner();
            // Hide the approval button after successful approval
            const approveButton = document.getElementById(`approveButton${adId}`);
            if (approveButton) {
                approveButton.parentNode.removeChild(approveButton);
            }
            return response.text()
        })
        .catch(error => {
            hideSpinner();
            console.error('Error approving ad:', error)
        });
}

function showSpinner() {
    document.getElementById('spinner').style.display = 'block';
}

function hideSpinner() {
    document.getElementById('spinner').style.display = 'none';
}
