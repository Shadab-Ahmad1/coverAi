require("dotenv").config()
const express = require('express')
const cors = require('cors') 
const app = express()
app.use(express.json())
app.use(cors()); // Enable CORS for all routes

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const storeItems = new Map([
  [1,{priceInCents: 1000, name:"CoverLetter"}]
])

app.post('/create-checkout-session', async (req, res) => {
  try {
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
          quantity: 1, // Set the quantity of the item
        };
      }),
      success_url: `${process.env.SERVER_URL}/success`,
      cancel_url: `${process.env.SERVER_URL}/cancel`,
    });
    res.json({ url: session.url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred on the server.' });
  }
});


app.listen(5000, () => console.log('Running on port 5000'));