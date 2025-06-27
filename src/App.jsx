import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Loginpage from "./pages/Loginpage";
import Registerpage from "./pages/Registerpage";
import CategoryDetailPage from "./pages/CategoryDetailPage";
import CategoriesPage from "./pages/CategoryPage";
import ScrollToTop from "./components/location.pathname";
import ActivityDetailPage from "./pages/ActivityDetailPage";
import ActivitiesPage from "./pages/ActivitiesPage";
import PromosPage from "./pages/PromosPage";
import PromoDetailPage from "./pages/PromoDetailPage";
import ProfilePage from "./pages/ProfilePage";
import CartPage from "./pages/CartPage";
import { CartProvider } from "./context/CartContext";
import { Toaster } from "sonner";
import Transaction from "./pages/Transaction";
import TransactionDetail from "./pages/TransactionDetail";
import GuestRoute from "./components/GuestRoute";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard/Dashboard";
import Orders from "./pages/Dashboard/Orders";
import Banners from "./pages/Dashboard/Banners";
import Categories from "./pages/Dashboard/Categories";
import Activities from "./pages/Dashboard/Activities";
import Promos from "./pages/Dashboard/Promos";
import Users from "./pages/Dashboard/Users";
import TransactionDetailAdmin from "./components/Dashboard/Transaction/TransactionDetailAdmin";

const App = () => {
  return (
    <BrowserRouter>
      <CartProvider>
        <ScrollToTop />
        <Routes>
          {/* 🟢 Public Routes */}
          <Route path="/" element={<Homepage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/category/:id" element={<CategoryDetailPage />} />
          <Route path="/activities" element={<ActivitiesPage />} />
          <Route path="/activity/:id" element={<ActivityDetailPage />} />
          <Route path="/promos" element={<PromosPage />} />
          <Route path="/promo/:id" element={<PromoDetailPage />} />

          {/* 🔒 Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/update-profile" element={<ProfilePage />} />
            <Route path="/carts" element={<CartPage />} />
            <Route path="/my-transactions" element={<Transaction />} />
            <Route path="/transaction/:id" element={<TransactionDetail />} />

            <Route path="/my-dashboard" element={<Dashboard />}>
              <Route path="users" element={<Users />} />
              <Route path="orders" element={<Orders />} />
              <Route path="banners" element={<Banners />} />
              <Route path="categories" element={<Categories />} />
              <Route path="activities" element={<Activities />} />
              <Route path="promos" element={<Promos />} />
              <Route path="orders/:id" element={<TransactionDetailAdmin />} />
            </Route>
          </Route>

          {/* 🚫 Guest-Only Routes */}
          <Route element={<GuestRoute />}>
            <Route path="/login" element={<Loginpage />} />
            <Route path="/register" element={<Registerpage />} />
          </Route>
        </Routes>
        <Toaster position="top-right" richColors closeButton />
      </CartProvider>
    </BrowserRouter>
  );
};

export default App;
