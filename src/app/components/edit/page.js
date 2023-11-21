"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EditTopicForm({ id, title, description }) {
    const [newTitle, setNewTitle] = useState(title);
    const [newDescription, setNewDescription] = useState(description);

    const router = useRouter();


    const handleSubmit = async (e) => {
        const url = process.env.API_URI;
        e.preventDefault();

        try {
            const res = await fetch(`/api/mongodb/${id}`, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ newTitle, newDescription }),
            });

            if (!res.ok) {
                throw new Error("Failed to update topic");
            }

            router.refresh();
            router.push("/notes");
        } catch (error) {
            console.log(error);
        }
    };

    return (


        <form className="  h-full" onSubmit={handleSubmit}>

            <div className=" px-5 py-24 mx-auto flex justify-center ">
                <div className="lg:w-1/3 md:w-1/2 bg-white rounded-sm p-8 flex flex-col  w-full mt-10 md:mt-0  z-10  border">
                    <h2 className="text-gray-900 text-lg text-center mb-1 font-medium title-font">Add Todo</h2>
                    <div className="relative mb-4">
                        <label htmlFor="title" className="leading-7 text-sm text-gray-600">Title</label>
                        <input type="text" onChange={(e) => setNewTitle(e.target.value)}
                            value={newTitle} id="title" name="title" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                    <div className="relative mb-4">
                        <label htmlFor="description" className="leading-7 text-sm text-gray-600">Description</label>
                        <textarea id="description" onChange={(e) => setNewDescription(e.target.value)}
                            value={newDescription} name="description" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
                    </div>
                    <button type='submit' className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">update </button>
                </div>
            </div>
        </form>



    );
}