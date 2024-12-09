let notificationCount = 0;


function removeNotification(button) {
    const li = button.parentElement;
    li.remove();

    // Update notification count
    notificationCount--;
    const badge = document.getElementById("notification-badge");
    badge.textContent = notificationCount;

    if (notificationCount === 0) {
        badge.style.display = "none";
    }
}

function toggleNotificationWindow() {
    const notificationWindow = document.getElementById("notification-window");
    notificationWindow.classList.toggle("hidden");
}


function addNotification(message) {
    const badge = document.getElementById("notification-badge");
    const list = document.getElementById("notification-list");
    const notificationWindow = document.getElementById("notification-window");

    // Create new notification
    const li = document.createElement("li");
    li.innerHTML = `${message} <button onclick="removeNotification(this)">✖</button>`;
    list.appendChild(li);

    // Update badge count
    notificationCount++;
    badge.textContent = notificationCount;
    badge.style.display = "block";

    // Show the notification popup
    notificationWindow.classList.remove("hidden");

    // Hide the notification popup after 1 second
    setTimeout(() => {
        notificationWindow.classList.add("hidden");
    }, 1000);
}

function clearNotifications() {
    const list = document.getElementById("notification-list");
    list.innerHTML = ""; // Clear all notifications
    notificationCount = 0;

    const badge = document.getElementById("notification-badge");
    badge.style.display = "none";
}
