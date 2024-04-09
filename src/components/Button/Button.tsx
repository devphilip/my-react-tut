import styles from "./Button.module.css";


interface ButtonProps {
    children: string;
    colorName?: "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark";
    onClick: () => void;
}

const Button = ({children, colorName = "primary", onClick}: ButtonProps) => {
  return (
    // <button className={"btn btn-" + colorName } onClick={onClick}>{children}</button>
    <button className={[styles.btn, styles[`btn-${colorName}`]].join(" ")} onClick={onClick}>{children}</button>
  )
}

export default Button;