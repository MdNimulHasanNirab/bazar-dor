# 🛒 বাজার দর (BazarDor)

### বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের দাম এক নজরে

BazarDor is a responsive web application that helps users explore the latest available prices of essential products in Bangladesh. Users can browse products by category, compare market prices, track price increases and decreases, and access detailed product information through a simple and user-friendly interface.

🔗 **Live Website:** https://bazar-dor-main-pink.vercel.app/

## ✨ Key Features

1. **Responsive Design:** Works across mobile, tablet, and desktop devices.
2. **Product Catalog:** Browse essential products with names, prices, units, and price-change indicators.
3. **Category-Based Browsing:** Explore products by category, including rice and other daily necessities.
4. **Price Tracking:** View products with increasing or decreasing prices and percentage changes.
5. **Product Details:** Access individual product information, average prices, minimum and maximum prices, and market-wise price comparisons.
6. **Authentication:** Register and sign in using email/password and supported social login providers.
7. **Product Sorting:** Sort products by default order, lowest price, or highest price.
8. **User Profile Management:** View profile information and update the user's name.
9. **Loading and Error States:** Display loading skeletons, helpful error messages, and friendly 404 pages.
10. **Toast Notifications:** Provide feedback for authentication, validation, and other user actions.

## 🛠️ Technologies Used

- **Next.js** — Application framework and routing.
- **React** — Component-based user interface.
- **JavaScript / TypeScript** — Application logic and type safety, depending on implementation.
- **Tailwind CSS** — Responsive styling and UI design.
- **Better Auth** — Authentication and user session management.
- **BazarDor API** — Product, category, and market-price data.
- **React Hot Toast** — User feedback notifications, if configured.
- **Vercel** — Application deployment.

## 🔌 API Endpoints

**Base API URL:**

`https://openapi.programming-hero.com/api/bazardor`

Alternative API URLs:

- `https://api.api-store.workers.dev/api/bazardor`
- `https://api.abcz.workers.dev/api/bazardor`

| Endpoint | Description |
|---|---|
| `/products` | Retrieve all products |
| `/products?category=chal` | Retrieve products filtered by category |
| `/products/1` | Retrieve a single product |
| `/categories` | Retrieve all categories |
| `/categories/chal` | Retrieve a single category |

## 🚀 Getting Started

### Prerequisites

- Node.js installed.
- npm or another compatible package manager.
- Git installed.

### Installation

1. Clone the repository:

   ```bash
   git clone YOUR_GITHUB_REPOSITORY_URL
   ```

2. Navigate to the project directory:

   ```bash
   cd YOUR_PROJECT_FOLDER
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Configure the required environment variables in a `.env.local` file according to your project's authentication, database, and API configuration.

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

Run the following commands to verify the production build:

```bash
npm run build
npm start
```

## 📱 Responsive Design

BazarDor is designed to provide a consistent browsing experience across different screen sizes. Product grids, navigation, buttons, and content sections adapt to mobile, tablet, and desktop layouts.

## 🔐 Authentication and Security

The application uses Better Auth for user authentication and session management. Protected pages should verify the authenticated session, and sensitive configuration values should be stored in environment variables rather than committed to the repository.

## 🌐 Deployment

The application is deployed on Vercel.

**Live URL:** https://bazar-dor-main-pink.vercel.app/

## 📌 Disclaimer

সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।

Product prices are indicative and may vary by location, market conditions, and availability.

## 👨‍💻 Author

**Md. Nimul Hasan Nirab**

Web Developer | Graphic Designer | AI Prompt Developer

---

Made with ❤️ for the B14-A7 BazarDor Assignment.
