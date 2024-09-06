import {
  faBolt,
  faLock,
  faMobileScreen,
  faWandMagicSparkles,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import React, { useState } from "react";
import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from "react-compare-slider";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Biker from "../../img/wasted/biker.jpg";
import BikerWasted from "../../img/wasted/biker_wasted.jpg";
import Skateboarder from "../../img/wasted/skateboarder.jpg";
import SkateboarderWasted from "../../img/wasted/skateboarder_wasted.jpg";
import "./Wasted.css";

function Wasted() {
  const [image, setImage] = useState(null);
  const [uploadLabel, setUploadLabel] = useState(
    <span>
      <FileUploadIcon style={{ marginRight: "8px" }} />
      Upload an Image
    </span>
  );

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
        setUploadLabel(
          <span>
            <FileUploadIcon style={{ marginRight: "8px" }} />
            Change Image
          </span>
        );
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
      await document.fonts.load('bold 48px "Pricedown Bl"');

      canvas.width = img.width;
      canvas.height = img.height;

      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const gray = data[i] * 0.3 + data[i + 1] * 0.59 + data[i + 2] * 0.11;
        data[i] = gray;
        data[i + 1] = gray;
        data[i + 2] = gray;
      }

      ctx.putImageData(imageData, 0, 0);

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
      ctx.moveTo(-canvas.width * 0.75, -canvas.height * 0.05);
      ctx.lineTo(canvas.width * 0.75, -canvas.height * 0.09);
      ctx.lineTo(canvas.width * 0.75, canvas.height * 0.09);
      ctx.lineTo(-canvas.width * 0.75, canvas.height * 0.05);
      ctx.closePath();
      ctx.fill();
      ctx.restore();

      ctx.font = `${canvas.height * 0.09}px "Pricedown Bl", sans-serif`;
      ctx.fillStyle = "rgb(212, 7, 7)";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.lineWidth = 4;
      ctx.strokeStyle = "black";
      ctx.strokeText("WASTED", canvas.width / 2, canvas.height / 2);
      ctx.fillText("WASTED", canvas.width / 2, canvas.height / 2);

      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "wasted-image.png";
      link.click();
    };
  };

  return (
    <div className="wasted-main-container fade-in">
      <link
        href="https://fonts.cdnfonts.com/css/pricedown"
        rel="stylesheet"
      ></link>
      <div className="wasted-about-text-container glass-effect shadow">
        <h1 className="wastedh1">GTA V Wasted Image Generator</h1>
        <span className="wasted-about-text">
          Just upload your image and get the perfect{" "}
          <span className="wasted-text">Wasted</span> text overlayed everytime.
        </span>
      </div>
      <div className="centeredContainer">
        <div className="instructionsAndCarousel">
          {/* instructions */}
          <div className="instructions-container">
            <h2>How to Create Your Wasted Image</h2>
            <ol className="instructions-list">
              <li>
                <strong>Step 1:</strong> Click on the "Upload an Image" button
                to choose a photo from your device.
              </li>
              <li>
                <strong>Step 2:</strong> Make sure your image is at least{" "}
                <strong>500x500 pixels</strong> so the result looks amazing!
              </li>
              <li>
                <strong>Step 3:</strong> Once you upload the image, hit "Process
                and Download" to create your customized image.
              </li>
              <li>
                <strong>Step 4:</strong> Download your awesome GTA wasted-style
                image and share it with your friends!
              </li>
            </ol>
          </div>

          {/* swiper carousel */}
          <div className="carousel-container">
            <Swiper
              spaceBetween={0}
              slidesPerView={1}
              loop={true}
              centeredSlides={true}
              pagination={{ clickable: false }}
              autoplay={true}
              navigation={true}
              allowTouchMove={false}
              modules={[Navigation]}
            >
              <SwiperSlide className="wastedExample shadow">
                <div className="slider-container">
                <ReactCompareSlider
                  itemOne={
                    <ReactCompareSliderImage
                      src={Biker}
                      alt="Biker faceplanted onto a street sign"
                    />
                  }
                  itemTwo={
                    <ReactCompareSliderImage
                      src={BikerWasted}
                      alt="Biker with 'Wasted' text overlay"
                    />
                  }
                />
                </div>
              </SwiperSlide>

              <SwiperSlide className="wastedExample shadow">
                <div className="slider-container">
                  <ReactCompareSlider
                    itemOne={
                      <ReactCompareSliderImage
                        src={Skateboarder}
                        alt="Skateboarder about to fall"
                      />
                    }
                    itemTwo={
                      <ReactCompareSliderImage
                        src={SkateboarderWasted}
                        alt="Skateboarder with 'Wasted' text overlay"
                      />
                    }
                  />
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </div>

      <div className="file-input">
        <input
          type="file"
          id="file"
          className="file shadow"
          accept="image/*"
          onChange={handleImageUpload}
        />
        <label htmlFor="file">{uploadLabel}</label>
        {image && (
          <button onClick={handleDownload} className="download-button">
            <FileDownloadIcon /> Process and Download
          </button>
        )}
      </div>

      <div className="iconsGroup">
        <div className="iconGroup">
          <div>
            <FontAwesomeIcon className="icon" icon={faLock} size="3x" />
          </div>
          <span>Secure</span>
          <p className="iconSubText">Your images are not saved.</p>
        </div>

        <div className="iconGroup">
          <div>
            <FontAwesomeIcon
              icon={faWandMagicSparkles}
              className="icon"
              size="3x"
            />
          </div>
          <span>Magic</span>
          <p className="iconSubText">Perfect overlay, everytime.</p>
        </div>

        <div className="iconGroup">
          <div>
            <FontAwesomeIcon
              icon={faBolt}
              className="icon"
              style={{ color: "#FFD43B" }}
              size="3x"
            />
          </div>
          <span>Fast</span>
          <p className="iconSubText">Instantly generate your image.</p>
        </div>

        <div className="iconGroup">
          <div>
            <FontAwesomeIcon
              icon={faMobileScreen}
              className="icon"
              style={{ color: "#FFD43B" }}
              size="3x"
            />
          </div>
          <span>Responsive</span>
          <p className="iconSubText">Works on any device.</p>
        </div>
      </div>

      {image && (
        <div className="wasted-image-container">
          <img
            src={image}
            alt="Generated GTA V Wasted Image"
            className="gtaVWastedImage"
          />
        </div>
      )}
    </div>
  );
}

export default Wasted;
