# Ecommerce Clothing Shop

This is a full-stack ecommerce application for a clothing shop, featuring both user-facing and admin functionalities. The project includes product browsing, cart management, checkout, admin dashboards, analytics, and message management.

---

## **Table of Contents**

1. [Project Overview](#project-overview)
2. [Technologies Used](#technologies-used)
3. [Folder Structure](#folder-structure)
4. [Installation](#installation)
5. [Environment Variables](#environment-variables)
6. [Running the Project](#running-the-project)
7. [Features](#features)
8. [API Endpoints](#api-endpoints)
9. [Frontend Components](#frontend-components)
10. [Acknowledgements](#acknowledgements)

---

## **Project Overview**

This project implements an ecommerce platform where users can:

- Browse products
- Search and filter items
- Add products to cart and checkout
- Manage profile information

Admins can:

- Manage products, orders, and users
- View analytics with sales, orders, and top-selling product metrics
- Reply to user messages

The project follows the **MVC architecture** for the backend and a component-based structure for the frontend.

---

## **Technologies Used**

**Frontend:**

- React.js
- Axios
- CSS (custom styling)
- Chart.js (for analytics visualization)

**Backend:**

- Node.js
- Express.js
- MySQL
- JWT Authentication

**Other Tools:**

- Postman (API testing)
- MySQL Workbench (Database management)

---

## **Folder Structure**

```
+---backend
|   ├── config
|   |   └── db.js
|   ├── controllers
|   |   ├── adminProductController.js
|   |   ├── cartController.js
|   |   ├── orderController.js
|   |   ├── productController.js
|   |   └── analyticsController.js
|   ├── middleware
|   |   └── authMiddleware.js
|   ├── models
|   |   ├── userModel.js
|   |   ├── productModel.js
|   |   ├── orderModel.js
|   |   └── analyticsModels.js
|   ├── routes
|   |   ├── userRoutes.js
|   |   ├── productRoutes.js
|   |   └── adminRoutes.js
|   ├── server.js
|   └── app.js

+---frontend
|   ├── public
|   ├── src
|   |   ├── assets
|   |   ├── components
|   |   ├── context
|   |   └── pages
|   ├── App.jsx
|   └── index.jsx
```

---

## **Installation**

1. Clone the repository:

```bash
git clone <repository-url>
```

2. Install backend dependencies:

```bash
cd backend
npm install
```

3. Install frontend dependencies:

```bash
cd frontend
npm install
```

---

## **Environment Variables**

Create a `.env` file in the `backend` folder with the following:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=ecommerce_db
JWT_SECRET=yourjwtsecret
PORT=5000
```

---

## **Running the Project**

**Backend:**

```bash
cd backend
npm start
```

**Frontend:**

```bash
cd frontend
npm start
```

Navigate to `http://localhost:3000` for the frontend.

---

## **Features**

**User:**

- Signup & login
- Browse and filter products
- Add to cart & checkout
- View profile

**Admin:**

- Manage products (CRUD)
- Manage orders & update status
- Analytics dashboard (sales, orders, top products, KPIs)
- Reply to messages

---

## **API Endpoints**

**User:**

- `POST /api/users/signup`
- `POST /api/users/login`
- `GET /api/users/profile`

**Products:**

- `GET /api/products`
- `GET /api/products/:id`
- `POST /api/products` _(admin)_
- `PATCH /api/products/:id` _(admin)_
- `DELETE /api/products/:id` _(admin)_

**Admin:**

- `GET /api/admin/analytics?startDate=&endDate=`
- `GET /api/admin/orders`
- `PATCH /api/admin/orders/:id`

---

## **Frontend Components**

- **Navbar.jsx** – Header & navigation
- **Home.jsx** – Home page
- **Products.jsx** – Product listing
- **ProductView.jsx** – Product details
- **CartPopUp.jsx** – Cart modal
- **AdminDashboard.jsx** – Analytics and KPIs
- **AdminMessages.jsx** – User message management

---

## **Acknowledgements**

This project was built as part of a full-stack development internship and follows best practices for React and Node.js development, including JWT authentication, MVC backend architecture, and modular frontend components.
