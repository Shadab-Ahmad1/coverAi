require("dotenv").config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
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

// Define a mongoose schema for payments
const paymentSchema = new mongoose.Schema({
  email: String,
  subscriptionId:String,
  jobtitle:String,
  companyname:String,
  name: String,
  amount: Number,
  coverLetter: String,
  timestamp: Date,
});
// Define a mongoose schema for users
const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});
const EventSchema = new mongoose.Schema(
  {
    email: String,
    event: String,
    eventData: Object, // Adjust the type as needed for your event data structure
    timestamp: Date,
  }
);
const Event =mongoose.model('subscription_event' ,EventSchema);
const User = mongoose.model('User', userSchema);
const Payment = mongoose.model('Payment', paymentSchema);
    app.post('/create-checkout-session', async (req, res) => {
      try {
        const email = req.body.email;
        const newPayment = new Payment({
          email: req.body.email,
          name: req.body.name,
          coverLetter: req.body.coverLetterResponse,
          timestamp: new Date(),
        });
    
        const savedPayment = await newPayment.save();
    
        const session = await stripe.checkout.sessions.create({
          payment_method_types: ['card'],
           mode: 'subscription',
            subscription_data: {
                trial_period_days: 1
            },
          customer_email: email,
          line_items: [
            {
              price: 'price_1NqG3DDY7WDwWj6eeEfQCXhH',
              quantity: 1,
            },
          ],
          success_url: `${process.env.SERVER_URL}/thank-you?paymentId=${savedPayment._id.toString()}`,
          cancel_url: `${process.env.SERVER_URL}/cancel`,
        });
 const transporter = nodemailer.createTransport({
   host: "smtp.ethereal.email",
   port: 587,
   auth: {
     user: "morgan31@ethereal.email",
     pass: "aggUGt5g8hq9uCZUwr",
   },
 });

 const mailOptions = {
  from: '"Cover ai" <info@coverAi.com>',
  to: req.body.email,
  subject: 'Thank you for your payment!',
  text: `Dear, ${req.body.name}

  Thank you for choosing CoverAI and taking the first step towards a brighter, more successful future. We’re thrilled to have you join our family of professionals who believe in maximizing their potential and making the best first impression.
  
  We believe that every individual is unique, and so should be their cover letter. With CoverAI, we ensure your applications stand out from the crowd with a personalized touch, a professional tone, and a compelling story.
  
  Now, let’s get started on making your job application process smoother and more rewarding. Ready to take the next step?
  
  Please complete your registration by setting up a password for your account. This will help keep your account secure and give you full access to our advanced features.
  
  After creating your password, you can unlock access to your account and view your very first CoverAI generated cover letter, tailored exclusively for you with our state-of-the-art OpenAI technology.
  
  Just click the button below:
  <button>Set Up My Password</button>
  If you have any questions, our customer service team is available to provide you with all the support you need. Remember, the job market is competitive but with the right tools and preparation, you can stand out. CoverAI is your partner in this journey, and we can’t wait to celebrate your victories together.
  
  Welcome aboard!
  
  Best regards,
  
  CoverAI Team`,
};

const info = await transporter.sendMail(mailOptions);
  console.log('Email sent:', info.messageId);
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    res.json({ url: session.url, paymentId: savedPayment._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred on the server.' });
  }
});


app.post('/create-checkout-session-auth', async (req, res) => {
  try {
    const userEmail = req.body.userEmail;
    const jobtitle = req.body.jobtitle;
    const companyname = req.body.companyname;
    const payment = await Payment.findOne({ email: userEmail });

    if (!payment) {
      // Create a new payment record if one doesn't exist
      const newPayment = new Payment({
        email: req.body.userEmail,
        name: req.body.name,
        jobtitle: req.body.jobtitle,
        companyname: req.body.companyname,
        coverLetter: req.body.coverLetterResponse,
        timestamp: new Date(),
      });

      const savedPayment = await newPayment.save();

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'subscription',
        subscription_data: {
          trial_period_days: 1
        },
        customer_email: userEmail,
        line_items: [
          {
            price: 'price_1NqG3DDY7WDwWj6eeEfQCXhH',
            quantity: 1,
          },
        ],
        success_url: `${process.env.SERVER_URL}/client/dashboard?paymentId=${savedPayment._id.toString()}`,
        cancel_url: `${process.env.SERVER_URL}/cancel`,
      });

      const subscriptionId = session.subscription;
      savedPayment.subscriptionId = subscriptionId;
      await savedPayment.save();

      return res.json({ url: session.url, paymentId: savedPayment._id });
    } else {
      // Only create a new payment record without a session
      const newPayment = new Payment({
        email: req.body.userEmail,
        name: req.body.name,
        jobtitle: req.body.jobtitle,
        companyname: req.body.companyname,
        coverLetter: req.body.coverLetterResponse,
        timestamp: new Date(),
      });

      const savedPayment = await newPayment.save();

      return res.json({ url: '', paymentId: savedPayment._id });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred on the server.' });
  }
});


//check payment status
app.get('/check-payment-status', async (req, res) => {
  try {
    const userEmail = req.query.email;
    const payment = await Payment.findOne({ email: userEmail });

    if (payment && payment.paymentId) {
      return res.status(200).json({ message: 'Payment Done.' });
    } else {
      return res.status(404).json({ message: 'Do Payment first.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred on the server.' });
  }
});


//cancel subscription
app.post("/cancel-sub-test", async function (req, res) {
  try {
    const { email } = req.body;
    const customersData = await stripe.customers.list({ email });

    if (customersData.data.length === 0) {
      return res.status(404).json({ error: "Customer not found" });
    }
    const customer = customersData.data[0]; 
    const customerGet = await stripe.customers.retrieve(customer.id, {
      expand: ["subscriptions"],
    });
    if (customerGet.subscriptions.data.length === 0) {
      return res.status(404).json({ error: "No subscriptions found for this customer" });
    }
    const subscription = customerGet.subscriptions.data[0];
    const resp = await stripe.subscriptions.del(subscription.id);
    res.send({
      status: resp.status,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

// Dashboard user coverletter
app.get('/getCoverLetters', async (req, res) => {
  const userEmail = req.query.userEmail;

  try {
    const coverLetters = await Payment.find({ email: userEmail }).select('coverLetter timestamp jobtitle companyname');
    res.json(coverLetters);
  } catch (error) {
    console.error('Error fetching cover letters:', error);
    res.status(500).json({ error: 'An error occurred on the server.' });
  }
});

app.get('/api/fetch-cover-letter', async (req, res) => {
  try {
    const userEmail = req.query.userEmail;
    const paymentId = req.query.paymentId;

   
    const payment = await Payment.findOne({ email: userEmail, _id: paymentId });

    if (payment) {
      const coverLetter = payment.coverLetter;
      res.json({ coverLetter });
    } else {
      res.status(404).json({ error: 'Cover letter not found.' });
    }
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

app.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = new User({
      email,
      password: hashedPassword 
    });

     await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred on the server.' });
  }
});

// API route for user logged in
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid email credentials" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid password credentials" });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET);
    res.status(200).json({ token });
    
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "An error occurred while logging in" });
  }
});

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
    if (err) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    req.userId = decodedToken.userId;
    req.userEmail = decodedToken.email;
    next();
  });
};

// API route for user logged in to dashboard with JWT Token
app.get('/dashboard', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ email: user.email });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'An error occurred on the server.' });
  }
});

app.post('/forgot', async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    console.log("Email :",email);
    console.log('Token :' , token)

    // Log the reset link to the console
    const resetLink = `${process.env.RESET_LINK_BASE_URL}/reset-password/${token}`;
    console.log("Password reset link:", resetLink);

    res.status(200).json({ message: 'Password reset link generated successfully' });

  } catch (error) {
    console.error('Error generating reset link:', error);
    res.status(500).json({ error: 'An error occurred on the server.' });
  }
});
app.post('/reset-password', async (req, res) => {
  const { token, newPassword } = req.body;

  if (!token || !newPassword) {
    return res.status(400).json({ error: 'Token and newPassword are required.' });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({ email: decodedToken.email });

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    // Update the user's password
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: 'Your Password reset successfully.' });
  } catch (error) {
    console.error('Error resetting password:', error);
    res.status(500).json({ error: 'An error occurred while resetting the password.' });
  }
});
 

app.get('/get-user-email/:token', async (req, res) => {
  try {
    const decodedToken = jwt.verify(req.params.token, process.env.JWT_SECRET);
    
    const user = await User.findOne({ email: decodedToken.email });
    
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    res.status(200).json({ email: user.email });
  } catch (error) {
    console.error('Error fetching user email:', error);
    res.status(500).json({ error: 'An error occurred while fetching user email.' });
  }
});


//stripe wewbhooks endpoint to get user(customer subscriptions data)
const endpointSecret = "whsec_b032e46aee6f9559d8c171c9c1901594ddba21530f3a7edd5bbfad1d6c9cc92a";

app.post('/webhook', express.raw({type: 'application/json'}), async (request, response) => {
  const sig = request.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
  } catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }
  const email = event.data.object.customer_email;
  try {
    const newEvent = new Event({
      email,
      event: event.type,
      eventData: event.data,
      timestamp: new Date(),
    });
    await newEvent.save();

    console.log(`Event saved to the database: ${event.type}`);
  } catch (error) {
    console.error('Error saving event to the database:', error);
    response.status(500).send('Internal Server Error');
    return;
  }

  switch (event.type) {
    case 'subscription_schedule.aborted':
      break;
    case 'subscription_schedule.canceled':
      break;
    case 'subscription_schedule.completed':
      break;
    case 'subscription_schedule.created':
      break;
    case 'subscription_schedule.expiring':
      break;
    case 'subscription_schedule.released':
      break;
    case 'subscription_schedule.updated':
      break;
    default:
      console.log(`Unhandled event type ${event.type}`); 
  }
  response.send();
});

app.listen(5000, () => console.log('Running on port 5000'));