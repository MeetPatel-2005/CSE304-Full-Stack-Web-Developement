
exports.calculate = (req, res) => {
    const { num1, num2, operation } = req.body;

    // Validate input
    if (isNaN(num1) || isNaN(num2)) {
        return res.render("index", { result: null, error: "Please enter valid numbers!" });
    }

    const n1 = parseFloat(num1);
    const n2 = parseFloat(num2);

    let result;

    switch(operation) {
        case 'add':
            result = n1 + n2;
            break;
        case 'subtract':
            result = n1 - n2;
            break;
        case 'multiply':
            result = n1 * n2;
            break;
        case 'divide':
            if (n2 === 0) return res.render("index", { result: null, error: "Cannot divide by zero!" });
            result = n1 / n2;
            break;
        default:
            return res.render("index", { result: null, error: "Invalid operation!" });
    }

    res.render("index", { result, error: null });
};