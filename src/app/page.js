"use client"

import { useState } from "react";
import { useRouter } from 'next/navigation'

const Home = () => {

  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setdescription] = useState("");

 
  const handleSubmit = async(e)=>{
    e.preventDefault();

    if (!title || !description) {
      alert("title and description are required");
      return;
    }
    try {
      const res=await fetch("/api/mongodb",{
        method:"POST",
        headers:{
          "Content-type":"application/json",
        },
        body:JSON.stringify({title,description})
      });

      if (res.ok) {
        alert("successfully added")
        setTitle('');
        setdescription('');
        router.refresh()
      }else{
        alert("something went wrong")
      }
    } catch (error) {
      console.log("something went wrong");
    }
  }

 
  return (
    <>
      <form className="  h-full" onSubmit={handleSubmit}>

        <div className=" px-5 py-24 mx-auto flex justify-center ">
          <div className="lg:w-1/3 md:w-1/2 bg-white rounded-sm p-8 flex flex-col  w-full mt-10 md:mt-0  z-10  border">
            <h2 className="text-gray-900 text-lg text-center mb-1 font-medium title-font">Add Todo</h2>
            <div className="relative mb-4">
              <label htmlFor="title" className="leading-7 text-sm text-gray-600">Title</label>
              <input type="text" onChange={(e)=>setTitle(e.target.value)} value={title} id="title" name="title" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
            <div className="relative mb-4">
              <label htmlFor="description" className="leading-7 text-sm text-gray-600">Description</label>
              <textarea id="description" onChange={(e)=>setdescription(e.target.value)} name="description" value={description} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
            </div>
            <button type='submit' className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">Add note</button>
          </div>
        </div>
      </form>
    </>
  )
}

export default Home

