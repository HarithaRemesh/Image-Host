import React, { useState } from "react";

function ImageList({ imageUrls }) {
    const [selectedImageUrl, setSelectedImageUrl] = useState(null);

    const handleImageClick = (imageUrl) => {
      setSelectedImageUrl(imageUrl);
    };
  return (
    <div>
        {/* {console.log({imageUrls})} */}
      {imageUrls.map((imageUrl, index) => (
        <img
        key={index}
        src={imageUrl}
        alt={`image-${index}`}
        style={{
          width: "100px",
          height: "100px",
          objectFit: "cover",
          margin: "10px",
          borderRadius: "5px",
        }}
        onClick={() => handleImageClick(imageUrl)}
      />
      ))}
       {selectedImageUrl && ( 
        <div 
        style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0,0,0,0.5)", zIndex: 9999 }} 
        onClick={() => setSelectedImageUrl(null)}>
          <img src={selectedImageUrl} 
          style={{ display: "block", maxWidth: "90%", maxHeight: "90%", margin: "auto", position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }} />
        </div>
      )}
    </div>
  );
}

export default ImageList;
