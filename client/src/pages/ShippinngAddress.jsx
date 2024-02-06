import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/appContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const initialState = {
  name: "",
  email: "",
  address: "",
  city: "",
  country: "",
  postalCode: "",
};

const ShippingAddress = () => {
  const { user, cart, handlePaymentMethod, saveShippingAddress } = useAppContext();
  const [values, setValues] = useState(initialState);
  const [paymentMethod, setPaymentMethod] = useState(
    cart.paymentMethod || "PayPal"
  );
  const navigate = useNavigate();

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

   useEffect(() => {
     window.scrollTo(0, 0);
      setValues({
        ...values,
        name: cart.address.name,
        email: cart.address.email,
        address: cart.address.address,
        city: cart.address.city,
        country: cart.address.country,
        postalCode: cart.address.postalCode,
      });
   }, []);

  useEffect(() => {
    if (!user) {
      navigate("/register?redirect=/shippingAddress");
    }
  }, [user, navigate]);

  const handleSubmit = () => {
    const { name, address, city, postalCode, country, email } = values;
    if (!name || !address || !city || !postalCode || !email) {
      toast.error('Please Enter All Values')
      return
    }

    if(!country) {
      toast.error("Please Select Country");
      return;
    }
  saveShippingAddress(values);
    localStorage.setItem(
      "address",
      JSON.stringify({
        name,
        address,
        city,
        postalCode,
        country,
        email
      })
    );
    navigate("/placeOrder");
  };
  return (
    <div className='w-[90vw] mx-auto my-5'>
      <div className='container px-4 sm:px-8'>
        <div className='min-h-[calc(100vh-68px)]'>
          <div className=' bg-indigo-50 px-2 py-1 sm:py-4 sm:px-12'>
            <div className='mt-4 p-4 relative flex flex-col sm:flex-row sm:items-center bg-white shadow rounded-md'>
              <div className='flex flex-row items-center border-b sm:border-b-0 w-full sm:w-auto pb-4 sm:pb-0'>
                <div className='text-yellow-500'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='w-6 sm:w-5 h-6 sm:h-5'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                    />
                  </svg>
                </div>
                <div className='text-sm font-medium ml-3'>Checkout</div>
              </div>
              <div className='text-sm tracking-wide text-gray-500 mt-4 sm:mt-0 sm:ml-4'>
                Complete your shipping and payment details below.
              </div>
              <div className='absolute sm:relative sm:top-auto sm:right-auto ml-auto right-4 top-4 text-gray-400 hover:text-gray-800 cursor-pointer'></div>
            </div>
            <div className='rounded-md'>
              <form
                onSubmit={handleSubmit}
              >
                <section>
                  <h2 className='uppercase tracking-wide text-lg font-semibold text-gray-700 my-2'>
                    Shipping & Billing Information
                  </h2>
                  <div className='mb-3 bg-white shadow-lg rounded text-gray-600'>
                    <label className='flex border-b border-gray-200 h-12 py-3 items-center'>
                      <span className='text-right px-2'>Name</span>
                      <input
                        name='name'
                        className='focus:outline-none px-3 w-full'
                        placeholder='Carlton Chiunye'
                        value={values.name}
                        onChange={handleChange}
                      />
                    </label>
                    <label className='flex border-b border-gray-200 h-12 py-3 items-center'>
                      <span className='text-right px-2'>Email</span>
                      <input
                        name='email'
                        type='email'
                        value={values.email}
                        className='focus:outline-none px-3 w-full'
                        placeholder='example@gmail.com'
                        onChange={handleChange}
                      />
                    </label>
                    <label className='flex border-b border-gray-200 h-12 py-3 items-center'>
                      <span className='text-right px-2'>Address</span>
                      <input
                        name='address'
                        value={values.address}
                        className='focus:outline-none px-3 w-full'
                        placeholder='Your Address'
                        onChange={handleChange}
                      />
                    </label>
                    <label className='flex border-b border-gray-200 h-12 py-3 items-center'>
                      <span className='text-right px-2'>City</span>
                      <input
                        name='city'
                        value={values.city}
                        className='focus:outline-none px-3 w-full'
                        placeholder='Harare'
                        onChange={handleChange}
                      />
                    </label>
                    <label className='xl:w-1/4 xl:inline-flex items-center flex xl:border-none border-t border-gray-200 py-3'>
                      <span className='text-right px-2'>ZIP</span>
                      <input
                        name='postalCode'
                        value={values.postalCode}
                        className='focus:outline-none px-3 w-full'
                        placeholder='98603'
                        onChange={handleChange}
                      />
                    </label>
                    <label className='flex border-t border-gray-200 h-12 py-3 items-center select relative'>
                      <span className='text-right px-2'>Country</span>
                      <div
                        id='country'
                        className='focus:outline-none px-3 w-full flex items-center'
                      >
                        <select
                          name='country'
                          className='border-none bg-transparent flex-1 cursor-pointer appearance-none focus:outline-none p-2'
                          onChange={handleChange}
                          value={values.country}
                        >
                          <option value='Australia'>Australia</option>
                          <option value='Botswana'>Botswana</option>
                          <option value='Brazil'>Brazil</option>
                          <option value='Canada'>Canada</option>
                          <option value='China'>China</option>
                          <option value='DK'>Denmark</option>
                          <option value='Denmark'>Finland</option>
                          <option value='France'>France</option>
                          <option value='Germany'>Germany</option>
                          <option value='Hong Kong'>Hong Kong</option>
                          <option value='Ireland'>Ireland</option>
                          <option value='Italy'>Italy</option>
                          <option value='Japan'>Japan</option>
                          <option value='Luxembourg'>Luxembourg</option>
                          <option value='Mexico'>Mexico</option>
                          <option value='Netherlands'>Netherlands</option>
                          <option value='Poland'>Poland</option>
                          <option value='Portugal'>Portugal</option>
                          <option value='South africa'>South africa</option>
                          <option value='Spain'>Spain</option>
                          <option value='Tanzania'>Tanzania</option>
                          <option value='United States'>United States</option>
                          <option value='Zimbabwe'>Zimbabwe</option>
                        </select>
                      </div>
                    </label>
                  </div>
                </section>
              </form>
            </div>
            <div className='rounded-md'>
              <section>
                <h2 className='uppercase tracking-wide text-lg font-semibold text-gray-700 my-2'>
                  Payment Option
                </h2>
                <div className='flex items-center mb-4'>
                  <input
                    id='PayPal'
                    type='radio'
                    value='PayPal'
                    name='default-radio'
                    checked={paymentMethod === "PayPal"}
                    className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300'
                    onChange={(e) => {
                      setPaymentMethod(e.target.value);
                      handlePaymentMethod("PayPal");
                    }}
                  />
                  <label
                    htmlFor='default-radio-1'
                    className='ms-2 text-sm font-medium text-gray-900 dark:text-gray-300'
                  >
                    Paypal
                  </label>
                </div>
                <div className='flex items-center'>
                  <input
                    id='Stripe'
                    type='radio'
                    value='Stripe'
                    name='default-radio'
                    className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300'
                    checked={paymentMethod === "Stripe"}
                    onChange={(e) => {
                      setPaymentMethod(e.target.value);
                      handlePaymentMethod("Stripe");
                    }}
                  />
                  <label
                    htmlFor='default-radio-2'
                    className='ms-2 text-sm font-medium text-gray-900 dark:text-gray-300'
                  >
                    Stripe
                  </label>
                </div>
              </section>
            </div>
            <button
              className='submit-button px-4 py-3 rounded-full bg-gray-700 text-white focus:ring focus:outline-none w-full text-xl font-semibold transition-colors mt-4'
              type='submit'
              onClick={handleSubmit}
            >
              Proceed To Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingAddress;
