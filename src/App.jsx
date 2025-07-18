import React from 'react'
import { Route, Routes } from "react-router-dom";
import Welcome from './pages/Welcome';
import Sign_up from './pages/Sign_up';
import Sign_in from './pages/Sign_in';
import Admin_home from './pages/Admin_home'
import Customer_home from './pages/Customer_home'
import Product_manage from './pages/Product_manage'
import User_manage from './pages/User_manage'
import Add_product from './pages/product/Add_product'
import Update_product from './pages/product/Update_product'
import Delete_product from './pages/product/Delete_product'
import Search_product from './pages/product/Search_product'

function App() {

  return (
    <>
     <Routes>
      <Route path = "/" element = {<Welcome />}></Route>
      <Route path = "/sign_up" element = {<Sign_up />}></Route>
     <Route path = "/sign_in" element = {<Sign_in />}></Route>
     <Route path = "/admin_home" element = {<Admin_home />}></Route>
     <Route path = "/customer_home" element = {<Customer_home />}></Route>

     <Route path = "/pm" element = {<Product_manage />}></Route>
     <Route path = "/um" element = {<User_manage />}></Route>
     
     <Route path = "/addProd" element = {<Add_product />}></Route>
     <Route path = "/updateProd" element = {<Update_product />}></Route>
     <Route path = "/deleteProd" element = {<Delete_product />}></Route>
     <Route path = "/searchProd" element = {<Search_product />}></Route>
     </Routes>
    </>
  );
}

export default App
