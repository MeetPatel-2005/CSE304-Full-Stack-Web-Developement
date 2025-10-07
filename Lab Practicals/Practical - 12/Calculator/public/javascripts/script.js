// public/javascripts/script.js
const form = document.getElementById('calcForm');
const resultDisplay = document.getElementById('result');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const num1 = document.getElementById('num1').value;
    const num2 = document.getElementById('num2').value;
    const operation = document.getElementById('operation').value;

    try {
        const res = await fetch(`/calc/${operation}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ num1, num2 })
        });

        const data = await res.json();

        if (data.error) {
            resultDisplay.innerText = data.error;
            resultDisplay.classList.add("error");
        } else {
            resultDisplay.innerText = "Result: " + data.result;
            resultDisplay.classList.remove("error");
        }
    } catch (err) {
        resultDisplay.innerText = "Something went wrong!";
        resultDisplay.classList.add("error");
    }
});