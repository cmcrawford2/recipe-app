import { toast } from "react-toastify";

export default function displayToast(message, type = "success") {
  const options = {
    position: "bottom-right",
    autoClose: 2000,
  };

  if (type === "success") {
    return toast.success(message, options);
  }
  return toast.error(message, options);
}
