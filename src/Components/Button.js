const Button = ({ handleClick, children, type }) => {
  return (
    <button type={type} onClick={handleClick} data-test={children} role='link'>{children}</button>
  );
};

export default Button;