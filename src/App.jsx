import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Loginpage from "./pages/Loginpage";
import Registerpage from "./pages/Registerpage";
import UploadFile from "./pages/UploadFile";
import BannersPage from "./pages/BannersPage";
import BannerDetailPage from "./pages/BannerDetailPage";
import CategoryDetailPage from "./pages/CategoryDetailPage";
import CategoriesPage from "./pages/CategoryPage";
import ScrollToTop from "./components/location.pathname";
import ActivityDetailPage from "./pages/ActivityDetailPage";
import ActivitiesPage from "./pages/ActivitiesPage";
import PromosPage from "./pages/PromosPage";
import PromoDetailPage from "./pages/PromoDetailPage";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Loginpage />} />
          <Route path="/register" element={<Registerpage />} />
          <Route path="/banners" element={<BannersPage />} />
          <Route path="/banner/:id" element={<BannerDetailPage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/category/:id" element={<CategoryDetailPage />} />
          <Route path="/activities" element={<ActivitiesPage />} />
          <Route path="/activity/:id" element={<ActivityDetailPage />} />
          <Route path="/promos" element={<PromosPage />} />
          <Route path="/promo/:id" element={<PromoDetailPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
