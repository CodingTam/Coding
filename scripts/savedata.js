
// Save data in localStorage
// Clear all data for Testcase
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
    // Define the MutationObserver callback
    const observerCallback = (mutationsList, observer) => {
        for (const mutation of mutationsList) {
            if (mutation.type === "childList" || mutation.type === "subtree") {
                saveData(); // Call saveData when there are changes
            }
        }
    };

    // Create an observer instance
    const observer = new MutationObserver(observerCallback);

    // Target elements to observe
    const saveTriggers = ["results-table", "cardContainer"];
    saveTriggers.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            observer.observe(element, { childList: true, subtree: true });
        }
    });
}


// Define the saveData function
function saveData() {
    // Save Testcase Data
    const resultsTable = document.getElementById("results-table");
    if (resultsTable) {
        const rows = Array.from(resultsTable.querySelectorAll("tr"));
        const testcaseData = rows.map(row => {
            const cells = Array.from(row.querySelectorAll("td")).map(cell => cell.textContent.trim());
            return cells;
        });
        localStorage.setItem("testcaseData", JSON.stringify(testcaseData));
    }

    // Save Profile Data
    const cardContainer = document.getElementById("cardContainer");
    if (cardContainer) {
        const profiles = Array.from(cardContainer.querySelectorAll(".card"));
        const profileData = profiles.map(card => ({
            id: card.id,
            name: card.querySelector(".card-title input").value,
            fields: Array.from(card.querySelectorAll("input:not([type='password'])")).map(input => input.value)
        }));
        localStorage.setItem("profileData", JSON.stringify(profileData));
    }
}


// Attach delete row function
function deleteRow(deleteIcon) {
    const row = deleteIcon.closest("tr");
    row.remove();
    saveData();
}


