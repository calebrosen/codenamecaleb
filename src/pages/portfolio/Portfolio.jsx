import { faCode, faHome, faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import PartsDiagrams from "../../img/portfolio/diagram.png";
import DistributorInventory from "../../img/portfolio/distributorInventory.png";
import FileCopy from "../../img/portfolio/fileCopy.png";
import Fireplace from "../../img/portfolio/fireplace.png";
import GoogleReviews from "../../img/portfolio/googleReview.png";
import iosNotes from "../../img/portfolio/iosNotes.png";
import Printer from "../../img/portfolio/printer.png";
import Wasted from "../../img/portfolio/wasted.png";
import ColorBlock from "../../components/home/ColorBlock";
import "./Portfolio.css";
// definitely: displays, distributor inventory,
// maybe: invoice,

const linkAndCode = "px-[0.35rem] pt-[0.10rem] pb-[0.21rem] mt-1 rounded-md bg-[rgb(189,17,17)] text-white text-center font-bold inline-block transition ease-in-out duration-200 hover:[&>div]:-translate-y-[1.75px] hover:[&>div]:scale-[1.01]";

const Portfolio = () => {
  return (
    <div>
    <a href="/">
      <FontAwesomeIcon icon={faHome} style={{position: 'fixed', zIndex: '5', top: '25', left: '25', color: 'rgb(219, 219, 219)', transform: 'scale(1.5)'}}/>
    </a>
    <div className="portfolio-container">
      <div className="w-[80%] max-w-[1500px] p-[30px] bg-[rgba(83,83,83,0.425)] shadow-[0_3px_12px_0_rgba(201,48,48,0.37)] backdrop-blur-[15.5px] rounded-[12px] relative z-[5]">

      <p className="text-center text-[#dbdbdb] tracking-[0.3rem] pt-[0.2rem] pb-[1.3rem] px-0 [font-variant:small-caps]">
        <h1 className="text-6xl">Portfolio and Projects</h1>
        <h4 className="text-3xl">This portfolio barely scratches the surface of my work.<br />For a more updated and maintained list, view my <a href="https://www.github.com/calebrosen" target="_blank">github.</a></h4>
      </p>


        {/* Vertical timeline start */}
        <VerticalTimeline lineColor={"#232323"}>


          {/* IOS Notes App */}
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            icon={
              <img
                src={iosNotes}
                className="portfolioIconImg"
                alt="fireplace"
              />
            }
          >
            <h2 className="vertical-timeline-element-title">IOS Notes App</h2>
            <p>
              A copy of the notes app on IOS, this application is built in React
              and has the ability to do nearly everything that the real IOS
              notes app does.
            </p>
            <div className="languagesUsed">JavaScript • React • CSS • HTML</div>
            <div className="linkAndCodeContainer">
              <a
                href="https://github.com/calebrosen/IOS-Notes-App-In-React"
                className={`${linkAndCode}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className={`${linkAndCode}`}>
                  Link <FontAwesomeIcon icon={faLink} />
                </div>
              </a>{" "}
            </div>
          </VerticalTimelineElement>


          {/* Fireplace sizing guide */}
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            icon={
              <img
                src={Fireplace}
                className="portfolioIconImg"
                alt="fireplace"
              />
            }
          >
            <h2 className="vertical-timeline-element-title">
              Fireplace Sizing Guide
            </h2>
            <p>
              This tool takes customers through 3 steps, gathering information,
              and then uses all of that information to calculate what log sets
              they can fit in their fireplace.
            </p>
            <div className="languagesUsed">
              JavaScript • PHP • SQL • CSS • HTML
            </div>
            <div className="linkAndCodeContainer">
              <a
                href="https://www.realfyrestore.com/index.php?route=information/sizeselector"
                className={`${linkAndCode}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className={`${linkAndCode}`}>
                  Link <FontAwesomeIcon icon={faLink} />
                </div>
              </a>{" "}
            </div>
          </VerticalTimelineElement>


          {/* File copier */}
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            icon={
              <img
                src={FileCopy}
                className="portfolioIconImg"
                alt="Copy file icon"
              />
            }
          >
            <h2 className="vertical-timeline-element-title">File Copier</h2>
            <p>
              This file copier uses FTP to connect to a master website and
              transfer files to another website. All you have to do is call the
              function with the file path.
            </p>
            <div className="languagesUsed">NodeJS</div>
            <div className="linkAndCodeContainer">
              <a
                href="https://github.com/calebrosen/Node-JS-File-Copier"
                className={`${linkAndCode}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className={`${linkAndCode}`}>
                  Code <FontAwesomeIcon icon={faCode} />
                </div>
              </a>{" "}
            </div>
          </VerticalTimelineElement>

          {/* Parts diagrams */}
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            icon={
              <img
                src={PartsDiagrams}
                className="portfolioIconImg"
                alt="A parts diagram of car engine"
              />
            }
          >
            <h2 className="vertical-timeline-element-title">Parts Diagrams</h2>
            <p>
              A customer facing tool that allows selection of their grill model, and displays all
              of the parts for that model overlaid on top of an image of the grill model they selected.
            </p>
            <div className="languagesUsed">PHP • Javascript • React • SQL</div>
            <div className="linkAndCodeContainer">
              <a
                href="https://www.firemagicstore.com/parts-diagrams"
                className={`${linkAndCode}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className={`${linkAndCode}`}>
                  Link <FontAwesomeIcon icon={faLink} />
                </div>
              </a>{" "}
            </div>
          </VerticalTimelineElement>


          {/* Distributors Inventory */}
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            icon={
              <img
                src={DistributorInventory}
                className="portfolioIconImg"
                alt="Icon with excel logo and python"
              />
            }
          >
            <h2 className="vertical-timeline-element-title">
              Distributor's Inventory Formatter
            </h2>
            <p>
              An internal tool that uses Zoho's Mail API and Selenium to
              retrieve inventory counts. These are all converted into CSV's,
              formatted to a certain structure, merged into a master file, and
              then uploaded to Zoho Creator.
            </p>
            <div className="languagesUsed">Python </div>
            <div className="linkAndCodeContainer">
              <a
                href="https://github.com/calebrosen/distributors-inventory"
                className={`${linkAndCode}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className={`${linkAndCode}`}>
                  Code <FontAwesomeIcon icon={faCode} />
                </div>
              </a>{" "}
            </div>
          </VerticalTimelineElement>


          {/* Wasted image generator */}
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            icon={
              <img
                src={Wasted}
                className="portfolioIconImg"
                alt="Wasted icon"
              />
            }
          >
            <h2 className="vertical-timeline-element-title">
              Wasted Image Generator
            </h2>
            <p>
              An easy to use image generator that simply puts the GTA V 'Wasted'
              effect over any image uploaded.
            </p>
            <div className="languagesUsed">
              JavaScript • React • CSS • HTML{" "}
            </div>
            <div className="linkAndCodeContainer">
              <a
                href="https://github.com/calebrosen/codenamecaleb/tree/main/src/pages/wasted"
                className={`${linkAndCode}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className={`${linkAndCode}`}>
                  Code <FontAwesomeIcon icon={faCode} />
                </div>
              </a>
              <a
                href="https://codenamecaleb.com/gta-v-wasted-overlay-generator"
                className={`${linkAndCode}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className={`${linkAndCode}`}>
                  Link <FontAwesomeIcon icon={faLink} />
                </div>
              </a>
            </div>
          </VerticalTimelineElement>


          {/* Google reviews carousel */}
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            icon={
              <img
                src={GoogleReviews}
                className="portfolioIconImg"
                alt="Google icon"
              />
            }
          >
            <h2 className="vertical-timeline-element-title">
              Google Reviews Carousel
            </h2>
            <p>
              A customer facing carousel that dynamically pulls Google reviews
              from Google's places API and displays them in a carousel.
            </p>
            <div className="languagesUsed">JavaScript • CSS • HTML </div>
            <div className="linkAndCodeContainer">
              <a
                href="https://github.com/calebrosen/google-reviews"
                className={`${linkAndCode}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className={`${linkAndCode}`}>
                  Code <FontAwesomeIcon icon={faCode} />
                </div>
              </a>
              <a
                href=" https://www.dimplexstore.com/our-customer-reviews"
                className={`${linkAndCode}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className={`${linkAndCode}`}>
                  Link <FontAwesomeIcon icon={faLink} />
                </div>
              </a>
            </div>
          </VerticalTimelineElement>




          {/* Display cards */}
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            icon={
              <img
                src={Printer}
                className="portfolioIconImg"
                alt="Printer icon"
              />
            }
          >
            <h2 className="vertical-timeline-element-title">
              Printable Display Cards
            </h2>
            <p>
              An internal tool that uses Zoho API to pull display products and
              format them into printable cards with product information, price,
              and a scannable QR code.
            </p>
            <div className="languagesUsed">JavaScript • PHP • CSS • HTML </div>
            <div className="linkAndCodeContainer">
              <a
                href="https://github.com/calebrosen/IRG-Displays"
                className={`${linkAndCode}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="linkAndCode">
                  Code <FontAwesomeIcon icon={faCode} />
                </div>
              </a>
            </div>
          </VerticalTimelineElement>
        </VerticalTimeline>
      </div>
    </div>
    </div>
  );
};

export default Portfolio;
