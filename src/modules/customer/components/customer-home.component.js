import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Carousel } from "react-bootstrap";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import _ from "lodash";
import Footer from "../components/footer.component";
import { getPublicProduct } from "../customer.actions";
import Rating from "../components/rating.component";

import one from "../images/1.jpg";
import two from "../images/2.jpg";
import three from "../images/3.jpg";
import four from "../images/4.webp";
import five from "../images/5.webp";
import six from "../images/6.webp";
import seven from "../images/7.webp";
import eight from "../images/8.jpg";
import nine from "../images/9.webp";
import ten from "../images/10.webp";

const CustomerHome = (props) => {
    const dispatch = useDispatch();

    const cartItem = useSelector((state) => state.customerReducer.cart);
    const product = useSelector((state) => state.customerReducer.publicProduct);
    const loggedInCustomer = useSelector(
        (state) => state.customerReducer.loggedInCustomer
    );
    const search_text = useSelector(
        (state) => state.customerReducer.search_text
    );

    const imageItem = [four, five, six, seven, eight, nine, ten];
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

    // const filterProduct = (product) => {
    //     console.log(search_text);
    //     const x = product.filter((o) => o.name.includes(search_text));
    //     return x;
    // };
    // let finap = [];
    // console.log(product);
    // if (product == null) {
    //     finap = filterProduct(product.products);
    //     console.log(finap);
    // }

    useEffect(() => {
        dispatch(getPublicProduct());
    }, []);

    return (
        <>
            <div className="slide_carosel">
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
            <div className="d-flex flex-wrap">
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
                                            src={imageItem[cnt++ % 7]}
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
                                                <Rating rating={3.5} />
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

export default CustomerHome;
