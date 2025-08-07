import { Route, Routes } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Sign_up from "./pages/Sign_up"
import Sign_in from "./pages/Sign_in"
import Admin_home from "./pages/Admin_home"
import Customer_home from "./pages/Customer_home"
import User_manage from "./pages/User_manage"
import Product_manage from "./pages/Product_manage"
import Add_product from "./pages/product/Add_product";
import Update_product from "./pages/product/Update_product";
import Delete_product from "./pages/product/Delete_product";
import Search_product from "./pages/product/Search_product";
import Cart from "./pages/Cart";
import OrderSummary from "./pages/OrderSummary";   


function App() {

  return (
    <div className="app">
      <Routes>
          <Route path = "/" element = {<Welcome />} />
          <Route path = "/sign_up" element = {<Sign_up />} />
          <Route path = "/sign_in" element = {<Sign_in />} />
          <Route path = "/admin_home" element = {<Admin_home />} />
          <Route path = "/customer_home" element = {<Customer_home />} />

          <Route path = "/um" element = {<User_manage />} />
          <Route path = "/pm" element = {<Product_manage />} />

          <Route path = "/addProd" element = {<Add_product />} />
          <Route path = "/updateProd" element = {<Update_product />} />
          <Route path = "/deleteProd" element = {<Delete_product />} />
          <Route path = "/searchProd" element = {<Search_product />} />

          <Route path="/cart" element={<Cart />} />
          <Route path="/order-summary/:orderId" element={<OrderSummary />} />

      </Routes>
    </div>
  )
}

export default App