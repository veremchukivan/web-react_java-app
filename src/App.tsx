import { Route, Routes } from 'react-router-dom';
import './App.css'
import CategoryCreatePage from './components/category/create/CategoryCreatePage';
import CategoryEditPage from './components/category/edit/CategoryEditPage';
import CategoryListPage from './components/category/list/CategoryListPage';
import DefaultLayout from './components/containers/default/DefaultLayout';


function App() {
  
  return (
    <>
    <Routes>
      <Route path="/" element={<DefaultLayout/>}>
        <Route index element={<CategoryListPage />} />
        <Route path="/create" element={<CategoryCreatePage />} />
        <Route path="category/edit/:id" element={<CategoryEditPage />} />
      </Route>
    </Routes>
  </>
  )
}

export default App
