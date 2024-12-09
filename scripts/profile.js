
let cardCounter = 0;

function deleteCard(cardNumber) {
    const card = document.getElementById(`card${cardNumber}`);
    if (card) {
        card.remove();
        cardCounter--;
        updateAddButton();
    }
}

function addNewCard() {
    if (cardCounter >= 3) {
        alert("Maximum of 3 cards allowed.");
        return;
    }

    cardCounter++;
    const cardContainer = document.getElementById("cardContainer");

    const newCard = document.createElement("div");
    newCard.classList.add("card");
    newCard.id = `card${cardCounter}`;

    newCard.innerHTML = `
        <button class="delete-card" onclick="deleteCard(${cardCounter})">
            🗑️
        </button>
        <div class="card-title">
            <input type="text" id="cardName${cardCounter}" value="Card ${cardCounter}" disabled>
        </div>
        <div class="form-group">
            <label for="host${cardCounter}">Host</label>
            <input type="text" id="host${cardCounter}" value="localhost" disabled>
        </div>
        <div class="form-group">
            <label for="port${cardCounter}">Port</label>
            <input type="text" id="port${cardCounter}" value="8080" disabled>
        </div>
        <div class="form-group">
            <label for="username${cardCounter}">Username</label>
            <input type="text" id="username${cardCounter}" value="admin" disabled>
        </div>
        <div class="form-group">
            <label for="pwd${cardCounter}">Password</label>
            <input type="password" id="pwd${cardCounter}" value="password" disabled>
        </div>
        <div class="button-group">
            <button class="button-save" onclick="saveCard(${cardCounter})">Save</button>
            <button class="button-edit" onclick="editCard(${cardCounter})">Edit</button>
        </div>
`;

    cardContainer.appendChild(newCard);
    updateAddButton();
}

function editCard(cardNumber) {
    console.log(cardNumber); // Verify the card element


    const card = document.getElementById(`card${cardNumber}`);
    card.querySelector(".button-save").style.display = "inline-block"; // Show Save button
    card.querySelector(".button-edit").style.display = "none"; // Hide Edit button
    card.querySelectorAll("input").forEach(input => {
    input.disabled = false; // Enable inputs for editing
    });
}


function saveCard(cardNumber) {
    console.log("**********************");
    console.log(cardNumber); // Verify the card element
    const card = document.getElementById(`card${cardNumber}`);
    card.querySelector(".button-save").style.display = "none"; // Hide Save button
    card.querySelector(".button-edit").style.display = "inline-block"; // Show Edit button
    card.querySelectorAll("input").forEach(input => {
    input.disabled = true; // Disable inputs after saving
    });
    // Update card data in localStorage
    saveProfileData();
}

function updateAddButton1() {
    const addCardBtn = document.getElementById("addCardBtn");
    if (cardCounter >= 3) {
        addCardBtn.disabled = true;
        addCardBtn.style.backgroundColor = "#ccc";
        addCardBtn.style.cursor = "not-allowed";
    } else {
        addCardBtn.disabled = false;
        addCardBtn.style.backgroundColor = "#007bff";
        addCardBtn.style.cursor = "pointer";
    }
}

function updateAddButton() {
    const addCardBtn = document.getElementById("addCardBtn");
    if (cardCounter >= 3) {
        addCardBtn.disabled = true;
        addCardBtn.style.backgroundColor = "#ccc";
        addCardBtn.style.cursor = "not-allowed";
    } else {
        addCardBtn.disabled = false;
        addCardBtn.style.backgroundColor = "#007bff";
        addCardBtn.style.cursor = "pointer";
    }
}

function clearProfileData() {
    localStorage.removeItem("profileData");
    localStorage.removeItem("cardCounter");
    document.getElementById("cardContainer").innerHTML = "";
    cardCounter = 0;
    updateAddButton();
}

updateAddButton(); // Initial check on load

function saveProfileData() {
    const cardContainer = document.getElementById("cardContainer");
    if (!cardContainer) return;

    const profiles = [];
    const cards = cardContainer.querySelectorAll(".card");
    cards.forEach(card => {
        const titleInput = card.querySelector(".card-title input");
        if (titleInput) {
            profiles.push(titleInput.value);
        }
    });

    // Save profiles to localStorage or server as needed
    localStorage.setItem("profiles", JSON.stringify(profiles));
    alert("Profiles saved successfully!");
}

function updateProfileDropdown() {
    const profileDropdown = document.getElementById("profile");
    const cardContainer = document.getElementById("cardContainer");

    if (!profileDropdown || !cardContainer) return; // Ensure elements exist

    const cards = cardContainer.querySelectorAll(".card-title input");

    // Clear existing options
    profileDropdown.innerHTML = '<option disabled selected value="">Select Profile</option>';

    cards.forEach(card => {
        if (!card) return; // Skip if card input doesn't exist
        const option = document.createElement("option");
        option.value = card.value;
        option.textContent = card.value;
        profileDropdown.appendChild(option);

        // Attach listener for input changes
        card.addEventListener("input", () => {
            updateProfileDropdown();
        });
    });
}


// Hook into the Add New Card functionality to update the dropdown
document.getElementById("addCardBtn").addEventListener("click", () => {
    setTimeout(updateProfileDropdown, 100); // Delay to ensure the card is added
});



