import { useEffect } from "react";

const useEscapeKeydown = (close, isOpen) => {
  useEffect(() => {
    const handleEscapeClose = (event) => {
      if (event.key === "Escape") {
        close();
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscapeClose);
      return () => {
        document.removeEventListener("keydown", handleEscapeClose);
      };
    }
  }, [close, isOpen]);
};

export default useEscapeKeydown;
