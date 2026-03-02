import React from 'react'
import { NavLink } from 'react-router-dom'
import { PlusCircle, ListChecks, ShoppingBag } from 'lucide-react'

const Sidebar = () => {
  return (
    <div className='w-[18%] min-h-screen border-r-2 border-gray-100 bg-white shadow-sm'>
        <div className='flex flex-col gap-4 pt-6 pl-[20%] text-[15px]'>
            <NavLink className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l' to="/add">
                <PlusCircle size={20} className='text-gray-500' />
                <p className='hidden md:block'>Add Items</p>
            </NavLink>

            <NavLink className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l' to="/list">
                <ListChecks size={20} className='text-gray-500' />
                <p className='hidden md:block'>List Items</p>
            </NavLink>

            <NavLink className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l' to="/orders">
                <ShoppingBag size={20} className='text-gray-500' />
                <p className='hidden md:block'>Orders</p>
            </NavLink>
        </div>
    </div>
  )
}

export default Sidebar
