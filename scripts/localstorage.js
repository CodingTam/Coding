// Save Testcase data to localStorage
function saveTestcaseData() {
    const rows = Array.from(document.querySelectorAll("#results-table tr"));
    const data = rows.map(row => {
        const cells = row.querySelectorAll("td");
        return Array.from(cells).slice(0, -1).map(cell => cell.textContent.trim()); // Exclude delete icon column
    });
    localStorage.setItem("testcaseData", JSON.stringify(data));
}

// Load Testcase data from localStorage
function loadTestcaseData() {
    const data = JSON.parse(localStorage.getItem("testcaseData") || "[]");
    const resultsTable = document.getElementById("results-table");
    resultsTable.innerHTML = ""; // Clear existing rows
    data.forEach(rowData => {
        const row = document.createElement("tr");
        row.innerHTML = rowData.map(cellData => `<td>${cellData}</td>`).join("") +
            `<td><span class="delete-icon" onclick="deleteRow(this)">&#128465;</span></td>`;
        resultsTable.appendChild(row);
    });
}

// Save Profile data to localStorage
function saveProfileData() {
    const profiles = Array.from(document.querySelectorAll(".card"));
    const data = profiles.map(profile => ({
        id: profile.id,
        name: profile.querySelector(".card-title input").value,
        fields: Array.from(profile.querySelectorAll("input:not([type='password'])"))
            .map(input => input.value),

        editable: false // Ensure the card is saved as non-editable
    }));
    localStorage.setItem("profileData", JSON.stringify(data));
}




// Load Profile data from localStorage
function loadProfileData() {
    const data = JSON.parse(localStorage.getItem("profileData") || "[]");
    const cardContainer = document.getElementById("cardContainer");
    cardContainer.innerHTML = ""; // Clear existing cards
    data.forEach(profile => {
        const newCard = document.createElement("div");
        newCard.classList.add("card");
        newCard.id = profile.id;
        newCard.innerHTML = `
    <button class="delete-card" onclick="deleteCard('${profile.id}')">🗑️</button>
    <div class="card-title">
        <input type="text" value="${profile.name}" disabled>
    </div>
    ${profile.fields.map(field => `
        <div class="form-group">
            <input type="text" value="${field}" disabled>
        </div>`).join("")}
    <div class="button-group">
        <button class="button-save" onclick="saveCard('${profile.id}')" style="display: none;">Save</button>
        <button class="button-edit" onclick="editCard('${profile.id}')">Edit</button>
    </div>
`;
        cardContainer.appendChild(newCard);
    });
    updateCardCounter(data);
}

// Update the cardCounter to ensure unique card IDs
function updateCardCounter(data) {
    const maxCardNumber = data.reduce((max, profile) => {
        const cardNumber = parseInt(profile.id.replace('card', ''), 10);
        return Math.max(max, cardNumber);
    }, 0);
    cardCounter = maxCardNumber;
}

// Delete a row from the Testcase table
function deleteRow(deleteIcon) {
    const row = deleteIcon.closest("tr");
    row.remove();
    saveTestcaseData();
}

// Delete a card from the Profiles
function deleteCard(cardId) {
    const card = document.getElementById(cardId);
    if (card) {
        card.remove();
        saveProfileData();
    }
}

// Clear all Testcase data
function clearTestcaseData() {
    localStorage.removeItem("testcaseData");
    document.getElementById("results-table").innerHTML = "";
}

// Clear all Profile data
function clearProfileDatas() {
    localStorage.removeItem("profileData");
    document.getElementById("cardContainer").innerHTML = "";
}


// Use MutationObserver for auto-saving data
function attachAutoSave() {
    const testcaseObserver = new MutationObserver(saveTestcaseData);
    const profileObserver = new MutationObserver(saveProfileData);

    const resultsTable = document.getElementById("results-table");
    const cardContainer = document.getElementById("cardContainer");

    if (resultsTable) {
        testcaseObserver.observe(resultsTable, { childList: true, subtree: true });
    }

    if (cardContainer) {
        profileObserver.observe(cardContainer, { childList: true, subtree: true });
    }
}

// Load data on page load
document.addEventListener("DOMContentLoaded", () => {
    loadTestcaseData();
    loadProfileData();
    attachAutoSave();
});

function clearTestcaseData() {
    localStorage.removeItem("testcaseData");
    document.getElementById("results-table").innerHTML = "";
}

// Clear all data for Profiles
function clearProfileData() {
    localStorage.removeItem("profileData");
    localStorage.removeItem("cardCounter");
    document.getElementById("cardContainer").innerHTML = "";
    cardCounter = 0;
    updateAddButton();
}

// Auto-save data whenever the content changes
function attachAutoSave() {
    const saveTriggers = ["results-table", "cardContainer"];
    saveTriggers.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.addEventListener("DOMSubtreeModified", saveData);
        }
    });
}

// Attach delete row function
function deleteRow(deleteIcon) {
    const row = deleteIcon.closest("tr");
    row.remove();
    saveData();
}