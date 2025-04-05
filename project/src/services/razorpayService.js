// Razorpay Payment Gateway Service
const razorpayService = {
  /**
   * Initialize a payment with Razorpay
   * @param {Object} options Payment options
   * @param {number} options.amount Amount in smallest currency unit (paise for INR)
   * @param {string} options.currency Currency code (default: INR)
   * @param {string} options.name Asset name or description
   * @param {string} options.description Payment description
   * @param {string} options.orderId Optional order ID from backend
   * @param {Object} options.prefill User contact details for prefill
   * @param {Function} options.onSuccess Callback for successful payment
   * @param {Function} options.onFailure Callback for failed payment
   */
  initiatePayment: ({
    amount,
    currency = 'INR',
    name,
    description,
    orderId,
    prefill = {},
    onSuccess,
    onFailure
  }) => {
    // Razorpay requires amount in smallest currency unit (paise for INR)
    // Convert amount to paise if it's not already
    const amountInPaise = Math.round(amount * 100);
    
    const options = {
      key: 'rzp_test_A6jyuYzUHgt2MR', // Your Razorpay Key ID
      amount: amountInPaise,
      currency,
      name: name || 'Portfolio Pro',
      description: description || 'Investment Transaction',
      order_id: orderId, // Optional, usually generated from backend
      handler: function(response) {
        // Handle successful payment
        if (onSuccess && typeof onSuccess === 'function') {
          onSuccess({
            paymentId: response.razorpay_payment_id,
            orderId: response.razorpay_order_id,
            signature: response.razorpay_signature,
          });
        }
      },
      prefill: {
        name: prefill.name || '',
        email: prefill.email || '',
        contact: prefill.contact || ''
      },
      modal: {
        ondismiss: function() {
          // Handle modal dismiss
          if (onFailure && typeof onFailure === 'function') {
            onFailure({
              error: 'Payment cancelled by user',
              type: 'USER_CANCEL'
            });
          }
        }
      },
      theme: {
        color: '#7928CA', // Purple color matching your theme
      }
    };

    try {
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
      
      // Handle external wallet selection
      paymentObject.on('payment.failed', function(response) {
        if (onFailure && typeof onFailure === 'function') {
          onFailure({
            error: response.error.description,
            code: response.error.code,
            source: response.error.source,
            step: response.error.step,
            type: 'PAYMENT_FAILED'
          });
        }
      });
    } catch (err) {
      console.error('Razorpay initialization error:', err);
      if (onFailure && typeof onFailure === 'function') {
        onFailure({
          error: 'Failed to initialize payment',
          details: err.message,
          type: 'INIT_ERROR'
        });
      }
    }
  }
};

export default razorpayService; 