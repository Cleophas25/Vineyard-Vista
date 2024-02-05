import { useState, useEffect } from "react";
import { useAppContext } from "../context/appContext";
import { useLocation, useNavigate } from "react-router-dom";
import FormRow from "../components/FornRow";

const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: true,
};

const Register = () => {
  const navigate = useNavigate();
  const { search } = useLocation()
  const redirectInUrl = new URLSearchParams(search).get('redirect')
  const redirect = redirectInUrl ? redirectInUrl : '/'

  const [values, setValues] = useState(initialState);
  const { user, isLoading, setupUser } =
    useAppContext();

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, isMember } = values;
    const currentUser = { name, email, password };
    if (isMember) {
      setupUser({
        currentUser,
        endPoint: "login",
      });
    } else {
      setupUser({
        currentUser,
        endPoint: "register",
      });
    }
  };

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate(redirect || "/");
      }, 3000);
    }
  }, [user, navigate, redirect]);

  useEffect(()=> {
    window.scrollTo(0,0)
  }, [])

  return (
    <section className='min-h-screen grid items-center relative'>
      <form
        className='max-w-md border-t-4 border-black w-[90vw] bg-white rounded-md shadow-md py-8 px-10 my-12 mx-auto transition-all ease-in-out hover:shadow-lg'
        onSubmit={onSubmit}
      >
        <h3 className='text-center text-3xl font-semibold font-primary'>
          {values.isMember ? "Login" : "Register"}
        </h3>
        {/* name input */}
        {!values.isMember && (
          <FormRow
            placeholder='Your Email'
            type='text'
            name='name'
            value={values.name}
            handleChange={handleChange}
          />
        )}

        {/* email input */}
        <FormRow
          placeholder='Your Email'
          type='email'
          name='email'
          value={values.email}
          handleChange={handleChange}
        />
        {/* password input */}
        <FormRow
          placeholder='Enter your password'
          type='password'
          name='password'
          value={values.password}
          handleChange={handleChange}
        />
          <button
            type='submit'
            className='cursor-pointer text-white bg-black border-transparent rounded-md tracking-wider py-1 p-3 shadow-sm transition-all ease-in-out capitalize inline-block w-full hover:bg-gray-900 hover:shadow-lg'
            disabled={isLoading}
          >
            submit
          </button>
        <button
          type='button'
          className='mt-4 w-full bg-gray-200 p-1 rounded-md capitalize'
          disabled={isLoading}
          onClick={() => {
            setupUser({
              currentUser: { email: "guest@gmail.com", password: "123456" },
              endPoint: "login",
            });
          }}
        >
          {isLoading ? "loading..." : "Enter as guest"}
        </button>
        <p className='m-0 mt-4 text-center'>
          {values.isMember ? "Not a member yet?" : "Already a member?"}
          <button
            type='button'
            onClick={toggleMember}
            className='bg-transparent border-transparent text-orange-500 cursor-pointer ml-1 font-semibold'
          >
            {values.isMember ? "Register" : "Login"}
          </button>
        </p>
      </form>
    </section>
  );
};
export default Register;
