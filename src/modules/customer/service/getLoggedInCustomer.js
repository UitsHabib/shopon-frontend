function getLoggedInCustomer() {
    try {
        const loggedInCustomer = JSON.parse(
            localStorage.getItem("loggedInCustomer")
        );
        return loggedInCustomer;
    } catch (ex) {
        return null;
    }
}

export default getLoggedInCustomer;
