import React, { useState } from 'react';

const RequestInfoForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [isEmailSent, setIsEmailSent] = useState(false);

  const isEmailValid = (email) => {
    // Simple email format validation using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isPhoneNumberValid = (phoneNumber) => {
    // Simple phone number format validation using regex
    const phoneRegex = /^\d{3}-?\d{3}-?\d{4}$/;
    return phoneRegex.test(phoneNumber);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Validate email and phone number formats
    if (!isEmailValid(email)) {
        alert('Please enter a valid email address.');
        return;
    }
    
    if (!isPhoneNumberValid(phoneNumber)) {
        alert('Please enter a valid 10-digit phone number.');
        return;
    }

    // Check if all fields are submitted before sending the email
    if (firstName && lastName && phoneNumber && email) {
      // Send an email to "simarv07@gmail.com" with the user's information
      const emailData = {
        to: 'simarv07@gmail.com',
        subject: 'Request for more information',
        body: `First Name: ${firstName}\nLast Name: ${lastName}\nPhone Number: ${phoneNumber}\nEmail: ${email}`,
      };

      // You can use an API or a backend service to send the email.
      // For demonstration purposes, let's just log the email data here.
      console.log(emailData);
      setIsEmailSent(true);

      // Reset form fields after submitting
      setFirstName('');
      setLastName('');
      setPhoneNumber('');
      setEmail('');
    } else {
      // If any field is missing, show an error or alert to the user
      alert('Please fill out all fields before submitting.');
    }
  };

  return (
    <form className="request-info-box">
      <RequestInfoSection title="First Name" value={firstName} onChange={setFirstName} />
      <RequestInfoSection title="Last Name" value={lastName} onChange={setLastName} />
      <RequestInfoSection title="Phone Number" value={phoneNumber} onChange={setPhoneNumber} />
      <RequestInfoSection title="Email" value={email} onChange={setEmail} />
      <button className="request-info-button" onClick={handleFormSubmit}>
        Request More Info
      </button>
      {isEmailSent && <p className="email-sent-notif">Email has been sent!</p>}
    </form>
  );
};

const RequestInfoSection = ({ title, value, onChange }) => {
  return (
    <div className="request-info-section">
      <p>{title}</p>
      <input type="text" className="input-details" value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
};

export default RequestInfoForm;