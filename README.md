# 🎨 CanvasCraft — Full MERN Stack Fine Art Gallery & Marketplace

A modern, full-featured Art Gallery and Creator Marketplace built with the **MERN Stack** (MongoDB, Express.js, React, Node.js) and styled with **Bootstrap 5** and custom glassmorphism CSS.

---

## 🌟 Key Features Implemented

### 1. Authentication System
* **Login Option**:
  * Accepts **Username or Email** as a single input field.
  * Secure password authentication using **bcryptjs** and **JWT (JSON Web Tokens)**.
  * Demo 1-click fast-fill buttons for **Customer**, **Artist**, and **Admin**.
* **Signup Option**:
  * Form collects: `username`, `email`, `mobile number`, `date-of-birth`, `gender` (Male, Female, Other, Prefer not to say), `password`, and `confirm password`.
  * Real-time client & server password match validation.

### 2. Home Page
* **Hero Introduction**: Engaging header with curated art highlights, statistics counters, and quick CTAs.
* **Top Arts by Likes Count**: Artworks sorted dynamically in descending order of likes with interactive like buttons and price badges.
* **Top Artists by Total Likes**: Ranking of master creators (#1, #2, #3) based on the sum of likes across all their approved artworks.
* **About Corner — Founders Details**:
  * **Kamalesh V** — 3rd year Computer Science Engineering, Mepco Schlenk Engineering College, Tamil Nadu, India.
  * **SivaKumar S** — 3rd year Computer Science Engineering, Mepco Schlenk Engineering College, Tamil Nadu, India.

### 3. Customer Experience
* After login, user enters as a customer.
* **Explore Gallery**: Filter by medium (Oil Painting, Acrylic, Watercolor, Digital Art, Charcoal Sketch, Sculpture), search by keyword, and sort by most liked, newest, or price.
* **Interactive Likes**: Like/unlike any artwork with live optimistic counter updates.
* Artist accounts use a dedicated dashboard for artworks, orders, and payment/profile settings.
* **Order Placement Form**:
  * Form asks for: Full Name, Mobile Number, Delivery Address, City, State, Pincode, and Delivery Notes.
  * **Payment Modes**:
    1. **UPI (Direct Artist Payment)**: Displays the **Artist's personal UPI QR Code** and **UPI ID** with a 1-click Copy button. Buyer enters the 12-digit UPI UTR transaction reference and can optionally upload receipt screenshots.
    2. **Cash on Delivery (COD)**: Doorstep cash/UPI payment.
    3. **Card / Net Banking**: Instant simulated payment gateway.
* **Customer Dashboard**:
  * **"My Orders"**: Track order status (`Pending` -> `Confirmed` -> `In Progress` -> `Dispatched` -> `Delivered`).
  * **"My Art Submissions"**: Track status of artworks submitted to become an artist (`Under Admin Review`, `Approved`, `Rejected`).

### 4. Become an Artist (Submission & Approval Workflow)
* Any user can submit their artwork via **"Post Art"**.
* If it is a normal user (or 1st time posting):
  * Artwork details: Title, Medium/Category, Description, Dimensions, Price in ₹, Artwork image.
  * **1st Time Artist Payment Setup**: Provide an Artist UPI ID and upload the artist's QR image so customers can pay directly.
  * The artwork is placed in a **"pending"** queue.
  * **Admin Review**: When the Admin reviews and approves the artwork, the user's role is promoted to **Artist** (`isArtist = true`) and the artwork goes live in the public gallery!

### 5. Artist Dashboard & Privileges
* Artists have a dedicated **Artist Studio Dashboard**:
  * **Portfolio Metrics**: Total Artworks, Total Likes Received, Orders Received, Total Sales Volume.
  * **Artwork Management**: View all portfolio pieces, **Edit artwork details** (Title, Category, Price, Dimensions, Description), or Delete artworks.
  * **Orders Placed for My Arts**: View buyer's full name, mobile number, delivery address, payment mode (with UPI UTR reference), and **update the order tracking status** (`Pending` -> `Confirmed` -> `In Progress` -> `Dispatched` -> `Delivered`).
  * **UPI & Profile Settings**: Update UPI ID, upload a local QR image, and update bio.

### 6. Admin Panel (Full Platform Control)
* **Pending Art & Artist Requests**: List of all artworks waiting for review with applicant details (Username, Email, Phone, UPI info). Single-click **"Approve & Make Artist"** or **"Reject"** with reason.
* **Manage Customers**: Separate table of registered customers with details (DOB, mobile, gender, join date, status) with edit and delete actions.
* **Manage Artists**: Separate table of verified artists with artwork count, total likes, and UPI ID.
* **Manage All Arts**: Complete platform inventory to edit details, adjust status, or delete inappropriate works.
* **Platform Orders Registry**: Complete oversight of who placed which order for what art, amount, payment method, delivery address, with status updater.

---

## 🔑 Demo Login Credentials

| Role | Username / Email | Password | Features Accessible |
| :--- | :--- | :--- | :--- |
| **Admin** | `admin` (or `admin@artgallery.com`) | `admin123` | Full Admin Dashboard, Approve Artists, Manage Customers & Artists, Edit Arts, View All Orders |
| **Artist** | `aarav_sharma` (or `aarav@artgallery.com`) | `artist123` | Artist Dashboard, Edit My Arts, View Orders For My Arts, Update Status |
| **Artist** | `maya_sen` (or `maya@artgallery.com`) | `artist123` | Surrealist digital artist profile, gallery, artworks |
| **Customer** | `priya_collector` (or `priya@example.com`) | `user123` | Browse, Like, Order with UPI QR, Track My Orders, Submit Art to become Artist |

*(You can also use the **"Register"** page to create any new customer account with full details!)*

---

## 🚀 How to Run Locally

### Option 1: Quick Launch (Windows Batch Script)
Double-click `start.bat` in the root folder. It will launch both the backend and frontend in separate terminals!

Before the first launch, run `npm ci` once in both `backend` and `frontend`. Copy `backend/.env.example` to `backend/.env` and set the values for your machine if needed.

### Option 2: Manual Terminal Commands

#### 1. Start Backend:
```bash
cd backend
npm ci
node server.js
```
*Backend runs on `http://localhost:5000`*

#### 2. Start Frontend:
```bash
cd frontend
npm ci
npm run dev
```
*Frontend runs on `http://localhost:5173`*

---

## 🗄️ Database Architecture

* **Dual-Engine Persistence**:
  * Default connects to local MongoDB via Mongoose (`mongodb://127.0.0.1:27017/artgallery` or Atlas URI configured in `backend/.env`).
  * If no MongoDB daemon is running locally, it seamlessly and automatically falls back to an embedded JSON document engine in `backend/data/db.json` with identical schema and CRUD operations.

## Local Images

The project serves images from `frontend/public/images/`, organized into `Profile image`, `QR image`, and `Art image`. The supplied implementation folder did not include its original image assets, so local SVG placeholders are included. Replace them with your own files and update the corresponding paths in the seed data or user records. The QR placeholder is not scannable; upload a real payment QR image before accepting UPI payments.
  * This guarantees **zero crashes** and 100% out-of-the-box reliability in student and evaluation environments!

---

## 🧪 Automated End-to-End Test Suite

To verify all 12 platform workflows in 5 seconds, run:
```bash
node test-e2e.cjs
```
This tests:
1. Founders endpoint (Kamalesh & Adithya)
2. Customer signup (all 7 fields)
3. Login with username or email
4. Top arts by likes
5. Top artists by total likes
6. Artwork like toggle
7. Instagram artist profile & photo grid
8. Art posting with wait state & UPI QR requirement
9. Order placement with UPI QR display
10. Admin login
11. Admin art approval & promotion of customer to artist
12. Separate admin customer & artist management
# sem5_MiniProject
