import React, { createContext, useContext, useState, useRef } from "react";
import Loader from "../components/Loader";

const LoaderContext = createContext();

export const useLoader = () => {
  const context = useContext(LoaderContext);
  if (!context) {
    throw new Error("useLoader must be used within a LoaderProvider");
  }
  return context;
};

export const LoaderProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("Loading...");
  const [showBackground, setShowBackground] = useState(true);
  const loaderStartTime = useRef(null);
  const minLoaderTimeout = useRef(null);

  const showLoader = (message = "Loading...", background = true) => {
    setLoadingMessage(message);
    setShowBackground(background);
    setIsLoading(true);
    loaderStartTime.current = Date.now();
  };

  const hideLoader = () => {
    const elapsedTime = loaderStartTime.current
      ? Date.now() - loaderStartTime.current
      : 0;
    const remainingTime = Math.max(0, 5000 - elapsedTime); // 5 seconds minimum

    if (remainingTime > 0) {
      // Wait for the remaining time to meet the 5-second minimum
      minLoaderTimeout.current = setTimeout(() => {
        setIsLoading(false);
        loaderStartTime.current = null;
      }, remainingTime);
    } else {
      // Already shown for at least 5 seconds
      setIsLoading(false);
      loaderStartTime.current = null;
    }
  };

  // Cleanup timeout on unmount
  React.useEffect(() => {
    return () => {
      if (minLoaderTimeout.current) {
        clearTimeout(minLoaderTimeout.current);
      }
    };
  }, []);

  return (
    <LoaderContext.Provider value={{ showLoader, hideLoader, isLoading }}>
      {children}
      {isLoading && (
        <Loader message={loadingMessage} showBackground={showBackground} />
      )}
    </LoaderContext.Provider>
  );
};

export default LoaderProvider;
