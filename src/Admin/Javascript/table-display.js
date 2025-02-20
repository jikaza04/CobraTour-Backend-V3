document.getElementById("location-button").addEventListener("click", function() {
    document.getElementById("Locations-Feedback").classList.remove("hidden");
    document.getElementById("Web-Feedback").classList.add("hidden");
});

document.getElementById("web-button").addEventListener("click", function() {
    document.getElementById("Web-Feedback").classList.remove("hidden");
    document.getElementById("Locations-Feedback").classList.add("hidden");
});
