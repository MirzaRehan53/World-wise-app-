import styles from "./Button.module.css";
/* eslint-disable react/prop-types */

const Button = ({ children, onClick, type }) => {
  return (
    <button onClick={onClick} className={`${styles.btn} ${styles[type]} `}>
      {children}
    </button>
  );
};

export default Button;
