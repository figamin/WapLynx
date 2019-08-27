function displayFunction() {
    var x = document.getElementById("postingForm");
    var y = document.getElementById("newThreadText");
    x.style.display = "block";
    y.style.display = "none";
}

function hideDisplayFunction() {
    var x = document.getElementById("postingForm");
    var y = document.getElementById("newThreadText");
    x.style.display = "none";
    y.style.display = "inline";
}

function displayFunctionTwo() {
    var x = document.getElementById("postingForm");
    var y = document.getElementById("newThreadText");
    x.style.display = "none";
    y.style.display = "block";
}

function toggleBoxes() {
    var x = document.getElementById("hiddenboxes");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

function returnToPage() {
    window.history.back();
}