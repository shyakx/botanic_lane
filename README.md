# Botanic Lane - Florist E-commerce Shop

A beautiful, responsive e-commerce website for Botanic Lane florist shop built with React and Bootstrap.

## 🌸 Features

### Customer Side
- **Responsive Design**: Works perfectly on all devices (desktop, tablet, mobile)
- **Product Catalog**: Browse beautiful flowers, bouquets, and arrangements
- **Shopping Cart**: Add/remove items, update quantities
- **Search & Filter**: Find products by name or category
- **Instagram Integration**: Showcase your Instagram posts (@botanic_lane25)
- **Checkout Process**: Simple order form with delivery information
- **Modern UI**: Clean, professional design with botanical theme

### Admin Side
- **Order Management**: View and update order status
- **Product Management**: Add, edit, and manage products
- **Dashboard**: Overview of orders, revenue, and statistics
- **Simple Interface**: Easy-to-use admin panel for one-person operation

## 🚀 Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm start
   ```

3. **Open your browser:**
   Navigate to `http://localhost:3000`

## 📱 Pages & Features

### Home Page
- Hero section with call-to-action
- Featured products showcase
- Instagram posts integration
- Services overview

### Products Page
- Complete product catalog
- Category filtering (Bouquets, Arrangements, Plants)
- Search functionality
- Product cards with add-to-cart

### Shopping Cart
- View selected items
- Update quantities
- Remove items
- Order summary with totals

### Checkout
- Customer information form
- Delivery details
- Order summary
- Order confirmation

### Admin Dashboard
- Order management with status updates
- Product inventory management
- Sales statistics
- Simple interface for shop owner

## 🎨 Design Features

- **Botanical Color Scheme**: Green and cream colors reflecting nature
- **Responsive Layout**: Bootstrap 5 for mobile-first design
- **Custom Styling**: Tailored CSS for florist branding
- **Font Awesome Icons**: Beautiful icons throughout the interface
- **Smooth Animations**: Hover effects and transitions

## 📊 Mock Data

The application includes realistic mock data:
- 8 sample products (bouquets, arrangements, plants)
- 3 sample orders with different statuses
- Instagram posts showcase
- Customer information

## 🛠️ Technology Stack

- **Frontend**: React 18
- **Routing**: React Router DOM
- **Styling**: Bootstrap 5 + Custom CSS
- **State Management**: React Context API
- **Icons**: Font Awesome
- **Images**: Unsplash (placeholder images)

## 📱 Mobile Responsive

The website is fully responsive and optimized for:
- Desktop computers
- Tablets
- Mobile phones
- All screen sizes

## 🔧 Customization

### Adding Products
Edit `src/data/mockData.js` to add new products:
```javascript
{
  id: 9,
  name: "Your Product Name",
  price: 29.99,
  image: "your-image-url",
  category: "Bouquets",
  description: "Product description",
  inStock: true,
  featured: false
}
```

### Styling
- Main styles: `src/index.css`
- Component styles: `src/App.css`
- Color variables defined in CSS custom properties

### Instagram Integration
Update Instagram posts in `src/data/mockData.js` or connect to Instagram API for real-time posts.

## 🚀 Deployment

1. **Build for production:**
   ```bash
   npm run build
   ```

2. **Deploy the `build` folder** to your hosting service (Netlify, Vercel, etc.)

## 📞 Contact & Support

- **Instagram**: [@botanic_lane25](https://www.instagram.com/botanic_lane25)
- **Phone**: +1 (555) 123-4567
- **Email**: info@botaniclane.com

## 📄 License

This project is created for Botanic Lane florist shop. All rights reserved.

---

Made with ❤️ for flower lovers everywhere! 🌸
