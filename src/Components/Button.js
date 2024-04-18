const Button = ({ handleClick, children, type, dataTest }) => {
  return (
    <button type={type} onClick={handleClick} data-test={dataTest} role="link">
      {children}
    </button>
  );
};

export default Button;
