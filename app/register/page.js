// register/page.js
'use client'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Form from '../components/Form';

const Register = () => {
  const router = useRouter();
  const [error, setError] = useState('');

  const handleRegister = async (data) => {
    try {
      const response = await axios.post(`https://login-system-umber.vercel.app/api/register`, data);

      if (response.status === 200) {
        router.push('/login');
      }
    } catch (error) {
      setError('Registration failed. Please try again.',error._massage);
    }
  };

  return (
    <div className='flex flex-col items-center justify-center w-screen h-screen gap-6'>
      <h1 className='text-3xl text-lime-300'>Register</h1>
      {error && <p className='text-red-500'>{error}</p>}
      <Form onSubmit={handleRegister} />
    </div>
  );
};

export default Register;
