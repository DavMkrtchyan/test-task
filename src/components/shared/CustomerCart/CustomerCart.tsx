import { useRef, useState } from "react";
import ProgressBar from "../ProgressBar/ProgressBar";
import "./CustomerCart.scss";

interface ICustomerCart {
  name: string;
  email: string;
  bonus: number;
  idx: number;
  onDelete: (email: string) => void;
  onAddBonus: (email: string) => void;
}

const CustomerCart = ({
  name,
  email,
  bonus,
  idx,
  onDelete,
  onAddBonus,
}: ICustomerCart) => {
  const [showAddons, setShowAddons] = useState<boolean>(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const handleImageClick = () => {
    imageInputRef.current?.click();
  };

  return (
    <div className="cart-holder">
      <button className="delete-cart" onClick={() => onDelete(email)}>
        X
      </button>
      <div className="cart-container">
        <div className="cart-content">
          <div>
            <p>Name: {name}</p>
            <p>Email: {email}</p>
          </div>
          <div className="bonus">
            <p>Bonus</p>
            <p className="count">{bonus}</p>
          </div>
          {selectedImage ? (
            <div onClick={handleImageClick} >
              <img
                src={selectedImage}
                alt="customer"
                className="uploaded-image"
              />
            </div>
          ) : (
            <>
              <label htmlFor={`upload-image-${idx}`} className="upload-image">
                Upload photo
              </label>
            </>
          )}
          <input
            ref={imageInputRef}
            type="file"
            accept="image/*"
            id={`upload-image-${idx}`}
            onChange={handleUpload}
          />
        </div>
        {showAddons && (
          <div>
            <button className="add-bonus-btn" onClick={() => onAddBonus(email)}>
              Add bonus
            </button>
            <ProgressBar onFinish={() => setShowAddons(false)} />
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerCart;
