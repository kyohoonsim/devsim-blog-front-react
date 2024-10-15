import { useEffect } from "react";
import "./Toast.css";

const Toast = ({ message, visible, duration = 3000, onClose }) => {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [visible, duration, onClose]);

  if (visible) {
    return <div className="Toast Toast_VISIBLE">{message}</div>;
  } else {
    return <div className="Toast Toast_HIDDEN">{message}</div>;
  }
};

export default Toast;
