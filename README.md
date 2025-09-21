# Tezz Watches

**A responsive e-commerce website for luxury and casual watches, integrated with Stripe payments and invoice generation.**

[Watch the demo video](https://drive.google.com/file/d/1BcNAbkRjvn4KWJKjqqtrcGls1KXl5lqf/view?usp=sharing)

---
## Screenshots

**Homepage with Featured Product Slider:**  
<img width="960" height="540" alt="image" src="https://github.com/user-attachments/assets/76e71926-68e9-4915-ac9e-4d5059723b7c" />

**New Watches Page with Product Cards:**  
<img width="960" height="540" alt="image" src="https://github.com/user-attachments/assets/0d685d90-8541-4a8f-bdaa-86622a988693" />

**Payment Success Page:**  
<img width="960" height="540" alt="image" src="https://github.com/user-attachments/assets/3a792308-3161-40f0-ae0f-039fc069f664" />

---

## Project Overview

Tezz Watches is a **fully responsive watch store website** built using HTML, CSS, JavaScript, and Node.js. It allows users to:

- Browse luxury and casual watches.  
- View product images and descriptions.  
- Watch embedded product videos.  
- Purchase watches securely via **Stripe Checkout**.  
- Receive automatically generated **PDF invoices**.  

The website follows **Mobile First design principles**, ensuring a seamless experience across smartphones, tablets, and desktops.

---

## Features

- **Responsive Design:** Mobile-first approach, fully adaptive layout.  
- **Product Showcase:** Swiper sliders and Bootstrap cards for watches.  
- **Video Integration:** Embedded video section for product demonstrations.  
- **Stripe Checkout:** Secure payment integration.  
- **PDF Invoices:** Automatically generated invoices for completed purchases.  
- **Order Details Page:** Displays payment status, total amount, and customer info.  
- **Print Receipt:** Users can print their purchase receipt.  
- **Social Media Links:** Easy navigation to Instagram, Facebook, and Twitter.  

---

## Tech Stack

**Frontend:**  
- HTML5, CSS3, JavaScript  
- Bootstrap (offline)  
- Swiper.js (image slider)  
- GSAP (animations)

**Backend:**  
- Node.js & Express  
- Stripe API for payments  
- PDFKit for invoice generation  

**Other Tools:**  
- Nodemon (development)  
- dotenv (environment variables)

---

## Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd <repo-folder>
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root (optional for secret keys).

4. Run the server:
```bash
npm start
```

5. Open the website in your browser:  
```
http://localhost:3000
```

---

## Usage

1. Browse watches on the **Home** and **New** pages.  
2. Click **Buy** to add a product to Stripe Checkout.  
3. Complete the payment.  
4. On the **success page**, view order details or provide missing info.  
5. Download or print the PDF invoice.

---



## Folder Structure

```
project-root/
├─ public/
│  ├─ index.html
│  ├─ new.html
│  ├─ success.html
│  ├─ cancel.html
│  ├─ assets/
│  │  ├─ css/
│  │  ├─ js/
│  │  ├─ img/
│  │  └─ vid/
│  └─ script.js
├─ invoices/               # Generated PDF invoices
├─ server.js               # Node.js backend
├─ package.json
└─ README.md
```

