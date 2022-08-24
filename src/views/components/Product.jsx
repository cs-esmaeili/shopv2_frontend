import React from "react";


const Product = ({ data, number }) => {
    const { images, name, price, sale_price, category } = data;
    return (
        <div className="col-3" style={{ textAlign: "center", borderStyle: "solid", borderColor: "lightgray" }}>
            <img src={images[0]} alt="Logo" style={{ height: "200px" }} />
            <div className="details p-3">
                <div className="category">
                    {category.name}
                </div>
                <h2>{name}</h2>
                <div style={{ direction: "rtl" }}>
                    <s>
                        <span className="discounted">{parseInt(price).toLocaleString()} تومان</span>
                    </s>
                    <br className="d-sm-none" />
                    <div>
                        <span className="price">  {parseInt(sale_price).toLocaleString()} تومان  </span>
                    </div>
                    <div>
                        <span className="price">{`تعداد : ${number}`}</span>
                    </div>
                </div>
            </div>
        </div >
    )
}
export default Product;


