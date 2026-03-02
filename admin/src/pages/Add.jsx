import React, { useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Upload } from 'lucide-react'

const Add = ({ token }) => {

    const [image1, setImage1] = useState(false)
    const [image2, setImage2] = useState(false)
    const [image3, setImage3] = useState(false)
    const [image4, setImage4] = useState(false)

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("Acne-Prone Skin");
    const [subCategory, setSubCategory] = useState("Cleanser");
    const [bestseller, setBestseller] = useState(false);
    const [sizes, setSizes] = useState([]);

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData()

            formData.append("name", name)
            formData.append("description", description)
            formData.append("price", price)
            formData.append("category", category)
            formData.append("subCategory", subCategory)
            formData.append("bestseller", bestseller)
            formData.append("sizes", JSON.stringify(sizes))

            image1 && formData.append("image1", image1)
            image2 && formData.append("image2", image2)
            image3 && formData.append("image3", image3)
            image4 && formData.append("image4", image4)

            const response = await axios.post("http://localhost:4000/api/product/add", formData, { headers: { token } })

            if (response.data.success) {
                toast.success(response.data.message)
                setName('')
                setDescription('')
                setImage1(false)
                setImage2(false)
                setImage3(false)
                setImage4(false)
                setPrice('')
            } else {
                toast.error(response.data.message)
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    return (
        <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3 bg-white p-8 rounded-lg shadow-sm border border-gray-100'>
            <div className='w-full'>
                <p className='mb-3 font-semibold text-gray-700'>Upload Images</p>
                <div className='flex gap-4 flex-wrap'>
                    <label htmlFor="image1" className='cursor-pointer group'>
                        <div className='w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center bg-gray-50 group-hover:border-black transition-all overflow-hidden'>
                            {image1 ? <img className='w-full h-full object-cover' src={URL.createObjectURL(image1)} alt="" /> : <Upload className='text-gray-400 group-hover:text-black' />}
                        </div>
                        <input onChange={(e) => setImage1(e.target.files[0])} type="file" id="image1" hidden />
                    </label>
                    <label htmlFor="image2" className='cursor-pointer group'>
                        <div className='w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center bg-gray-50 group-hover:border-black transition-all overflow-hidden'>
                            {image2 ? <img className='w-full h-full object-cover' src={URL.createObjectURL(image2)} alt="" /> : <Upload className='text-gray-400 group-hover:text-black' />}
                        </div>
                        <input onChange={(e) => setImage2(e.target.files[0])} type="file" id="image2" hidden />
                    </label>
                    <label htmlFor="image3" className='cursor-pointer group'>
                        <div className='w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center bg-gray-50 group-hover:border-black transition-all overflow-hidden'>
                            {image3 ? <img className='w-full h-full object-cover' src={URL.createObjectURL(image3)} alt="" /> : <Upload className='text-gray-400 group-hover:text-black' />}
                        </div>
                        <input onChange={(e) => setImage3(e.target.files[0])} type="file" id="image3" hidden />
                    </label>
                    <label htmlFor="image4" className='cursor-pointer group'>
                        <div className='w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center bg-gray-50 group-hover:border-black transition-all overflow-hidden'>
                            {image4 ? <img className='w-full h-full object-cover' src={URL.createObjectURL(image4)} alt="" /> : <Upload className='text-gray-400 group-hover:text-black' />}
                        </div>
                        <input onChange={(e) => setImage4(e.target.files[0])} type="file" id="image4" hidden />
                    </label>
                </div>
            </div>

            <div className='w-full max-w-[500px]'>
                <p className='mb-2 font-semibold text-gray-700'>Product Name</p>
                <input onChange={(e) => setName(e.target.value)} value={name} className='w-full px-4 py-2 border rounded-md border-gray-300 outline-none focus:border-black transition-all' type="text" placeholder='Type here' required />
            </div>

            <div className='w-full max-w-[500px]'>
                <p className='mb-2 font-semibold text-gray-700'>Product Description</p>
                <textarea onChange={(e) => setDescription(e.target.value)} value={description} className='w-full px-4 py-2 border rounded-md border-gray-300 outline-none focus:border-black transition-all h-24' placeholder='Write content here' required />
            </div>

            <div className='flex flex-col sm:flex-row gap-8 w-full sm:gap-14'>
                <div>
                    <p className='mb-2 font-semibold text-gray-700'>Category</p>
                    <select onChange={(e) => setCategory(e.target.value)} className='w-full px-4 py-2 border rounded-md border-gray-300'>
                        <option value="Acne-Prone Skin">Acne-Prone Skin</option>
                        <option value="Dry Skin">Dry Skin</option>
                        <option value="Oily Skin">Oily Skin</option>
                        <option value="Mixed Skin">Mixed Skin</option>
                    </select>
                </div>

                <div>
                    <p className='mb-2 font-semibold text-gray-700'>Sub-category</p>
                    <select onChange={(e) => setSubCategory(e.target.value)} className='w-full px-4 py-2 border rounded-md border-gray-300'>
                        <option value="Cleanser">Cleanser</option>
                        <option value="Serum">Serum</option>
                        <option value="Moisturizer">Moisturizer</option>
                        <option value="Sunscreen">Sunscreen</option>
                        <option value="Toner">Toner</option>
                    </select>
                </div>

                <div>
                    <p className='mb-2 font-semibold text-gray-700'>Product Price</p>
                    <input onChange={(e) => setPrice(e.target.value)} value={price} className='w-full px-4 py-2 border rounded-md border-gray-300 sm:w-[120px]' type="number" placeholder='25' required />
                </div>
            </div>

            <div>
                <p className='mb-2 font-semibold text-gray-700'>Product Sizes</p>
                <div className='flex gap-3'>
                    {['30ml', '50ml', '100ml', '150ml', '200ml'].map((size) => (
                        <div key={size} onClick={() => setSizes(prev => prev.includes(size) ? prev.filter(item => item !== size) : [...prev, size])}>
                            <p className={`${sizes.includes(size) ? "bg-black text-white" : "bg-slate-200"} px-3 py-1 cursor-pointer rounded-md transition-all`}>{size}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className='flex gap-2 mt-2 items-center'>
                <input onChange={() => setBestseller(prev => !prev)} checked={bestseller} type="checkbox" id='bestseller' className='w-4 h-4 rounded text-black focus:ring-black' />
                <label className='cursor-pointer font-medium text-gray-700' htmlFor="bestseller">Add to bestseller</label>
            </div>

            <button type="submit" className='w-28 py-3 mt-4 bg-black text-white rounded-md font-medium hover:bg-gray-800 transition-colors shadow-lg'>ADD</button>
        </form>
    )
}

export default Add
