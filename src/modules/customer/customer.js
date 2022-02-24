import { Carousel, Card, Button } from "react-bootstrap";
import one from "./images/1.jpg";
import two from "./images/2.jpg";
import three from "./images/3.jpg";
import four from "./images/4.webp";
import five from "./images/5.webp";
import six from "./images/6.webp";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getPublicProduct } from "./customer.action";
import __ from "lodash";

const Customer = () => {
    const dispatch = useDispatch();
    const imageItem = [four, five, six];
    const handleCardButton = () => {
        console.log("clicked");
    };

    useEffect(() => {
        console.log(getPublicProduct());
        dispatch(getPublicProduct());
    }, []);

    const product = useSelector((state) => state.customerReducer.publicProduct);
    console.log(product);
    return (
        <>
            <div style={{ width: "100%", margin: "0px", padding: "0px" }}>
                <Carousel>
                    <Carousel.Item>
                        <img
                            className="d-block w-100 h-50"
                            src={one}
                            alt="First slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100 h-50"
                            src={two}
                            alt="Second slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100 h-50"
                            src={three}
                            alt="Third slide"
                        />
                    </Carousel.Item>
                </Carousel>
            </div>
            <div className="row m-3">
                <h5>Just For You</h5>
            </div>
            <div className="row m-3">
                {product.products &&
                    product.products.map((item) => {
                        return (
                            <div key={item.id} className="col-4">
                                <div className="card_box-wrapper">
                                    <img
                                        className="card_img"
                                        src={__.sample(imageItem)}
                                        alt="rhcp"
                                    />
                                    <div className="card_box-content">
                                        <div
                                            onClick={handleCardButton}
                                            className="card_buy"
                                        >
                                            <span>
                                                <i className="fa fa-cart-plus"></i>
                                            </span>
                                        </div>
                                        <div className="card_title">
                                            {item.name.slice(0, 20)}
                                        </div>
                                        <div className="card_desc">
                                            Lorem ipsum dolor sit amet.
                                        </div>
                                        <span className="card_price">
                                            {item.price}$
                                        </span>
                                        <div className="card_footer">
                                            <ul>
                                                <li className="fa fa-star"></li>
                                                <li className="fa fa-star"></li>
                                                <li className="fa fa-star"></li>
                                                <li className="fa fa-star"></li>
                                                <li className="fa fa-star-o"></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="card_success"></div>
                                </div>
                            </div>
                        );
                    })}
            </div>
        </>
    );
};

export default Customer;
