# Assumptions, Limitations & Design Decisions

## Assumptions

### API & Data
1. **Platzi API Stability** - The API (https://api.escuelajs.co/api/v1) is stable and provides consistent data
2. **Product Data Format** - All products have required fields: id, title, price, description, category, image
3. **Category Data** - Categories are properly labeled and consistent across API calls
4. **Image URLs** - Product images are accessible and load without CORS issues

### User Environment
5. **Browser Capabilities** - Users have modern browsers with localStorage support
6. **JavaScript Enabled** - JavaScript must be enabled (React.js requirement)
7. **Network Connectivity** - Users have stable internet for API calls
8. **Screen Resolution** - App targets 320px (mobile) and above

### State Management
9. **localStorage Availability** - localStorage is not disabled and has sufficient quota
10. **Single User** - No multi-user/synchronization concerns
11. **Cart Session** - Cart persists within browser session and across refreshes

## Design Decisions

### 1. State Management Strategy
- **Context API** for cart (frequently accessed, simple structure)

**Rationale**: 
- Separates concerns effectively
- Cart context is simpler to test

### 2. Routing Approach
**Decision**: React Router v6 without `useSearchParams` for filtering

**Rationale**:
- Manual URL parameter management maintains consistency
- Clearer intent and easier to debug
- Better control over URL structure

### 3. Styling
**Decision**: Inline styles instead of CSS-in-JS or Tailwind

**Rationale**:
- No additional dependencies (requirement met)
- Inline styles keep component logic self-contained
- Easier to maintain responsive breakpoints with media queries in style tags

### 4. API Integration
**Decision**: Direct API calls without data caching layer

**Rationale**:
- Simplified architecture for this scale
- Always reflects current product state
- Requirement to refetch on filter changes is met

### 5. Category Filtering
**Decision**: Multiple selection with OR logic

**Rationale**:
- Shows products from ANY selected category
- More inclusive UX
- Meets requirement for "multiple at once" filtering

### 6. Sorting
**Decision**: Price ascending as default sort

**Rationale**:
- Simple and user-friendly
- Consistent ordering across sessions
- Can be extended for multi-sort in future

## Implementation Decisions

### Product Detail Page
- Images displayed at full width for better UX
- Quantity input limited to 1-10 items (prevents abuse)
- Confirmation message after adding to cart (UX feedback)

### Cart Page
- Table layout for desktop, responsive on mobile
- Remove button always visible (no confirmation needed)
- Persistent display of totals (footer + page summary)

### Header & Footer
- Sticky-like positioning (not fixed) to prevent content overlap
- Cart count updates in real-time
- Footer always shows current cart totals

## Technical Decisions

### TypeScript Configuration
- `strict: true` for maximum type safety
- `esModuleInterop: true` for better module compatibility
- DOM and DOM.iterable libs for browser APIs

### Testing Approach
- Cypress for E2E (as per requirement)
- Tests cover happy path and edge cases
- Viewport testing for responsiveness

### Build Configuration
- Create React App (CRA) for simplicity and standard setup
- No custom webpack configuration
- Standard tsconfig.json

## Known Limitations

### Feature Scope
1. **No Search** - Only category filtering available
2. **No Authentication** - Public shopping experience
3. **No Checkout** - Cart display only, no payment flow
4. **No User Accounts** - No order history or wishlist
5. **No Inventory** - Assumes unlimited stock

### Technical Limitations
6. **No Pagination** - Loads all products (could exceed 100s)
7. **No Caching** - Every filter refetch calls API
8. **No Offline Support** - Requires active connection
9. **No Database** - All data transient (cart cleared on logout)
10. **No Admin Panel** - Product data cannot be managed

### Performance Considerations
11. **Large Product Lists** - No virtualization (could be slow with 1000+ items)
12. **Image Loading** - No optimization or lazy loading strategy
13. **No Request Debouncing** - Rapid filter clicks cause multiple API calls
14. **No Error Recovery** - Failed API calls show generic error

## Potential Future Improvements

### Short Term
- Add product search functionality
- Implement price range filtering
- Add product sorting options (by name, date added)
- Add quantity controls on cart page

### Medium Term
- Implement pagination for large product lists
- Add user authentication
- Create order history page
- Add product reviews/ratings

### Long Term
- Backend API with database
- Payment gateway integration
- Admin management panel
- Real-time inventory sync
- Analytics and reporting

## Browser & Device Testing

### Tested Viewports
- Desktop: 1920x1080, 1366x768
- Tablet: iPad (768x1024), iPad Pro (1024x1366)
- Mobile: iPhone 12 (390x844), Samsung S10 (360x800)

### Tested Browsers
- Chrome/Chromium (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Accessibility Considerations

### Implemented
- Semantic HTML elements (header, nav, main, article, footer)
- Proper heading hierarchy (h1 > h2 > h3)
- Descriptive button labels
- Color contrast ratios > 4.5:1
- Form inputs with associated labels
- Clickable element size > 44x44px (mobile)

### Not Implemented (Out of Scope)
- Screen reader testing
- ARIA labels (semantic HTML used instead)
- Keyboard navigation testing
- Focus indicators

---

**Document Version**: 1.0
**Last Updated**: January 2024
