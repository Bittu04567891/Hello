// Install necessary dependencies:
// npm install react qrcode.react

import React, { useState, useEffect } from "react";
import QRCode from "qrcode.react";

const PaymentPage = () => {
  const [paymentUrl, setPaymentUrl] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");

  useEffect(() => {
    initiatePayment();
  }, []);

  const generatePaymentReference = () => {
    return Math.random().toString(36).substring(7);
  };

  const initiatePayment = () => {
    const paymentReference = generatePaymentReference();

    // Replace 'YOUR_PAYMENT_GATEWAY_API_KEY' and 'YOUR_PAYMENT_GATEWAY_ENDPOINT' with your actual values
    const apiKey = "YOUR_PAYMENT_GATEWAY_API_KEY";
    const paymentGatewayEndpoint = "YOUR_PAYMENT_GATEWAY_ENDPOINT";

    fetch(paymentGatewayEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        amount: 100, // Replace with the actual payment amount
        reference: paymentReference,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        const url = data.payment_url;

        // For simplicity, we'll simulate a successful payment after a delay (you should implement this part)
        setTimeout(() => handlePaymentSuccess(), 5000);

        setPaymentUrl(url);
      })
      .catch((error) => {
        console.error("Error initiating payment:", error);
        setPaymentStatus("Error initiating payment");
      });
  };

  const handlePaymentSuccess = () => {
    setPaymentStatus("Payment Successful!");
  };

  return (
    <div>
      <div id="qr-container">
        <QRCode value={paymentUrl} />
        <p id="payment-status">{paymentStatus}</p>
      </div>
    </div>
  );
};

export default PaymentPage;
