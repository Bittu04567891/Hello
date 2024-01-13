// Install necessary dependencies
// npm install react qrcode.react axios

import React, { useState } from "react";
import QRCode from "qrcode.react";
import axios from "axios";

const RazorpayQRCodeGenerator = () => {
  const [orderId, setOrderId] = useState("");

  const createOrder = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/createOrder",
        {
          amount: 100, // Replace with your desired amount
        }
      );

      setOrderId(response.data.orderId);
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  return (
    <div>
      <button onClick={createOrder}>Create Order</button>
      {orderId && (
        <div id="qr-container">
          <QRCode value={orderId} />
        </div>
      )}
    </div>
  );
};

export default RazorpayQRCodeGenerator;
