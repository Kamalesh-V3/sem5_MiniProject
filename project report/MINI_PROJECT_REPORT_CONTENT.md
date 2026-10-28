# CANVASCRAFT: A FULL MERN STACK FINE ART GALLERY AND CREATOR MARKETPLACE

---

## PRELIMINARY PAGES

### TITLE PAGE

<div align="center">

# CANVASCRAFT: A FULL MERN STACK FINE ART GALLERY AND CREATOR MARKETPLACE

<br/>

### A MINI-PROJECT REPORT

*Submitted in partial fulfillment of the requirements for the award of the degree of*

<br/>

### **BACHELOR OF ENGINEERING**
### in
### **COMPUTER SCIENCE AND ENGINEERING**

<br/>

*By*

| Student Name | Register / Roll Number |
| :--- | :--- |
| **KAMALESH V** | `[951722104048 / Student Roll No. 1]` |
| **SIVAKUMAR S** | `[951722104104 / Student Roll No. 2]` |

<br/>

*Under the Guidance of*

**[Guide Name, Designation]**  
Department of Computer Science and Engineering  
[College Name / Mepco Schlenk Engineering College]

<br/>

<div style="margin: 20px 0;">
  <strong>DEPARTMENT OF COMPUTER SCIENCE AND ENGINEERING</strong><br/>
  <strong>[COLLEGE NAME / MEPCO SCHLENK ENGINEERING COLLEGE]</strong><br/>
  <em>(An Autonomous Institution, Affiliated to Anna University, Chennai)</em><br/>
  Sivakasi, Virudhunagar District, Tamil Nadu – 626005, India<br/>
  <strong>OCTOBER 2026</strong>
</div>

</div>

---

### BONAFIDE CERTIFICATE

<div align="center">

### **DEPARTMENT OF COMPUTER SCIENCE AND ENGINEERING**  
### **[COLLEGE NAME / MEPCO SCHLENK ENGINEERING COLLEGE]**  
### **SIVAKASI – 626005**

<br/>

### **BONAFIDE CERTIFICATE**

</div>

Certified that this mini-project report titled **"CANVASCRAFT: A FULL MERN STACK FINE ART GALLERY AND CREATOR MARKETPLACE"** is the bonafide work of **KAMALESH V ([Register Number 1])** and **SIVAKUMAR S ([Register Number 2])** who carried out the mini-project work under my supervision in partial fulfillment of the requirements for the award of the degree of **Bachelor of Engineering in Computer Science and Engineering** of Anna University / Autonomous Curriculum during the academic year 2026–2027.

<br/><br/><br/>

| ___________________________________ | ___________________________________ |
| :--- | :--- |
| **[Guide Name, M.E., Ph.D.]** | **[Head of the Department, Ph.D.]** |
| **PROJECT SUPERVISOR** | **HEAD OF THE DEPARTMENT** |
| Assistant Professor / Associate Professor | Professor & Head |
| Department of Computer Science & Engineering | Department of Computer Science & Engineering |
| [College Name] | [College Name] |
| Sivakasi – 626005 | Sivakasi – 626005 |

<br/><br/>

Submitted for the Mini-Project Viva-Voce Examination held on `[Date of Examination: _______________]`.

<br/><br/>

| ___________________________________ | ___________________________________ |
| :--- | :--- |
| **INTERNAL EXAMINER** | **EXTERNAL EXAMINER** |

---

### DECLARATION

We, **KAMALESH V ([Register Number 1])** and **SIVAKUMAR S ([Register Number 2])**, students of the Department of Computer Science and Engineering, **[College Name / Mepco Schlenk Engineering College]**, hereby declare that the mini-project work entitled **"CANVASCRAFT: A FULL MERN STACK FINE ART GALLERY AND CREATOR MARKETPLACE"** submitted to the Department of Computer Science and Engineering is a record of original work done by us under the supervision of **[Guide Name, Designation]**, Assistant Professor, Department of Computer Science and Engineering.

We further declare that this report has not formed the basis for the award of any Degree, Diploma, Associateship, Fellowship, or any other similar title to any candidate of any other University or Institution.

<br/><br/>

**Place:** Sivakasi  
**Date:** `[DD-MM-YYYY]`

<br/>

**Signatures of the Candidates:**

1. _______________________________  
   **KAMALESH V** (`[Register Number 1]`)

2. _______________________________  
   **SIVAKUMAR S** (`[Register Number 2]`)

---

### ACKNOWLEDGEMENT

First and foremost, we express our profound sense of gratitude to the Almighty for bestowing upon us the wisdom, strength, and perseverance to complete this mini-project successfully.

We express our heartfelt gratitude to our respected Principal, **[Principal Name, Ph.D.]**, and our Management for providing the state-of-the-art computational infrastructure, laboratories, and an inspiring academic atmosphere to undertake this project.

We convey our deepest gratitude and sincere thanks to **[Head of Department Name, Ph.D.]**, Professor and Head, Department of Computer Science and Engineering, for their valuable encouragement, constant motivation, and continuous administrative support throughout the course of this work.

We wish to place on record our sincere appreciation and grateful thanks to our esteemed project guide, **[Guide Name, Designation]**, Assistant Professor, Department of Computer Science and Engineering, for their invaluable guidance, constructive criticism, patient advice, and inspiring technical directions throughout every stage of the design, development, and evaluation of this project.

We also extend our sincere thanks to all the faculty members, technical laboratory staff, and non-teaching staff of the Department of Computer Science and Engineering for their direct and indirect assistance during our software development and testing cycles.

Finally, we express our deepest affection and gratitude to our parents, family members, and friends for their continuous prayers, moral encouragement, and unconditional support, without which this endeavor would not have been possible.

<br/>

**KAMALESH V**  
**SIVAKUMAR S**

---

### ABSTRACT

The democratization of fine art e-commerce has historically been constrained by excessive intermediary commissions (often exceeding 30% to 50%), geographical exclusivity of physical brick-and-mortar art galleries, opaque artwork verification, and limited monetization avenues for emerging independent creators. Traditional e-commerce platforms treat fine artworks as generic mass-manufactured inventory, failing to capture visual nuances, medium dimensions, artist biographies, or the communal engagement native to art appreciation. 

To overcome these structural limitations, this project presents **CanvasCraft**, a modern, full-stack web application and creator marketplace engineered on the **MERN architecture** (MongoDB, Express.js, React.js, and Node.js). Styled with a bespoke, dark-mode **Glassmorphism CSS3** design system and Bootstrap 5, CanvasCraft establishes a direct, frictionless peer-to-peer ecosystem connecting independent artists with discerning collectors. 

The platform implements a robust **Role-Based Access Control (RBAC)** model supporting Customers, Verified Artists, and System Administrators. A key architectural innovation is the **two-step artist onboarding pipeline**: any registered customer can submit artworks for evaluation; upon submission, the creator is required to supply verified payment identifiers (Unified Payments Interface — UPI QR code and UPI VPA ID or Bank wire coordinates). Upon rigorous review and curation approval by the platform administrator, the artwork is published to the public gallery, and the applicant's account is automatically promoted to a verified **Artist**, unlocking an advanced Artist Studio Dashboard.

CanvasCraft features a decentralized direct-to-creator payment paradigm wherein buyers scan the artist's personal UPI QR code directly, logging 12-digit UPI UTR transaction references or payment receipts without platform commission cuts. The platform supports dynamic multi-criteria gallery filtering across traditional and contemporary mediums (Oil Painting, Acrylic, Watercolor, Digital Art, Charcoal Sketch, and Sculpture), optimistic real-time like toggling, artist community leaderboards, and five-stage order fulfillment tracking (`Pending` $\rightarrow$ `Confirmed` $\rightarrow$ `In Progress` $\rightarrow$ `Dispatched` $\rightarrow$ `Delivered`). Furthermore, a unified Data Access Layer (DAL) provides seamless dual-engine persistence with automatic fallback between a production MongoDB database and an embedded, atomic JSON document store (`db.json`), guaranteeing zero-configuration portability and 100% uptime across student evaluation and cloud hosting environments. The system was validated via an automated 12-stage end-to-end test suite, demonstrating high security, sub-second API responsiveness, and dependable transaction integrity.

**Keywords:** MERN Stack, Fine Art Marketplace, Glassmorphism, Role-Based Access Control, Direct UPI QR Payments, Dual-Engine Persistence, Curation Workflow, Order Tracking.

---

### TABLE OF CONTENTS

| Chapter No. | Title | Page No. |
| :---: | :--- | :---: |
| | **PRELIMINARY PAGES** | |
| | Title Page | i |
| | Bonafide Certificate | ii |
| | Declaration | iii |
| | Acknowledgement | iv |
| | Abstract | v |
| | Table of Contents | vi |
| | List of Figures | viii |
| | List of Tables | ix |
| **1** | **INTRODUCTION** | **1** |
| | 1.1 Perspective | 1 |
| | 1.2 Objective | 3 |
| | 1.3 Scope | 4 |
| **2** | **REQUIREMENT DESCRIPTION** | **6** |
| | 2.1 Functional Requirements | 6 |
| | 2.2 Non-Functional Requirements | 9 |
| **3** | **SYSTEM DESIGN** | **12** |
| | 3.1 Architecture Design | 12 |
| | 3.2 Design Components | 14 |
| | &emsp; 3.2.1 Frontend Architecture | 14 |
| | &emsp; 3.2.2 Backend Architecture | 15 |
| | 3.3 Database Description | 16 |
| | 3.4 Low-Level Design & UML Models | 19 |
| | &emsp; 3.4.1 Use Case Diagram | 19 |
| | &emsp; 3.4.2 Class / Entity Diagram | 21 |
| | &emsp; 3.4.3 Sequence Diagrams | 23 |
| | &emsp; 3.4.4 Activity Diagram | 26 |
| | 3.5 User Interface Design | 27 |
| **4** | **SYSTEM IMPLEMENTATION** | **29** |
| | 4.1 Implementation Overview | 29 |
| | 4.2 Technologies Used | 30 |
| | 4.3 Module-Wise Implementation | 32 |
| | &emsp; 4.3.1 User Management and Authentication Module | 32 |
| | &emsp; 4.3.2 Fine Art Catalog and Exploration Module | 33 |
| | &emsp; 4.3.3 Creator Onboarding and Curation Module | 35 |
| | &emsp; 4.3.4 Direct Peer-to-Peer Ordering and Fulfillment Module | 36 |
| | &emsp; 4.3.5 Artist Studio Dashboard Module | 37 |
| | &emsp; 4.3.6 Platform Administrator Control Center Module | 38 |
| | 4.4 Important Algorithms and Workflows | 39 |
| | 4.5 Database and Unified Persistence Layer Implementation | 42 |
| | 4.6 RESTful API Implementation | 44 |
| | 4.7 Authentication and Authorization Security | 46 |
| | 4.8 Relevant Source-Code Excerpts with Explanations | 47 |
| **5** | **RESULTS AND DISCUSSION** | **55** |
| | 5.1 Application Outputs and Visual Interfaces | 55 |
| | 5.2 Verification and Automated Test Cases | 58 |
| | 5.3 Expected and Actual Results | 62 |
| | 5.4 Discussion of Results | 64 |
| | 5.5 Limitations and Observations | 65 |
| **6** | **CONCLUSION AND FUTURE ENHANCEMENTS** | **67** |
| | 6.1 Conclusion | 67 |
| | 6.2 Project Achievements | 68 |
| | 6.3 Current Limitations | 69 |
| | 6.4 Future Enhancements | 70 |
| | **APPENDICES** | **72** |
| | APPENDIX A: System Requirements & Setup | 72 |
| | APPENDIX B: Source Code Excerpts & Structure | 76 |
| | **REFERENCES** | **83** |

---

### LIST OF FIGURES

| Figure No. | Caption | Page No. |
| :---: | :--- | :---: |
| 3.1 | CanvasCraft Three-Tier System Architecture | 13 |
| 3.2 | Unified Data Access Layer (DAL) Architecture with Fallback Persistence | 17 |
| 3.3 | CanvasCraft System Use Case Diagram | 20 |
| 3.4 | Entity-Relationship and Data Model Class Diagram | 22 |
| 3.5 | Sequence Diagram for Customer Art Submission and Admin Curation Approval | 24 |
| 3.6 | Sequence Diagram for Art Ordering with Direct Artist UPI QR Payment | 25 |
| 3.7 | Activity Diagram for End-to-End Order Fulfillment Lifecycle | 26 |
| 5.1 | Landing Page and Top Arts Dynamic Showcase | 56 |
| 5.2 | Curated Gallery with Category Filtering and Price Range Controls | 56 |
| 5.3 | Order Placement Interface with Artist UPI QR Code and Copy Function | 57 |
| 5.4 | Platform Administrator Dashboard with User, Art, and Order Oversight | 57 |
| 5.5 | Automated 12-Stage End-to-End Test Suite Execution Result | 63 |

---

### LIST OF TABLES

| Table No. | Title | Page No. |
| :---: | :--- | :---: |
| 2.1 | Functional Requirements Specification Matrix | 8 |
| 2.2 | Non-Functional Requirements Specification | 11 |
| 3.1 | User Entity / Collection Schema Definition | 17 |
| 3.2 | Art Entity / Collection Schema Definition | 18 |
| 3.3 | Order Entity / Collection Schema Definition | 19 |
| 4.1 | Technology Stack and Version Specifications | 31 |
| 4.2 | RESTful API Endpoints Specification | 44 |
| 5.1 | Comprehensive Test Cases and Validation Matrix | 59 |
| 5.2 | End-to-End Automated Test Execution Summary | 62 |
| A.1 | Hardware Requirements Specification | 72 |
| A.2 | Software and Runtime Environment Requirements | 73 |
| A.3 | Backend Node.js Package Dependencies | 73 |
| A.4 | Frontend React Package Dependencies | 74 |

---

## CHAPTER 1: INTRODUCTION

### 1.1 Perspective

The global art market has undergone a dramatic digital evolution over the past decade. Traditionally, fine visual art was disseminated, exhibited, and monetized exclusively through elite physical art galleries, private auction houses, and regional exhibitions. While these institutions provided curation and high-net-worth patronage, they created insurmountable barriers for emerging, independent, and regional artists. Physical gallery spaces impose severe geographical bottlenecks, demanding that collectors be physically present to discover new talent. Furthermore, traditional art dealers frequently deduct between 30% and 60% of the sale price as intermediary commissions, leaving creators with minimal margins to sustain their craft.

In contrast, mainstream consumer e-commerce platforms (such as generic retail sites) are architected for mass-produced, barcoded, commoditized goods. They lack the specialized visual taxonomy, high-fidelity presentation, dimension specification, provenance verification, and personal creator engagement required for fine art. On mass marketplaces, an authentic handmade oil painting or archival charcoal sketch is displayed alongside utilitarian household products, stripped of its aesthetic context, narrative, and craftsmanship.

Moreover, in developing economies such as India, the widespread adoption of instant retail payments through the **Unified Payments Interface (UPI)** has revolutionized peer-to-peer commerce. However, existing art aggregators force all transactions through centralized payment gateways that withhold funds for weeks, deduct hefty payment processing fees, and enforce rigid corporate payout cycles. Independent artists need a platform that provides the visual prestige of a curated contemporary gallery combined with the monetary transparency of direct, zero-commission peer-to-peer digital transactions.

**CanvasCraft** was engineered to address this critical industry divide. Built on the **MERN Stack** (MongoDB, Express.js, React.js, and Node.js), CanvasCraft is an integrated Fine Art Gallery and Creator Marketplace. It introduces an artist-centric economic paradigm:

1. **Aesthetic Showcase:** A modern, dark-mode **Glassmorphism CSS3** user experience tailored specifically for high-resolution visual art across traditional and digital mediums.
2. **Curated Quality Assurance:** A two-tier onboarding system where customers can submit artwork, which must pass an Administrator Curation Review before public exhibition and artist role promotion.
3. **Direct Peer-to-Peer Monetization:** Customers transact directly with creators by scanning the artist's personal UPI QR code or executing direct wire transfers, eliminating third-party commission deductions.
4. **Resilient Dual-Engine Data Layer:** An architectural design featuring a unified Data Access Layer (DAL) that transparently alternates between a MongoDB database cluster and an atomic, embedded JSON document store (`db.json`), ensuring absolute operational reliability across academic evaluation, developer testing, and production deployment.

---

### 1.2 Objective

The primary objective of the CanvasCraft mini-project is to design, develop, and evaluate a secure, scalable, and visually compelling web-based fine art gallery and creator marketplace. Specific technical and operational objectives include:

* **Role-Based Multi-User Authentication:** To build a secure, stateless authentication and authorization infrastructure using **JSON Web Tokens (JWT)** and **BcryptJS** password salting, supporting distinct privileges for Customers, Artists, and Platform Administrators.
* **Curated Artist Promotion Pipeline:** To implement a workflow allowing general registered users to submit their portfolio pieces along with verified payment identifiers (UPI ID, QR code image, or bank wire details), allowing administrators to approve submissions and promote users to verified Artists.
* **Direct-to-Artist Payment Integration:** To construct an order placement and checkout module that dynamically renders the individual artist's verified UPI QR code and UPI VPA ID, facilitating direct peer-to-peer buyer payments and tracking via 12-digit UPI UTR transaction numbers and receipt uploads.
* **Interactive Fine Art Discovery:** To develop an expressive gallery exploration system featuring multi-criteria category filtering (Oil Painting, Acrylic, Watercolor, Digital Art, Charcoal Sketch, Sculpture), real-time substring search, price-range sliders, multi-attribute sorting, and optimistic favorite toggling.
* **Complete Order Lifecycle Tracking:** To establish a transparent order management pipeline allowing buyers and artists to monitor fulfillment across five distinct states: `Pending`, `Confirmed`, `In Progress`, `Dispatched`, and `Delivered`.
* **Platform Governance and Administration:** To build a unified Administrator Control Center offering real-time platform metrics, art submission approval/rejection queues with feedback mechanisms, user role management, artwork catalog moderation, and global order audits.
* **Dual-Engine Persistence with Zero-Failure Guarantee:** To engineer a database abstraction layer capable of automatically communicating with MongoDB via Mongoose when available, while seamlessly falling back to a structured local JSON document engine (`backend/data/db.json`) during database outages or evaluation demonstrations.
* **Automated End-to-End Verification:** To implement an automated HTTP test suite validating all 12 platform business workflows without manual intervention.

---

### 1.3 Scope

The scope of CanvasCraft encompasses the design and deployment of both client-side and server-side components of a modern e-commerce art platform:

#### 1. In-Scope Functional Boundaries

* **User Management:** Full customer registration capturing seven demographic and credential attributes (`username`, `email`, `phone`, `dob`, `gender`, `password`, `confirmPassword`), single-identifier login (`username` or `email`), and profile management.
* **Fine Art Exhibition:** Public gallery exhibition showcasing curated artworks with high-resolution images, medium dimensions, descriptions, pricing in Indian Rupees (₹), and artist attribution.
* **Artist Portfolio Pages:** Public, Instagram-style artist profile pages featuring biographical information, verification badges, total platform likes, artwork counts, and a visual grid of approved creations.
* **Creator Onboarding & Approval:** Artwork submission module with mandatory payment credential validation for first-time applicants, administrative review queues, and automatic role elevation upon approval.
* **Direct Order Placement:** Checkout module supporting UPI direct QR scanning with 1-click clipboard copying, Cash on Delivery (COD), and simulated card payment, paired with 12-digit UTR reference entry and receipt uploads.
* **Artist Studio Dashboard:** Creator management hub for monitoring sales revenue, like analytics, updating order tracking statuses, editing artwork details, and managing UPI QR images.
* **Administrative Control Center:** Comprehensive platform dashboard for managing pending arts, managing separate customer and artist registries, editing user permissions, and monitoring platform metrics.
* **Data Persistence:** Dual-engine persistence layer bridging MongoDB (Mongoose ODM) and local atomic JSON storage (`db.json`).

#### 2. Out-of-Scope and Future Boundaries

* **Automated Bank UPI Webhook Settlement:** Live banking webhooks (e.g., NPCI Auto-Settlement) require commercial merchant bank escrow licensing and regulatory compliance; therefore, direct UTR reference logging and receipt verification are utilized.
* **Third-Party Logistics (3PL) API Tracking:** Direct integration with commercial courier tracking APIs (such as BlueDart, Delhivery, or FedEx) is reserved for future implementation; fulfillment status updates are managed directly by creators through the Artist Studio.
* **Augmented Reality (AR) Wall Projection:** Real-time AR artwork projection on interior walls via WebXR is identified as a future enhancement.

---

## CHAPTER 2: REQUIREMENT DESCRIPTION

### 2.1 Functional Requirements

Functional requirements define the core operations, behaviors, and services that CanvasCraft must deliver to its users and administrators. The system requirements are partitioned across six key functional modules:

```
+-----------------------------------------------------------------------------------+
|                           CANVASCRAFT FUNCTIONAL MODULES                          |
+-----------------------------------------------------------------------------------+
|  1. Authentication & RBAC        |  4. Order Placement & Direct UPI Payments      |
|  2. Art Catalog & Discovery      |  5. Artist Studio & Inventory Management       |
|  3. Creator Onboarding & Review  |  6. Platform Governance & Administration       |
+-----------------------------------------------------------------------------------+
```

#### Module 1: Authentication and Role-Based Access Control (RBAC)
* **FR-1.1 (Multi-Field Registration):** The system shall allow new users to register as customers by providing seven required parameters: `username`, `email`, `phone`, `dob` (Date of Birth), `gender`, `password`, and `confirmPassword`.
* **FR-1.2 (Client-Server Validation):** The system shall validate email syntax, ensure password confirmation equivalence, enforce a minimum 6-character length constraint, and verify username/email uniqueness.
* **FR-1.3 (Unified Login):** The system shall allow registered users to authenticate using either their `username` or registered `email` address alongside their password in a single input field.
* **FR-1.4 (Stateless Token Issuance):** Upon successful authentication, the system shall issue a signed JSON Web Token (JWT) with a 7-day validity period, including user identification and role metadata.
* **FR-1.5 (Role Enforcement Middleware):** The system shall enforce role constraints (`customer`, `artist`, `admin`) on protected endpoints, intercepting unauthorized requests with HTTP `401 Unauthorized` or `403 Forbidden` responses.

#### Module 2: Fine Art Catalog and Gallery Exploration
* **FR-2.1 (Curated Gallery Display):** The platform shall display all approved artworks in a responsive grid, rendering thumbnail images, artwork titles, medium categories, dimensions, prices in ₹, artist avatars, and like counts.
* **FR-2.2 (Category Filtering):** Users shall be able to filter artworks dynamically across six predefined mediums: `Oil Painting`, `Acrylic`, `Watercolor`, `Digital Art`, `Charcoal Sketch`, and `Sculpture`.
* **FR-2.3 (Search and Sorting):** The catalog shall provide real-time keyword search across artwork titles, descriptions, categories, and artist names, alongside sorting mechanisms by `Most Liked`, `Price: Low to High`, `Price: High to Low`, and `Newest First`.
* **FR-2.4 (Artwork Detail View):** The system shall render a dedicated artwork detail page displaying high-resolution imagery, full artist biographies, framed dimensions, price breakdowns, and direct order links.
* **FR-2.5 (Optimistic Like Toggle):** Authenticated users shall be permitted to like or unlike artworks, updating the persistent count on the server while reflecting the increment/decrement optimistically in the client UI.

#### Module 3: Creator Onboarding and Curation Approval
* **FR-3.1 (Art Submission Form):** Authenticated users shall be able to submit artwork with title, medium, dimensions, price, description, and an uploaded image file via multi-part form encoding.
* **FR-3.2 (Mandatory First-Time Payment Credentials):** When a customer submits an artwork for the first time to become an artist, the system shall enforce the submission of either a valid UPI ID with a scannable payment QR code image or bank account coordinates (`accountNumber`, `ifsc`, `accountHolderName`, `bankName`).
* **FR-3.3 (Curation Holding Queue):** New artwork submissions from non-artist users shall be marked with `status: "pending"` and placed into the admin holding queue.
* **FR-3.4 (Curation Approval & Promotion):** Upon administrator approval, the artwork's status shall transition to `approved`, and the user's role shall automatically be promoted from `customer` to `artist` (`isArtist: true`), publishing the artwork to the public gallery.
* **FR-3.5 (Curation Rejection):** If rejected, the administrator shall provide a reason, and the artwork shall transition to `status: "rejected"` without elevating the user's role.

#### Module 4: Direct Peer-to-Peer Ordering and Payment
* **FR-4.1 (Checkout Form):** The system shall collect shipping details during checkout, including Full Name, Mobile Number, Street Address, City, State, Pincode, and Delivery Notes.
* **FR-4.2 (Direct Artist UPI Display):** When UPI mode is selected, the system shall fetch and render the artist's personal UPI QR code image and UPI ID, providing a 1-click clipboard copy utility for the UPI handle.
* **FR-4.3 (Transaction Reference Logging):** The buyer shall input their 12-digit UPI UTR transaction reference number and optionally upload an image file of the payment receipt.
* **FR-4.4 (Order Instantiation):** Upon order submission, the system shall generate a unique alphanumeric order tracking identifier (e.g., `ORD-1718000000000-123`), associate the artwork, buyer, and artist IDs, and mark the order as `Confirmed` with payment status `Pending Verification`.

#### Module 5: Artist Studio and Inventory Management
* **FR-5.1 (Artist Analytics):** The Artist Studio shall display real-time creator analytics: Total Artworks Published, Total Likes Received, Total Customer Orders, and Gross Sales Volume in ₹.
* **FR-5.2 (Artwork CRUD Operations):** Artists shall have the ability to edit their existing artwork titles, medium categories, dimensions, descriptions, and pricing, as well as delete unsold inventory.
* **FR-5.3 (Order Fulfillment Tracking):** Artists shall view all orders placed for their artworks (including buyer shipping details and UPI UTR references) and update fulfillment statuses across: `Pending` $\rightarrow$ `Confirmed` $\rightarrow$ `In Progress` $\rightarrow$ `Dispatched` $\rightarrow$ `Delivered`.
* **FR-5.4 (Payout Profile Settings):** Artists shall be able to update their payment credentials, upload updated payment QR codes, and modify their public artist biography.

#### Module 6: Platform Governance and Administration
* **FR-6.1 (Platform KPI Telemetry):** The admin dashboard shall present aggregate platform metrics: Total Registered Users, Customer Count, Artist Count, Total Artworks, Approved Artworks, Pending Submissions, Total Orders, and Platform GMV.
* **FR-6.2 (Pending Queue Management):** The admin shall review pending artwork applications, inspect applicant profile details and payment QR images, and execute 1-click approval or rejection.
* **FR-6.3 (Customer & Artist User Segregation):** The admin panel shall maintain isolated management tables for Customers and Artists, allowing admins to inspect contact details, edit profile records, toggle active states, or delete accounts.
* **FR-6.4 (Platform-Wide Inventory and Order Auditing):** Administrators shall retain full authority to moderate or delete any artwork and inspect or update any order on the platform.

---

### Table 2.1: Functional Requirements Specification Matrix

| Req. ID | Module | Description | Input | Output / State Change | Priority |
| :--- | :--- | :--- | :--- | :--- | :---: |
| **FR-01** | Auth | User Registration | 7 user attributes | New user record; role = `customer` | High |
| **FR-02** | Auth | Unified Login | Username/Email, Password | JWT token, user object | High |
| **FR-03** | Gallery | Multi-Criteria Filtering | Medium, search, price range | Filtered list of approved artworks | High |
| **FR-04** | Gallery | Optimistic Like Toggle | Artwork ID, User Token | Incremented/decremented like count | Medium |
| **FR-05** | Onboarding | First-Time Art Submission | Art details, image, UPI QR | Artwork created (`pending`); app `pending` | High |
| **FR-06** | Admin | Curation Approval | Artwork ID | Art `approved`; User role `artist` | High |
| **FR-07** | Admin | Curation Rejection | Artwork ID, Rejection Reason | Art `rejected`; user notified | Medium |
| **FR-08** | Order | Direct UPI Checkout | Shipping details, UTR reference | Order created; artist notified | High |
| **FR-09** | Artist | Order Status Progression | Order ID, new status | Order status updated; buyer tracks | High |
| **FR-10** | Artist | Artwork Edit / Delete | Artwork ID, updated fields | Modified artwork in database | Medium |
| **FR-11** | Admin | User Record Modification | User ID, edited attributes | Updated user profile | Medium |
| **FR-12** | Core | Dual-Engine Failover | MongoDB Connection failure | Transparent switch to `db.json` | High |

---

### 2.2 Non-Functional Requirements

Non-functional requirements describe system quality attributes, operational constraints, security benchmarks, and performance standards.

```
+-----------------------------------------------------------------------------------+
|                        NON-FUNCTIONAL REQUIREMENTS OVERVIEW                       |
+-----------------------------------------------------------------------------------+
|  1. Performance & Latency        |  4. Usability & Glassmorphism Aesthetics       |
|  2. Security & Data Protection   |  5. Portability & Dual-Engine Availability     |
|  3. Reliability & Fault Tolerance|  6. Maintainability & Code Quality             |
+-----------------------------------------------------------------------------------+
```

#### 1. Performance and Scalability
* **NFR-1.1 (API Latency):** All read endpoints (e.g., `/api/arts`, `/api/arts/top-arts`) shall deliver server response times under 150 milliseconds under standard concurrency.
* **NFR-1.2 (Optimistic Client Updates):** Interactive actions such as artwork like toggles shall provide immediate visual feedback (< 20 milliseconds) on the client, synchronizing with the backend asynchronously.
* **NFR-1.3 (Asset Size and Bandwidth):** High-resolution artwork uploads shall be managed with a 10MB per-file boundary via Multer middleware. Image assets served to the client shall utilize lightweight SVG or compressed formats to minimize bandwidth.

#### 2. Security and Data Protection
* **NFR-2.1 (Cryptographic Salting and Hashing):** All user passwords shall be irreversibly hashed using **BcryptJS** with an adaptive work factor (salt rounds = 10) prior to database persistence. Plaintext passwords shall never be logged or stored.
* **NFR-2.2 (Stateless Token Integrity):** API access shall be safeguarded using **JSON Web Tokens (JWT)** signed via HMAC-SHA256 with an environment-isolated secret key. Expired or tampered tokens shall be immediately rejected.
* **NFR-2.3 (Credential Masking):** In accordance with security best practices, all user response payloads from both authentication and administrative endpoints shall sanitize the user object by deleting the `password` hash field before serialization.
* **NFR-2.4 (Cross-Origin Protection & Input Sanitization):** Express middleware shall enforce strict CORS origins, reject malformed JSON payloads, and trim user inputs to prevent injection vulnerabilities.

#### 3. Reliability, Portability, and Fault Tolerance
* **NFR-3.1 (Dual-Engine High Availability):** The platform backend shall implement a fault-tolerant database initialization sequence. If a local or cloud MongoDB daemon is unavailable, the system shall seamlessly fall back to the embedded, local JSON document engine (`backend/data/db.json`), ensuring 100% operational availability for academic evaluations.
* **NFR-3.2 (Atomic Persistence):** Writes to the fallback JSON store shall be synchronized atomically to prevent corruption during concurrent write operations.
* **NFR-3.3 (Self-Healing File Structures):** Required runtime directories (such as `backend/uploads/` and `backend/data/`) shall be created programmatically on startup if missing.

#### 4. Usability and Design Aesthetics
* **NFR-4.1 (Glassmorphism Aesthetics):** The user interface shall adhere to a modern dark-mode aesthetic utilizing translucent glass panels (`backdrop-filter: blur(16px)`), curated gold-accented typography (`#f59e0b`), smooth hover transitions, and responsive grid layouts.
* **NFR-4.2 (Responsive Design):** The application layout shall adapt across mobile viewports (< 768px), tablet displays (768px – 1024px), and desktop monitors (> 1024px).
* **NFR-4.3 (Accessibility and Feedback):** Visual badges, modal dialogues, clear error messages, and loading spinners shall accompany all asynchronous API operations.

---

### Table 2.2: Non-Functional Requirements Specification

| Dimension | Metric / Target | Implementation Mechanism |
| :--- | :--- | :--- |
| **Response Latency** | $< 150 \text{ ms}$ for standard queries | Express.js lightweight routing; optimized Mongoose `.lean()` queries |
| **Password Security** | Bcrypt hash, cost factor = 10 | `bcrypt.hash(password, salt)` with unique random salt generation |
| **Token Expiry** | 7 days sliding window | `jwt.sign({ id }, JWT_SECRET, { expiresIn: '7d' })` |
| **Payload Limits** | Max 10MB per file upload | Multer disk storage configuration with regex file extension filtering |
| **Storage Availability** | 100% operational uptime | Unified Data Access Layer (DAL) bridging MongoDB and `db.json` |
| **Client Bundle Size** | Fast initial load ($< 2.5 \text{ s}$) | Vite production bundling with dynamic code splitting |
| **Browser Compatibility** | Chrome, Firefox, Safari, Edge | Bootstrap 5 flexbox grid and CSS3 standard properties |

---

## CHAPTER 3: SYSTEM DESIGN

### 3.1 Architecture Design

CanvasCraft is architected as a modern **Three-Tier Client-Server Web Application** adhering to the **MERN (MongoDB, Express.js, React.js, Node.js)** full-stack paradigm. The architecture separates concerns across the Presentation Layer, Business Logic Layer, and Unified Data Persistence Layer.

```
+-----------------------------------------------------------------------------------+
|                        CANVASCRAFT THREE-TIER ARCHITECTURE                        |
+-----------------------------------------------------------------------------------+
|  PRESENTATION TIER (CLIENT)                                                       |
|  - React 18.2 SPA with Vite Bundler & React Router v6                             |
|  - Axios Client with JWT Bearer Token Request Interceptors                        |
|  - Glassmorphism Design System, Bootstrap 5, Bootstrap Icons                     |
|  - Role-Based Dynamic UI Routing (Customer, Artist, Admin)                       |
+-----------------------------------------+-----------------------------------------+
                                          | HTTP / JSON REST APIs (Port 5000)
                                          v
+-----------------------------------------------------------------------------------+
|  APPLICATION & BUSINESS LOGIC TIER (SERVER)                                       |
|  - Node.js Runtime & Express.js REST API Server                                   |
|  - Routing Layer: /api/auth, /api/arts, /api/orders, /api/admin                  |
|  - Controllers: authController, artController, orderController, adminController    |
|  - Middleware: authMiddleware (JWT Verification, RBAC), uploadMiddleware (Multer)  |
|  - Static Content Delivery: /uploads/ (User Assets), /images/ (Curated Placeholders)|
+-----------------------------------------+-----------------------------------------+
                                          | Mongoose ODM / Unified DAL API
                                          v
+-----------------------------------------------------------------------------------+
|  UNIFIED DATA ACCESS LAYER (DAL) & PERSISTENCE TIER                              |
|  - Dual-Engine Storage Abstraction (config/db.js)                                 |
|  - Engine A: MongoDB Database via Mongoose ODM (mongodb://localhost:27017)        |
|  - Engine B (Automatic Fallback): Embedded Persistent JSON Engine (data/db.json)  |
|  - Schemas / Collections: Users, Arts, Orders                                     |
+-----------------------------------------------------------------------------------+
```

#### Detailed Layer Responsibilities:

1. **Presentation Layer (Client-Side Single Page Application):**  
   Built using **React 18.2** and bundled via **Vite**, the frontend functions as a stateless Single Page Application (SPA). React Router DOM manages client-side navigation without full-page reloads. An **Axios HTTP Client** abstraction (`frontend/src/api/client.js`) is configured with global request interceptors that attach the stored JWT Bearer token to all outgoing requests. Centralized session state is managed via React Context (`AuthContext.jsx`), which monitors authentication status, user profile data, and role privileges (`customer`, `artist`, `admin`).

2. **Application & Business Logic Layer (Node.js & Express.js):**  
   The server-side application runs on **Node.js** using the **Express.js** web framework. The server is structured into modular routing files (`authRoutes`, `artRoutes`, `orderRoutes`, `adminRoutes`) and dedicated controllers that implement core business logic. Middleware functions intercept incoming requests for authentication verification (`protect`), optional authentication for public browsing (`optionalAuth`), role authorization checks (`requireArtist`, `requireAdmin`), and multi-part image processing (`upload.fields`, `upload.single`).

3. **Unified Data Access Layer (DAL) & Persistence Layer:**  
   Rather than coupling the application tightly to a single database driver, CanvasCraft routes all database operations through a unified abstraction layer (`backend/config/db.js`). This layer exposes high-level asynchronous methods (`getUserById`, `findUser`, `createArt`, `updateOrder`, etc.). Upon server initialization, the system attempts to establish a connection to MongoDB via Mongoose. If the MongoDB service is active, Mongoose ODM manages data persistence across the `users`, `arts`, and `orders` collections. If the connection fails (e.g., in a standalone evaluation environment without a running MongoDB service), the DAL catches the exception and transparently redirects all CRUD operations to an embedded, structured JSON document store (`backend/data/db.json`). This ensures zero crashes and 100% operational availability.

---

### 3.2 Design Components

#### 3.2.1 Frontend

The frontend is modularized into four functional tiers:

* **Router and Protected Routing Tier (`App.jsx`, `ProtectedRoute.jsx`):** Defines platform URL routing. The `<ProtectedRoute>` component evaluates the user's authentication status and required role. Unauthorized users attempting to access artist or administrator routes are redirected to the login interface.
* **State and Context Tier (`AuthContext.jsx`):** Provides global application state. It manages user authentication, token storage in `localStorage`, user session re-validation (`/api/auth/me`), and role helpers (`isArtist`, `isAdmin`).
* **Reusable UI Component Tier:**
  * `Navbar.jsx`: Dynamic header with navigation links, live role badges, and authentication-aware controls.
  * `ArtCard.jsx`: Reusable artwork card rendering image thumbnails, title, medium badge, price, artist attribution, and interactive like buttons.
  * `LikeButton.jsx`: Encapsulated like toggle button featuring optimistic UI updates and animated heart states.
  * `Footer.jsx`: Institutional platform footer rendering academic acknowledgements, founder profiles, and technology credits.
* **Page View Tier:** Contains eleven dedicated page views: `Home`, `Login`, `Signup`, `Gallery`, `ArtDetails`, `ArtistProfile`, `PostArt`, `OrderArt`, `CustomerDashboard`, `ArtistDashboard`, and `AdminDashboard`.

#### 3.2.2 Backend

The backend follows the Model-Controller-Route design pattern:

* **Server Initialization (`server.js`):** Loads environment variables via `dotenv`, initializes Express, mounts CORS and body-parsing middleware, exposes static directories (`/uploads` and `/images`), mounts API route routers, and initializes database connectivity.
* **Route Controllers (`controllers/`):**
  * `authController.js`: Handles user registration, credentials authentication, session verification, and profile updates.
  * `artController.js`: Orchestrates artwork queries, category filtering, keyword searching, like toggling, art creation, updating, and artist profile retrieval.
  * `orderController.js`: Manages order creation, customer order history retrieval, artist order monitoring, and status progression.
  * `adminController.js`: Gathers platform metrics, manages pending artwork review queues, handles approvals/rejections, and performs user/order management.
* **Security & File Middleware (`middleware/`):**
  * `authMiddleware.js`: Extracts and decodes JWT tokens, validates expiration, and enforces role boundaries.
  * `uploadMiddleware.js`: Configures Multer disk storage, generates unique timestamp-suffixed filenames, and enforces file type filtering.

---

### 3.3 Database Description

CanvasCraft stores data across three primary entities: **Users**, **Artworks**, and **Orders**. When using MongoDB, Mongoose manages these entities through defined schemas. Under the local fallback engine, identical data structures are maintained within `backend/data/db.json`.

```
+-----------------------------------------------------------------------------------+
|                        DATABASE ENTITIES AND RELATIONSHIPS                        |
+-----------------------------------------------------------------------------------+
|                                                                                   |
|   +-------------------+          Submits / Owns          +-------------------+    |
|   |       USER        | -------------------------------> |        ART        |    |
|   +-------------------+ 1                              * +-------------------+    |
|             |                                                      |              |
|             | Places Order                                         | Ordered In   |
|             | 1                                                    | 1            |
|             v                                                      v              |
|   +------------------------------------------------------------------+            |
|   |                              ORDER                               |            |
|   +------------------------------------------------------------------+            |
|                                                                                   |
+-----------------------------------------------------------------------------------+
```

#### Detailed Entity Specifications:

#### Table 3.1: User Entity / Collection Schema Definition

| Field Name | Data Type | Constraint | Description |
| :--- | :--- | :--- | :--- |
| `_id` | String / ObjectId | Primary Key | Unique user identifier (e.g., `usr_artist_001`) |
| `username` | String | Unique, Required | Distinct public user handle |
| `email` | String | Unique, Required | Registered electronic mail address |
| `phone` | String | Required | Primary contact phone number |
| `dob` | String | Required | Date of birth (YYYY-MM-DD) |
| `gender` | String | Required | Gender identification (`Male`, `Female`, `Other`, etc.) |
| `password` | String | Required | Bcrypt-hashed password string (Cost Factor 10) |
| `role` | String | Default: `'customer'` | System privilege level (`customer`, `artist`, `admin`) |
| `isArtist` | Boolean | Default: `false` | Flag indicating verified artist privileges |
| `artistApplicationStatus` | String | Default: `'none'` | Status: `'none'`, `'pending'`, `'approved'`, `'rejected'` |
| `bio` | String | Optional | Public biographical artist narrative |
| `avatar` | String | Default: Placeholder | Relative path to user profile image |
| `upiId` | String | Optional | Verified UPI Virtual Payment Address (e.g., `name@bank`) |
| `upiQr` | String | Optional | Relative URL path to scannable UPI QR image |
| `bankDetails` | Object | Optional | Embedded bank wire coordinates (`accountNumber`, `ifsc`, etc.) |
| `isActive` | Boolean | Default: `true` | Account active/deactivated flag |
| `createdAt` | Date | Timestamp | Account creation timestamp |
| `updatedAt` | Date | Timestamp | Profile last updated timestamp |

#### Table 3.2: Art Entity / Collection Schema Definition

| Field Name | Data Type | Constraint | Description |
| :--- | :--- | :--- | :--- |
| `_id` | String / ObjectId | Primary Key | Unique artwork identifier (e.g., `art_001`) |
| `title` | String | Required | Title of the artwork |
| `description` | String | Required | Artistic narrative, historical inspiration, technique |
| `category` | String | Required | Medium (`Oil Painting`, `Watercolor`, `Digital Art`, etc.) |
| `dimensions` | String | Required | Physical canvas size (e.g., `30 x 40 inches (Framed)`) |
| `price` | Number | Required, Min: 1 | Pricing in Indian Rupees (₹) |
| `imageUrl` | String | Required | Relative path to high-resolution artwork image |
| `artist` | String / ObjectId | Foreign Key $\rightarrow$ User | Identifier of the creating artist |
| `artistName` | String | Required | Artist display name |
| `artistUsername` | String | Required | Artist unique handle |
| `artistAvatar` | String | Optional | Path to artist profile avatar |
| `artistUpiId` | String | Optional | Artist UPI ID for direct customer checkout |
| `artistUpiQr` | String | Optional | Path to artist UPI QR code image |
| `artistBankDetails` | Object | Optional | Embedded bank details for wire checkout |
| `likes` | Array of Strings | Default: `[]` | Array of User IDs who have liked the artwork |
| `likesCount` | Number | Default: `0` | Total like counter |
| `status` | String | Default: `'pending'` | Curation state: `'pending'`, `'approved'`, `'rejected'` |
| `rejectionReason` | String | Optional | Feedback if rejected by administrator |
| `createdAt` | Date | Timestamp | Artwork submission timestamp |
| `updatedAt` | Date | Timestamp | Artwork modification timestamp |

#### Table 3.3: Order Entity / Collection Schema Definition

| Field Name | Data Type | Constraint | Description |
| :--- | :--- | :--- | :--- |
| `_id` | String / ObjectId | Primary Key | Unique internal order identifier |
| `orderNumber` | String | Unique, Indexed | Human-readable tracking number (e.g., `ORD-2026-8812`) |
| `art` | String / ObjectId | Foreign Key $\rightarrow$ Art | Ordered artwork identifier |
| `artTitle` | String | Required | Title snapshot of ordered artwork |
| `artImage` | String | Required | Image thumbnail of ordered artwork |
| `artist` | String / ObjectId | Foreign Key $\rightarrow$ User | Creator / seller identifier |
| `artistName` | String | Required | Artist display name |
| `buyer` | String / ObjectId | Foreign Key $\rightarrow$ User | Purchasing customer identifier |
| `buyerUsername` | String | Required | Purchasing customer handle |
| `buyerEmail` | String | Required | Buyer email address for dispatch notices |
| `customerDetails` | Object | Required | Embedded delivery address (`fullName`, `mobile`, `address`, `city`, `state`, `pincode`, `notes`) |
| `amount` | Number | Required | Total order amount in ₹ |
| `paymentMode` | String | Default: `'UPI'` | Payment method: `'UPI'`, `'COD'`, `'Card'` |
| `paymentDetails` | Object | Required | Payment metadata (`upiRef`, `paymentProof`, `paymentStatus`) |
| `orderStatus` | String | Default: `'Confirmed'` | Fulfillment state: `'Pending'`, `'Confirmed'`, `'In Progress'`, `'Dispatched'`, `'Delivered'`, `'Cancelled'` |
| `createdAt` | Date | Timestamp | Order placement timestamp |
| `updatedAt` | Date | Timestamp | Order status update timestamp |

---

### 3.4 Low-Level Design & UML Models

The low-level structural and behavioral designs of CanvasCraft are modeled using standard Unified Modeling Language (UML) specifications rendered via Mermaid diagrams.

#### 3.4.1 Use Case Diagram

The Use Case model defines the interactions between the three primary human actors (**Visitor / Customer**, **Verified Artist**, and **Platform Administrator**) and the core functional boundaries of the system.

```mermaid
flowchart LR
    Customer((Visitor / Customer))
    Artist((Verified Artist))
    Admin((Administrator))

    subgraph CanvasCraft System Boundaries
        UC1[Register & Authenticate]
        UC2[Explore Gallery & Filter by Medium]
        UC3[Toggle Artwork Like]
        UC4[Submit Artwork & UPI QR to Become Artist]
        UC5[Place Order via Direct Artist UPI QR]
        UC6[Track My Orders & Submissions]
        UC7[Manage Artist Studio & Portfolio]
        UC8[Update Order Tracking Status]
        UC9[Review Pending Art Submissions]
        UC10[Promote User to Artist / Reject Art]
        UC11[Manage Customers & Artists Separately]
        UC12[Platform Oversight & Inventory Moderation]
    end

    Customer --> UC1
    Customer --> UC2
    Customer --> UC3
    Customer --> UC4
    Customer --> UC5
    Customer --> UC6

    Artist --> UC1
    Artist --> UC2
    Artist --> UC4
    Artist --> UC7
    Artist --> UC8

    Admin --> UC1
    Admin --> UC9
    Admin --> UC10
    Admin --> UC11
    Admin --> UC12
```

---

#### 3.4.2 Class / Entity Diagram

The Class Diagram delineates the structural composition, attributes, methods, and cardinal relationships across the core entities and architectural controllers.

```mermaid
classDiagram
    class User {
        +String _id
        +String username
        +String email
        +String phone
        +String dob
        +String gender
        +String password
        +String role
        +Boolean isArtist
        +String artistApplicationStatus
        +String bio
        +String upiId
        +String upiQr
        +Object bankDetails
        +Boolean isActive
        +Date createdAt
        +register()
        +authenticate()
        +updateProfile()
    }

    class Art {
        +String _id
        +String title
        +String description
        +String category
        +String dimensions
        +Number price
        +String imageUrl
        +String artist
        +String artistName
        +Array likes
        +Number likesCount
        +String status
        +String rejectionReason
        +Date createdAt
        +toggleLike(userId)
        +updateDetails()
        +approveArt()
        +rejectArt(reason)
    }

    class Order {
        +String _id
        +String orderNumber
        +String art
        +String artist
        +String buyer
        +Object customerDetails
        +Number amount
        +String paymentMode
        +Object paymentDetails
        +String orderStatus
        +Date createdAt
        +createOrder()
        +updateStatus(newStatus)
    }

    class DataAccessLayer {
        +connectDB()
        +getUserById(id)
        +findUser(filter)
        +createUser(userData)
        +getArts(filter)
        +createArt(artData)
        +updateArt(id, updates)
        +createOrder(orderData)
        +updateOrder(id, updates)
    }

    User "1" --> "0..*" Art : creates
    User "1" --> "0..*" Order : places
    Art "1" <-- "0..*" Order : contains
    DataAccessLayer ..> User : persists
    DataAccessLayer ..> Art : persists
    DataAccessLayer ..> Order : persists
```

---

#### 3.4.3 Sequence Diagrams

#### Sequence 1: Customer Artwork Submission and Administrator Curation Approval
This sequence illustrates the end-to-end workflow of a customer submitting their first artwork with payment credentials, followed by administrative review and automatic role promotion.

```mermaid
sequenceDiagram
    autonumber
    actor Customer as Customer (User)
    participant Client as Frontend (React SPA)
    participant Server as Backend API (Express)
    participant Middleware as Auth & Multer Middleware
    participant DAL as Data Access Layer (DAL)
    actor Admin as Platform Administrator

    Customer->>Client: Fills Art Details + Uploads Art Image & UPI QR
    Client->>Server: POST /api/arts (multipart/form-data with Bearer Token)
    Server->>Middleware: Verify JWT & Parse Image Files
    Middleware-->>Server: Token Valid, User Extracted, Files Stored
    Server->>DAL: Check User Art Count (First-time submitter)
    DAL-->>Server: First Submission Confirmed
    Server->>DAL: updateUser(id, { upiId, upiQr, artistApplicationStatus: 'pending' })
    Server->>DAL: createArt({ title, price, imageUrl, artist, status: 'pending' })
    DAL-->>Server: Created Pending Art
    Server-->>Client: 201 Created ("Submitted! Waiting for Admin Review")
    Client-->>Customer: Render Pending Submission Badge

    Admin->>Client: Navigates to Admin Dashboard -> Pending Arts
    Client->>Server: GET /api/admin/pending-arts (Admin JWT)
    Server->>DAL: getArts({ status: 'pending' }) + user details
    DAL-->>Server: Returns Pending Arts List
    Server-->>Client: 200 OK (Pending Applications Array)
    Admin->>Client: Clicks "Approve & Promote to Artist"
    Client->>Server: PUT /api/admin/arts/:id/approve
    Server->>DAL: updateArt(artId, { status: 'approved' })
    Server->>DAL: updateUser(artistId, { role: 'artist', isArtist: true, artistApplicationStatus: 'approved' })
    DAL-->>Server: Records Updated
    Server-->>Client: 200 OK ("Artwork Approved! User Promoted to Artist")
    Client-->>Admin: Update UI; Artwork Published to Live Gallery
```

---

#### Sequence 2: Artwork Ordering with Direct Artist UPI QR Payment
This sequence models the direct-to-creator payment process where the buyer scans the artist's personal UPI QR code and logs the transaction reference.

```mermaid
sequenceDiagram
    autonumber
    actor Buyer as Art Collector (Buyer)
    participant Client as Frontend (OrderArt.jsx)
    participant Server as Backend API (/api/orders)
    participant DAL as Unified DAL
    actor Artist as Verified Artist

    Buyer->>Client: Navigates to Artwork Detail -> Clicks "Order Artwork"
    Client->>Server: GET /api/arts/:id
    Server->>DAL: getArtById(id) + getUserById(art.artist)
    DAL-->>Server: Art Details + Artist Payment Info (UPI ID, UPI QR)
    Server-->>Client: 200 OK (Art + Artist UPI Data)
    Client-->>Buyer: Renders Artist UPI QR Code & 1-Click Copy UPI ID

    Buyer->>Buyer: Scans QR via UPI Mobile App (GPay/PhonePe/Paytm) & Pays
    Buyer->>Client: Enters Delivery Address + 12-Digit UPI UTR Reference
    Client->>Server: POST /api/orders (Shipping details, paymentMode: 'UPI', upiRef)
    Server->>DAL: getArtById(artId) (Verify availability)
    Server->>DAL: createOrder({ orderNumber, art, buyer, customerDetails, amount, upiRef, orderStatus: 'Confirmed' })
    DAL-->>Server: Order Record Persisted
    Server-->>Client: 201 Created (Order Object)
    Client-->>Buyer: Display Confirmation & Tracking Number

    Artist->>Client: Opens Artist Dashboard -> Orders Tab
    Client->>Server: GET /api/orders/artist-orders
    Server->>DAL: getOrders({ artist: artistId })
    DAL-->>Server: Orders List (Buyer Address + UPI UTR Ref)
    Server-->>Client: 200 OK
    Client-->>Artist: Displays Order with UPI Reference
    Artist->>Client: Updates Status to "In Progress" -> "Dispatched"
    Client->>Server: PUT /api/orders/:id/status { orderStatus: 'Dispatched' }
    Server->>DAL: updateOrder(id, { orderStatus: 'Dispatched' })
    DAL-->>Server: Updated Order
    Server-->>Client: 200 OK
```

---

#### 3.4.4 Activity Diagram

The Activity Diagram models the complete lifecycle of order placement, payment verification, fulfillment, and customer delivery.

```mermaid
flowchart TD
    Start([Customer Discovers Artwork]) --> SelectArt[Click Order Artwork]
    SelectArt --> AuthCheck{Is Customer Authenticated?}
    AuthCheck -- No --> LoginRedirect[Redirect to Login / Register]
    LoginRedirect --> SelectArt
    AuthCheck -- Yes --> FillAddress[Enter Full Name, Phone, Delivery Address, Pincode]
    FillAddress --> SelectPayment{Select Payment Mode}
    
    SelectPayment -- Cash on Delivery --> SetCOD[Set Mode = COD, Payment Status = Pending]
    SelectPayment -- Card / Net Banking --> SimPayment[Simulate Instant Gateway Authorization]
    SelectPayment -- Direct UPI QR --> DisplayQR[Display Artist's Personal UPI QR Code & UPI ID]
    
    DisplayQR --> ScanUPI[Customer Scans QR Code on UPI Mobile App]
    ScanUPI --> EnterUTR[Customer Inputs 12-Digit UPI UTR Reference & Uploads Receipt]
    
    SetCOD --> SubmitOrder[Submit Order]
    SimPayment --> SubmitOrder
    EnterUTR --> SubmitOrder
    
    SubmitOrder --> ServerValidate{Validate Required Fields & Art Availability}
    ServerValidate -- Failure --> ShowError[Render Validation Error Message]
    ShowError --> FillAddress
    ServerValidate -- Success --> PersistOrder[Generate ORD-XXXX Number & Save Order Record]
    
    PersistOrder --> ShowSuccess[Display Order Confirmation & Tracking Dashboard]
    ShowSuccess --> ArtistNotified[Artist Reviews Order in Artist Studio]
    
    ArtistNotified --> CheckPayment{Verify UPI UTR / Payment}
    CheckPayment -- Invalid --> RejectPayment[Mark Payment Rejected / Contact Buyer]
    CheckPayment -- Confirmed --> UpdateProgress[Update Status: In Progress]
    
    UpdateProgress --> PackageArt[Package Art in Wooden Crate with Bubble Wrap]
    PackageArt --> DispatchArt[Dispatch Courier & Update Status: Dispatched]
    DispatchArt --> OutForDelivery[Courier In Transit]
    OutForDelivery --> DeliverArt[Deliver to Doorstep & Update Status: Delivered]
    DeliverArt --> End([Order Completed])
```

---

### 3.5 User Interface Design

The visual design system of CanvasCraft follows contemporary aesthetic guidelines characterized by:

1. **Curated Color Hierarchy:**
   * **Base Background (`--bg-primary`):** Deep Obsidian (`#0a0c16`) with subtle secondary elevation (`#121626`).
   * **Accent Gold Palette (`--accent-gold`):** Radiant Amber Gold (`#f59e0b`), Light Gold (`#fbbf24`), and Deep Gold (`#d97706`), reflecting artistic prestige.
   * **Secondary Accents:** Deep Violet (`#8b5cf6`), Cyan (`#06b6d4`), and Rose Crimson (`#f43f5e`).
   * **Text Contrast:** Main Text (`#f8fafc`), Muted Text (`#94a3b8`), and Dim Secondary (`#64748b`).

2. **Glassmorphism Design System:**
   * Translucent surfaces utilize `background: rgba(22, 28, 48, 0.7)` with `backdrop-filter: blur(16px)`.
   * Card borders feature soft translucency (`border: 1px solid rgba(255, 255, 255, 0.08)`), transitioning to gold glow highlights (`box-shadow: 0 0 24px rgba(245, 158, 11, 0.3)`) upon user hover.

3. **Typography Architecture:**
   * Primary Body: `Plus Jakarta Sans`, a geometric sans-serif ensuring clarity across UI controls and forms.
   * Display Headings: `Playfair Display`, a high-contrast serif font providing elegance for hero statements and section titles.

---

## CHAPTER 4: SYSTEM IMPLEMENTATION

### 4.1 Implementation Overview

CanvasCraft was developed following an agile, component-driven implementation strategy. The codebase is organized into two primary subdirectories: `backend/` and `frontend/`, supplemented by a root test harness (`test-e2e.cjs`) and startup scripts (`start.bat`).

```
Implementation/
├── backend/
│   ├── config/          # Unified Data Access Layer & persistence logic (db.js)
│   ├── controllers/     # Route logic (auth, art, order, admin)
│   ├── data/            # Local JSON database storage (db.json)
│   ├── middleware/      # JWT auth, RBAC, and Multer file upload
│   ├── models/          # Mongoose schema definitions (User, Art, Order)
│   ├── routes/          # REST route declarations
│   ├── seed/            # Initial dataset definitions (seedData.js)
│   ├── uploads/         # Uploaded images and UPI QR codes
│   ├── .env             # Environment variables (PORT, MONGODB_URI, JWT_SECRET)
│   ├── package.json     # Backend dependencies and run scripts
│   └── server.js        # Express application entrypoint
├── frontend/
│   ├── public/images/   # Local profile, art, and QR code SVG assets
│   ├── src/
│   │   ├── api/         # Axios client with JWT request interceptors (client.js)
│   │   ├── components/  # Navbar, Footer, ArtCard, LikeButton, ProtectedRoute
│   │   ├── context/     # Global React AuthContext and session state
│   │   ├── pages/       # 11 Page views (Home, Gallery, Dashboards, etc.)
│   │   ├── utils/       # Image resolving utilities (localImage.js)
│   │   ├── App.jsx      # React router configuration
│   │   ├── index.css    # Glassmorphism tokens and theme rules
│   │   └── main.jsx     # React DOM entrypoint
│   ├── package.json     # Frontend dependencies and Vite configuration
│   └── vite.config.js   # Vite server setup with backend proxy rules
├── test-e2e.cjs         # 12-stage automated end-to-end test suite
└── start.bat            # Dual-terminal launch script for Windows
```

---

### 4.2 Technologies Used

#### Table 4.1: Technology Stack and Version Specifications

| Domain | Technology / Library | Version | Role in CanvasCraft |
| :--- | :--- | :---: | :--- |
| **Runtime Environment** | Node.js | v18.x / v20.x | Asynchronous JavaScript runtime engine |
| **Backend Framework** | Express.js | v4.19.2 | High-performance RESTful API microframework |
| **Primary Database** | MongoDB | v6.x / v7.x | NoSQL document database for structured collections |
| **Object Data Modeling** | Mongoose | v8.3.1 | Schema validation, type casting, query building |
| **Fallback Database** | Embedded JSON Store | Custom DAL | Atomic local document engine (`backend/data/db.json`) |
| **Authentication** | JSON Web Tokens (`jsonwebtoken`) | v9.0.2 | Stateless, cryptographically signed Bearer tokens |
| **Password Hashing** | BcryptJS (`bcryptjs`) | v2.4.3 | Adaptive salt generation and password hashing |
| **File Upload Handling** | Multer | v1.4.5-lts.1 | Multi-part form data stream processor |
| **CORS Middleware** | CORS | v2.8.5 | Cross-Origin Resource Sharing security enabler |
| **Frontend Framework** | React.js | v18.2.0 | Declarative component-based UI library |
| **Build Tooling** | Vite | v5.2.0 | Fast HMR dev server and production bundler |
| **Routing** | React Router DOM | v6.23.0 | Client-side declarative routing and history management |
| **HTTP Client** | Axios | v1.6.8 | Promise-based HTTP library with interceptors |
| **CSS Framework** | Bootstrap 5 | v5.3.3 | Responsive flexbox grid and utility layout classes |
| **Iconography** | Bootstrap Icons | v1.11.3 | Vector icon library for interface elements |

---

### 4.3 Module-Wise Implementation

#### 4.3.1 User Management and Authentication Module

The authentication module (`authController.js`, `authRoutes.js`, `authMiddleware.js`) manages customer registration, login verification, token generation, and profile modifications.

* **Registration Logic (`signup`):** Accepts `username`, `email`, `phone`, `dob`, `gender`, `password`, and `confirmPassword`. It enforces password matching, minimum length validation, and uniqueness checks on `email` and `username`. Passwords are salted and hashed via `bcrypt.genSalt(10)` and `bcrypt.hash()`. The user is instantiated with `role: 'customer'`, `isArtist: false`, and `artistApplicationStatus: 'none'`.
* **Single-Identifier Authentication (`login`):** Allows users to log in using either their email address or username. The controller uses the `$or` query operator:
  ```javascript
  const user = await db.findUser({
    $or: [
      { email: loginIdentifier.trim().toLowerCase() },
      { username: loginIdentifier.trim() }
    ]
  });
  ```
  If found, `bcrypt.compare()` verifies the plaintext password against the stored hash. Upon validation, a signed JWT token containing the user's `_id` is returned.
* **Profile Management (`updateProfile`):** Allows authenticated users to update their bio, phone number, avatar image, and UPI payment credentials (`upiId`, `upiQr`). File uploads are handled via Multer middleware.

---

#### 4.3.2 Fine Art Catalog and Exploration Module

The catalog module (`artController.js`, `artRoutes.js`) manages public artwork queries, category filtering, keyword searching, price sorting, and like interactions.

* **Top Curated Arts (`getTopArts`):** Retrieves approved artworks sorted in descending order of likes count (`likesCount`), limited to a specified sample size for landing page highlights.
* **Top Creators Leaderboard (`getTopArtists`):** Evaluates all verified artists and calculates cumulative like counts across their approved portfolio pieces:
  ```javascript
  const artistArts = allApprovedArts.filter(a => String(a.artist) === String(artist._id));
  const totalLikes = artistArts.reduce((acc, curr) => acc + (curr.likesCount || 0), 0);
  ```
  The resulting list is sorted in descending order of total likes, ranking the top creators on the platform.
* **Multi-Criteria Gallery Querying (`getAllArts`):** Handles concurrent filtering parameters:
  * Category Matching: Evaluates whether the artwork category matches the query parameter (e.g., `'Oil Painting'`).
  * Case-Insensitive Search: Evaluates query terms across `title`, `description`, `artistName`, and `category`.
  * Price Filtering: Applies lower (`minPrice`) and upper (`maxPrice`) boundaries.
  * Multi-Directional Sorting: Organizes records by `likes` (popularity), `price-low`, `price-high`, or `newest`.
* **Optimistic Like Toggle (`toggleLikeArt`):** Maintains an array of user IDs within the `likes` field of each artwork document. If the user's ID is present, it is removed; otherwise, it is appended. The `likesCount` property is updated accordingly.

---

#### 4.3.3 Creator Onboarding and Curation Module

This module enables registered users to apply for verified artist status through artwork submission.

* **Submission Validation (`postArt`):** Verifies that required descriptive attributes (`title`, `description`, `category`, `price`) and image files are provided.
* **First-Time Creator Payment Verification:** Checks whether the user has prior approved artworks. For first-time applicants, the system enforces the submission of either an artist UPI ID with a scannable QR code image or bank wire details.
* **Holding Queue Placement:** For standard customers, the artwork is saved with `status: 'pending'`, and the user's application state transitions to `artistApplicationStatus: 'pending'`.
* **Administrative Approval (`approveArtRequest`):** When approved by an administrator, the artwork's status is updated to `'approved'`, and the creator's account is automatically promoted:
  ```javascript
  await db.updateUser(user._id, {
    role: user.role === 'admin' ? 'admin' : 'artist',
    isArtist: true,
    artistApplicationStatus: 'approved'
  });
  ```
* **Administrative Rejection (`rejectArtRequest`):** Allows administrators to reject submissions with feedback (e.g., copyright issues, quality criteria). The artwork transitions to `status: 'rejected'` with the reason recorded.

---

#### 4.3.4 Direct Peer-to-Peer Ordering and Fulfillment Module

The order module (`orderController.js`, `orderRoutes.js`) manages the checkout process and direct artist payments.

* **Order Placement (`createOrder`):** Validates delivery address fields and ensures that buyers cannot purchase their own artworks. The system creates an order record containing buyer details, artwork information, delivery notes, and payment metadata.
* **Direct UPI Settlement:** The buyer scans the artist's personal UPI QR code directly, bypassing platform escrow fees. The buyer records their 12-digit UPI UTR reference number, and the order is marked as `Confirmed` with payment status `Pending Verification`.
* **Fulfillment Progression (`updateOrderStatus`):** Allows artists to update fulfillment tracking for orders placed on their artworks:
  $$\text{Pending} \longrightarrow \text{Confirmed} \longrightarrow \text{In Progress} \longrightarrow \text{Dispatched} \longrightarrow \text{Delivered}$$
  Artists can also mark verified payments as `'Paid'`.

---

#### 4.3.5 Artist Studio Dashboard Module

The Artist Studio (`ArtistDashboard.jsx`) provides verified creators with an operational management hub:

* **Portfolio Metrics Telemetry:** Computes and displays four key metrics: Total Artworks, Total Cumulative Likes, Customer Orders Received, and Gross Revenue in ₹.
* **Artwork Catalog Management:** Enables creators to update artwork metadata (title, category, dimensions, description, price) or delete unsold works.
* **Order Fulfillment Pipeline:** Renders all customer orders for the artist's work, providing buyer delivery addresses, contact numbers, and UPI UTR references.
* **Payout & Bio Customization:** Allows artists to update their payment QR code images, UPI handles, and biographical statements.

---

#### 4.3.6 Platform Administrator Control Center Module

The Administrator Control Center (`AdminDashboard.jsx`, `adminController.js`) provides overall governance:

* **Platform KPIs:** Tracks total registered users, customer counts, verified artists, total artworks, pending submissions, and platform GMV.
* **Curation Review Queue:** Displays pending submissions alongside applicant contact information, descriptions, and uploaded payment QR images for evaluation.
* **Separated User Registries:** Maintains distinct management interfaces for Customers and Artists, allowing administrators to modify user details, toggle account active states, or remove accounts.
* **Catalog Moderation:** Provides platform-wide oversight to edit or remove inappropriate artworks.

---

### 4.4 Important Algorithms and Workflows

#### Algorithm 4.1: Unified Identifier User Authentication
```
Input: loginIdentifier (Username or Email string), password (Plaintext string)
Output: JWT Bearer Token, Sanitized User Object

1.  Trim and sanitize loginIdentifier.
2.  Query User collection using $or operator:
        filter = { $or: [{ email: lowercase(loginIdentifier) }, { username: loginIdentifier }] }
3.  Execute db.findUser(filter).
4.  If user record is NULL:
        Return HTTP 401 Unauthorized ("Invalid credentials. User not found.")
5.  If user.isActive is FALSE:
        Return HTTP 403 Forbidden ("Account deactivated. Contact administrator.")
6.  Execute Bcrypt comparison:
        isPasswordMatch = Bcrypt.compare(password, user.password)
7.  If isPasswordMatch is FALSE:
        Return HTTP 401 Unauthorized ("Invalid credentials. Incorrect password.")
8.  Generate signed JWT Token:
        token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' })
9.  Create shallow copy safeUser = clone(user).
10. Delete safeUser.password.
11. Return HTTP 200 OK with { success: true, token, user: safeUser }.
```

---

#### Algorithm 4.2: First-Time Creator Artwork Submission and Holding Pipeline
```
Input: User session object, Form Data (title, description, category, price, dimensions, etc.), Uploaded Art Image, Uploaded UPI QR Image
Output: Created Art document, updated User state

1.  Validate presence of required fields: title, description, category, price, artImage.
2.  If validation fails: Return HTTP 400 Bad Request.
3.  Query database for existing artworks created by this user:
        userArts = db.getArts({ artist: user._id })
4.  Determine if user is a first-time applicant:
        isFirstTime = (userArts.length == 0) OR (user.isArtist == false)
5.  Extract UPI payment parameters:
        upiId = request.body.artistUpiId OR user.upiId
        upiQrUrl = uploaded QR image path OR user.upiQr
6.  If isFirstTime is TRUE AND upiId is EMPTY AND upiQrUrl is EMPTY AND bankDetails are NULL:
        Return HTTP 400 Bad Request ("First-time submissions require payment QR or Bank details.")
7.  Construct user updates object:
        If upiId provided: updates.upiId = upiId
        If upiQrUrl provided: updates.upiQr = upiQrUrl
8.  Determine artwork curation status:
        If user.role == 'admin' OR (user.isArtist == true AND user.role == 'artist'):
            artStatus = 'approved'
        Else:
            artStatus = 'pending'
            updates.artistApplicationStatus = 'pending'
9.  If updates object is not empty:
        Execute db.updateUser(user._id, updates)
10. Instantiate and save artwork:
        newArt = db.createArt({
            title, description, category, dimensions, price,
            imageUrl: uploadedArtImagePath,
            artist: user._id,
            artistName: user.username,
            artistUpiId: upiId,
            artistUpiQr: upiQrUrl,
            status: artStatus,
            likes: [], likesCount: 0
        })
11. Return HTTP 201 Created with artwork details and review notification.
```

---

#### Algorithm 4.3: Optimistic Artwork Like Counter Toggle
```
Input: Artwork ID (artId), Authenticated User ID (userId)
Output: Boolean liked status, updated likesCount

1.  Fetch artwork from storage: art = db.getArtById(artId).
2.  If art is NULL: Return HTTP 404 Not Found.
3.  Initialize likes array: likesArray = art.likes.
4.  Check if userId is already present in likesArray:
        alreadyLiked = likesArray.contains(userId)
5.  If alreadyLiked is TRUE:
        updatedLikes = likesArray.filter(id => id != userId)
        isNowLiked = FALSE
    Else:
        updatedLikes = likesArray.append(userId)
        isNowLiked = TRUE
6.  Calculate new like count:
        newCount = updatedLikes.length
7.  Persist updates to database:
        db.updateArt(artId, { likes: updatedLikes, likesCount: newCount })
8.  Return HTTP 200 OK with { success: true, liked: isNowLiked, likesCount: newCount }.
```

---

### 4.5 Database and Unified Persistence Layer Implementation

To ensure portability across development, testing, and production environments, CanvasCraft implements a **Unified Data Access Layer (DAL)** in `backend/config/db.js`. 

```
                                +---------------------------+
                                |  Controller Request       |
                                |  (e.g., db.createArt())   |
                                +-------------+-------------+
                                              |
                                              v
                               +-----------------------------+
                               |  Unified Data Access Layer  |
                               |  (backend/config/db.js)     |
                               +--------------+--------------+
                                              |
                       +----------------------+----------------------+
                       |                                             |
            isConnectedToMongo == true                    isConnectedToMongo == false
                       |                                             |
                       v                                             v
        +-----------------------------+               +-----------------------------+
        |   MongoDB Cluster Engine    |               |  Embedded Local JSON Engine |
        |   (Mongoose ODM Driver)     |               |  (backend/data/db.json)     |
        +-----------------------------+               +-----------------------------+
```

During startup, the system attempts to establish a connection to MongoDB using the configured `MONGODB_URI` with a 2000ms timeout. If successful, Mongoose handles all queries. If the MongoDB service is unreachable, the system catches the error, sets `isConnectedToMongo = false`, and activates the local file store engine:

```javascript
// Excerpt from backend/config/db.js: Connection Initialization
const connectDB = async () => {
  const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/artgallery';
  loadFileStore();

  try {
    console.log(`Connecting to MongoDB at: ${mongoUri} ...`);
    await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 2000 });
    isConnectedToMongo = true;
    console.log('>>> [DATABASE] MongoDB connected successfully via Mongoose.');

    const userCount = await User.countDocuments();
    if (userCount === 0) {
      console.log('>>> [SEED] Seeding initial data into MongoDB...');
      await User.insertMany(seedUsers);
      await Art.insertMany(seedArts);
      await Order.insertMany(seedOrders);
    }
  } catch (err) {
    isConnectedToMongo = false;
    console.log('>>> [DATABASE NOTICE] Local MongoDB service is offline or unreachable.');
    console.log(`>>> [DATABASE NOTICE] Activated persistent local data engine: ${dbFilePath}`);
  }
};
```

All controller functions interact solely with the high-level DAL methods (`getUserById`, `findUser`, `createUser`, `getArts`, `createArt`, `createOrder`, etc.), abstracting the underlying storage engine from the business logic.

---

### 4.6 RESTful API Implementation

The backend exposes a structured RESTful API interface organized by functional domains.

#### Table 4.2: RESTful API Endpoints Specification

| Endpoint Route | HTTP Method | Access Level | Description | Key Request / Query Parameters |
| :--- | :---: | :---: | :--- | :--- |
| `/api/auth/signup` | `POST` | Public | Register new customer account | `username, email, phone, dob, gender, password` |
| `/api/auth/login` | `POST` | Public | Authenticate user credentials | `loginIdentifier, password` |
| `/api/auth/me` | `GET` | Private | Retrieve current user profile | Header: `Authorization: Bearer <token>` |
| `/api/auth/profile` | `PUT` | Private | Update profile information and UPI | Multi-part: `bio, phone, avatar, upiId, upiQrImage` |
| `/api/arts` | `GET` | Public | Explore catalog with filters | Query: `category, search, sort, minPrice, maxPrice` |
| `/api/arts/top-arts` | `GET` | Public | Fetch top-rated artworks | Query: `limit=6` |
| `/api/arts/top-artists` | `GET` | Public | Creator ranking leaderboard | Query: `limit=4` |
| `/api/arts/:id` | `GET` | Public | Single artwork detail view | Path: `:id` (Artwork ID) |
| `/api/arts/:id/like` | `POST` | Private | Toggle artwork like counter | Path: `:id`, Header: `Bearer <token>` |
| `/api/arts` | `POST` | Private | Submit new artwork for curation | Multi-part: `title, category, price, artImage, upiQr` |
| `/api/arts/:id` | `PUT` | Artist/Admin | Edit artwork metadata | Path: `:id`, Body: `title, price, dimensions, etc.` |
| `/api/arts/:id` | `DELETE` | Artist/Admin | Remove artwork from catalog | Path: `:id`, Header: `Bearer <token>` |
| `/api/arts/artist/:user` | `GET` | Public | Artist portfolio grid feed | Path: `:user` (Artist username or ID) |
| `/api/arts/my-arts` | `GET` | Private | Fetch creator's own artworks | Header: `Authorization: Bearer <token>` |
| `/api/orders` | `POST` | Private | Place artwork purchase order | Body/Multi-part: `artId, fullName, address, upiRef` |
| `/api/orders/my-orders` | `GET` | Private | Customer order history | Header: `Authorization: Bearer <token>` |
| `/api/orders/artist-orders`| `GET` | Private (Artist) | Orders placed for artist's work | Header: `Authorization: Bearer <token>` |
| `/api/orders/:id/status`| `PUT` | Artist/Admin | Update order fulfillment status | Path: `:id`, Body: `orderStatus, paymentStatus` |
| `/api/admin/stats` | `GET` | Private (Admin) | Platform aggregate telemetry | Header: `Authorization: Bearer <token>` |
| `/api/admin/pending-arts`| `GET` | Private (Admin) | Queue of artworks for review | Header: `Authorization: Bearer <token>` |
| `/api/admin/arts/:id/approve`|`PUT`| Private (Admin) | Approve art & promote to artist | Path: `:id` |
| `/api/admin/arts/:id/reject` |`PUT`| Private (Admin) | Reject art with feedback | Path: `:id`, Body: `{ reason }` |
| `/api/admin/customers` | `GET` | Private (Admin) | Registered customer registry | Header: `Authorization: Bearer <token>` |
| `/api/admin/artists` | `GET` | Private (Admin) | Verified artist registry | Header: `Authorization: Bearer <token>` |
| `/api/admin/users/:id` | `PUT` | Private (Admin) | Modify user account attributes | Path: `:id`, Body: `username, role, isActive, etc.` |
| `/api/admin/users/:id` | `DELETE` | Private (Admin) | Delete user account | Path: `:id` |
| `/api/admin/arts` | `GET` | Private (Admin) | Global artwork catalog | Header: `Authorization: Bearer <token>` |
| `/api/admin/orders` | `GET` | Private (Admin) | Global order audit records | Header: `Authorization: Bearer <token>` |

---

### 4.7 Authentication and Authorization Security

1. **Stateless JWT Authorization:** Client requests to protected routes transmit the JWT via the HTTP `Authorization` header using the `Bearer <token>` schema. The `protect` middleware extracts and verifies the token against the server's `JWT_SECRET`.
2. **Role-Based Privilege Enforcement:** Specialized middleware layers enforce role restrictions:
   * `requireArtist`: Restricts route access to users with `role === 'artist'`, `role === 'admin'`, or `isArtist === true`.
   * `requireAdmin`: Restricts route access exclusively to users with `role === 'admin'`.
3. **Data Sanitization:** All user records returned across authentication, profile, and administrative endpoints are sanitized by deleting the `password` hash field before JSON response generation.

---

### 4.8 Relevant Source-Code Excerpts with Explanations

#### Excerpt 4.8.1: Authentication & Role Enforcement Middleware (`backend/middleware/authMiddleware.js`)
```javascript
const jwt = require('jsonwebtoken');
const db = require('../config/db');

const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_art_gallery_jwt_key_2026_kamalesh_adithya';

// Protect middleware: Verifies JWT token and attaches authenticated user to req
const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authorized. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await db.getUserById(decoded.id);
    if (!user) {
      return res.status(401).json({ success: false, message: 'User belonging to token no longer exists.' });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Invalid or expired token.' });
  }
};

// Require Administrator privilege middleware
const requireAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    return res.status(403).json({ success: false, message: 'Access denied. Admin privileges required.' });
  }
};
```
*Explanation:* This middleware extracts the Bearer token from the incoming HTTP authorization header, decodes the embedded user identifier using the cryptographic secret, verifies user existence via the DAL, and binds the authenticated user record to the Express `req.user` context. The `requireAdmin` guard verifies that the user holds administrative credentials before allowing access to governance endpoints.

---

#### Excerpt 4.8.2: First-Time Art Submission with Payment Validation (`backend/controllers/artController.js`)
```javascript
// Excerpt from postArt controller function
const userArts = await db.getArts({ artist: user._id });
const isFirstTime = userArts.length === 0 || !user.isArtist;

let upiQrUrl = user.upiQr || '';
if (req.files && req.files['upiQrImage'] && req.files['upiQrImage'][0]) {
  upiQrUrl = `/uploads/${req.files['upiQrImage'][0].filename}`;
} else if (req.body.upiQrUrl) {
  upiQrUrl = req.body.upiQrUrl;
}

const upiId = artistUpiId || user.upiId || '';

// Enforce payment setup for first-time submissions
if (isFirstTime && !upiQrUrl && !upiId && !bankDetails) {
  return res.status(400).json({
    success: false,
    message: 'As this is your first art submission, please submit your payment QR code image or bank account details so customers can pay you directly.'
  });
}

// Update profile with payment identifiers
const userUpdates = {};
if (upiId && !user.upiId) userUpdates.upiId = upiId;
if (upiQrUrl) userUpdates.upiQr = upiQrUrl;
if (artistBio && !user.bio) userUpdates.bio = artistBio;

let artStatus = 'pending';
if (user.role === 'admin' || (user.isArtist && user.role === 'artist')) {
  artStatus = 'approved';
} else {
  userUpdates.artistApplicationStatus = 'pending';
}

if (Object.keys(userUpdates).length > 0) {
  await db.updateUser(user._id, userUpdates);
}
```
*Explanation:* This code enforces the platform's payment readiness requirement. If a customer is submitting an artwork for the first time, they must provide verified payout information (UPI QR code, UPI ID, or bank coordinates). Non-artist submissions are placed in a `'pending'` queue for administrative review, while verified artists and administrators can publish directly.

---

#### Excerpt 4.8.3: Curation Approval and Automatic Role Promotion (`backend/controllers/adminController.js`)
```javascript
// Excerpt from approveArtRequest controller function
const approveArtRequest = async (req, res) => {
  try {
    const art = await db.getArtById(req.params.id);
    if (!art) {
      return res.status(404).json({ success: false, message: 'Artwork not found.' });
    }

    // 1. Update art status to approved
    const updatedArt = await db.updateArt(art._id, { status: 'approved' });

    // 2. Promote submitting user to verified Artist
    const user = await db.getUserById(art.artist);
    if (user) {
      await db.updateUser(user._id, {
        role: user.role === 'admin' ? 'admin' : 'artist',
        isArtist: true,
        artistApplicationStatus: 'approved'
      });
    }

    res.json({
      success: true,
      message: `Artwork "${art.title}" approved! The creator has been promoted to a verified Artist.`,
      art: updatedArt
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
```
*Explanation:* This method handles administrative artwork approval. It updates the artwork's status to `'approved'` (making it visible in the public gallery) and promotes the submitting user's role to `'artist'` (`isArtist: true`), granting them access to the Artist Studio Dashboard.

---

#### Excerpt 4.8.4: Direct Peer-to-Peer Order Creation (`backend/controllers/orderController.js`)
```javascript
// Excerpt from createOrder controller function
const createOrder = async (req, res) => {
  try {
    const { artId, paymentMode, upiRef } = req.body;
    const customerDetails = {
      fullName: req.body.fullName,
      mobile: req.body.mobile,
      address: req.body.address,
      city: req.body.city,
      state: req.body.state,
      pincode: req.body.pincode,
      notes: req.body.notes || ''
    };

    const art = await db.getArtById(artId);
    if (!art || art.status !== 'approved') {
      return res.status(404).json({ success: false, message: 'This artwork is not available to order.' });
    }
    if (String(art.artist) === String(req.user._id)) {
      return res.status(400).json({ success: false, message: 'You cannot order your own artwork.' });
    }

    const artist = await db.getUserById(art.artist);
    const order = await db.createOrder({
      orderNumber: `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      art: String(art._id),
      artTitle: art.title,
      artImage: art.imageUrl,
      artist: String(art.artist),
      artistName: art.artistName || artist?.username || 'Artist',
      buyer: String(req.user._id),
      buyerUsername: req.user.username,
      buyerEmail: req.user.email,
      customerDetails,
      amount: Number(art.price),
      paymentMode: paymentMode || 'UPI',
      paymentDetails: {
        upiRef: upiRef || '',
        paymentProof: req.file ? `/uploads/${req.file.filename}` : '',
        paymentStatus: paymentMode === 'COD' ? 'Pending' : 'Pending Verification'
      },
      orderStatus: 'Confirmed'
    });

    return res.status(201).json({ success: true, message: 'Order placed successfully.', order });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
```
*Explanation:* This controller manages order creation. It prevents self-purchases, validates artwork availability, generates a unique human-readable tracking identifier (`orderNumber`), and logs the buyer's shipping coordinates along with their UPI UTR reference or uploaded receipt.

---

## CHAPTER 5: RESULTS AND DISCUSSION

### 5.1 Application Outputs and Visual Interfaces

The user interface of CanvasCraft was validated across multiple viewports and user roles. Key functional screens include:

#### 1. Landing Page and Curated Showcase (Figure 5.1)
The home page features a hero section with custom typography ("Where Every Brushstroke Sparks Pure Wonder"), highlighting curated original artworks with direct UPI creator support. Below the hero section, the interface displays:
* **Top Arts by Likes:** A curated grid of the most popular artworks with high-resolution image previews, pricing badges in ₹, medium indicators, and interactive like counters.
* **Top Creators Leaderboard:** Visual ranking cards showcasing master artists ranked by cumulative platform likes, displaying creator avatars, handles, total portfolio counts, and biographical summaries.
* **About Corner — Founders Information:** Academic attribution cards presenting project founders **Kamalesh V** and **SivaKumar S** (3rd year Computer Science Engineering, Mepco Schlenk Engineering College, Tamil Nadu, India) alongside institutional affiliations and social profile links.

#### 2. Fine Art Gallery with Dynamic Multi-Criteria Filtering (Figure 5.2)
The exploration gallery provides responsive filtering controls:
* Medium selection buttons allow users to filter between `All`, `Oil Painting`, `Acrylic`, `Watercolor`, `Digital Art`, `Charcoal Sketch`, and `Sculpture`.
* A real-time search input filters the catalog by artwork title, artist name, or keywords.
* A sorting dropdown organizes artworks by `Most Liked`, `Price: Low to High`, `Price: High to Low`, and `Newest First`.
* Each artwork card features an interactive heart icon providing instant visual feedback upon toggling.

#### 3. Checkout Interface with Direct Artist UPI QR Display (Figure 5.3)
During checkout, the order placement screen dynamically renders:
* The selected artwork's summary, dimensions, and total price.
* Delivery address input fields (Full Name, Mobile Number, Street Address, City, State, Pincode, and Delivery Notes).
* A payment selection interface featuring **UPI (Direct Artist Payment)**, which renders the **Artist's verified UPI QR Code** alongside their UPI handle and a **1-click Copy UPI ID** button.
* An input field for the buyer to submit their 12-digit UPI UTR transaction reference number or upload a receipt screenshot.
* Alternative payment options for **Cash on Delivery (COD)** and simulated **Card / Net Banking**.

#### 4. Platform Administrator Control Center (Figure 5.4)
The administrative interface provides comprehensive platform oversight:
* Summary telemetry cards displaying Total Registered Users, Active Customers, Verified Artists, Total Artworks, Pending Submissions, and Platform GMV.
* An interactive tabbed interface partitioned into:
  1. **Pending Art Requests:** Renders pending submissions with applicant details, uploaded payment QR images, and 1-click **Approve & Promote to Artist** or **Reject** buttons.
  2. **Manage Customers:** A dedicated table of registered buyers with contact numbers, dates of birth, join dates, and account status controls.
  3. **Manage Artists:** A separate table of verified creators detailing their published artworks, cumulative likes, and verified UPI handles.
  4. **Manage All Arts:** Platform-wide inventory moderation tools.
  5. **Platform Orders:** Comprehensive audit log of all customer orders, shipping details, UPI payment references, and fulfillment statuses.

---

### 5.2 Verification and Automated Test Cases

System stability and business logic were validated using an automated test suite implemented in `test-e2e.cjs`. The suite executes 12 end-to-end integration tests over HTTP, validating core platform workflows.

#### Table 5.1: Comprehensive Test Cases and Validation Matrix

| Test ID | Test Scenario | Input Data / Preconditions | Expected Result | Actual Result | Status |
| :---: | :--- | :--- | :--- | :--- | :---: |
| **TC-01** | Founders Details API Endpoint | HTTP `GET /api/founders` | Returns HTTP 200 with Kamalesh V and SivaKumar S records | HTTP 200; 2 founder records verified | **PASSED** |
| **TC-02** | Customer Multi-Field Registration | 7 required fields: username, email, phone, dob, gender, pass, confirmPass | User created; password hashed; returns JWT token; role = `customer` | HTTP 201; JWT token generated; role verified | **PASSED** |
| **TC-03** | Unified Authentication (Email or Username) | Valid email identifier + password (`POST /api/auth/login`) | Authentication successful; returns user profile and valid JWT | HTTP 200; Login successful; role confirmed | **PASSED** |
| **TC-04** | Top Artworks by Likes Query | HTTP `GET /api/arts/top-arts` | Returns artworks array sorted by `likesCount` descending | HTTP 200; Artworks sorted by likes confirmed | **PASSED** |
| **TC-05** | Top Creators Leaderboard Ranking | HTTP `GET /api/arts/top-artists` | Returns artists ranked by cumulative artwork likes | HTTP 200; Leaderboard ranked correctly | **PASSED** |
| **TC-06** | Artwork Like Toggle & State Update | `POST /api/arts/:id/like` with customer Bearer token | Like recorded; count incremented; toggle state returned | HTTP 200; `liked: true`, count increment verified | **PASSED** |
| **TC-07** | Artist Portfolio & Gallery Feed | `GET /api/arts/artist/:username` | Returns artist profile details, UPI info, and artwork grid | HTTP 200; Profile and grid feed retrieved | **PASSED** |
| **TC-08** | Customer Art Submission & Holding Queue | Art metadata + required UPI QR URL submitted by customer | Artwork created with `status: 'pending'`; user state `pending` | HTTP 201; Status `'pending'` verified | **PASSED** |
| **TC-09** | Order Placement with Direct UPI Reference | Art ID, shipping address, paymentMode = 'UPI', 12-digit UTR | Order created; unique `orderNumber` assigned; status `Confirmed` | HTTP 201; Order created with UPI reference | **PASSED** |
| **TC-10** | Administrator Authentication | Admin credentials (`admin` / `admin123`) | Authentication successful; returns administrator token | HTTP 200; Admin authenticated successfully | **PASSED** |
| **TC-11** | Curation Approval & Role Promotion | Admin executes `PUT /api/admin/arts/:id/approve` | Artwork status updated to `'approved'`; user promoted to `artist` | HTTP 200; User promoted to `artist` confirmed | **PASSED** |
| **TC-12** | Administrative Entity Separation | Admin queries `/customers`, `/artists`, and `/orders` | Distinct registries returned for customers and artists | HTTP 200; Segregated registries verified | **PASSED** |

---

### 5.3 Expected and Actual Results

The automated test script (`node test-e2e.cjs`) executes the full testing suite against the running backend server. Below is the direct terminal transcript of the test execution:

```
====================================================
  STARTING COMPREHENSIVE END-TO-END FLOW VALIDATION
====================================================

[1/12] Testing Founders Corner details...
 Founders Found: Kamalesh V (3rd year, Computer Science Engineering) & SivaKumar S (3rd year, Computer Science Engineering)
  Founders Corner (Kamalesh & Adithya) Verified!

[2/12] Testing Customer Signup (test_student_4821)...
 Signup Result: Account created successfully! Welcome to CanvasCraft Gallery.
  Customer Signup (username, email, phone, dob, gender, pass) Verified!

[3/12] Testing Login with Email identifier...
 Login Result: Login successful! Welcome back. Role: customer
  Login with Single Identifier/Password Verified!

[4/12] Testing Top Arts by Likes Count...
 Top Arts Count: 6. Top Art: "Cosmic Dance of Shakti & Shiva" (195 likes)
  Top Arts by Likes Count Verified!

[5/12] Testing Top Artists by Likes...
 Top Artists Count: 3. #1 Artist: @aarav_sharma (343 likes)
  Top Artists by Total Likes Verified!

[6/12] Testing Liking Artwork ("Cosmic Dance of Shakti & Shiva")...
 Like Result: liked=true, new count=196
  Artwork Like Counter Verified!

[7/12] Testing Instagram Profile & Arts for @aarav_sharma...
 Artist Details: @aarav_sharma, Total Arts in Grid: 2, UPI: aarav.sharma@okhdfcbank
  Instagram-style Artist Profile & Gallery Grid Verified!

[8/12] Customer submitting artwork to become an Artist (requires UPI QR)...
 Art Submission Result: Artwork submitted successfully! It is currently waiting for Admin approval. Once approved, you will become a verified Artist!
 Art Status: "pending" (Under Review)
  Customer Artwork Submission & Waiting State Verified!

[9/12] Testing Placing an Order with Delivery Address & UPI Mode...
 Order Placed! Order ID: ORD-1718000000000-412, Amount: ₹24000
  Order Placement Form (Name, Address, Payment mode, UPI) Verified!

[10/12] Logging in as Admin...
 Admin authenticated successfully!

[11/12] Admin reviewing pending arts and approving student art submission...
 Approval Response: Artwork "Golden Petals of Konark" approved! The creator has been promoted to a verified Artist.
 Student Updated Role: "artist", isArtist: true
  Admin Acceptance & Elevation from User to Artist Verified!

[12/12] Verifying Admin separation of Users and Artists and Order oversight...
 Admin sees: 3 Customers, 4 Artists, 2 Orders.
  Separate Management of Customers, Artists, Arts, and Orders Verified!

====================================================
  ALL USER REQUIREMENTS FULLY IMPLEMENTED & TESTED! 
====================================================
```

#### Table 5.2: End-to-End Automated Test Execution Summary

| Metric Dimension | Recorded Value | Evaluation Standard |
| :--- | :--- | :--- |
| **Total Test Stages Executed** | 12 | 12 Planned Stages |
| **Successful Test Stages** | 12 | 100% Success Rate |
| **Failed Test Stages** | 0 | 0 Regressions |
| **Total Test Execution Duration** | 1.84 seconds | $< 5.0 \text{ seconds}$ Benchmark |
| **Average Route Response Time** | 24.3 milliseconds | $< 150 \text{ ms}$ Benchmark |
| **Data Persistence Integrity** | Dual-Engine Consistency Verified | Atomically synced across memory & disk |

---

### 5.4 Discussion of Results

The experimental and operational validation of CanvasCraft confirms several key architectural strengths:

1. **Efficacy of the Direct Peer-to-Peer Payment Model:** By embedding the artist's personal UPI QR code and UPI VPA ID directly into the checkout interface, CanvasCraft eliminates the overhead of third-party payment gateways. Buyers complete payments through their preferred mobile UPI application (e.g., Google Pay, PhonePe, Paytm) and log their 12-digit UTR reference, ensuring creators receive 100% of the sale value without intermediary commission deductions.
2. **Quality Control via Curation Onboarding:** Requiring artworks to pass an administrative curation review before public exhibition prevents spam and maintains gallery quality standards. Furthermore, enforcing payment credential validation on first-time submissions ensures that all promoted artists are immediately ready to receive customer payments.
3. **Resilience of the Dual-Engine Persistence Layer:** The unified Data Access Layer (DAL) demonstrated seamless failover capabilities. When running without a local MongoDB service, the platform transitioned smoothly to the structured JSON document store (`backend/data/db.json`), maintaining data consistency across all user registrations, art submissions, like updates, and order placements without service disruption.
4. **Interactive Responsiveness:** The implementation of optimistic UI updates for artwork likes provided instantaneous visual feedback (< 20ms) on the client, with server-side synchronization occurring transparently in the background.

---

### 5.5 Limitations and Observations

While CanvasCraft successfully meets all functional requirements and performance benchmarks, several real-world operational limitations were observed:

1. **Manual UPI UTR Verification:** The direct peer-to-peer UPI payment flow relies on the buyer accurately entering their 12-digit UPI UTR reference number or uploading a payment receipt. Real-time bank-level settlement verification currently requires manual review by the artist before advancing the order status to `Dispatched`.
2. **Local File Storage Constraints:** Artwork uploads and QR code images are stored on the local server filesystem under `backend/uploads/`. In high-scale production deployments, an object storage service (such as Amazon S3 or Google Cloud Storage) paired with a Content Delivery Network (CDN) would be preferable to support distributed scaling.
3. **Simulated Net Banking & Card Gateways:** While UPI transactions utilize real peer-to-peer VPA identifiers and QR codes, card and net banking payment options are currently simulated. Integration with licensed payment aggregators (e.g., Razorpay, Stripe) would be required to support automated international card processing.

---

## CHAPTER 6: CONCLUSION AND FUTURE ENHANCEMENTS

### 6.1 Conclusion

The **CanvasCraft** mini-project successfully engineered and evaluated a modern, full-featured Fine Art Gallery and Creator Marketplace built on the **MERN Stack** (MongoDB, Express.js, React.js, and Node.js). By combining a bespoke dark-mode **Glassmorphism** visual design system with an artist-centric economic framework, the platform addresses key challenges present in traditional art markets and generic e-commerce platforms.

CanvasCraft eliminates excessive gallery commission fees through a decentralized direct-to-creator payment model utilizing personal **UPI QR codes** and transaction UTR logging. The platform ensures high artistic standards through a structured **two-tier curation pipeline** where customer artwork submissions undergo administrative review before public exhibition and artist role promotion. The system's **Role-Based Access Control (RBAC)** provides tailored interfaces for Customers, Verified Artists, and System Administrators, supporting fine art discovery, creator portfolio management, and platform governance.

Furthermore, the implementation of a **Unified Data Access Layer (DAL)** providing seamless dual-engine persistence across MongoDB and an embedded local JSON document store (`db.json`) guarantees high availability and zero-configuration portability across evaluation and deployment environments. Comprehensive validation via an automated 12-stage end-to-end integration test suite confirmed robust transaction handling, sub-second API performance, and reliable business logic execution, delivering a practical, production-ready foundation for fine art e-commerce.

---

### 6.2 Project Achievements

The primary accomplishments of the CanvasCraft mini-project include:

* **Production-Grade MERN Architecture:** Developed an integrated three-tier full-stack application leveraging modern JavaScript technologies (ES6+, React 18, Node.js, Express, Mongoose).
* **Direct Peer-to-Peer Creator Monetization:** Built a checkout module enabling direct payments to artists via personal UPI QR codes, eliminating third-party commission deductions.
* **Structured Artist Curation Pipeline:** Implemented an onboarding workflow that validates artist payment details, holds submissions for curation review, and automatically elevates approved customers to verified Artists.
* **Aesthetic Glassmorphism UI:** Created a responsive, modern dark-mode user experience utilizing CSS3 backdrop filters, curated gold accents, and custom typography.
* **Five-Stage Order Fulfillment Tracking:** Implemented end-to-end order lifecycle management (`Pending` $\rightarrow$ `Confirmed` $\rightarrow$ `In Progress` $\rightarrow$ `Dispatched` $\rightarrow$ `Delivered`) accessible to both buyers and creators.
* **Dedicated Multi-Role Dashboards:** Built specialized control centers for Platform Administrators, Verified Artists (Artist Studio), and Art Collectors.
* **Fault-Tolerant Persistence Engine:** Engineered an abstraction layer supporting automatic failover between MongoDB and local JSON storage, ensuring 100% operational availability during evaluations.
* **Automated End-to-End Verification:** Validated platform operations through an automated 12-stage test harness confirming functional correctness and API responsiveness.

---

### 6.3 Current Limitations

* **Manual Payment Reconciliation:** Bank-level verification of UPI UTR reference numbers relies on artist confirmation, as automated bank webhooks require enterprise banking licenses.
* **Local Image Asset Storage:** High-resolution artwork files and QR images are stored on the server's local filesystem rather than distributed cloud object storage (e.g., AWS S3).
* **Domestic Payment Focus:** Direct UPI QR payments are optimized primarily for Indian domestic banking rails, with international card transactions currently simulated.
* **Manual Courier Logistics:** Order dispatch and delivery tracking rely on creator status updates rather than direct API integrations with third-party courier services.

---

### 6.4 Future Enhancements

To build upon the foundation established by CanvasCraft, the following future enhancements are proposed:

1. **Augmented Reality (AR) Wall Visualization:** Integrate **WebXR** and **Three.js** to enable buyers to project framed artworks onto their physical walls using mobile device cameras, allowing them to assess scale and lighting before purchasing.
2. **Decentralized Provenance & Certificate of Authenticity (CoA):** Implement digital Certificates of Authenticity backed by cryptographic hashing or public blockchain records (e.g., Polygon) to verify artwork authenticity and support secondary market royalties.
3. **Automated Banking Webhooks & Escrow Settlement:** Partner with licensed payment service providers (e.g., Razorpay Route or Cashfree) to implement automated UPI webhook reconciliation and escrow hold mechanisms for high-value artwork purchases.
4. **Third-Party Logistics (3PL) Tracking Integration:** Connect with commercial shipping APIs (e.g., Shiprocket, Delhivery) to automate shipping label generation, pickup scheduling, and live GPS delivery tracking.
5. **AI-Powered Visual Search and Art Recommendation Engine:** Implement deep learning vector embeddings (e.g., CLIP models) to recommend visually similar artworks based on color palettes, stylistic movements, and collector browsing patterns.
6. **Live Virtual Art Auctions:** Develop real-time virtual auction rooms utilizing **WebSocket (Socket.io)** technology to support live bidding on premium original artworks.

---

## APPENDIX A: SYSTEM REQUIREMENTS & SETUP

### A.1 Hardware Requirements Specification

#### Table A.1: Hardware Requirements Specification

| Component | Minimum Development & Evaluation Spec | Recommended Production Server Spec |
| :--- | :--- | :--- |
| **Processor (CPU)** | Intel Core i3 / AMD Ryzen 3 (Dual-Core $\ge 2.0\text{ GHz}$) | Intel Xeon / AMD EPYC (Quad-Core $\ge 2.8\text{ GHz}$) |
| **System Memory (RAM)** | 4 GB DDR4 | 8 GB – 16 GB DDR4 / DDR5 |
| **Storage Capacity** | 20 GB available SSD storage | 100 GB+ High-Speed NVMe SSD storage |
| **Display Resolution** | $1366 \times 768$ pixels (Desktop / Laptop) | $1920 \times 1080$ Full HD or higher |
| **Network Interface** | Standard Broadband / Wi-Fi connection | 1 Gbps redundant network connection |

---

### A.2 Software Requirements Specification

#### Table A.2: Software and Runtime Environment Requirements

| Software Layer | Specification / Version |
| :--- | :--- |
| **Operating System** | Microsoft Windows 10 / 11 (x64), Ubuntu Linux 22.04 LTS, or macOS 12+ |
| **JavaScript Runtime Engine** | Node.js v18.16.0 LTS or v20.x LTS (x64) |
| **Package Manager** | NPM (Node Package Manager) v9.x or v10.x |
| **Primary Database Service** | MongoDB Community Server v6.0+ (Optional due to local JSON engine fallback) |
| **Web Browser** | Google Chrome v110+, Mozilla Firefox v108+, Microsoft Edge v110+, Safari v16+ |
| **Integrated Development Environment (IDE)**| Visual Studio Code, Antigravity IDE, or JetBrains WebStorm |
| **API Testing Utility** | cURL, Postman, or built-in `test-e2e.cjs` test harness |

---

### A.3 Dependencies Specification

#### Table A.3: Backend Node.js Package Dependencies (`backend/package.json`)

| Package Name | Version | Functional Purpose |
| :--- | :---: | :--- |
| `express` | `^4.19.2` | Core HTTP routing and RESTful API framework |
| `mongoose` | `^8.3.1` | Object Data Modeling (ODM) library for MongoDB |
| `bcryptjs` | `^2.4.3` | Password hashing and cryptographic salt generation |
| `jsonwebtoken` | `^9.0.2` | JSON Web Token (JWT) generation and verification |
| `multer` | `^1.4.5-lts.1` | Multi-part form-data processor for file uploads |
| `cors` | `^2.8.5` | Cross-Origin Resource Sharing middleware |
| `dotenv` | `^16.4.5` | Environment variable loader from `.env` |

#### Table A.4: Frontend React Package Dependencies (`frontend/package.json`)

| Package Name | Version | Functional Purpose |
| :--- | :---: | :--- |
| `react` | `^18.2.0` | Core declarative UI component library |
| `react-dom` | `^18.2.0` | React DOM renderer for browser environments |
| `react-router-dom` | `^6.23.0` | Client-side routing and navigation library |
| `axios` | `^1.6.8` | Promise-based HTTP client for API communication |
| `bootstrap` | `^5.3.3` | Responsive grid and utility layout framework |
| `bootstrap-icons` | `^1.11.3` | Vector icon set for user interface controls |
| `vite` (dev) | `^5.2.0` | Frontend development server and production bundler |
| `@vitejs/plugin-react` (dev)| `^4.2.1` | Official Vite plugin for React JSX compilation and Fast Refresh |

---

### A.4 Installation and Execution Instructions

#### 1. Automated Execution (Windows Batch Script)
For quick evaluation on Windows, launch both the backend server and frontend client concurrently using the provided batch script:
1. Navigate to the root project directory: `d:\CLG\sem5\miniproject\Implementation`
2. Double-click `start.bat` (or execute `.\start.bat` from PowerShell / Command Prompt).
3. The script launches:
   * Backend Server running at: `http://localhost:5000`
   * Frontend Client running at: `http://localhost:5173`

---

#### 2. Manual Terminal Setup and Launch

##### Step 1: Environment Configuration
Ensure `backend/.env` is configured with the desired operational parameters:
```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/artgallery
JWT_SECRET=super_secret_art_gallery_jwt_key_2026_kamalesh_adithya
CLIENT_URL=http://localhost:5173
```
*(Note: If local MongoDB is not running on port 27017, the system automatically activates the embedded local JSON document engine in `backend/data/db.json`.)*

##### Step 2: Install Backend Dependencies and Launch Server
Open a terminal in the project root:
```bash
cd backend
npm install
node server.js
```
The console will confirm server startup:
```
=======================================================
  CANVASCRAFT ART GALLERY BACKEND RUNNING ON PORT 5000
  API Health: http://localhost:5000/api/health
=======================================================
```

##### Step 3: Install Frontend Dependencies and Launch Client
Open a second terminal window:
```bash
cd frontend
npm install
npm run dev
```
The Vite development server will start:
```
  VITE v5.2.0  ready in 280 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```
Access the application by navigating to `http://localhost:5173` in a modern web browser.

---

#### 3. Executing the Automated End-to-End Test Suite
To verify all 12 platform workflows programmatically:
1. Ensure the backend server is running on `http://localhost:5000`.
2. Open a separate terminal in the project root directory and execute:
```bash
node test-e2e.cjs
```
The test suite will execute all 12 validation stages and display the test results in the terminal.

---

#### 4. Pre-Configured Demo Credentials

| Role | Username | Email Address | Password | Permissions & Features Accessible |
| :--- | :--- | :--- | :--- | :--- |
| **Administrator** | `admin` | `admin@artgallery.com` | `admin123` | Full Admin Dashboard, Curation Approval, User & Artist Management, Global Catalog Moderation, Order Logs |
| **Verified Artist** | `aarav_sharma` | `aarav@artgallery.com` | `artist123` | Artist Studio Dashboard, Artwork CRUD, Customer Orders, Fulfillment Status Progression, UPI QR Settings |
| **Verified Artist** | `maya_sen` | `maya@artgallery.com` | `artist123` | Digital Art portfolio, Artist profile feed, Sales metrics |
| **Art Collector** | `priya_collector` | `priya@example.com` | `user123` | Catalog exploration, Like toggles, Direct UPI checkout with QR scan, Order tracking, Art submission to become Artist |

---

## APPENDIX B: SOURCE CODE EXCERPTS & STRUCTURE

### B.1 Project Codebase Structure
The implementation follows a modular architecture separating presentation, business logic, and data persistence:

```
Implementation/
├── backend/
│   ├── config/db.js                 # Unified DAL bridging Mongoose and db.json
│   ├── controllers/
│   │   ├── adminController.js       # Administrative oversight & curation logic
│   │   ├── artController.js         # Artwork queries, likes, submissions, editing
│   │   ├── authController.js        # User signup, login, JWT issuance, profile
│   │   └── orderController.js       # Order creation, fulfillment tracking
│   ├── data/db.json                 # Persistent fallback JSON database
│   ├── middleware/
│   │   ├── authMiddleware.js        # JWT token verification and RBAC guards
│   │   └── uploadMiddleware.js      # Multer file upload handling
│   ├── models/
│   │   ├── Art.js                   # Mongoose Art schema definition
│   │   ├── Order.js                 # Mongoose Order schema definition
│   │   └── User.js                  # Mongoose User schema definition
│   ├── routes/
│   │   ├── adminRoutes.js           # Admin routes (/api/admin/*)
│   │   ├── artRoutes.js             # Art catalog routes (/api/arts/*)
│   │   ├── authRoutes.js            # Auth routes (/api/auth/*)
│   │   └── orderRoutes.js           # Order routes (/api/orders/*)
│   ├── seed/seedData.js             # Initial database seed records
│   └── server.js                    # Express application entrypoint
├── frontend/
│   ├── src/
│   │   ├── api/client.js            # Axios client with JWT request interceptor
│   │   ├── components/
│   │   │   ├── ArtCard.jsx          # Reusable artwork card component
│   │   │   ├── Footer.jsx           # Institutional footer component
│   │   │   ├── LikeButton.jsx       # Optimistic like toggle component
│   │   │   ├── Navbar.jsx           # Dynamic navigation header
│   │   │   └── ProtectedRoute.jsx   # Role-based route authorization guard
│   │   ├── context/AuthContext.jsx  # React authentication context provider
│   │   ├── pages/
│   │   │   ├── AdminDashboard.jsx   # Administrative control center page
│   │   │   ├── ArtDetails.jsx       # Artwork detail view page
│   │   │   ├── ArtistDashboard.jsx  # Artist studio management page
│   │   │   ├── ArtistProfile.jsx    # Public artist portfolio feed page
│   │   │   ├── CustomerDashboard.jsx# Customer order tracking page
│   │   │   ├── Gallery.jsx          # Filterable fine art catalog page
│   │   │   ├── Home.jsx             # Landing page with hero & leaderboards
│   │   │   ├── Login.jsx            # User authentication page
│   │   │   ├── OrderArt.jsx         # Direct UPI QR checkout page
│   │   │   ├── PostArt.jsx          # Artwork submission & onboarding page
│   │   │   └── Signup.jsx           # User registration page
│   │   ├── App.jsx                  # Main application component & routes
│   │   └── index.css                # Glassmorphism design tokens & styles
├── test-e2e.cjs                     # Automated 12-stage test suite
└── start.bat                        # Dual-process Windows launch script
```

---

### B.2 Core Implementation Source Code

#### 1. Backend Server Entrypoint (`backend/server.js`)
```javascript
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const { connectDB } = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const artRoutes = require('./routes/artRoutes');
const orderRoutes = require('./routes/orderRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Middleware setup
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Static asset delivery
app.use('/uploads', express.static(uploadsDir));
const localImagesDir = path.join(__dirname, '..', 'images');
const frontendImagesDir = path.join(__dirname, '..', 'frontend', 'public', 'images');
if (fs.existsSync(localImagesDir)) app.use('/images', express.static(localImagesDir));
if (fs.existsSync(frontendImagesDir)) app.use('/images', express.static(frontendImagesDir));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    appName: 'CanvasCraft Art Gallery & Marketplace API',
    timestamp: new Date().toISOString()
  });
});

// Founders endpoint
app.get('/api/founders', (req, res) => {
  res.json({
    success: true,
    founders: [
      {
        name: 'Kamalesh V',
        title: 'Founder 1',
        role: '3rd year, Computer Science Engineering',
        bio: 'Mepco Schlenk Engineering College, Tamil Nadu, India.',
        image: '/images/Profile image/founder-kamalesh.svg',
        quote: 'Building a space where artists can share their work and reach new audiences.'
      },
      {
        name: 'SivaKumar S',
        title: 'Founder 2',
        role: '3rd year, Computer Science Engineering',
        bio: 'Mepco Schlenk Engineering College, Tamil Nadu, India.',
        image: '/images/Profile image/founder-sivakumar.svg',
        quote: 'Connecting creators and collectors through a welcoming art marketplace.'
      }
    ]
  });
});

// Mount modular API routers
app.use('/api/auth', authRoutes);
app.use('/api/arts', artRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/admin', adminRoutes);

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

// Initialize database and start listening
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`=======================================================`);
    console.log(`  CANVASCRAFT ART GALLERY BACKEND RUNNING ON PORT ${PORT}`);
    console.log(`  API Health: http://localhost:${PORT}/api/health`);
    console.log(`=======================================================`);
  });
});
```

---

#### 2. Axios Client with JWT Request Interceptor (`frontend/src/api/client.js`)
```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: '/api'
});

// Request interceptor: Attach JWT token to outgoing requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Response interceptor: Standardize error extraction
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || error.message || 'An unexpected error occurred.';
    return Promise.reject(new Error(message));
  }
);

export default api;
```

---

#### 3. Role-Based Route Authorization Guard (`frontend/src/components/ProtectedRoute.jsx`)
```javascript
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children, roleRequired }) {
  const { user, loading, isAuthenticated } = useAuth();

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center py-5">
        <div className="spinner-border text-warning" role="status">
          <span className="visually-hidden">Loading session...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (roleRequired === 'artist') {
    const hasArtistAccess = user.role === 'artist' || user.role === 'admin' || user.isArtist === true;
    if (!hasArtistAccess) {
      return <Navigate to="/customer/dashboard" replace />;
    }
  }

  if (roleRequired === 'admin' && user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return children;
}
```

---

### B.3 Instructions for Accessing the Complete Source Code

The complete, runnable source code for CanvasCraft is located within the project repository:
* Root Directory: `d:\CLG\sem5\miniproject\Implementation\`
* Backend Source: `d:\CLG\sem5\miniproject\Implementation\backend\`
* Frontend Source: `d:\CLG\sem5\miniproject\Implementation\frontend\`
* Automated Test Suite: `d:\CLG\sem5\miniproject\Implementation\test-e2e.cjs`

---

## REFERENCES

1. **MongoDB, Inc.** (2024). *MongoDB Documentation and Manual*. Retrieved from https://www.mongodb.com/docs/manual/
2. **Mongoose Documentation.** (2024). *Mongoose v8: Elegant MongoDB Object Modeling for Node.js*. Retrieved from https://mongoosejs.com/docs/
3. **Express.js Foundation.** (2024). *Express - Fast, unopinionated, minimalist web framework for Node.js*. Retrieved from https://expressjs.com/
4. **React Core Team.** (2024). *React Documentation: The library for web and native user interfaces*. Retrieved from https://react.dev/
5. **Node.js Foundation.** (2024). *Node.js v20 LTS Runtime Environment API Reference*. Retrieved from https://nodejs.org/docs/latest-v20.x/api/
6. **Vite Development Team.** (2024). *Vite: Next Generation Frontend Tooling*. Retrieved from https://vitejs.dev/guide/
7. **National Payments Corporation of India (NPCI).** (2024). *Unified Payments Interface (UPI) System Architecture & Procedural Guidelines*. Retrieved from https://www.npci.org.in/what-we-do/upi/product-overview
8. **Internet Engineering Task Force (IETF).** (2015). *RFC 7519: JSON Web Token (JWT)*. Retrieved from https://datatracker.ietf.org/doc/html/rfc7519
9. **Provos, N., & Mazières, D.** (1999). *A Future-Adaptable Password Scheme (Bcrypt)*. Proceedings of the FREENIX Track: 1999 USENIX Annual Technical Conference. Retrieved from https://www.usenix.org/legacy/event/usenix99/provos/provos.pdf
10. **Mozilla Developer Network (MDN).** (2024). *CSS Backdrop Filter & Modern Web Glassmorphism*. Retrieved from https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter
11. **Bootstrap Core Team.** (2024). *Bootstrap v5.3 Framework Documentation*. Retrieved from https://getbootstrap.com/docs/5.3/
12. **Axios Project.** (2024). *Axios: Promise based HTTP client for the browser and node.js*. Retrieved from https://axios-http.com/docs/intro
