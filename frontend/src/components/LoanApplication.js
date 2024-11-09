import React, { useState } from 'react';
import API from '../components/api';

const LoanApplication = () => {
  const [formData, setFormData] = useState({ amount: '', term: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/loans', formData);
      alert('Loan request submitted!');
      window.location.href = '/dashboard';
    } catch (err) {
      alert(err.response.data.error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Apply for Loan</h2>
      <input type="number" placeholder="Amount" required onChange={(e) => setFormData({ ...formData, amount: e.target.value })} />
      <input type="number" placeholder="Term (weeks)" required onChange={(e) => setFormData({ ...formData, term: e.target.value })} />
      <button type="submit">Submit</button>
    </form>
  );
};

export default LoanApplication;
