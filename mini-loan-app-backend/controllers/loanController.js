const Loan = require('../models/Loan');
const Repayment = require('../models/Repayment');

exports.createLoan = async (req, res) => {
  const { amount, term } = req.body;
  try {
    const loan = await Loan.create({ amount, term, UserId: req.user.id });
    const weeklyAmount = (amount / term).toFixed(2);

    const repayments = Array.from({ length: term }).map((_, i) => ({
      dueDate: new Date(Date.now() + (i + 1) * 7 * 24 * 60 * 60 * 1000),
      amount: weeklyAmount,
      LoanId: loan.id,
    }));

    await Repayment.bulkCreate(repayments);
    res.status(201).json(loan);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.approveLoan = async (req, res) => {
  try {
    const loan = await Loan.findByPk(req.params.id);
    if (!loan) return res.status(404).json({ error: 'Loan not found' });

    loan.status = 'APPROVED';
    await loan.save();
    res.status(200).json(loan);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addRepayment = async (req, res) => {
  const { repaymentId, amount } = req.body;
  try {
    const repayment = await Repayment.findByPk(repaymentId);
    if (!repayment || repayment.status === 'PAID') return res.status(400).json({ error: 'Invalid repayment' });

    if (amount >= repayment.amount) {
      repayment.status = 'PAID';
      await repayment.save();

      const loan = await repayment.getLoan();
      const unpaidRepayments = await loan.getRepayments({ where: { status: 'PENDING' } });

      if (unpaidRepayments.length === 0) {
        loan.status = 'PAID';
        await loan.save();
      }
    }

    res.status(200).json(repayment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
