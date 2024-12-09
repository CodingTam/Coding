// Function to toggle sidebar
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const content = document.querySelector('.main-content');
    sidebar.classList.toggle('collapsed');
    content.classList.toggle('full');
}

// Function to activate a tab
function activateTab(element, section) {
    // Deactivate all tabs
    document.querySelectorAll('.sidebar a').forEach(tab => {
        tab.classList.remove('active');
    });

    // Hide all sections
    document.querySelectorAll('.container').forEach(page => {
        page.classList.add('hidden');
    });

    // Activate clicked tab
    element.classList.add('active');

    // Show the selected section
    const selectedPage = document.getElementById(section);
    if (selectedPage) {
        selectedPage.classList.remove('hidden');
    }
}

// Function to toggle group menus
function toggleGroup_old(groupId) {
    const groupContent = document.getElementById(groupId);
    groupContent.style.display = groupContent.style.display === "block" ? "none" : "block";
}

// Enhance toggleSidebar to collapse groups in collapsed mode
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const content = document.querySelector('.main-content');
    sidebar.classList.toggle('collapsed');
    content.classList.toggle('full');

    if (sidebar.classList.contains('collapsed')) {
        // Collapse all groups
        document.querySelectorAll('.menu').forEach(menu => menu.style.display = 'none');
    }
}

// Ensure menus are collapsed on page load
document.addEventListener("DOMContentLoaded", () => {

    const profiles = JSON.parse(localStorage.getItem("profiles") || "[]");

    profiles.forEach((profile, index) => {
        const card = document.getElementById(`card-${index}`);
        if (card) {
            const inputs = card.querySelectorAll("input");
            inputs.forEach(input => {
                input.value = profile[input.name] || ""; // Populate input values
            });
        }
    });

    
    // Collapse all group menus
    document.querySelectorAll('.menu').forEach(menu => {
        menu.style.display = "none";
    });

    // Optional: If you want to start with the sidebar collapsed
    const sidebar = document.getElementById('sidebar');
    const content = document.querySelector('.main-content');

    if (sidebar.classList.contains('collapsed')) {
        // Already collapsed, ensure menus are hidden
        document.querySelectorAll('.menu').forEach(menu => {
            menu.style.display = "none";
        });
    }
	// Activate "OneTest" tab and show the main content
    const tooltipTrigger = document.querySelector(".tooltip-trigger");
    const tooltipBox = document.querySelector(".tooltip-box");

    if (tooltipTrigger && tooltipBox) {
        tooltipTrigger.addEventListener("mousemove", (event) => {
            tooltipBox.style.display = "block"; // Show tooltip

            const tooltipWidth = tooltipBox.offsetWidth;
            const tooltipHeight = tooltipBox.offsetHeight;
            const screenWidth = window.innerWidth;
            const screenHeight = window.innerHeight;

            const left = event.pageX + 15; // Position tooltip to the right
            const top = event.pageY + 15; // Position tooltip below

            // Prevent overflow
            if (left + tooltipWidth > screenWidth) {
                left = screenWidth - tooltipWidth - 10;
            }
            if (top + tooltipHeight > screenHeight) {
                top = screenHeight - tooltipHeight - 10;
            }

            tooltipBox.style.left = `${left}px`;
            tooltipBox.style.top = `${top}px`;
        });

        tooltipTrigger.addEventListener("mouseout", () => {
            tooltipBox.style.display = "none"; // Hide tooltip on mouse out
        });
    } else {
        console.warn("Tooltip elements not found in the DOM.");
    }
    console.log("jQuery version:", $.fn.jquery);


});



// Function to toggle group menus
function toggleGroup(groupId) {
    const allGroupHeaders = document.querySelectorAll('.sidebar h2.group-header');
    const allMenus = document.querySelectorAll('.menu');
    const currentGroup = document.getElementById(groupId);
    const currentHeader = document.querySelector(`[data-group="${groupId}"]`);

    // Close all other groups
    allMenus.forEach(menu => {
        if (menu !== currentGroup) {
            menu.style.display = "none";
        }
    });

    // Remove active class from all headers
    allGroupHeaders.forEach(header => {
        if (header !== currentHeader) {
            header.classList.remove('active');
        }
    });

    // Toggle the current group and highlight the header
    if (currentGroup.style.display === "block") {
        currentGroup.style.display = "none";
        currentHeader.classList.remove('active');
    } else {
        currentGroup.style.display = "block";
        currentHeader.classList.add('active');
    }
}

document.addEventListener('click', (event) => {
    const notificationWindow = document.getElementById('notification-window');
    const notificationIcon = document.querySelector('.notification-icon');

    // Check if the click is outside the notification popup and the bell icon
    if (!notificationWindow.contains(event.target) && !notificationIcon.contains(event.target)) {
        notificationWindow.classList.add('hidden'); // Hide the notification popup
    }
});

function toggleNotificationWindow() {
    const notificationWindow = document.getElementById("notification-window");
    notificationWindow.classList.toggle("hidden");
}

function toggleAllCheckboxes(checkbox) {
    const checkboxes = document.querySelectorAll('.validation-checkbox');
    checkboxes.forEach((cb) => {
        cb.checked = checkbox.checked;
    });
}

function clearTestcaseData() {
    const tableBody = document.getElementById('results-table');
    tableBody.innerHTML = ''; // Clear all rows
    alert('All test case data has been cleared.');
}
