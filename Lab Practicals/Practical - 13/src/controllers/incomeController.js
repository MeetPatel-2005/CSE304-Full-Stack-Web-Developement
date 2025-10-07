exports.getForm = (req, res) => {
  res.render("index", { result: null, error: null });
};

exports.calculateIncome = (req, res) => {
  const { income1, income2 } = req.body;

  // Validation
  if (!income1 || !income2 || isNaN(income1) || isNaN(income2)) {
    return res.render("index", {
      error: "⚠️ Please enter valid numbers for both incomes.",
      result: null,
    });
  }

  const total = parseFloat(income1) + parseFloat(income2);

  res.render("index", {
    error: null,
    result: `Your total income is: ₹${total.toFixed(2)}`,
  });
};