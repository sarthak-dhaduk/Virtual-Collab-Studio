import React, { useEffect, useRef } from "react";

function Toast({ message, type = "warning" }) {
  const toastRef = useRef(null); // ✅ Use Ref for the toast element

  useEffect(() => {
    if (message) {
      const toastElement = toastRef.current;
      const toastBody = document.getElementById("toastMessage");

      if (toastElement && toastBody) {
        toastBody.textContent = message;

        // ✅ Ensure Bootstrap JS is loaded before showing the toast
        if (window.bootstrap) {
          const toast = new window.bootstrap.Toast(toastElement, { delay: 4000 });
          toast.show();
        } else {
          console.error("Bootstrap is not loaded. Make sure to include Bootstrap JS.");
        }
      }
    }
  }, [message]);

  // 🎨 Dynamic styling based on type (info, success, warning, error)
  const getToastClass = () => {
    switch (type) {
      case "success":
        return "text-white bg-success";
      case "error":
        return "text-white bg-danger";
      case "warning":
        return "text-dark bg-warning";
      default:
        return "text-white bg-primary"; // Default: Info
    }
  };

  return (
    <div className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: 1050 }}>
      <div ref={toastRef} id="liveToast" className={`toast hide ${getToastClass()} shadow-lg`} role="alert" aria-live="assertive" aria-atomic="true">
        <div className="toast-header d-flex align-items-center">
          <span className="me-2 fw-bold">{type.toUpperCase()}</span>
          <button type="button" className="btn-close ms-auto" data-bs-dismiss="toast"></button>
        </div>
        <div id="toastMessage" className="toast-body fw-medium"></div>
      </div>
    </div>
  );
}

export default Toast;
