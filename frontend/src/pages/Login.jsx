import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";
const backendUrl = 'http://localhost:3000'
const Login = () => {
  const [currentState, setCurrentState] = useState("Login");
  const {token, setToken, navigate} =useContext(ShopContext) 
  const [name,setName]=useState('')
  const [password,setPassword]=useState('')
  const [email,setEmail]=useState('')

  const onSubmitHandler = async (e)=>{
    e.preventDefault();
    try {
      if (currentState === 'Sign up') {
        // const response = await axios.post(backendUrl + '/api/user/register',{name,email,password})
        // console.log(response.data)
        axios.post(`${backendUrl}/api/user/register`, {name,email,password})
         .then((response) => {
            setToken(response.data.token)
            localStorage.setItem('token', response.data.token)
            // navigate('/dashboard')
          })
          .catch((error) => console.error(error));
      }else{
        
        axios.post(`${backendUrl}/api/user/login`, {email,password})
         .then((response) => {
            setToken(response.data.token)
            localStorage.setItem('token', response.data.token)
            
          })
         .catch((error) => console.error(error));

      }

    } catch (error) {
      console.log(error)
      toast.error("Failed to login")
    }
    
  }
  useEffect(()=>{
    if(token){
      navigate('/')
    }
  },[token])
  return (
   
    <section className="bg-gray-50 dark:bg-gray-100 ">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-gray"
        >
          <img
            className="w-8 h-8 mr-2"
            src="logo.svg"
            alt=""
          />
          G4 Shop
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              {currentState} 
            </h1>
            <form onSubmit={onSubmitHandler}  className="space-y-4 md:space-y-6" action="#">
              {currentState === "Sign up" ? (
                <div>
                  <label
                    for="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your name
                  </label>
                  <input
                    onChange={(e)=>setName(e.target.value)}
                    value={name}
                    type="text"
                    name="name"
                    id="name"
                    class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name"
                    required=""
                  ></input>
                </div>
              ) : (
                ""
              )}
              <div>
                <label
                  for="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                onChange={(e)=>setEmail(e.target.value)}
                value={email}
                  type="email"
                  name="email"
                  id="email"
                  class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@gmail.com"
                  required=""
                ></input>
              </div>
              <div>
                <label
                  for="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                onChange={(e)=>setPassword(e.target.value)}
                value={password}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                ></input>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      required=""
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      for="remember"
                      className="text-gray-500 dark:text-gray-300"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                {currentState === 'Login' ? <a
                  href="#"
                  className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Forgot password?
                </a> : '' }
                
              </div>
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
               {currentState === 'Login' ? 'Sign in ' : 'Sign up'}
              </button>
              {currentState === "Login" ? (
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don’t have an account yet?{" "}
                  <a
                    href="#"
                    onClick={()=>setCurrentState('Sign up')}
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Sign up
                  </a>
                </p>
              ) : (
                <p 
                onClick={()=>setCurrentState('Login')}
                className="font-medium text-primary-600 hover:underline dark:text-primary-500 cursor-pointer">
                  Login here
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
