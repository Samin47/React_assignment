import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./productViewer.css";



const ProductViewer = () => {

  const [product, setProduct]=useState({});
  const { id } = useParams();
  const productlist = [
    "uploads/pic1.jpg",
    "uploads/pic2.jpg",
    "uploads/pic3.jpg",
  
  ];
  const productsize = ["S", "M", "L", "XL"];
  const productcolor = ["3d0008", "3f3f3f", "000101"];

  const getData=async()=>{
    
    const res= await axios.get(`http://localhost:3045/api/product-details/${id}`);
    const productData=await res.data.results;
    setProduct(productData[0]) ;
 }


 useEffect(()=>{

 getData()
 },[])

  
  const [disply, setDisplay] = React.useState({ display: "none" });
  
  const [activeImage, setActive] = React.useState(productlist[0]);
  const [size, activeSize] = React.useState("S");
  const [color, activeColor] = React.useState(productcolor[0]);
  const [quantity, setQuantity] = React.useState(1);

  const handleDisplay = () => {
    setDisplay({
      display: "block",
    });
  };
  const handleClose = () => {
    setDisplay({
      display: "none",
    });
  };

  const handleChange = (e) => {
    setQuantity(e.target.value);
  };
  console.log('product:',product.product_name);
  console.log(product);

  return (
    <div>
      <section class="productViewer">
        <div class="container">
          <div class="row r1">
            <div class="col-12 col-md-5 c1">
              <div class="productViewerImgWraper">
                <img src={`/${activeImage}`} alt=" " />
              </div>
              <div class="d-flex justify-content-around mt-5 productViewerMinImg">
              <p class="p1"> <h1>Product Color: </h1></p> 
                {productlist.map((img) => (
                  <img
                    style={{ cursor: "pointer" }}
                    onClick={() => setActive(img)}
                    src={`/${img}`}
                    alt=""
                  />
                ))}
              </div>

           
            </div>
            <div class="col-12 col-md-7 c2">
              <div class="r2c1">
                <p class="productViewHeader">{product.product_name}</p>
               

                <div class="d-flex r3c1">
                  <div class="px-3 d-flex flex-grow-1 align-items-center justify-content-between ratingItem">
                    
                    <img
                      src="/Image/ProductViewer/clarity_half-star-solid.png"
                      alt=""
                    />
                    
                  </div>
                 
                </div>

                <div class="r4c1">
                  <p class="p1">Price : {product.product_price}</p>
                 
                </div>

                <div className="r5">
                  <div class="r5c1" style={{ width: "270px" }}>
                    <p class="p1">Select Size:</p>
                    <div class="my-3 d-flex justify-content-between p2">
                      {productsize?.map((s) => (
                        <p
                          onClick={() => activeSize(s)}
                          style={{ cursor: "pointer" }}
                          class={
                            size === s
                              ? "rounded-circle fw-bold large"
                              : "rounded-circle"
                          }
                        >
                          {s}
                        </p>
                      ))}
                    </div>
                  </div>

                  <div class="r5c2" style={{ width: "200px" }}>
                  
                  </div>
                </div>
                <div class="d-flex">
                  <div class="r6c1 me-5">
                    <select
                      onChange={handleChange}
                      class="form-select customSelectForm"
                      value={quantity}
                    >
                      <option value="1">Qty: 01</option>
                      <option value="2">Qty: 02</option>
                      <option value="3">Qty:03</option>
                      <option value="4">Qty:04</option>
                      <option value="5">Qty:05</option>
                    </select>
                    <div><button class="ms-1 r6c2" onClick={func}>Submit order</button></div>
                  </div>
                  
                  
                </div>

             
              </div>
            </div>
          </div>
        </div>

        
      </section>
      
    </div>
  );
};

export default ProductViewer;

function func() {
  
}
