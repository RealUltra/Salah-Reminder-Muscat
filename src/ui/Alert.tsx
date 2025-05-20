import type { ReactNode } from "react";
import "./Alert.css";

interface Props {
  children: ReactNode;
}

const Alert = ({ children }: Props) => {
  return (
    <div className="alert alert-warning" role="alert">
      {children}
    </div>
  );
};

export default Alert;
