var js = 0;
var py = 0;
var jv = 0;

const voteButtons = {
    JavaScript: document.querySelector("#JavaScript-vote"),
    Python: document.querySelector("#Python-vote"),
    Java: document.querySelector("#Java-vote")
};

const voteCounts = {
    JavaScript: document.querySelector("#JavaScript-count"),
    Python: document.querySelector("#Python-count"),
    Java: document.querySelector("#Java-count")
};

voteButtons.JavaScript.addEventListener("click", () => js++);
voteButtons.Python.addEventListener("click", () => py++);
voteButtons.Java.addEventListener("click", () => jv++);

setInterval(() => {
    voteCounts.JavaScript.innerText = js;
    voteCounts.Python.innerText = py;
    voteCounts.Java.innerText = jv;
}, 2000);
