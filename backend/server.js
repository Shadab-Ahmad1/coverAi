// require("dotenv").config();
// const express = require('express');
// const cors = require('cors');
// const mongoose = require('mongoose');
// const nodemailer = require('nodemailer');
// const app = express();
// app.use(express.json());
// app.use(cors());

// // Connect MongoDB database
// mongoose.connect(process.env.MONGODB_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// }).then(res => {
//   console.log('Connection successful');
// }).catch(error => {
//   console.error('Error connecting to MongoDB:', error);
// });

// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// const storeItems = new Map([
//   [1, { priceInCents: 1000, name: "CoverLetter" }]
// ]);

// // Define a mongoose schema for payments
// const paymentSchema = new mongoose.Schema({
//   email: String,
//   name: String,
//   amount: Number,
//   coverLetter: String,
//   timestamp: Date,
// });

// const Payment = mongoose.model('Payment', paymentSchema);

// app.post('/create-checkout-session', async (req, res) => {
//   try {
//     const newPayment = new Payment({
//       email: req.body.email,
//       name: req.body.name,
//       coverLetter: req.body.coverLetterResponse,
//       amount: storeItems.get(req.body.items[0].id).priceInCents,
//       timestamp: new Date(),
//     });

//     const savedPayment = await newPayment.save();

//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ['card'],
//       mode: 'payment',
//       line_items: req.body.items.map(item => {
//         const storeItem = storeItems.get(item.id);
//         return {
//           price_data: {
//             currency: 'usd',
//             product_data: {
//               name: storeItem.name,
//             },
//             unit_amount_decimal: storeItem.priceInCents,
//           },
//           quantity: 1,
//         };
//       }),
//       success_url: `${process.env.SERVER_URL}/thank-you?paymentId=${savedPayment._id.toString()}`,
//       cancel_url: `${process.env.SERVER_URL}/cancel`,
//     });


//  const transporter = nodemailer.createTransport({
//    host: "smtp.ethereal.email",
//    port: 587,
//    auth: {
//      user: "antwon.connelly74@ethereal.email",
//      pass: "Ra9DDrw9mp6xs8G69R",
//    },
//  });

//  const mailOptions = {
//   from: '"Cover ai" <info@coverAi.com>',
//   to: req.body.email,
//   subject: 'Thank you for your payment!',
//   text: `Dear, ${req.body.name}

//   Thank you for choosing CoverAI and taking the first step towards a brighter, more successful future. We’re thrilled to have you join our family of professionals who believe in maximizing their potential and making the best first impression.
  
//   We believe that every individual is unique, and so should be their cover letter. With CoverAI, we ensure your applications stand out from the crowd with a personalized touch, a professional tone, and a compelling story.
  
//   Now, let’s get started on making your job application process smoother and more rewarding. Ready to take the next step?
  
//   Please complete your registration by setting up a password for your account. This will help keep your account secure and give you full access to our advanced features.
  
//   After creating your password, you can unlock access to your account and view your very first CoverAI generated cover letter, tailored exclusively for you with our state-of-the-art OpenAI technology.
  
//   Just click the button below:
//   <button>Set Up My Password</button>
//   If you have any questions, our customer service team is available to provide you with all the support you need. Remember, the job market is competitive but with the right tools and preparation, you can stand out. CoverAI is your partner in this journey, and we can’t wait to celebrate your victories together.
  
//   Welcome aboard!
  
//   Best regards,
  
//   CoverAI Team`,
// };

// const info = await transporter.sendMail(mailOptions);
//   console.log('Email sent:', info.messageId);
//   console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

//     res.json({ url: session.url, paymentId: savedPayment._id });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'An error occurred on the server.' });
//   }
// });


// app.get('/getCoverletter/:paymentId', async (req, res) => {
//   try {
//     const paymentId = req.params.paymentId;

//     if (!mongoose.Types.ObjectId.isValid(paymentId)) {
//       return res.status(400).json({ error: 'Invalid paymentId format' });
//     }

//     const payment = await Payment.findById(paymentId);
//     if (!payment) {
//       return res.status(404).json({ error: 'Payment not found.' });
//     }

//     res.json(payment);
//   } catch (error) {
//     console.error('Error fetching payment:', error);
//     res.status(500).json({ error: 'An error occurred on the server.' });
//   }
// });


// app.listen(5000, () => console.log('Running on port 5000'));


// without email sending

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