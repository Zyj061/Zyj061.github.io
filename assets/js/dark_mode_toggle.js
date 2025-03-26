function attachDarkModeToggle() {
    var toggleButton = document.getElementById("dark-mode-toggle");

    if (!toggleButton) {
        console.warn("Dark mode toggle button not found.");
        return;
    }

    // Prevent duplicate listeners
    if (!toggleButton.hasAttribute("data-listener")) {
        toggleButton.setAttribute("data-listener", "true");

        toggleButton.addEventListener("click", function () {
            document.body.classList.toggle("dark-mode");

            // Store user preference in localStorage
            localStorage.setItem("dark-mode", document.body.classList.contains("dark-mode") ? "enabled" : "disabled");

            updateToggleButtonText();
            updateProfilePicture(); // Updates the profile picture on toggle
            console.log("Dark mode toggled!");
        });
    }

    // ✅ Force light mode on first load if no preference is stored
    if (!localStorage.getItem("dark-mode")) {
        localStorage.setItem("dark-mode", "disabled"); // Ensure first-time users start in light mode
    }

    // Apply stored dark mode setting
    if (localStorage.getItem("dark-mode") === "enabled") {
        document.body.classList.add("dark-mode");
    } else {
        document.body.classList.remove("dark-mode");
    }

    updateToggleButtonText();
    //updateProfilePicture(); // ✅ Ensure correct image is set immediately
}

function updateToggleButtonText() {
    var toggleButton = document.getElementById("dark-mode-toggle");
    if (!toggleButton) return;
    if (document.body.classList.contains("dark-mode")) {
        toggleButton.innerHTML = '<i class="fas fa-sun"></i> Light Mode';
    } else {
        toggleButton.innerHTML = '<i class="fas fa-moon"></i> Night Mode';
    }
}

function updateProfilePicture() {
    var profileImg = document.getElementById("profile-img");
    if (!profileImg) return;

    // Read from profile.yml
    var lightModeImg = "{{ site.data.profile.portrait_url_light | relative_url }}";
    var darkModeImg = "{{ site.data.profile.portrait_url_dark | relative_url }}";


    // Check localStorage or system preference
    if (document.body.classList.contains("dark-mode") || localStorage.getItem("dark-mode") === "enabled") {
        profileImg.src = darkModeImg;
    } else {
        profileImg.src = lightModeImg;

    }
}



// Ensure the correct profile picture is set on page load
//document.addEventListener("DOMContentLoaded", function () {
//    attachDarkModeToggle();
//    updateProfilePicture(); // Fix initial image loading issue
// });


//document.addEventListener("DOMContentLoaded", function () {
//    attachDarkModeToggle();
//});
