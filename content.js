function parseTimeString(str) {
    const parts = str.trim().split(':').map(Number);
    if (parts.length === 3) {
        return parts[0] * 3600 + parts[1] * 60 + parts[2]; // HH:MM:SS
    } else if (parts.length === 2) {
        return parts[0] * 3600 + parts[1] * 60; // HH:MM
    }
    return 0;
}

function calculatePercentage() {
    const totalEl = document.querySelector('.total-time-display mh-time-display span');
    const bottomEl = document.querySelector('.all-hours-calculation-text');

    if (!totalEl || !bottomEl) return;

    const totalStr = totalEl.textContent;
    const bottomStr = bottomEl.textContent;

    const totalSeconds = parseTimeString(totalStr);
    const bottomSeconds = parseTimeString(bottomStr);

    if (bottomSeconds === 0) return;

    const percentage = (totalSeconds / bottomSeconds) * 100;

    updateWidget(percentage.toFixed(1));
}

function createWidget() {
    const widget = document.createElement("div");
    widget.id = "percentage-widget";
    widget.textContent = "...";
    document.body.appendChild(widget);
}

function updateWidget(value) {
    const widget = document.getElementById("percentage-widget");
    if (widget) widget.textContent = value + "%";
}

// Create widget on page load
createWidget();

// Run immediately + re-run every 2 seconds to catch UI updates
setInterval(calculatePercentage, 2000);
