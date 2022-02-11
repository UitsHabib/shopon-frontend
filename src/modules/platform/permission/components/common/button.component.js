const Button = ({ type, children, ...rest }) => {
    return (
        <button type={type} {...rest}>
            {children}
        </button>
    );
}
 
export default Button;