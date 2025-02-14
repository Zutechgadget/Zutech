import React from 'react'
import "@/styles/App.css"; // ✅ Use an alias
import Coursel from '@/app/Coursel';
import BigHead from '@/components/BigHead';
import Footer from '@/components/Footer';
import SingleProduct from "../../components/SingleProduct";






const Store = () => {
  return (
    <div className='overflow-h'>
      <BigHead/>
        <div className='px-4'>
        <h2>Store</h2>
        <div className='bar'></div>
        </div>

       
<Coursel/>

<div className='px-4'>
    <h4>All models Mac</h4>
    <div className='bar-2'></div>
</div>

<div className="container text-center py-5 mx-5">
  <div className="row">
    <div className="col">
        <div className='mac card-1'>
        <p>Buy MacBook Air 13-inch with M1 chip</p>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
         <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <button className='btn mybtn '>Buy now</button>

        </div>

    </div>
    <div className="col">

 <div className='mactwo card-1'>
 <p>Buy MacBook Air 13-inch with M2 chip</p>
 <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
         <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <button className='btn mybtn '>Buy now</button>
 </div>
    </div>
    <div className="col">
    <div className='macthree card-1'>
 <p>Buy MacBook pro 13-inch</p>
 <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
         <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <button className='btn mybtn '>Buy now</button>
 </div>
    </div>
  </div>
</div>
<div className='px-4 py-4'>
    <h4>All models iPhone</h4>
    <div className='bar-3'></div>
</div>

<div className="container text-center mx-4">
  <div className="row">
    <div className="col">
  <div className='iphone card-1'>
<p>Buy iPhone 14 Pro </p>
<br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
         <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <button className='btn mybtn '>Buy now</button>

  </div>
    </div>
    <div className="col">
    <div className='iphonetwo card-1'>
    <p>Buy iPhone 14 Plus</p>
    <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
         <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <button className='btn mybtn '>Buy now</button>
</div>
    </div>
    <div className="col">
    <div className='iphonethree card-1 '>
    <p>Buy iPhone 14 Pro max</p>
    <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
         <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <button className='btn mybtn '>Buy now</button>

</div>
    </div>
  </div>
</div>


<div className='px-4 py-4'>
    <h4>All models iPad</h4>
    <div className='bar-2'></div>
</div>
<div className="container text-center py-5 mx-5">
  <div className="row">
    <div className="col">
   <div className='ipad card-1'>

<p>Buy iPad Pro 12.9 Inch</p>
<br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
         <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <button className='btn mybtn '>Buy now</button>


   </div>
    </div>
    <div className="col">
<div className='ipadtwo card-1'>
<p>Buy iPad Pro 11 Inch</p>
<br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
         <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <button className='btn mybtn '>Buy now</button>
</div>
    </div>
    <div className="col">
<div className='ipadthree card-1'>
<p> Buy iPad 10th Gen</p>
<br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
         <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <button className='btn mybtn '>Buy now</button>

</div>
    </div>
  </div>
</div>
<SingleProduct/>
<Footer/>
    </div>
  )
}

export default Store