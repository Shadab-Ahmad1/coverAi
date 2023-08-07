require("dotenv").config()
const express = require('express')
const cors = require('cors') 
const mongoose = require ('mongoose')
const app = express()
app.use(express.json())
app.use(cors());

// Connect to your MongoDB database
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(res =>{
  console.log('connection successfull');
});

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const storeItems = new Map([
  [1,{priceInCents: 1000, name:"CoverLetter"}]
])

// Define a mongoose schema for payments
const paymentSchema = new mongoose.Schema({
  email: String,
  name: String,
  amount: Number,
  timestamp: Date,
});

const Payment = mongoose.model('Payment', paymentSchema);


app.post('/create-checkout-session', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      // customer_email: req.body.email, 
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
      success_url: `${process.env.SERVER_URL}/thank-you`,
      cancel_url: `${process.env.SERVER_URL}/cancel`,
    });
    
        // Create a new payment document in MongoDB
        const newPayment = new Payment({
          email: req.body.email,
          name:req.body.name,
          amount: storeItems.get(req.body.items[0].id).priceInCents,
          timestamp: new Date(),
        });

        await newPayment.save();
    
    res.json({ url: session.url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred on the server.' });
  }
});


app.listen(5000, () => console.log('Running on port 5000'));