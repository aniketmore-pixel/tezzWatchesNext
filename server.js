const express = require('express');
const stripe = require('stripe')('sk_test_51Px171D6UHoJ8XNv5HSiBnEGaCdOmVREqZ6bzT6tBvuWCRGC5MTMlybLx6jNv6G9ZJ54k08RHJilT24p7FB6YwnO00oOnLZjLo'); // Your Stripe Secret Key
const bodyParser = require('body-parser');
const fs = require('fs');
const PDFDocument = require('pdfkit');
const app = express();

app.use(express.static('public')); // Serve static files from the 'public' directory
app.use(express.json());
app.use(bodyParser.raw({ type: 'application/json' })); // To handle webhook payload

// Endpoint to create a checkout session
app.post('/create-checkout-session', async (req, res) => {
  const { itemId } = req.body; // Item ID from the frontend

  // Define your products and prices
  const items = {
    '1': { price: 72000, name: 'Omega Seamaster Aqua Terra 150MM' },
    '2': { price: 8400, name: 'Titan Mens Timeless Style Watch' },
    '3': { price: 3500, name: 'Sonata Quartz Analog Steel Strap Watch' },
    '4': { price: 92999, name: 'TAG Heuer Formula 1 Watch' },
    '5': { price: 28000, name: 'Tissot PR 100' },
    '6': { price: 32000, name: 'Fossil Blue Three-Hand Date Stainless Steel Watch' },
    '7': { price: 9400, name: 'Fastrack Quartz Analog Black Dial Brown Stainless Steel Strap Watch' },
  };

  const item = items[itemId];
  if (!item) {
    return res.status(400).send('Invalid item ID');
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,
          },
          unit_amount: item.price,
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: 'http://localhost:3000/success.html?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: 'http://localhost:3000/cancel.html',
    });

    res.json({ id: session.id });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Stripe webhook handler to capture payment information
app.post('/webhook', (req, res) => {
  const sig = req.headers['stripe-signature'];

  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, 'whsec_5oeUcOAHeng2aja49pGzqdCDpz6WVZY0'); // Replace with your webhook secret
  } catch (err) {
    console.error('⚠️  Webhook signature verification failed.', err.message);
    return res.sendStatus(400);
  }

  // Handle the event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    // Generate the invoice PDF
    generateInvoice(session);
  }

  // Return a response to acknowledge receipt of the event
  res.json({ received: true });
});

// Function to generate the invoice PDF
function generateInvoice(session) {
  const doc = new PDFDocument();
  const filename = `invoice_${session.id}.pdf`;

  doc.pipe(fs.createWriteStream(`./invoices/${filename}`)); // Save the PDF to a folder
  doc.fontSize(20).text('TezzWatches Invoice', { align: 'center' });
  doc.moveDown();
  doc.fontSize(14).text(`Customer: ${session.customer_details.name}`);
  doc.text(`Email: ${session.customer_details.email}`);
  doc.text(`Amount Paid: $${session.amount_total / 100}`);
  doc.text(`Payment Status: ${session.payment_status}`);
  doc.moveDown();
  doc.text('Thank you for your purchase!');

  doc.end();
}

// Route to serve the invoice PDF to the user after successful payment
app.get('/invoice/:sessionId', async (req, res) => {
  const sessionId = req.params.sessionId;
  const session = await stripe.checkout.sessions.retrieve(sessionId);

  const invoicePath = `./invoices/invoice_${sessionId}.pdf`;
  res.download(invoicePath); // Serve the invoice PDF
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


///////


app.get('/order-details', async (req, res) => {
  const sessionId = req.query.session_id;

  if (!sessionId) {
    return res.json({ error: 'Session ID not provided' });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    
    let customerData = {
      name: 'N/A',
      email: session.customer_email
    };

    let isCustomerDataMissing = false;

    if (session.customer) {
      try {
        const customer = await stripe.customers.retrieve(session.customer);
        customerData = {
          name: customer.name || 'N/A',
          email: customer.email || session.customer_email
        };
      } catch (error) {
        console.error('Error retrieving customer:', error.message);
        isCustomerDataMissing = true;
      }
    } else {
      isCustomerDataMissing = true;
    }

    // Handle case where line_items might be undefined
    const lineItems = session.line_items ? session.line_items.data : [];
    
    res.json({
      id: session.id,
      customer_name: customerData.name,
      customer_email: customerData.email,
      amount_total: session.amount_total,
      payment_status: session.payment_status,
      items: lineItems.map(item => ({
        name: item.description,
        amount: item.amount_total,
        quantity: item.quantity
      })),
      isCustomerDataMissing
    });
  } catch (error) {
    res.json({ error: error.message });
  }
});
