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
import { toast } from "react-toastify";
import getLoggedInCustomer from "./service/getLoggedInCustomer";
import Footer from "./components/footer.component";
import { Link } from "react-router-dom";

const Customer = (props) => {
    const dispatch = useDispatch();

    const loggedInCustomer = getLoggedInCustomer();
    const imageItem = [four, five, six];
    const cartItem = useSelector((state) => state.customerReducer.cart);
    const product = useSelector((state) => state.customerReducer.publicProduct);
    let cnt = 0;

    const handleCardButton = (item) => {
        if (!loggedInCustomer) {
            toast.error("Log in to add Cart", {
                backgroundColor: "#8329C5",
                color: "#ffffff",
            });
        } else {
            let cartItemCopy = [...cartItem];
            cartItemCopy.push(item);
            dispatch({ type: "ADD_PRODUCT_CART", payload: cartItemCopy });
            toast.success("Add to Cart", {
                backgroundColor: "#8329C5",
                color: "#ffffff",
            });
        }
    };

    useEffect(() => {
        dispatch(getPublicProduct());
    }, []);

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
            <div className="d-flex">
                {product.products &&
                    product.products.map((item) => {
                        return (
                            <div key={item.id}>
                                <div className="card_box-wrapper">
                                    <Link
                                        style={{
                                            textDecoration: "none",
                                            color: "#000",
                                        }}
                                        to={`/product/${item.id}`}
                                    >
                                        <img
                                            className="card_img"
                                            src={imageItem[cnt++ % 3]}
                                            alt="rhcp"
                                        />
                                    </Link>
                                    <div className="card_box-content">
                                        <div
                                            onClick={() =>
                                                handleCardButton(item)
                                            }
                                            className="card_buy"
                                        >
                                            <span>
                                                <i className="fa fa-cart-plus"></i>
                                            </span>
                                        </div>
                                        <div className="card_title">
                                            {item.name.slice(0, 17)}
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
            <Footer />
        </>
    );
};

export default Customer;
