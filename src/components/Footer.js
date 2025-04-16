import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <div>
        <div className='footer'>
        <div className="container text-center py-4">
  <div className="row slide-flex">
    <div className="col">
    <div className="col ">



              <Link href="/" className="nav-link p-3 ">         
     <img className='rounded' style={{
    width: "56px",
    height: "56px", 
}} alt=''
  src='https://res.cloudinary.com/dvfiw24p4/image/upload/v1744818978/Screenshot_2025-04-16_at_16.54.47_bky0tu.png'/></Link>
              
            </div>
<p>No	6	OlaAyeni	off	Medical	Road	Computer	Village	Ikeja
Lagos	Nigeria</p>

    </div>
    <div className="col">
<p>About</p>
<p>Contact US</p>
    </div>
    <div className="col">
        <p>iPhone 14 Series</p>
        <p>iPhone 13 Series </p>
        <p>iPhone 12 Series</p>
        <p>iPhone SE </p>
    

    </div>
    <div className="col">
        <p>iPad  Pro</p>
        <p>iPad </p>
        <p>iPad Air </p>
        <p>iPad Mini</p>


        </div>
        <div className='col'>
            <p> MacBook Air</p>
            <p>MacBook Pro</p>
            <p>iMac </p>
            <p>Mac mini</p>
       






        </div>
  </div>
</div>
</div>

    </div>
  )
}

export default Footer

