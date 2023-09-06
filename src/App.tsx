import { Route, Routes } from 'react-router-dom';
import './App.css'
import CategoryCreatePage from './components/category/create/CategoryCreatePage';
import CategoryEditPage from './components/category/edit/CategoryEditPage';
import CategoryListPage from './components/category/list/CategoryListPage';
import DefaultLayout from './components/containers/default/DefaultLayout';
import ProductCreatePage from './components/product/create/ProductCreatePage';
import ProductListPage from './components/product/list/ProductListPage';
import ProductEditPage from './components/product/edit/ProductEditPage';


function App() {
  
  return (
    <>
    <Routes>
      <Route path="/" element={<DefaultLayout/>}>
        <Route index element={<CategoryListPage />} />
        <Route path="category/list" element={<CategoryListPage />} />
        <Route path="/create" element={<CategoryCreatePage />} />
        <Route path="category/edit/:id" element={<CategoryEditPage />} />
        <Route path="products/create" element={<ProductCreatePage />} />
          <Route path="products/list" element={<ProductListPage />} />
          <Route path="products/edit/:id" element={<ProductEditPage/> }/>
      </Route>
    </Routes>
  </>
  )
}

export default App
