
"use client";
// components/Form.jsx
import { useState, useEffect } from "react";
import FormInput from "./FormInput";

const Form = ({ onSubmit, initialData = {} }) => {
    const [values, setValues] = useState({
        fullName: initialData.fullName || "",
        email: initialData.email || "",
        mobileNo: initialData.mobileNo || "",
        password: initialData.password || "",
    });

    // HERE I HAVE TRIED TO GET INITIAL VALUES AND SHOW THE DATA IN FORM FOR dashboard page 
    // useEffect(() => {
    //     setValues((prevValues) => ({
    //         ...prevValues,
    //         fullName: initialData.fullName || "",
    //         email: initialData.email || "",
    //         mobile: initialData.mobile || "",
    //         password: initialData.password || "",
    //     }));
    // }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        // console.log(`handleChange called: ${name} - ${value}`);
        setValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
        // console.log(values);
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted with values:', values);
        onSubmit(values);
    };
    

    return (
        <form onSubmit={handleSubmit} className='px-8 pt-6 pb-8 mb-4 border border-gray-300 rounded shadow-md bg-slate-700 w-76 text-start'>
            <FormInput type='text' name='fullName' value={values.fullName} onChange={handleChange} labelText='Full Name' />
            <FormInput type='email' name='email' value={values.email} onChange={handleChange} labelText='Email' />
            <FormInput type='tel' name='mobileNo' value={values.mobileNo} onChange={handleChange} labelText='Mobile' />
            <FormInput type='password' name='password' value={values.password} onChange={handleChange} labelText='Password' />
            <button className='select-none rounded-lg border border-gray-200 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-gray-400 transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none' type='submit'>
                Submit
            </button>
        </form>
    );
};

export default Form;
