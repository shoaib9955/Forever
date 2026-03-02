import React from 'react'
import { assets } from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'

const Footer = () => {
  return (
    <div>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
        <div>
          <Link to='/'>
            <img src={assets.logo} className='mb-5 w-32' alt="Forever Logo" />
          </Link>
          <p className='w-full md:w-2/3 text-gray-600 leading-6'>
            Forever is your premier destination for high-quality fashion and lifestyle products. We are committed to providing our customers with the best shopping experience, featuring curated collections that blend style, quality, and affordability.
          </p>
        </div>

        <div>
          <p className='text-xl font-medium mb-5'>COMPANY</p>
          <ul className='flex flex-col gap-1 text-gray-600'>
            <li><NavLink to='/'>Home</NavLink></li>
            <li><NavLink to='/about'>About us</NavLink></li>
            <li><NavLink to='/contact'>Contact us</NavLink></li>
            <li><NavLink to='/collection'>Collection</NavLink></li>
            <li><NavLink to='/orders'>Delivery</NavLink></li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        <div>
          <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
          <ul className='flex flex-col gap-1 text-gray-600'>
            <li>+91-987-654-3210</li>
            <li>contact@forever.com</li>
            <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
          </ul>
        </div>
      </div>

      <div>
        <hr />
        <p className='py-5 text-sm text-center'>
          Copyright {new Date().getFullYear()} © forever.com - All Rights Reserved.
        </p>
      </div>
    </div>
  )
}

export default Footer
