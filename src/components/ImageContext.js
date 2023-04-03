import React, { createContext, useState, useEffect } from "react";

export const ImageContext = createContext({
  imageUrls: [],
  setImageUrls: () => {},
});

export const ImageProvider = ({ children }) => {
  const [imageUrls, setImageUrls] = useState(() => {
    const storedUrls = localStorage.getItem("imageUrls");
    return storedUrls ? JSON.parse(storedUrls) : [];
  });

  useEffect(() => {
    localStorage.setItem("imageUrls", JSON.stringify(imageUrls));
  }, [imageUrls]);

  return (
    <ImageContext.Provider value={{ imageUrls, setImageUrls }}>
      {children}
    </ImageContext.Provider>
  );
};
