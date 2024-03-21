import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function LoginPage() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const submitData = async () => {
      console.log(email,password)
      try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/login/`,{
          username : email,
          password: password
        });
        if (response.data.success){
          if (response.data.type=="Ngo"){
            localStorage.setItem("isNgo",true);
          } else {
            localStorage.setItem("isNgo",false);
          }
          navigate("/");
          localStorage.setItem("isLoggedIn",true);
          localStorage.setItem("user",JSON.stringify(response.data.details))
        }
      } catch (error) {
        console.log(error)
        alert("Incorrect password and username");
      }
       
    }

    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col justify-center">
        <div className="max-w-md w-full mx-auto">
          <div className="text-3xl text-yellow-600 font-bold text-gray-900 mt-2 text-center">Ztics</div>
          <div className="bg-yellow-500 p-8 mt-6 mb-4 rounded-lg  shadow-md">
            <div className="space-y-4">
              <h1 className="text-2xl font-bold text-center">Welcome back.</h1>
              <div>
                <label className="block text-sm font-medium text-gray-700" >
                  Username
                </label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 p-2 w-full rounded-md bg-gray-200 border-gray-300 shadow-sm"
                  id="email"
                  placeholder="abcd@gmail.com"
                  type="email"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="password">
                  Password
                </label>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 p-2 w-full rounded-md bg-gray-200 border-gray-300 shadow-sm"
                  id="password"
                  placeholder="********"
                  type="password"
                />
              </div>
              <div className="flex items-center justify-between">
                <a className="font-medium text-sm text-blue-600 hover:text-blue-500" href="#">
                  Forgot Password?
                </a>
              </div>
              <div>
                <button className="w-full font-semibold py-2 px-4 bg-yellow-700 text-black rounded-md transition-all duration-300 eas hover:bg-yellow-900" onClick={()=>submitData()}>Login</button>
              </div>
              <div className="text-center flex gap-1 justify-center">
                <p className="text-sm">Don't have an account?</p>
                <a onClick={() => navigate("/signup")} className="font-medium text-sm text-secondary hover:text-primary" >
                  Sign Up
                </a>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    )
  }
  
  