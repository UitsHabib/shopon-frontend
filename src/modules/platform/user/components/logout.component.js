function Logout(props) {
    localStorage.removeItem("loggedInUser");
    window.location.href = "/login";
}

export default Logout;