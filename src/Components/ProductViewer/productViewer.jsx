import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./productViewer.css";
import {
  FaMinus,
  FaPlus,
} from "react-icons/fa";



const ProductViewer = () => {

  const [disply, setDisplay] = React.useState({ display: "none" });
  
  //const [activeImage, setActive] = React.useState(productlist[0]);
  const [size, activeSize] = React.useState("");
  //const [color, activeColor] = React.useState(productcolor[0]);
  const [quantity, setQuantity] = React.useState(1);
  const [sSize, setSize] = React.useState(""); //new
  const [sColor, setColor] = React.useState(""); //new
  const [counter, setCounter] = React.useState(1);//new
  const [qt, setQt] = React.useState(0);//new
  const [valid, setvalid]=useState(false);

  const [product, setProduct]=useState({});
  const { id } = useParams();
 
  const getData=async()=>{
    
    const res= await axios.get(`http://localhost:3045/api/product-details/${id}`);
    const productData=await res.data.results;
    setProduct(productData[0]) ;
    setQt(productData[0].quantity);//new
 }

  var color_arr = [];
  var size_arr = [];
  if (product.color) {
  color_arr = product.color.split(",");
  }

  if (product.product_size) {
  size_arr = product.product_size.split(",");
  }

 useEffect(()=>{
  
 getData()
 },[])


  function createOrder() {
   
    if ( size == ""){
      window.alert("Select size");    
      }
    else if ( sColor == ""){
      window.alert("Select color"); 
      }
  
    else { 
    const orderUrl = "http://localhost:3045/api/create-order";
  
  axios 
    .post(orderUrl, {
      product_id : product.id,
      price : product.product_price,
      product_name : product.product_name,      
      size: size,
      color: sColor,
      quantity: counter,
    })
    
    .then((response) => {
      console.log(response);
      alert("Order submitted");
    });
  }
  }


  

  const handleClick1 = () => { 
    if (counter >= qt) {
      return;
    }
    setCounter(counter + 1);
  };
  
  const handleClick2 = () => {
    if (counter <= 1) {
      return;
    }
    setCounter(counter - 1);
  };
  
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

  function selectSize(s) { 
    setSize(s);
  }

  function selectColor(s) {
    setColor(s);
  }

  const handleChange = (e) => {
    setQuantity(e.target.value);
  };
  

  var baseurl = "http://localhost:3045/";  
  const imageurl = product. product_image ;    
  const imagelocation = baseurl + imageurl;   

  return (
    <div>
      <section class="productViewer">
        <div class="container">
          <div class="row r1">
            <div class="col-12 col-md-5 c1">
              <div class="productViewerImgWraper">
                <img src={imagelocation} alt=" " />
              </div>


           
            </div>
            <div class="col-12 col-md-7 c2">
              <div class="r2c1">
                <p class="productViewHeader"><h1>{product.product_name}</h1></p>
               
               

                <div class="d-flex r3c1">
                  <div class="px-3 d-flex flex-grow-1 align-items-center justify-content-between ratingItem">
                    
                    <img
                      src="/Image/ProductViewer/clarity_half-star-solid.png"
                      alt=""
                    />
                    
                  </div>
                 
                </div>

                <div class="r4c1">
                  <p class="p1"><h2>Price : {product.product_price} tk</h2></p>
                 
                </div>
            
                {product.product_size ? (
                <div className="r5">
                  <div class="r5c1" style={{ width: "270px" }}>
                    <h4>Select Size:</h4>
                    <div class="my-3 d-flex justify-content-between p2">
                      {size_arr?.map((s) => (
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
                ) : (
                  <></>
                )}
                {product.color ? (
                <div>
                      <h4>Available Colors :</h4>
                            <div
                              className="btn-group btn-group-toggle"
                              data-toggle="buttons"
                            >
                              {color_arr.map((c_p) => (
                                <>
                                  <label className="btn btn-default text-center active">
                                    <input
                                      type="radio"
                                      name="color_option"
                                      id="color_option_a1"
                                      autocomplete="off"
                                      required
                                      //checked
                                      onClick={() => selectColor(c_p)}                                                                    
                                    />
                                    {c_p}
                                    <br />                                 
                                  </label>
                                </>
                              ))}
                            </div>
                </div>   
                ) : (
                  <></>
                )} 


                  {product.quantity ? (
                  <div>
                      <div
                        className="row"
                        style={{ margin: "6vh 0vh 0vh 0vh", padding: "5px" }}
                      >
                        <div className="col-md-6">In stock: {qt}</div>              
                        <div
                          className="col-md-2"
                          style={{
                            border: "1px solid",
                            "border-color": "#ddd",
                            "background-color": "#f8f9fa",
                            padding: "6px",
                          }}
                        >
                          <div className="dec-btn" style={{ float: "left" }}>
                            <FaMinus onClick={handleClick2} />
                          </div>
                          <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{counter}</span>
                          <div className="inc-btn" style={{ float: "right" }}>
                            <FaPlus onClick={handleClick1} />
                          </div>
                        </div>
                      </div>
                    </div>
                    ) : (
                      <></>
                    )} 

            
                  <div><button class="ms-1 r6c2" onClick={createOrder}>Submit order</button></div>
                 
             
              </div>
            </div>
          </div>
        </div>
        
    
      </section>
      
    </div>
  );
};

export default ProductViewer;

