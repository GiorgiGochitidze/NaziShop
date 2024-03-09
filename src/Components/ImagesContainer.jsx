import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CSS/ImagesContainer.css";
import { useParams } from "react-router-dom";

//  email api key: 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

const ImagesContainer = () => {
  const [imageUrls, setImageUrls] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [address, setAddress] = useState("");
  const [namSurNam, setNamSurNam] = useState('')
  const { userName } = useParams();

  useEffect(() => {
    // Fetch image URLs from backend when the component mounts
    axios
      .get("https://nazishop.onrender.com/api/getImageUrls")
      .then((response) => {
        setImageUrls(response.data);
        console.log("Successfully fetched image URLs:", response.data); // Add console.log here
      })
      .catch((error) => {
        console.error("Error fetching image URLs:", error);
      });
  }, []);

  const deleteImage = (imageName) => {
    // Delete image from backend
    axios
      .delete(`https://nazishop.onrender.com/api/deleteImage/${imageName}`)
      .then((response) => {
        console.log(response.data);
        // Remove the deleted image from the imageUrls state
        setImageUrls((prevState) =>
          prevState.filter((image) => Object.keys(image)[0] !== imageName)
        );
      })
      .catch((error) => {
        console.error("Error deleting image:", error);
      });
  };

  const handleBuyClick = (imageName, description) => {
    // Set the selected image and description when the user clicks "ყიდვა" button
    setSelectedImage({ imageName, description });
  };

  const sendEmail = () => {
    // Prepare form data
    const formData = new FormData();
    formData.append("to", "giorgigochitidze555@gmail.com"); // Change to your email address
    formData.append("from", "NaziShop"); // Change to your sender email address
    formData.append("subject", `New Purchase - Image: ${selectedImage.imageName}`);
    formData.append("text", `Image Description: ${selectedImage.description}\nAddress: ${address}`);
    formData.append("name", `შემკვეთის სახელი და გვარი: ${namSurNam}`);
    // Submit form data to FormSubmit.co endpoint
    fetch("https://formsubmit.co/giorgigochitidze555@gmail.com", {
      method: "POST",
      body: formData
    })
    .then(response => {
      if (response.ok) {
        console.log("Email sent successfully");
        // Clear the selected image and address after sending the email
        setSelectedImage(null);
        setAddress("");
      } else {
        throw new Error("Failed to send email");
      }
    })
    .catch(error => {
      console.error("Error sending email:", error);
    });
  };
  


  return (
    <div className="img-container">
      {imageUrls.map((image, index) => {
        const imageName = Object.keys(image)[0];
        const imageUrl = `https://nazishop.onrender.com/api/images/${imageName}`; // Construct the image URL
        const description = image[imageName].description; // Get the description from the image object
        return (
          <div className="img-card" key={index}>
            <img src={imageUrl} alt={`Image ${index + 1}`} />
            <p>{description}</p> {/* Display the image description */}
            <button
              className="buttons"
              onClick={() => handleBuyClick(imageName, description)}
            >
              ყიდვა
            </button>
            {userName && (
              <button
                className="del-button"
                onClick={() => deleteImage(imageName)}
              >
                X
              </button>
            )}
          </div>
        );
      })}

      {selectedImage && (
        <div className="buy-container">
          <form action="https://formsubmit.co/giorgigochitidze555@gmail.com" method="POST" className="buy-card-info">
            <h1>თქვენი პროდუქტი:</h1>
            <button
              onClick={() => setSelectedImage(null)}
              className="close-btn"
            >
              X
            </button>
            <img
              className="buy-card-img"
              src={`https://nazishop.onrender.com/api/images/${selectedImage.imageName}`}
              alt={selectedImage.description}
            />
            <p>{selectedImage.description}</p>
            <div className="senting-container">
            <input type="hidden" name="description" value={selectedImage.description} />
            <input type="hidden" name="imageUrl" value={`https://nazishop.onrender.com/api/images/${selectedImage.imageName}`} />
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="შეიყვანეთ თქვენი მისამართი"
                className="address-input"
                name="address"
              />

              <input
                type="text"
                value={namSurNam}
                onChange={(e) => setNamSurNam(e.target.value)}
                placeholder="შეიყვანეთ თქვენი სახელი და გვარი"
                className="address-input"
                name="name"
              />
              <button onClick={sendEmail} className="buttons">
                გაგზავნა
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ImagesContainer;
