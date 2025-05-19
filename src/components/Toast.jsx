import { createContext, useContext, useState } from "react";

const ToastContext = createContext();
export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState({ message: "", visible: false });

  const showToast = (message, duration = 3000) => {
    setToast({ message, visible: true });
    setTimeout(() => setToast({ message: "", visible: false }), duration);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast.visible && (
        <div className="fixed top-5 right-5 bg-green-600 text-white px-4 py-2 rounded shadow z-50">
          {toast.message}
        </div>
      )}
    </ToastContext.Provider>
  );
};
