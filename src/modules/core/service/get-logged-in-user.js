function getLoggedInUser() {
    try {
        const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
        return loggedInUser;
    } catch (ex) {
        return null;
    }
}

export default getLoggedInUser;
