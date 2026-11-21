import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import { StorefrontLayout } from '../layouts/StorefrontLayout';
import { AdminLayout } from '../layouts/AdminLayout';

// Storefront Pages (Lazy Loaded for high performance)
const HomePage = lazy(() => import('../pages/storefront/HomePage').then((m) => ({ default: m.HomePage })));
const ShopPage = lazy(() => import('../pages/storefront/ShopPage').then((m) => ({ default: m.ShopPage })));
const CollectionPage = lazy(() => import('../pages/storefront/CollectionPage').then((m) => ({ default: m.CollectionPage })));
const ProductDetailPage = lazy(() => import('../pages/storefront/ProductDetailPage').then((m) => ({ default: m.ProductDetailPage })));
const SearchPage = lazy(() => import('../pages/storefront/SearchPage').then((m) => ({ default: m.SearchPage })));
const WishlistPage = lazy(() => import('../pages/storefront/WishlistPage').then((m) => ({ default: m.WishlistPage })));
const CartPage = lazy(() => import('../pages/storefront/CartPage').then((m) => ({ default: m.CartPage })));
const CheckoutPage = lazy(() => import('../pages/storefront/CheckoutPage').then((m) => ({ default: m.CheckoutPage })));
const OrderConfirmationPage = lazy(() => import('../pages/storefront/OrderConfirmationPage').then((m) => ({ default: m.OrderConfirmationPage })));

// Account Pages
const LoginPage = lazy(() => import('../pages/account/LoginPage').then((m) => ({ default: m.LoginPage })));
const RegisterPage = lazy(() => import('../pages/account/RegisterPage').then((m) => ({ default: m.RegisterPage })));
const AccountDashboardPage = lazy(() => import('../pages/account/AccountDashboardPage').then((m) => ({ default: m.AccountDashboardPage })));
const OrderHistoryPage = lazy(() => import('../pages/account/OrderHistoryPage').then((m) => ({ default: m.OrderHistoryPage })));
const AddressesPage = lazy(() => import('../pages/account/AddressesPage').then((m) => ({ default: m.AddressesPage })));

// Legal & Informational Pages
const AboutPage = lazy(() => import('../pages/legal/AboutPage').then((m) => ({ default: m.AboutPage })));
const ContactPage = lazy(() => import('../pages/legal/ContactPage').then((m) => ({ default: m.ContactPage })));
const SizeGuidePage = lazy(() => import('../pages/legal/SizeGuidePage').then((m) => ({ default: m.SizeGuidePage })));
const FaqPage = lazy(() => import('../pages/legal/FaqPage').then((m) => ({ default: m.FaqPage })));
const ShippingReturnsPage = lazy(() => import('../pages/legal/ShippingReturnsPage').then((m) => ({ default: m.ShippingReturnsPage })));
const PrivacyPage = lazy(() => import('../pages/legal/PrivacyPage').then((m) => ({ default: m.PrivacyPage })));
const TermsPage = lazy(() => import('../pages/legal/TermsPage').then((m) => ({ default: m.TermsPage })));
const NotFoundPage = lazy(() => import('../pages/legal/NotFoundPage').then((m) => ({ default: m.NotFoundPage })));

// Admin Pages
const AdminLoginPage = lazy(() => import('../pages/admin/AdminLoginPage').then((m) => ({ default: m.AdminLoginPage })));
const AdminOverviewPage = lazy(() => import('../pages/admin/AdminOverviewPage').then((m) => ({ default: m.AdminOverviewPage })));
const AdminProductsPage = lazy(() => import('../pages/admin/AdminProductsPage').then((m) => ({ default: m.AdminProductsPage })));
const AdminCategoriesPage = lazy(() => import('../pages/admin/AdminCategoriesPage').then((m) => ({ default: m.AdminCategoriesPage })));
const AdminCollectionsPage = lazy(() => import('../pages/admin/AdminCollectionsPage').then((m) => ({ default: m.AdminCollectionsPage })));
const AdminOrdersPage = lazy(() => import('../pages/admin/AdminOrdersPage').then((m) => ({ default: m.AdminOrdersPage })));
const AdminCustomersPage = lazy(() => import('../pages/admin/AdminCustomersPage').then((m) => ({ default: m.AdminCustomersPage })));
const AdminInventoryPage = lazy(() => import('../pages/admin/AdminInventoryPage').then((m) => ({ default: m.AdminInventoryPage })));
const AdminCouponsPage = lazy(() => import('../pages/admin/AdminCouponsPage').then((m) => ({ default: m.AdminCouponsPage })));
const AdminReviewsPage = lazy(() => import('../pages/admin/AdminReviewsPage').then((m) => ({ default: m.AdminReviewsPage })));
const AdminAnalyticsPage = lazy(() => import('../pages/admin/AdminAnalyticsPage').then((m) => ({ default: m.AdminAnalyticsPage })));
const AdminContentPage = lazy(() => import('../pages/admin/AdminContentPage').then((m) => ({ default: m.AdminContentPage })));
const AdminSettingsPage = lazy(() => import('../pages/admin/AdminSettingsPage').then((m) => ({ default: m.AdminSettingsPage })));

// Luxury fallback loader
const PageFallback = () => (
  <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-3">
    <span className="font-editorial text-2xl tracking-[0.3em] font-medium text-velora-gold animate-pulse">
      VELORA
    </span>
    <span className="text-[9px] uppercase tracking-[0.35em] text-velora-taupe font-mono">
      Curating Haute Collection...
    </span>
  </div>
);

export const AppRouter = () => {
  return (
    <Suspense fallback={<PageFallback />}>
      <Routes>
        {/* ================= STOREFRONT ROUTES ================= */}
        <Route path="/" element={<StorefrontLayout />}>
          <Route index element={<HomePage />} />
          <Route path="shop" element={<ShopPage />} />
          <Route path="collections/:slug" element={<CollectionPage />} />
          <Route path="product/:id" element={<ProductDetailPage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="wishlist" element={<WishlistPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="checkout" element={<CheckoutPage />} />
          <Route path="order-confirmation/:orderId" element={<OrderConfirmationPage />} />

          {/* Customer Account */}
          <Route path="account" element={<AccountDashboardPage />} />
          <Route path="account/login" element={<LoginPage />} />
          <Route path="account/register" element={<RegisterPage />} />
          <Route path="account/orders" element={<OrderHistoryPage />} />
          <Route path="account/profile" element={<AccountDashboardPage />} />
          <Route path="account/addresses" element={<AddressesPage />} />

          {/* Informational & Legal */}
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="size-guide" element={<SizeGuidePage />} />
          <Route path="faq" element={<FaqPage />} />
          <Route path="shipping-returns" element={<ShippingReturnsPage />} />
          <Route path="privacy-policy" element={<PrivacyPage />} />
          <Route path="terms" element={<TermsPage />} />

          {/* 404 Fallback */}
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        {/* ================= ADMIN AUTH ================= */}
        <Route path="/admin/login" element={<AdminLoginPage />} />

        {/* ================= ADMIN DASHBOARD ROUTES ================= */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminOverviewPage />} />
          <Route path="products" element={<AdminProductsPage />} />
          <Route path="categories" element={<AdminCategoriesPage />} />
          <Route path="collections" element={<AdminCollectionsPage />} />
          <Route path="orders" element={<AdminOrdersPage />} />
          <Route path="customers" element={<AdminCustomersPage />} />
          <Route path="inventory" element={<AdminInventoryPage />} />
          <Route path="coupons" element={<AdminCouponsPage />} />
          <Route path="reviews" element={<AdminReviewsPage />} />
          <Route path="analytics" element={<AdminAnalyticsPage />} />
          <Route path="content" element={<AdminContentPage />} />
          <Route path="settings" element={<AdminSettingsPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
};
