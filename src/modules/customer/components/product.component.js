import one from "../images/4.webp";
import Rating from "./rating.component";
const CustomerProduct = (props) => {
    return (
        <div className="container">
            <div className="card m-4">
                <div className="row">
                    <div className="col-4">
                        <img src={one} style={{ maxWidth: "90%" }} />
                    </div>
                    <div className="col-8 p-3">
                        <h4>Fashion_Mask_For boys and girls</h4>
                        <div className="d-flex">
                            <Rating /> 156 Ratings
                        </div>
                        <div className="d-flex">
                            <h5>Store:</h5>sadsd
                        </div>
                        <hr />
                        <div className="d-flex">
                            <span
                                className="card_price"
                                style={{ fontSize: "20px" }}
                            >
                                <i class="bi bi-currency-dollar"></i> {10932}
                            </span>
                        </div>
                        <hr />
                        <div>
                            <p className="card_price">
                                100% guranteed good quality Washable Reuseable
                                Competitive price, Direct importer more than 19
                                colours and types 100% good quality product in a
                                very reasonable rate. Please visit and follow
                                our shop in Daraz and enjoy the feeling of trust
                                and happiness.
                            </p>
                        </div>
                        <div className="d-flex align-items-end">
                            <button className="btn btn-primary">
                                Add to cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomerProduct;
