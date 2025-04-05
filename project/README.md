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
