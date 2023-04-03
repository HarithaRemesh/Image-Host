import React, { useContext } from "react";
import ImageList from "./ImageList";
import { ImageContext } from "./ImageContext";
import { Button, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {  logout } from "../Firebase/firebase";
import "./Album.css";

function Album() {
  const { imageUrls } = useContext(ImageContext);
  const navigate = useNavigate();
  const userLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };
console.log(imageUrls)
  return (
    <div >
      <h1 style={{ textAlign: "center" , fontFamily : "Montserrat "}} >My Album</h1>
      <div style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
       padding: "20px" , 
       margin : "50px",
       borderRadius : "10px"}}>
        <ImageList imageUrls={imageUrls} />
      </div>
      <Row style={{display : "flex", justifyContent : "center"}}>
        <Col md={12}>
        <Button className="logout-btn"
      variant="primary"
      onClick={() => navigate("/dashboard")}
      style={{ marginRight: "10px" }}
      >
        Dashboard
      </Button>
      <Button className="logout-btn"
      variant="primary"
      onClick={() => userLogout()}>
        Logout
      </Button>
        </Col>
      </Row>
     
    </div>
  );
}

export default Album;