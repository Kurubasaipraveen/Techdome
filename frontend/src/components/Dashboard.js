import React, { useEffect, useState } from 'react';
import API from '../components/api';

const Dashboard = () => {
  const [loans, setLoans] = useState([]);

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const { data } = await API.get('/loans');
        setLoans(data);
      } catch (err) {
        alert('Error fetching loans');
      }
    };
    fetchLoans();
  }, []);

  return (
    <div>
      <h2>Your Loans</h2>
      {loans.map((loan) => (
        <div key={loan.id}>
          <p>Amount: ${loan.amount}</p>
          <p>Term: {loan.term} weeks</p>
          <p>Status: {loan.status}</p>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
