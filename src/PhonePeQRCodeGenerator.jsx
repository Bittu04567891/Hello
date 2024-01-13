import React, { useState, useEffect } from "react";
import QRCode from "qrcode.react";
import axios from "axios";

const PhonePeQRCodeGenerator = () => {
  const [phonePeLink, setPhonePeLink] = useState("");

  useEffect(() => {
    generatePhonePeLink();
  }, []);

  const generatePhonePeLink = () => {
    // Replace 'YOUR_PHONEPE_API_KEY' with your actual PhonePe API key
    const apiKey = "YOUR_PHONEPE_API_KEY";

    // You may need to replace 'YOUR_MERCHANT_ID' and 'YOUR_CALLBACK_URL' with your values
    const merchantId = "MERCHANTUAT";
    const callbackUrl = "YOUR_CALLBACK_URL";

    // You can customize the order details based on your requirements
    const orderDetails = {
      merchant_order_id: "ORDER123",
      merchant_name: "Your Merchant Name",
      order_amount: "100.00",
      currency: "INR",
      order_note: "Payment for Order",
      items: [
        {
          item_name: "Product 1",
          item_quantity: "1",
          item_unit: "KG",
          item_price: "100.00",
        },
      ],
    };

    axios
      .post("https://api.phonepe.com/v3/charge", orderDetails, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      })
      .then((response) => {
        const paymentLink = response.data.data.payment_link;
        setPhonePeLink(paymentLink);
      })
      .catch((error) => {
        console.error("Error generating PhonePe link:", error);
      });
  };

  return (
    <div>
      <div id="qr-container">
        {phonePeLink && <QRCode value={phonePeLink} />}
      </div>
    </div>
  );
};

export default PhonePeQRCodeGenerator;
