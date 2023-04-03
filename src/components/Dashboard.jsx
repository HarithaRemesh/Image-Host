import React, { useEffect, useState, useCallback, useContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import { auth, db, logout } from "../Firebase/firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import { Form, Button, Col, Row } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { useDropzone } from "react-dropzone";
import { ImageContext } from "./ImageContext";


function Dashboard() {
    const [user, loading, error] = useAuthState(auth);
    const [name, setName] = useState("");
    const [files, setFiles] = useState([]);
    const [uploaded, setUploaded] = useState(false);
    const [showMessage, setShowMessage] = useState(true);
    const { setImageUrls, imageUrls } = useContext(ImageContext);

    const navigate = useNavigate();
    const onDrop = useCallback((acceptedFiles) => {
        setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
        setUploaded(false);
        setShowMessage(false);
    }, []);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    const fetchUserName = async () => {
        try {
            const q = query(collection(db, "users"), where("uid", "==", user?.uid));
            const doc = await getDocs(q);
            const data = doc.docs[0].data();
            setName(data.name);
        } catch (err) {
            console.error(err);
            alert("An error occured while fetching user data");
        }
    };
    const userLogout = async () => {
        try {
            await logout();
            navigate("/");
        } catch (error) {
            console.error(error);
        }
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();

        formData.append("file", files[0]);
        formData.append("upload_preset", "as8vlb1h");
        formData.append("api_key", "123952497591397");
        const options = {
            method: "POST",
            body: formData,
        };
        return fetch(
            "https://api.Cloudinary.com/v1_1/:dtou8bvgo/image/upload",
            options
        )
            .then((res) => res.json())
            .then((res) => {
                alert("image added successfully")
                const newImageUrls = [...imageUrls, res.secure_url];
                console.log("new imageUrls", newImageUrls);
                setImageUrls(prevUrls => [...prevUrls, res.secure_url]);
                setUploaded(true);
                setShowMessage(true);
            })
            .catch((err) => console.log(err));
    };


    const handleRemove = (fileIndex) => {
        setFiles((prevState) =>
            prevState.filter((_, index) => index !== fileIndex)
        );
        setUploaded(false);
        setShowMessage(true);
    };

    useEffect(() => {
        if (loading) return;
        if (!user) return navigate("/");
        fetchUserName();
    }, [user, loading]);
    return (
        // 
        <ImageContext.Provider value={{ imageUrls, setImageUrls }}>
            <div className="container" style={{ display: "flex", justifyContent: "center" }}>

                <h1>Image Upload Page</h1>
                <Form onSubmit={handleSubmit}>
                    <div
                        {...getRootProps()}
                        className={`dropzone${isDragActive || files.length === 0 ? " active" : ""}`}
                    >
                        <input {...getInputProps()} />
                        { showMessage  && 
                        <p style ={{margin : "50px"}}>Drag 'n' drop some files here, or click to select files</p>}
                    </div>
                    <Row className="mt-3">
                        {files.map((file, index) => (
                            <Row key={index}>
                                <Col>
                                   { !uploaded &&
                                        <div className="image-preview">
                                        <img src={file.preview}
                                         alt={file.name} />
                                    </div>
                                   } 
                                </Col>
                                {uploaded ? (
                                    <></>
                                ) : (
                                    <Col>
                                        <Button
                                            className="remove-btn"
                                            variant="danger"
                                            size="sm"
                                            onClick={() => handleRemove(index)}
                                        >
                                            Remove
                                        </Button>
                                    </Col>
                                )}
                            </Row>
                        ))}
                    </Row>
                    <Row style={{ display: "flex", justifyContent: "center", margin: "50px" }}>
                        <Col md={12}>
                            <Button
                                className="upload-btn"
                                type="submit"
                                variant="primary"
                                disabled={files.length === 0}
                                style={{ marginRight: "10px" }}
                            >
                                Upload Images
                            </Button>
                            <Button className="logout-btn"
                                variant="primary"
                                onClick={() => navigate('/show-images')}
                                style={{ marginRight: "10px" }}
                            >
                                Show Images
                            </Button>
                            <Button className="logout-btn"
                                variant="primary"
                                onClick={() => userLogout()}>
                                Logout
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        </ImageContext.Provider>
    );
}
export default Dashboard;