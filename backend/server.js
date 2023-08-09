require("dotenv").config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());
app.use(cors());

// Connect MongoDB database
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(res => {
  console.log('Connection successful');
}).catch(error => {
  console.error('Error connecting to MongoDB:', error);
});

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const storeItems = new Map([
  [1, { priceInCents: 1000, name: "CoverLetter" }]
]);

// Define a mongoose schema for payments
const paymentSchema = new mongoose.Schema({
  email: String,
  name: String,
  amount: Number,
  coverLetter: String,
  timestamp: Date,
});

const Payment = mongoose.model('Payment', paymentSchema);

app.post('/create-checkout-session', async (req, res) => {
  try {
    const newPayment = new Payment({
      email: req.body.email,
      name: req.body.name,
      coverLetter: req.body.coverLetterResponse,
      amount: storeItems.get(req.body.items[0].id).priceInCents,
      timestamp: new Date(),
    });

    const savedPayment = await newPayment.save(); // Save the payment and get the returned object

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: req.body.items.map(item => {
        const storeItem = storeItems.get(item.id);
        return {
          price_data: {
            currency: 'usd',
            product_data: {
              name: storeItem.name,
            },
            unit_amount_decimal: storeItem.priceInCents,
          },
          quantity: 1,
        };
      }),
      success_url: `${process.env.SERVER_URL}/thank-you?paymentId=${savedPayment._id.toString()}`,
      cancel_url: `${process.env.SERVER_URL}/cancel`,
    });

    res.json({ url: session.url, paymentId: savedPayment._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred on the server.' });
  }
});


app.get('/getCoverletter/:paymentId', async (req, res) => {
  try {
    const paymentId = req.params.paymentId;

    if (!mongoose.Types.ObjectId.isValid(paymentId)) {
      return res.status(400).json({ error: 'Invalid paymentId format' });
    }

    const payment = await Payment.findById(paymentId);
    if (!payment) {
      return res.status(404).json({ error: 'Payment not found.' });
    }

    res.json(payment);
  } catch (error) {
    console.error('Error fetching payment:', error);
    res.status(500).json({ error: 'An error occurred on the server.' });
  }
});


app.listen(5000, () => console.log('Running on port 5000'));
