function updateProfilesDropdown() {
    console.log("Updating Profiles Dropdown...");
    const profileDropdown = document.getElementById("profile");

    if (!profileDropdown) {
        console.error("Profiles dropdown not found.");
        return;
    }

    // Clear existing options except the default one
    profileDropdown.innerHTML = '<option disabled selected value="">Select Profile</option>';

    // Get profiles from the cards in the Profiles tab
    const profiles = Array.from(document.querySelectorAll(".card")).map(card => {
        const cardTitle = card.querySelector(".card-title input");
        console.log("Card Title Found:", cardTitle ? cardTitle.value : "No Title");
        return cardTitle ? cardTitle.value : null;
    }).filter(profile => profile);

    console.log("Profiles Detected:", profiles);

    // Populate the dropdown with profile names
    profiles.forEach(profile => {
        const option = document.createElement("option");
        option.value = profile;
        option.textContent = profile;
        profileDropdown.appendChild(option);
    });
}
