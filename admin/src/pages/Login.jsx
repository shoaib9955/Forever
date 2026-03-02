import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = ({ setToken }) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onSubmitHandler = async (e) => {
        try {
            e.preventDefault();
            const response = await axios.post('http://localhost:4000/api/user/admin', { email, password })
            if (response.data.success) {
                setToken(response.data.token)
                localStorage.setItem('adminToken', response.data.token)
                toast.success("Welcome Admin!")
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    return (
        <div className='min-h-screen flex items-center justify-center w-full bg-gray-50'>
            <div className='bg-white shadow-xl rounded-lg px-8 py-10 max-w-md w-full border border-gray-100'>
                <h1 className='text-3xl font-bold mb-6 text-center text-gray-800'>Admin Panel</h1>
                <form onSubmit={onSubmitHandler}>
                    <div className='mb-5'>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>Email Address</label>
                        <input onChange={(e) => setEmail(e.target.value)} value={email} className='rounded-md w-full px-4 py-3 border border-gray-300 outline-none focus:ring-2 focus:ring-black transition-all' type="email" placeholder='admin@example.com' required />
                    </div>
                    <div className='mb-6'>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>Password</label>
                        <input onChange={(e) => setPassword(e.target.value)} value={password} className='rounded-md w-full px-4 py-3 border border-gray-300 outline-none focus:ring-2 focus:ring-black transition-all' type="password" placeholder='Enter your password' required />
                    </div>
                    <button className='w-full py-3 px-4 bg-black text-white rounded-md font-medium hover:bg-gray-800 transition-colors shadow-lg active:scale-95 duration-100' type="submit"> Login </button>
                </form>
            </div>
        </div>
    )
}

export default Login
