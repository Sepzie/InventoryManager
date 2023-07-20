import React, { useState } from 'react';
import './css/Calculator.css'

const FinancingCalculator = (price) => {
  const [vehicleCost, setVehicleCost] = useState(price.price);
  const [downPayment, setDownPayment] = useState('');
  const [interestRate, setInterestRate] = useState(5);
  const [loanTerm, setLoanTerm] = useState('');
  const [paymentFrequency, setPaymentFrequency] = useState('monthly');
  const [numberOfPayments, setNumberOfPayments] = useState('');
  const [paymentAmount, setPaymentAmount] = useState('');

  const calculateLoanDetails = (e) => {
    e.preventDefault();

    // Perform calculations here
    const principal = vehicleCost - downPayment;
    const monthlyInterestRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;

    let paymentAmount;
    if (monthlyInterestRate === 0) {
      paymentAmount = principal / numberOfPayments;
    } else {
      const temp = Math.pow(1 + monthlyInterestRate, numberOfPayments);
      paymentAmount = (principal * temp * monthlyInterestRate) / (temp - 1);
    }

    setNumberOfPayments(numberOfPayments);
    setPaymentAmount(paymentAmount.toFixed(2));
  };

  return (
    <div className="calculator">
      <h2>Financing Calculator</h2>
      <form onSubmit={calculateLoanDetails}>
        <label htmlFor="vehicle-cost">Cost of Vehicle:</label>
        <input
          type="number"
          id="vehicle-cost"
          value={vehicleCost}
          onChange={(e) => setVehicleCost(parseFloat(e.target.value))}
          placeholder={price.price}
          required
        />

        <label htmlFor="down-payment">Down Payment:</label>
        <input
          type="number"
          id="down-payment"
          value={downPayment}
          onChange={(e) => setDownPayment(parseFloat(e.target.value))}
          placeholder="Enter down payment"
          required
        />

        <label htmlFor="annual-interest-rate">Annual Interest Rate (%):</label>
        <input
          type="number"
          id="annual-interest-rate"
          value={interestRate}
          onChange={(e) => setInterestRate(parseFloat(e.target.value))}
          placeholder="Enter annual interest rate"
          required
        />

        <label htmlFor="loan-term">Term of Loan (in years):</label>
        <input
          type="number"
          id="loan-term"
          value={loanTerm}
          onChange={(e) => setLoanTerm(parseFloat(e.target.value))}
          placeholder="Enter term of loan"
          required
        />

        <label htmlFor="payment-frequency">Frequency of Payments:</label>
        <select
          id="payment-frequency"
          value={paymentFrequency}
          onChange={(e) => setPaymentFrequency(e.target.value)}
          required
        >
          <option value="monthly">Monthly</option>
          <option value="quarterly">Quarterly</option>
          <option value="semiannually">Semi-annually</option>
          <option value="annually">Annually</option>
        </select>

        <button type="submit">Calculate</button>
      </form>

      {numberOfPayments && paymentAmount && (
        <div id="result">
          <h3>Loan Details:</h3>
          <p>Number of Payments: {numberOfPayments}</p>
          <p>Payment Amount: ${paymentAmount}</p>
        </div>
      )}

    </div>
  );
}

export default FinancingCalculator;
