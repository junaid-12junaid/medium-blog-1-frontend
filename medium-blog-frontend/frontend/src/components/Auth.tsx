import { Link, useNavigate } from 'react-router-dom';
import { SignupInput } from '@juniad/medium-common';
import { useState } from 'react';
import axios from 'axios';
import { Backend_URL } from '../config';
export let Auth = ({ type }: { type: 'signup' | 'signin' }) => {
  let [postInputs, setPostInputs] = useState<SignupInput>({
    name: '',
    email: '',
    password: '',
  });

  let navigate=useNavigate()


 async function sendRequest(){

    try{

      const response=await axios.post(`${Backend_URL}/api/v1/user/${type=='signup'?"signup":"signin"}`,postInputs)
      let jwt=response.data;

    
      localStorage.setItem('token',jwt.jwt)
      navigate("/blogs")
    }catch(e:any){
      alert("Error while signing up")
      console.error(e)
    }
  }

  return (
    <div className="h-screen flex justify-center flex-col ">
      <div className="flex justify-center">
        <div>
          <div className="px-10">
            <div className="text-3xl font-extrabold">Create an account</div>

            <div className="text-slate-400 pt-3 flex justify-center">
              {type=='signup'?"Already have an account?":"Don't have an account?"}
              
              <Link className="pl-2 underline " to={type=="signup"?"/signin":"/signup"}>
              {type=='signin'?"Sign up":"Sign in"}
               
              </Link>
            </div>
          </div>
          <div className="pt-8">
            {type=='signup'?<LabelledInput
              label="Username"
              placeholder="Enter your username"
              onChange={(e) => {
                setPostInputs({
                  ...postInputs,
                  name: e.target.value,
                });
              }}
            />:null}
            <LabelledInput
              label="Email"
              placeholder="m@example.com"
              onChange={(e) => {
                setPostInputs({
                  ...postInputs,
                  email: e.target.value,
                });
              }}
            />
            <LabelledInput
              type="password"
              label="Password"
              placeholder="12345"
              onChange={(e) => {
                setPostInputs({
                  ...postInputs,
                  password: e.target.value,
                });
              }}
            />
            <div className="pt-4">
              <button onClick={sendRequest} 
                type="button"
                className="w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
              >
                {type=='signup'?"Sign Up":"Sign in"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface LabelledInputType {
  label: string;
  placeholder: string;
  onChange: (e: any) => void;
  type?: string;
}

function LabelledInput({
  label,
  placeholder,
  onChange,
  type,
}: LabelledInputType) {
  return (
    <div>
      <div>
        <label className="block mb-2 text-sm font-bold text-gray-900 dark:text-black pt-4">
          {label}
        </label>
        <input
          onChange={onChange}
          type={type || 'text'}
          id="first_name"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder={placeholder}
          required
        />
      </div>
    </div>
  );
}
