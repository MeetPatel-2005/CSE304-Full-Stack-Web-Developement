
document.addEventListener("DOMContentLoaded", () => {
    const addBtn = document.querySelector(".add-button");
    const subBtn = document.querySelector(".subtract-button");
    const resetBtn = document.querySelector(".reset-button button");
    const display = document.getElementById("count-display");

    let count = 0;

    // Fetch the initial count from the backend
    fetch("/counter")
        .then(res => res.json())
        .then(data => {
            count = data.count;
            display.innerText = count;
        })
        .catch(err => {
            console.error("Failed to fetch initial count:", err);
        });

    // Update UI and backend
    function updateCount(newCount) {
        count = newCount;
        display.innerText = count;

        fetch("/counter", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ count })
        }).catch(err => {
            console.error("Failed to update count:", err);
        });
    }

    addBtn.addEventListener("click", () => {
        updateCount(count + 1);
    });

    subBtn.addEventListener("click", () => {
        if (count > 0) {
            updateCount(count - 1);
        }
    });

    resetBtn.addEventListener("click", () => {
        updateCount(0);
    });
});
