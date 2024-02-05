import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import { toast } from "react-toastify";
import axios from "axios";

export default function CreateProduct() {
  const { user } = useAppContext();
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(null);
  const [files, setFiles] = useState(null);
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate();

   useEffect(() => {
     if (!user) {
       return navigate("/register");
     }
     if (user.isAdmin === false) {
       navigate("/")
       return 
     }
   }, [user, navigate]);

    const handleProductImageUpload = (e) => {
      const file = e.target.files[0];

      TransformFileData(file);
    };

    const TransformFileData = (file) => {
      const reader = new FileReader();

      if (file) {
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          setFiles(reader.result);
        };
      } else {
        setFiles("");
      }
    };
   async function createNewProduct(ev) {
    ev.preventDefault();
    console.log('hie')
    if (
      !productName ||
      !description ||
      !price ||
      !countInStock ||
      !category ||
      !files
    ) {
      toast.error("Please Enter All Values");
    }
    setIsLoading(true)
    try {
      const response = await axios.post(
        "https://vineyard-vista.onrender.com/api/v1/products",
        {
          productName: productName,
          description: description,
          countInStock: countInStock,
          price: price,
          category: category,
          imgUrl: files,
        },
        {
          headers: {
            authorization: `Bearer ${user.token}`,
          },
        }
      );
      setIsLoading(false)
      toast.success("Prouct Created");
      setTimeout(() => {
        navigate("/Admindashboard/products");
      }, 3000);
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message)
    }
  }

  return (
    <div>
      <h3 className='text-center text-3xl font-semibold'>Create Product</h3>
      <form
        onSubmit={createNewProduct}
        className='max-w-5xl border-t-4 border-black bg-white rounded-md shadow-md py-8 px-10 my-12 mx-auto transition-all ease-in-out hover:shadow-lg'
      >
        <input
          type='text'
          placeholder={"Product Name"}
          value={productName}
          onChange={(ev) => setProductName(ev.target.value)}
          className='w-full py-2 px-3 rounded-md border border-gray-300 focus:outline-none mb-4'
          required
        />
        <input
          type='text'
          placeholder={"description"}
          value={description}
          onChange={(ev) => setDescription(ev.target.value)}
          className='w-full py-2 px-3 rounded-md border border-gray-300 focus:outline-none mb-4'
          required
        />
        <input
          type='text'
          placeholder={"Product Category"}
          value={category}
          onChange={(ev) => setCategory(ev.target.value)}
          className='w-full py-2 px-3 rounded-md border border-gray-300 focus:outline-none mb-4'
          required
        />
        <input
          type='number'
          placeholder={"Count In Stock"}
          value={countInStock}
          onChange={(ev) => setCountInStock(ev.target.value)}
          className='w-full py-2 px-3 rounded-md border border-gray-300 focus:outline-none mb-4'
          required
        />
        <input
          type='number'
          placeholder={"Product Price"}
          value={price}
          onChange={(ev) => setPrice(ev.target.value)}
          className='w-full py-2 px-3 rounded-md border border-gray-300 focus:outline-none mb-4'
          required
        />
        <input
          id='imgUpload'
          accept='image/*'
          type='file'
          onChange={handleProductImageUpload}
          className='w-full py-2 px-3 rounded-md border border-gray-300 focus:outline-none mb-4'
          required
        />
        <button
          className={`${
            isLoading ? "bg-gray-200 text-black" : "bg-black text-white"
          } cursor-pointer border-transparent rounded-md tracking-wider py-1 p-3 shadow-sm transition-all ease-in-out capitalize inline-block w-full hover:bg-gray-900 hover:shadow-lg mt-4`}
          disabled={isLoading}
        >
          {isLoading ? "Creating, please wait..." : "Create Product"}
        </button>
      </form>
    </div>
  );
}
