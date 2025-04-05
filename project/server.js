import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import crypto from 'crypto';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3002; 
console.log('Using port:', PORT);

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Razorpay configuration
const razorpay = {
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
};

// Verify Razorpay signature
const verifyRazorpaySignature = (orderId, paymentId, signature) => {
  const generatedSignature = crypto
    .createHmac('sha256', razorpay.key_secret)
    .update(`${orderId}|${paymentId}`)
    .digest('hex');
  
  return generatedSignature === signature;
};

// API Routes
const apiRouter = express.Router();

// Payments API
apiRouter.post('/payments/create-order', async (req, res) => {
  try {
    const { amount, currency = 'INR', receipt = 'order_receipt' } = req.body;
    
    const mockOrder = {
      id: 'order_' + Date.now(),
      entity: 'order',
      amount: amount * 100,
      amount_paid: 0,
      amount_due: amount * 100,
      currency,
      receipt,
      status: 'created',
      attempts: 0,
      created_at: Math.floor(Date.now() / 1000)
    };
    
    res.json(mockOrder);
  } catch (error) {
    console.error('Order creation error:', error);
    res.status(500).json({ error: 'Failed to create order', details: error.message });
  }
});

apiRouter.post('/payments/verify', (req, res) => {
  try {
    const { paymentId, orderId, signature } = req.body;
    
    const isValid = verifyRazorpaySignature(orderId, paymentId, signature);
    
    if (isValid) {
      res.json({ success: true, status: 'Payment verified' });
    } else {
      res.status(400).json({ success: false, status: 'Payment verification failed' });
    }
  } catch (error) {
    console.error('Payment verification error:', error);
    res.status(500).json({ error: 'Failed to verify payment', details: error.message });
  }
});

// Transaction confirmation endpoints
apiRouter.post('/transactions/confirm-payment', (req, res) => {
  try {
    const { paymentId, assetId, assetType, amount, transactionType, installmentType } = req.body;
    
    res.json({
      success: true,
      transaction: {
        id: 'txn_' + Date.now(),
        paymentId,
        assetId,
        assetType,
        amount,
        transactionType,
        installmentType,
        status: 'completed',
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Transaction confirmation error:', error);
    res.status(500).json({ error: 'Failed to confirm transaction', details: error.message });
  }
});

apiRouter.post('/transactions/confirm-quick-payment', (req, res) => {
  try {
    const { paymentId, assetId, assetType, amount, isQuickBuy } = req.body;
    
    res.json({
      success: true,
      transaction: {
        id: 'txn_' + Date.now(),
        paymentId,
        assetId,
        assetType,
        amount,
        transactionType: 'buy',
        installmentType: 'oneTime',
        isQuickBuy,
        status: 'completed',
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Quick transaction confirmation error:', error);
    res.status(500).json({ error: 'Failed to confirm quick transaction', details: error.message });
  }
});

// Mount API router
app.use('/api', apiRouter);

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

export default app; 