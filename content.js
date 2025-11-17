function parseTimeString(str) {
    const parts = str.trim().split(':').map(Number);
    if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
    if (parts.length === 2) return parts[0] * 3600 + parts[1] * 60;
    return 0;
}

function ensurePercentageElement() {
    const totalContainer = document.querySelector(".total-time-display");
    if (!totalContainer) return null;

    let el = document.getElementById("percentage-inline");
    if (!el) {
        el = document.createElement("span");
        el.id = "percentage-inline";
        el.style.marginLeft = "6px";
        totalContainer.appendChild(el);
    }
    return el;
}

function removePercentageElement() {
    const el = document.getElementById("percentage-inline");
    if (el) el.remove();
}

function calculatePercentage() {
    const totalEl = document.querySelector('.total-time-display mh-time-display span');
    const bottomEl = document.querySelector('.all-hours-calculation-text');

    if (!totalEl || !bottomEl) return;

    const totalStr = totalEl.textContent.trim();
    const bottomStr = bottomEl.textContent.trim();

    const totalSeconds = parseTimeString(totalStr);
    const bottomSeconds = parseTimeString(bottomStr);

    // If bottom = 0 → REMOVE ELEMENT COMPLETELY (fix padding)
    if (bottomSeconds === 0) {
        removePercentageElement();
        return;
    }

    let el = ensurePercentageElement();
    if (!el) return;

    // show spinner while calculating
    el.innerHTML = `<span class="spinner"></span>`;

    const percent = (totalSeconds / bottomSeconds) * 100;
    const formatted = percent.toFixed(1);

    let colorClass = (percent >= 90 && percent <= 100) ? "percent-green" : "percent-red";

    // Write the percentage
    el.innerHTML = `<span class="${colorClass}">${formatted}%</span>`;
}

// Update every .5 seconds
setInterval(calculatePercentage, 500);
