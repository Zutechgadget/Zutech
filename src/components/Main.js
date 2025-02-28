import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

import '../styles/App.css'


function Main() {


  return (
    <div className='overflow-h'>


<div className="container text-start my-1 mac-con">
  <div className="row dir-2">
    <div className="col  ">
   <div className='w-75 my-3'>
   <h2 className='air'> MacBooK Air </h2>
    <small className='air-width'> The new 15‑inch MacBook Air makes room for more of what you love with a spacious Liquid Retina display. 
        And with the 13‑inch model, you have more reasons than ever to choose Air.
         Supercharged by the M2 chip and with up to 18 hours of battery life both laptops deliver blazing-fast performance in an ultraportable design.</small>
   </div>
<div className='py-3'>
        <button className='btn box-btn mx-2'>15- Inch</button>
         <button className='btn box-btn mx-2'>13 Inch M2</button>
         <button className='btn box-btn mx-2'> 13 Inch M1</button>
</div>
    </div>


    
    <div className="col  ">




<div className='  px-1'>
<img className='w-100' style={{
    width: "496px",
    height: "396px", 
  borderradius: "30px 0px 0px 0px",
  opacity: "0px"}} alt=''
  src='https://res.cloudinary.com/drbiup2zg/image/upload/v1740560859/Rectangle_4_nf2133.png'/>

</div>

    
    </div>

  </div>
</div>

<div className="container text-start  raw  my-4 ">
  <div className="row">
  <div className="col col-lg-4 0 col-sm-12 my-3">
    <div className='box-main w-100 '>
      <img style={{
    width: "100%",
    height: "196px", 
  borderradius: "30px 0px 0px 0px",
  opacity: "0px"}} alt=''
  src='https://res.cloudinary.com/drbiup2zg/image/upload/v1740560859/Rectangle_12_1_j7zazj.png'/>
<div className=' px-2 box-con'>
<p> Concept</p>
<h3>20% Save</h3>
<button className='btn-buy'>Buy Now</button>
</div>

 </div>
    </div>
    <div className="col col-lg-4 col-sm-12 my-3">
    <div className='box-main '>
      <img style={{width: "400px"}} alt=''
  src='https://res.cloudinary.com/drbiup2zg/image/upload/v1740560859/Rectangle_12_rm6mpb.png'/>
<div className=' px-2 box-con'>
<p > Concept</p>
<h3>20% Save</h3>
<button className='btn-buy'>Buy Now</button>
</div>

 </div>
    </div>
    <div className="col col-lg-4 col-sm-12 my-3">
    <div className='box-main '>
      <img style={{
    width: "100%",
    height: "196px", 
  borderradius: "30px 0px 0px 0px",
  opacity: "0px"}} alt=''
  src='https://res.cloudinary.com/drbiup2zg/image/upload/v1740560859/Rectangle_10_xbogsp.png'/>
<div className=' px-2 box-con '>
<p> Concept</p>
<h3>20% Save</h3>
<button className='btn-buy'>Buy Now</button>
</div>

 </div>
    </div>
  </div>
</div>


<div className="container text-start mx-4">
  <div className="row">
    <div className="col py-4">
<div className='grid px-3'>
<h3> iPad Pro </h3>
<p > M2 chip. The M2 chip is the next generation of Apple silicon, with an 8‑core 
  CPU that delivers up to 15 percent faster performance and a 10‑core GPU that
   provides up to 35 percent faster graphics performance.</p>
</div>
    </div>
    <div className="col py-4">
  <div className='gridtwo px-3'>
<h3>  Apple Watch Ultra</h3>
<p>  Meet the most rugged and capable Apple Watch ever. With a robust titanium case,
   precision dual-frequency GPS, up to 36 hours of battery life</p>
  </div>
    </div>
    <div className="col py-4">
  <div className='gridthree px-3'>
    <h3>AirPods Max</h3>
    <p>Introducing AirPods Max — a perfect balance of exhilarating high-fidelity audio
     and the effortless magic of AirPods. The ultimate personal listening experience is here.</p>
  </div>
    </div>
    <div className="col py-4">
   <div className='gridfour px-3'>
    <h3>Apple Tv & Home</h3>
    <p>Simply connect your favorite devices and transform your house into a remarkably smart, 
      convenient, and entertaining home. Elevate movie night with theater-like picture and sound. 
      Play any song, in any room, from anywhere. And control lights, locks, and thermostats using Siri.
       All with the security and privacy of Apple.</p>
   </div>
    </div>
  </div>
</div>
    </div>
  )
}

export default Main