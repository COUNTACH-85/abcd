# Portfolio Pro - Investment Platform


A modern investment platform with Razorpay payment integration for executing trades and investments.

## Features

- Dashboard for portfolio overview
- Asset comparison tools
- Reports and analytics
- Trade execution with Razorpay payment integration
- Quick invest functionality

## Getting Started

### Prerequisites

- Node.js 16.x or higher
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Start the development server:

```bash
npm run dev
# or
yarn dev
```

4. In a separate terminal, start the backend server:

```bash
npm run server
# or
yarn server
```

The frontend will be available at http://localhost:5173 and the API server at http://localhost:3000.

## Razorpay Integration

This project includes integration with Razorpay payment gateway:

- Test Mode credentials are included by default
- Buy and Quick Invest buttons trigger Razorpay payment popup
- Payments are processed in test mode (no real money is charged)

### Test Card Details

You can use the following test card details for transactions:

- Card Number: 4111 1111 1111 1111
- Expiry: Any future date
- CVV: Any 3 digits
- Name: Any name
- 3D-Secure Password: 1234

## Production Deployment

For production, make sure to:

1. Replace the Razorpay test keys with production keys
2. Implement proper server-side security for payment verification
3. Enable HTTPS for secure communication
4. Store sensitive keys in environment variables

## Built With

- React + Vite
- Tailwind CSS v4
- Express.js (backend API)
- Razorpay payment gateway
=======
Smart Investment Tracker  

Overview  
Smart Investment Tracker is a unified financial management app that allows users to track, compare, and invest in mutual funds (MFs) and stocks from multiple platforms—all in one place. With AI-driven insights, a user-friendly interface, and one-click execution, this app simplifies investment decisions for both beginners and experienced investors.  

Key Features  
1️⃣ Automatic Portfolio Tracking  
- Fetches data from *MF Central API, broker APIs*  
- Displays *all investments* with execution links (e.g., "Buy more" button for funds).  
- Just like *PhonePe for bank balances*, but for stocks & mutual funds.  

2️⃣ Smart AI-Powered Comparison Tool  
- Uses *AI/ML* to recommend *better performing* funds & stocks.  
- Simple visual indicators like:  
  - *Trust Score* (⭐ ratings like Uber drivers)  
  - *Risk Meter* (🟢 Low | 🟠 Medium | 🔴 High)  
  - *Projected Returns* ("₹10,000 → ₹12,000 in 1 year" 📈)  
- Example: “Fund A is better than Fund B: 15% returns, same risk. Switch now? ✅”  

3️⃣ One Dashboard for Tracking + Execution  
- See all *MFs + stocks* in a *single interactive dashboard*.  
- One-click execution: "Invest Now" button (like Amazon’s *"Buy Now"*).  
- No need to log in separately to MF Central or broker platforms.  

4️⃣ Super Simple & Interactive UI   
- Uses *icons & plain-English summaries* for easy understanding.  
- *One-click actions*:  
  - Compare funds (like Amazon product comparison)  
  - Quick Invest (like Uber’s "Book Ride")  


Real-Life Example  
Imagine your father uses this app to:  
1. *See all investments: *"Zerodha: ₹50K in stocks | MF Central: ₹1L in MFs."  
2. *Compare Funds: AI suggests switching to a **higher-return* fund.  
3. *Execute Instantly: Click *"Invest Now" to buy Fund B *without logging in elsewhere*.  

Tech Stack  
- *Frontend*: React.js  
- *Backend*: Node.js 
- *Database*: Firestore Database 
- *APIs*: MFU API, Broker APIs 
- *AI/ML*: Python (scikit-learn, TensorFlow)  

## 📜 License  
MIT License  

---

💡 *Built with love for investors!* 💙🚀

