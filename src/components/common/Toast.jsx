import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const notify = ({ type, text }) => {
  switch (type) {
    case "default":
      toast(text);
      break;
    case "success":
      toast.success(text);
      break;
    case "warning":
      toast.warning(text);
      break;
    case "error":
      toast.error(text);
      break;
    default:
      break;
  }
};

export const Toast = () => {
  return (
    <ToastContainer
      position="top-right"
      autoClose="5000"
      newestOnTop={true}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss={true}
      draggable
      pauseOnHover={true}
      theme="light"
    />
  );
};
