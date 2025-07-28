# 🌱 Smackstore
Smackstore is an e-commerce website on wrestling, specifically on WWE - a leading company in the sports entertainment industry.

## 🚀 Tech Stack
- **Front-end:** React, JavaScript, CSS3, HTML5
- **Back-end:** Node.js, Express
- **Database:** MongoDB
- **Tools:** Git, Github, VSCode

## 🛠️ Main Functions
**Products Library**
- Display of all products (T-shirts, action figures, covers) with name, price, and picture
- Categories's filters

**Authentication & Roles**
- Login and register system

**Shopping Cart**
- Add and remove products to the cart directly from the library
- Dynamic display of item count and total price
- Temporary persistence in localStorage until checkout

**Checkout & Orders**
- Page for entering shipping and payment details
- Submission of orders to the backend, which saves them in MongoDB as new "orders" collection
- Success or failure feedback to the user

**Responsive Design**
- Optimized layout for mobile and desktop
- Modular, reusable React components

## 🧪 How to run the project

**Check the live site here**
- https://smackstore.vercel.app

**Please Note**
⚠️ Note: Clicking on "Pay" attempts to connect to an inactive Stripe endpoint, which results in a "Site can’t be reached" error.
This behavior is expected, as the payment integration phase is not yet complete.
