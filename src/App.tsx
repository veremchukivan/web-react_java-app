import { Route, Routes } from 'react-router-dom';
import './App.css'
import CategoryCreatePage from './components/category/create/CategoryCreatePage';
import CategoryEditPage from './components/category/edit/CategoryEditPage';
import CategoryListPage from './components/category/list/CategoryListPage';


function App() {
  
  return (
    <>
    <Routes>
      <Route path="/">
        <Route index element={<CategoryListPage />} />
        <Route path="category/create" element={<CategoryCreatePage />} />
        <Route path="category/edit/:id" element={<CategoryEditPage />} />
      </Route>
    </Routes>
  </>
  )
}

export default App
