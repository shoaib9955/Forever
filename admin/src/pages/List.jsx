import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Trash2 } from 'lucide-react'

const List = ({ token }) => {

  const [list, setList] = useState([])

  const fetchList = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/product/list")
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  const removeProduct = async (id) => {
    try {
      const response = await axios.post("http://localhost:4000/api/product/remove", { id }, { headers: { token } })
      if (response.data.success) {
        toast.success(response.data.message)
        await fetchList();
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchList()
  }, [])

  return (
    <div className='bg-white p-8 rounded-lg shadow-sm border border-gray-100'>
      <p className='text-2xl font-bold mb-6 text-gray-800'>All Products List</p>
      <div className='flex flex-col gap-2'>
        {/* List Table Title */}
        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-3 px-2 border-b bg-gray-50 text-sm font-semibold text-gray-700 uppercase tracking-wider'>
          <p>Image</p>
          <p>Name</p>
          <p>Category</p>
          <p>Price</p>
          <p className='text-center'>Action</p>
        </div>

        {/* Product List */}
        {
          list.map((item, index) => (
            <div className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-3 px-2 border-b hover:bg-gray-50 transition-colors text-sm' key={index}>
              <img className='w-14 h-14 object-cover rounded shadow-sm' src={item.image[0]} alt="" />
              <p className='font-medium text-gray-800'>{item.name}</p>
              <p className='text-gray-600'>{item.category}</p>
              <p className='font-semibold'>${item.price}</p>
              <div onClick={() => removeProduct(item._id)} className='flex justify-center'>
                <p className='text-red-500 hover:text-red-700 cursor-pointer p-2 rounded hover:bg-red-50 transition-all'>
                    <Trash2 size={18} />
                </p>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default List
