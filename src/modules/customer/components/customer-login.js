import { Carousel, Card, Button } from "react-bootstrap";
import one from "../images/1.jpg";
import two from "../images/2.jpg";
import three from "../images/3.jpg";
import four from "../images/4.webp";
const CustomerLogin = () => {
    return (
        <>
            <div className="row">
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
                <div className="col">
                    <Card style={{ width: "18rem" }}>
                        <Card.Img variant="top" src={four} />
                        <Card.Body>
                            <Card.Title>Card Title</Card.Title>
                            <Card.Text>
                                Some quick example text to build on the card
                                title and make up the bulk of the card's
                                content.
                            </Card.Text>
                            <Button variant="primary">Add To Cart</Button>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </>
    );
};

export default CustomerLogin;
