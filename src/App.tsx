import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import CategoryCreatePage from "./components/admin/category/create/CategoryCreatePage";
import CategoryEditPage from "./components/admin/category/edit/CategoryEditPage";
import CategoryListPage from "./components/admin/category/list/CategoryListPage";
import DefaultLayout from "./components/containers/default/DefaultLayout";
import ProductCreatePage from "./components/admin/product/create/ProductCreatePage";
import ProductListPage from "./components/admin/product/list/ProductListPage";
import ProductEditPage from "./components/admin/product/edit/ProductEditPage";
import LoginPage from "./components/auth/login/LoginPage";
import RegisterPage from "./components/auth/register/RegisterPage";
import AdminLayout from "./components/containers/admin/AdminLayout";
import { useSelector } from "react-redux";
import { IAuthUser } from "./entities/Auth";
import HomePage from "./home/HomePage";

function App() {
  const { user, isAuth } = useSelector((store: any) => store.auth as IAuthUser);
  
  return (
    <>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
        <Route
          path="/admin"
          element={
            !isAuth || !(user?.roles && user.roles.includes("admin")) ? (
              <Navigate to="/login" />
            ) : (
              <AdminLayout />
            )
          }>
          <Route index element={<CategoryListPage />} />
          <Route path="category/list" element={<CategoryListPage />} />
          <Route path="/create" element={<CategoryCreatePage />} />
          <Route path="category/edit/:id" element={<CategoryEditPage />} />
          <Route path="products/create" element={<ProductCreatePage />} />
          <Route path="products/list" element={<ProductListPage />} />
          <Route path="products/edit/:id" element={<ProductEditPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
