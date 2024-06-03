// login/page.jsx
'use client'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState, useContext } from 'react';
import FormInput from '../components/FormInput';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const { setUser } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/login', { email, password });

      if (response.status === 200) {
        setUser(response.data.user);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        router.push('/dashboard');
      }
    } catch (error) {
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className='flex flex-col items-center justify-center h-screen gap-6'>
      <h1 className='text-3xl text-blue-400'>Login</h1>
      {error && <p className='text-red-500'>{error}</p>}
      <form onSubmit={handleLogin} className='p-8 mb-4 border rounded shadow-md border-slate-700 w-76 text-start'>
        <FormInput
          type={'email'}
          name={'email'}
          labelText={'Email'}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <FormInput
          type={'password'}
          name={'password'}
          labelText={'Password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className='select-none rounded-lg border border-gray-200 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-gray-400 transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
          type='submit'>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
