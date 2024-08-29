import React, { useState } from "react";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import "./Wasted.css";

function Wasted() {
  const [image, setImage] = useState(null);
  const [uploadLabel, setUploadLabel] = useState("Upload an image");

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const image = new Image();
      const objectURL = URL.createObjectURL(file);

      image.onload = () => {
        const imageWidth = image.width;
        const imageHeight = image.height;

        if (imageWidth < 500 || imageHeight < 500) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Images must be at least 500x500 pixels!",
            confirmButtonColor: "#c5271c",
          });
        } else {
                    setImage(objectURL);
        }
        setUploadLabel("Change Image");
      };

      image.src = objectURL;
    }
  };

  const handleDownload = async () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      const img = new Image();
      img.src = image;
      img.crossOrigin = "Anonymous";

      img.onload = async () => {

        //making sure font is loaded
        await document.fonts.load('bold 48px "Pricedown Bl"');

        canvas.width = img.width;
        canvas.height = img.height;

        ctx.drawImage(img, 0, 0);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        for (let i = 0; i < data.length; i += 4) {
          const gray = data[i] * 0.3 + data[i + 1] * 0.59 + data[i + 2] * 0.11;
          data[i] = gray; // r
          data[i + 1] = gray; // g
          data[i + 2] = gray; // b
        }

        ctx.putImageData(imageData, 0, 0);

        // drawing the background gradient
        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        const gradient = ctx.createLinearGradient(
          0,
          -canvas.height * 0.12,
          0,
          canvas.height * 0.12
        );
        gradient.addColorStop(0, "rgba(0, 0, 0, 0.6)");
        gradient.addColorStop(1, "rgba(0, 0, 0, 0.6)");
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.moveTo(-canvas.width * 0.75, -canvas.height * 0.05); // starting on left
        ctx.lineTo(canvas.width * 0.75, -canvas.height * 0.09); //ending on right
        ctx.lineTo(canvas.width * 0.75, canvas.height * 0.09); //ending on right
        ctx.lineTo(-canvas.width * 0.75, canvas.height * 0.05); // starting on left
        ctx.closePath();
        ctx.fill();
        ctx.restore();

        // drawing 'wasted' text
        ctx.font = `${canvas.height * 0.09}px "Pricedown Bl", sans-serif`;
        ctx.fillStyle = "rgb(212, 7, 7)";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.lineWidth = 4;
        ctx.strokeStyle = "black";
        ctx.strokeText("WASTED", canvas.width / 2, canvas.height / 2);
        ctx.fillText("WASTED", canvas.width / 2, canvas.height / 2);

        // download
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = "wasted-image.png";
        link.click();
      };
  };

  return (
    <div className="wasted-main-container">
    <link href="https://fonts.cdnfonts.com/css/pricedown" rel="stylesheet"></link>
      <div className="wasted-about-text-container">
        <h1 className='wastedh1'>GTA V Wasted Image Generator</h1>
        <span className="wasted-about-text">
          Want to get that perfect 'wasted' text overlayed onto your image, but
          don't have the time? No problem! Just upload your image, and we'll
          take care of the rest.
        </span>
      </div>
      <div className="file-input">
        <input
          type="file"
          id="file"
          className="file"
          accept="image/*"
          onChange={handleImageUpload}
        />
        <label
          htmlFor="file"
          dangerouslySetInnerHTML={{ __html: uploadLabel }}
        ></label>
        {image && (
          <button onClick={handleDownload} className="download-button">
            Process and Download
          </button>
        )}
      </div>
        {image && (
        <>
          <div className="wasted-image-container">
            <img
              src={image}
              alt="Generated GTA V Wasted Image"
              className="gtaVWastedImage"
            />
          </div>
          <svg width="0" height="0">
            <defs>
              <mask
                id="wasted-mask"
                maskUnits="objectBoundingBox"
                maskContentUnits="objectBoundingBox"
              >
                <polygon points="0 0.35, 1 0.1, 1 0.9, 0 0.7" fill="white" />
              </mask>
            </defs>
          </svg>
        </>
      )}
    </div>
  );
}

export default Wasted;
