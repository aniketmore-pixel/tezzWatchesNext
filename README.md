# Tezz Watches

**A responsive e-commerce website for luxury and casual watches, integrated with Stripe payments and invoice generation.**

[Watch the demo video](https://drive.google.com/file/d/1BcNAbkRjvn4KWJKjqqtrcGls1KXl5lqf/view?usp=sharing)

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

## Screenshots

**Homepage with Featured Product Slider:**  
![Homepage Preview](preview.png)  

**New Watches Page with Product Cards:**  
![New Page Preview](preview.png) *(replace with actual screenshot)*  

**Payment Success Page:**  
![Payment Success](preview.png) *(replace with actual screenshot)*  

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

