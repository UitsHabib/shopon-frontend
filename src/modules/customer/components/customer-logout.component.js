function CustomerLogout(props) {
    localStorage.removeItem("loggedInCustomer");
    window.location.href = "/";
}

export default CustomerLogout;
