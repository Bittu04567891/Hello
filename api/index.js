const express = require("express");
const Razorpay = require("razorpay");
const bodyParser = require("body-parser");

const app = express();
const port = 5000;

const razorpay = new Razorpay({
  key_id: "NNyUzu4fJxNCjx",
  key_secret: "YOUR_RAZORPAY_KEY_SECRET",
});

app.use(bodyParser.json());

app.post("/api/createOrder", async (req, res) => {
  try {
    const amount = req.body.amount;
    const currency = "INR"; // or your desired currency

    const options = {
      amount: amount * 100, // Razorpay expects the amount in paisa
      currency: currency,
    };

    const order = await razorpay.orders.create(options);

    res.json({ orderId: order.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
