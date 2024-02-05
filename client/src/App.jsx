import SingleNews from "./components/SingleNews";
import { Route, Routes } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./components/Layout";
import Register from "./pages/Register";
import Landing from "./pages/Landing";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Awards from "./pages/Awards";
import ProductPage from "./pages/ProductPage";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import PlaceOrder from "./pages/PlaceOrder";
import BlogPost from "./pages/BlogPost";
import CreatePost from "./pages/CreatePost";
import CreateProduct from "./pages/CreateProduct";
import UpdateProduct from "./pages/UpdateProduct";
import UpdatePost from "./pages/UpdatePost";
import AdminDashboard from "./pages/AdminDashboard";
import Posts from "./pages/Posts";
import Users from "./pages/Users";
import Orders from "./pages/Orders";
import ShippingAddress from "./pages/ShippinngAddress";
import OrderPage from "./pages/OrderPage";
import UserProfile from "./pages/UserProfile";
import EditUser from "./pages/EditUser";
import Stats from "./pages/Stats";
import Products from "./pages/Products";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <div>
      <ToastContainer position='top-center' limit={2} autoClose={"2000"} />
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Landing />} />
          <Route path='/about' element={<About />} />
          <Route path='/shop' element={<Shop />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/product/:id' element={<ProductPage />} />
          <Route path='/awards' element={<Awards />} />
          <Route path='/blog' element={<Blog />} />
          <Route path='/post/:id' element={<BlogPost />} />
          <Route path='/order/:id' element={<OrderPage />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/register' element={<Register />} />
          <Route path='/shippingAddress' element={<ShippingAddress />} />
          <Route path='/placeOrder' element={<PlaceOrder />} />
          <Route path='/profile' element={<UserProfile />} />
          <Route path='*' element={<NotFound />} />
        </Route>
        <Route path='/Admindashboard' element={<AdminDashboard />}>
          <Route
            path='/Admindashboard/createProduct'
            element={<CreateProduct />}
          />
          <Route
            path='/Admindashboard/updateProduct/:id'
            element={<UpdateProduct />}
          />
          Admin
          <Route path='/Admindashboard/createPost' element={<CreatePost />} />
          <Route
            path='/Admindashboard/updatePost/:id'
            element={<UpdatePost />}
          />
          <Route path='/Admindashboard/products' element={<Products />} />
          <Route path='/Admindashboard/posts' element={<Posts />} />
          <Route path='/Admindashboard/users' element={<Users />} />
          <Route path='/Admindashboard/orders' element={<Orders />} />
          <Route path='/Admindashboard/stats' element={<Stats />} />
          <Route path='/Admindashboard/user/:id' element={<EditUser />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
