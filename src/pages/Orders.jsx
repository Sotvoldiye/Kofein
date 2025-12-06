import React from 'react'
import ProfileNav from '../components/ProfileNav'
import ProfileOrder from '../components/ProfileOrder'

export default function Orders() {
  return (
    <div className='flex h-screen overflow-x-hidden'>
      {/* Chap nav bar */}
      <ProfileNav/>

      {/* Asosiy kontent */}
      <div className='flex-1 bg-[#F1F3F4] overflow-y-auto'>
         <ProfileOrder/>
      </div>
    </div>
  )
}
