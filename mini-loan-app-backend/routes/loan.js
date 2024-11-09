const express = require('express');
const { createLoan, approveLoan, addRepayment } = require('../controllers/loanController');
const authenticate = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/', authenticate, createLoan);
router.patch('/:id/approve', authenticate, approveLoan);
router.post('/repayment', authenticate, addRepayment);

module.exports = router;
