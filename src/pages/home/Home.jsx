import React from "react";
import { BsTwitterX } from "react-icons/bs";
import { FaDiscord, FaGithub } from "react-icons/fa";
import "sweetalert2/dist/sweetalert2.min.css";
import Avatar from "../../img/home/avatar/Avatar.png";
import "./Home.css";

const HomePage = () => {


  /*
  const IconGroup = () => {
    return (
      <nav className="iconContainer">
        <div className="iconBackground">
          <a
            href="https://www.x.com/caleberosen"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div id="x_twitter" className="homeIcon pointer" alt="X/Twitter">
              <FontAwesomeIcon icon={faXTwitter} />
            </div>
          </a>
        </div>
        <div className="iconBackground">
          <a onClick={copyDiscUserNameToClipboard}>
            <div
              id="discord"
              className="homeIcon pointer"
              alt="Discord username"
            >
              <FontAwesomeIcon icon={faDiscord} className="homeIcon" />
            </div>
          </a>
        </div>
        <div className="iconBackground">
          <a
            href="http://steamcommunity.com/profiles/76561198258977132"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div id="steam" className="homeIcon pointer" alt="Steam Link">
              <FontAwesomeIcon icon={faSteam} />
            </div>
          </a>
        </div>
      </nav>
    );
  };
*/

  /*
  const copyDiscUserNameToClipboard = () => {
    const textToCopy = "im.caleb";
    navigator.clipboard.writeText(textToCopy).then(() => {
      Swal.fire({
        title: "Copied username!",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
        toast: true,
        position: "top-center",
        customClass: {
          popup: "my-popup",
        },
      });
    });
  };
*/

  return (
    <div className='homePageContainer'>
      <div className="fsBackground">

      <div className='about-content'>
        <div className='mainContentHome'>
          <div className='row'>
          
            <div className='col-xs-12 col-sm-12 col-md-8 col-lg-8 col-xl-8'>
            Hi, I'm <span style={{fontWeight: 'bold', color: "#fff"}}>Caleb</span>, a full stack developer.
            </div>
            <div className='col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4'>
            <img src={Avatar} className='homePageAvatar'></img>
            </div>
          </div>
          
          <div className='homeIcons'>
            <div className='homeIndividualIcon'>
              <FaGithub size={40}/>
            </div>
            <div className='homeIndividualIcon'>
              <FaDiscord size={40}/>
            </div>
            <div className='homeIndividualIcon'>
              <BsTwitterX size={40}/>
            </div>

          </div>
        </div>
        <div className='sideContentHome'>
          Welcome to my website.
        </div>
      </div>

      </div>
    </div>
  );
};

export default HomePage;
