import React from "react";
import { BsTwitterX } from "react-icons/bs";
import { FaDiscord, FaGithub, FaLinkedin, FaRegStar } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import Avatar from "../../img/home/avatar/Avatar.png";
import "./Home.css";

const HomePage = () => {

  const IconGroup = () => {
    /* This is for the Icons Group of the Main Content box */

    const copyDiscUserNameToClipboard = () => {
      /* Since you cannot go to a discord username with a link, I am copying my discord username to the clipboard */
      const textToCopy = "im.caleb";
      navigator.clipboard.writeText(textToCopy).then(() => {
        Swal.fire({
          title: "Copied username!",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
          toast: true,
          background: "rgba(56, 54, 54, 0.45)",
          color: "#f9f9f9",
        });
      });
    };

    return (
      /* Icons content (inside of the main content box) */
      <div className="homeIcons">
        {/* Github */}
        <a
          href="https://www.github.com/calebrosen"
          target="_blank"
          rel="noreferrer"
        >
          <div className="homeIndividualIcon hoverEffectHomePage">
            <FaGithub size={35} />
          </div>
        </a>

        {/* Discord */}
        <div className="homeIndividualIcon hoverEffectHomePage">
          <FaDiscord size={35} onClick={copyDiscUserNameToClipboard} />
        </div>

        {/* X/Twitter */}
        <a
          href="https://www.x.com/caleberosen"
          target="_blank"
          rel="noreferrer"
        >
          <div className="homeIndividualIcon hoverEffectHomePage">
            <BsTwitterX size={35} />
          </div>
        </a>

        {/* Email */}
        <a href="mailto:calebethanrosen@gmail.com" rel="noreferrer">
          <div className="homeIndividualIcon hoverEffectHomePage">
            <MdOutlineEmail size={35} />
          </div>
        </a>

        {/* Linkedin */}
        <a href="linkedin" target="_blank">
          <div className="homeIndividualIcon hoverEffectHomePage">
            <FaLinkedin size={35} />
          </div>
        </a>
      </div>
    );
  };

  const Star = ({ amount }) => {
    // Looping through number passed and returning stars of that amount
    return (
      <>
        {Array.from({ length: amount }, (_, index) => (
          <FaRegStar key={index} color={"#FFD700"} size={10} />
        ))}
      </>
    );
  };

  return (
<div className="homePageContainer">
  <div className="fsBackground">
    <div className="main-content">
      {/* Main content section */}
      <div className="mainContentHome">
        {/* Inside of main content box */}
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-8 col-lg-8 col-xl-8 mainContentDivIntro">
            <h4>
              Hi, I'm{" "}
              <span style={{ fontWeight: "bold", color: "#fff" }}>
                Caleb
              </span>
              , a software developer.
            </h4>
            <h4>
              Feel free to reach out about any projects you may have in mind,
              or just to say hello.
            </h4>
            <IconGroup />
          </div>
          <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
            <img src={Avatar} className="homePageAvatar"></img>
          </div>
        </div>
      </div>



      <div className="triGridColumn">
      {/* Content block below main content */}
        To be continued
      </div>

      {/* Side content section */}
      <div className="sideContentHome">
        <h5 className="aboutMeH5">About me</h5>
        <div className="aboutMeSidePanel">
          I'm a full stack developer with a strong desire to
          learn and improve everyday.
          <div className="homeMyStack">
            My stack:
            <div className="homeMyStackInner">
              <ul>
                <li>
                  <span className="homeListItemsStack">JavaScript</span>{" "}
                  <Star amount={5} />
                </li>
                <li>
                  <span className="homeListItemsStack">React</span>{" "}
                  <Star amount={5} />
                </li>
                <li>
                  <span className="homeListItemsStack">MySQL</span>{" "}
                  <Star amount={5} />
                </li>
                <li>
                  <span className="homeListItemsStack">NodeJS</span>{" "}
                  <Star amount={4} />
                </li>
                <li>
                  <span className="homeListItemsStack">CSS</span>{" "}
                  <Star amount={4} />
                </li>
                <li>
                  <span className="homeListItemsStack">PHP</span>{" "}
                  <Star amount={4} />
                </li>
              </ul>
            </div>
          </div>
          <p className="sidePanelLowerPart">
            Beyond coding, I love to cook, work out, and watch anime.
          </p>
          <p className="sidePanelLowerPart">
            I'm always learning and eager to work with new technologies.
            Currently, it's on my roadmap to learn Angular and C#/.NET.
          </p>
        </div>
      </div>
    </div>
  </div>
</div>


  );
};

export default HomePage;
