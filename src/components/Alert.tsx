import { ReactNode } from "react";


interface AlertProps {
  children: ReactNode;
  onClose?: () => void;
}


const Alert = ({ children, onClose }: AlertProps) => {
  return (
    // <div className="alert alert-primary">{children}</div>
    <div className="alert alert-primary alert-dismissible fade show" onClick={onClose} role="alert">
      {children}
      <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  )
}

export default Alert;