import { Button, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { deleteProduct } from "../../products.actions";
import ProductForm from "../product-form.component";

export function ProductModals({ type, targetProduct, show, onHide, needToFetch, fetch }) {
    const dispatch = useDispatch();

    const handleDeleteDetail = () => {
        dispatch(deleteProduct(targetProduct.id))
            .then((res) => {
                fetch(!needToFetch);
                toast.success("Product Has Been Deleted Successfully", {
                    backgroundColor: "#8329C5",
                    color: "#ffffff",
                });
            })
            .catch((err) => {
                toast.error("Product Deletion Failed", {
                    backgroundColor: "#8329C5",
                    color: "#ffffff",
                });
            });
        onHide();
    };

    return (
        <>
            {type === "show" && (
                <>
                    <Modal show={show} onHide={onHide}>
                        <Modal.Header closeButton>
                            <Modal.Title>Product Details</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <ul class="list-group">
                                <li class="list-group-item">
                                    Product ID:{" "}
                                    {targetProduct.id !== null
                                        ? targetProduct.id
                                        : "--"}
                                </li>
                                <li class="list-group-item">
                                    Product Name:{" "}
                                    {targetProduct.name !== null
                                        ? targetProduct.name
                                        : "--"}
                                </li>
                                <li class="list-group-item">
                                    Category:{" "}
                                    {targetProduct.category_id !== null
                                        ? targetProduct.category_id
                                        : "--"}
                                </li>
                                <li class="list-group-item">
                                    Description:{" "}
                                    {targetProduct.description !== null
                                        ? targetProduct.description
                                        : "--"}
                                </li>
                                <li class="list-group-item">
                                    Price:{" "}
                                    {targetProduct.price !== null
                                        ? targetProduct.price
                                        : "--"}
                                </li>
                                <li class="list-group-item">
                                    Discount (%):{" "}
                                    {targetProduct.discount !== null
                                        ? targetProduct.discount
                                        : "--"}
                                </li>
                                <li class="list-group-item">
                                    Available Quantity:{" "}
                                    {targetProduct.stock_quantity !== null
                                        ? targetProduct.stock_quantity
                                        : "--"}
                                </li>
                            </ul>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="warning" onClick={onHide}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </>
            )}

            {type === "update" && (
                <>
                    <ProductForm
                        show={show}
                        onHide={onHide}
                        needToFetch={needToFetch}
                        fetch={fetch}
                        productId={targetProduct.id}
                    />
                </>
            )}

            {type === "delete" && (
                <>
                    <Modal show={show} onHide={onHide}>
                        <Modal.Header closeButton>
                            <Modal.Title>Delete Product</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <h5>Are you sure?</h5>
                            <p>If not, click Cancle to go back.</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button
                                variant="danger"
                                onClick={handleDeleteDetail}
                            >
                                Delete
                            </Button>
                            <Button variant="warning" onClick={onHide}>
                                Cancle
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </>
            )}
        </>
    );
}
