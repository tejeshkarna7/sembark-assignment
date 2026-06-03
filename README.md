# Sembark E-Commerce Application

A modern e-commerce web application built with React, TypeScript, and Context API for state management. Users can browse products, filter by categories, view detailed product information, and manage their shopping cart.

## Features

✅ **Product Listing** - Display products in a responsive grid
✅ **Category Filtering** - Filter products by multiple categories with URL persistence
✅ **Product Details** - Dynamic routing with detailed product information
✅ **Shopping Cart** - Add/remove items with persistent localStorage
✅ **Responsive Design** - Mobile-optimized with inline styling
✅ **Animations** - Smooth transitions and page animations
✅ **E2E Testing** - Comprehensive Cypress test suite
✅ **TypeScript** - Full type safety with TypeScript
✅ **MobX State Management** - Observable store for product state
✅ **Context API** - Cart state management with hooks

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type-safe JavaScript
- **React Router v6** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **MobX** - State management for products
- **Context API** - Cart state management
- **Cypress** - E2E testing framework
- **Create React App** - Project scaffolding

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd sembark-react-assignment
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```
   The app will open at `http://localhost:3000`

## Running the Application

### Development Mode
```bash
npm start
```
Runs the app in development mode with hot reload.

### Build for Production
```bash
npm run build
```
Builds the app for production to the `build` folder.

### Run E2E Tests
```bash
# Open Cypress Test Runner
npm run cypress

# Run Cypress in headless mode
npm run cypress:run
```

## Project Structure

```
src/
├── api/                 # API services (Platzi API integration)
├── components/          # Reusable components
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── ProductCard.tsx
│   └── CategoryFilter.tsx
├── context/            # React Context API
│   └── CartContext.tsx
├── pages/              # Page components
│   ├── Home.tsx
│   ├── ProductDetail.tsx
│   └── Cart.tsx
├── store/              # MobX store
│   └── ProductStore.ts
├── App.tsx             # Main app component
├── index.tsx           # Entry point
└── index.css           # Global styles

cypress/
├── e2e/
│   └── ecommerce.cy.ts # E2E tests

public/
└── index.html          # HTML template
```

## Key Features Explained

### 1. Product Listing & Filtering
- Products are fetched from [Platzi API](https://api.escuelajs.co/api/v1)
- Filter by multiple categories simultaneously
- Filters persist in URL using `useSearchParams` for sharing
- Sorting by price (ascending order)

### 2. Product Detail Page
- Dynamic routing: `/product/:id/details`
- Product data fetched from API based on ID
- Quantity selector for adding to cart
- Back navigation to home page

### 3. Cart Management
- Add items from product detail page
- Remove items from cart
- Cart persists using localStorage
- Real-time cart count in header
- Total value displayed in footer

### 4. State Management
- **MobX**: Manages product listings and filters
- **Context API**: Manages cart items and operations
- **localStorage**: Persists cart across sessions

### 5. Responsive Design
- Mobile-first approach with Tailwind CSS utility classes
- Grid layouts adapt to screen size (responsive breakpoints: sm, md, lg)
- Touch-friendly buttons and inputs
- Tested on various viewport sizes

### 6. E2E Testing
- Homepage and product listing tests
- Product detail page tests
- Cart operations tests
- Navigation and routing tests
- Filtering and URL persistence tests
- Responsiveness tests

## API Integration

The application uses the Platzi API:
- **Base URL**: `https://api.escuelajs.co/api/v1`
- **Endpoints**:
  - `GET /products` - All products
  - `GET /products/:id` - Single product
  - `GET /categories` - All categories
  - `GET /products?categoryId=:id` - Products by category

## Assumptions & Limitations

### Assumptions
- Product data from Platzi API is stable and properly formatted
- User has a stable internet connection
- localStorage is available in the browser
- API response time is reasonable (<5s)

### Limitations
- Search functionality not implemented (out of scope)
- Payment/checkout flow not implemented
- User authentication not implemented
- Wishlist/favorites not implemented
- Product reviews/ratings not shown
- Inventory management not included
- No backend for order persistence

## Additional Features Implemented

### Bonus Features
1. **localStorage Persistence** - Cart data saved and restored across sessions
2. **Animations** - Smooth transitions for:
   - Product card entrance
   - Page navigation
   - Cart notifications
   - Hover effects

3. **Accessibility** - Semantic HTML elements:
   - `<header>`, `<footer>`, `<main>`, `<article>`, `<aside>`
   - Proper heading hierarchy
   - Descriptive button labels
   - Form labels with inputs

4. **Mobile Responsiveness**
   - Responsive grid layouts
   - Touch-friendly components
   - Readable font sizes on all devices

## Running Tests

### E2E Tests with Cypress

Start the development server in one terminal:
```bash
npm start
```

In another terminal, open Cypress:
```bash
npm run cypress
```

Or run tests in headless mode:
```bash
npm run cypress:run
```

### Test Coverage
- Home page loading and product display
- Category filtering with URL persistence
- Product detail page navigation
- Add/remove cart operations
- Cart persistence
- Header navigation
- Responsive design across devices

## Troubleshooting

### Port 3000 already in use
```bash
# On Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# On Mac/Linux
lsof -ti:3000 | xargs kill -9
```

### API Connection Issues
- Check internet connection
- Verify API is accessible: `https://api.escuelajs.co/api/v1/products`
- Try clearing browser cache

### localStorage Not Working
- Ensure private/incognito mode is disabled
- Check browser storage permissions
- Clear browser cache and cookies

## Performance Optimizations

- Images use native lazy loading
- Memoized components with MobX observer
- Efficient re-renders with Context API
- Debounced category filtering via URL

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Future Enhancements

- [ ] Product search functionality
- [ ] Advanced filtering (price range, ratings)
- [ ] User authentication
- [ ] Order history
- [ ] Payment integration
- [ ] Product reviews and ratings
- [ ] Wishlist functionality
- [ ] Real-time inventory updates
- [ ] Dark mode toggle
- [ ] Multi-language support

## License

This project is part of the Sembark Frontend React Assignment.

## Support

For issues or questions, please refer to the project documentation or contact the development team.

---

**Created**: 2024 | **Last Updated**: January 2024 | **Status**: Production Ready
