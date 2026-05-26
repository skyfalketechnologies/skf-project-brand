import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Layouts
import MainLayout from './layouts/MainLayout';

// Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import PortfolioPage from './pages/PortfolioPage';
import BlogPage from './pages/BlogPage';
import BlogDetailPage from './pages/BlogDetailPage';
import MarketplacePage from './pages/MarketplacePage';
import ContactPage from './pages/ContactPage';
import SchedulePage from './pages/SchedulePage';
import CartPage from './pages/CartPage';
import AnalyticsPage from './pages/AnalyticsPage';
import ProjectDetailPage from './pages/ProjectDetailPage';

// Components
import ScrollToTop from './components/ScrollToTop';

import { CartProvider } from './context/CartContext';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <Router>
          <ScrollToTop />
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/portfolio" element={<PortfolioPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:slug" element={<BlogDetailPage />} />
              <Route path="/marketplace" element={<MarketplacePage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/schedule" element={<SchedulePage />} />
              <Route path="/analytics" element={<AnalyticsPage />} />
              <Route path="/projects/u/:slug" element={<ProjectDetailPage />} />
              {/* Fallback to Home */}
              <Route path="*" element={<HomePage />} />
            </Route>
          </Routes>
        </Router>
      </CartProvider>
    </QueryClientProvider>
  );
}

export default App;
