import React, { useState } from "react";
import axios from "axios";

const AddForm = () => {
    const [formData, setFormData] = useState({
        title: "",
        alt: "",
        type: "",
        description: "",
    });

    const [imageFile, setImageFile] = useState(null); // To store the uploaded image file

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (e) => {
        setImageFile(e.target.files[0]); // Store the selected file
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Create a FormData object to include both text and file data
        const formDataObj = new FormData();
        formDataObj.append("title", formData.title);
        formDataObj.append("alt", formData.alt);
        formDataObj.append("type", formData.type);
        formDataObj.append("description", formData.description);
        
        if (imageFile) {
            formDataObj.append("image", imageFile); // Append the image file to FormData
        }

        try {
            await axios.post("/api/places", formDataObj, {
                headers: {
                    "Content-Type": "multipart/form-data", // Important for file uploads
                },
            });
            alert("Item added successfully!");
        } catch (error) {
            console.error("Error adding item:", error);
        }
    };

    const formStyles = {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        maxWidth: "500px",
        margin: "50px auto",
        padding: "20px",
        backgroundColor: "#f9f9f9",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    };

    const inputStyles = {
        width: "100%",
        padding: "12px 16px",
        marginBottom: "20px",
        border: "1px solid #ddd",
        borderRadius: "4px",
        fontSize: "1rem",
        boxSizing: "border-box",
        backgroundColor: "#fff",
        transition: "border-color 0.3s ease",
    };

    const textAreaStyles = {
        ...inputStyles,
        minHeight: "120px",
        resize: "vertical",
    };

    const selectStyles = {
        ...inputStyles,
        cursor: "pointer",
    };

    const buttonStyles = {
        padding: "12px 20px",
        backgroundColor: "#28a745",
        color: "white",
        fontSize: "1rem",
        fontWeight: "bold",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        transition: "background-color 0.3s ease",
    };

    return (
        <form onSubmit={handleSubmit} style={formStyles}>
            <input
                type="text"
                name="title"
                placeholder="Title"
                value={formData.title}
                onChange={handleChange}
                required
                style={inputStyles}
            />
            <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
                required
                style={inputStyles}
            />
            <input
                type="text"
                name="alt"
                placeholder="Image Alt Text"
                value={formData.alt}
                onChange={handleChange}
                required
                style={inputStyles}
            />
            <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
                style={selectStyles}
            >
                <option value="">Select Type</option>
                <option value="place">Place</option>
                <option value="guide">Guide</option>
                <option value="food">Food</option>
                <option value="hotel">Hotel</option>
                <option value="hidden">Hidden Place</option>
            </select>
            <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
                required
                style={textAreaStyles}
            />
            <button type="submit" style={buttonStyles}>
                Submit
            </button>
        </form>
    );
};

export default AddForm;
