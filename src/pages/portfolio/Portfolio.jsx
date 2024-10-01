import { faCode, faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import DistributorInventory from "../../img/portfolio/distributorInventory.png";
import FileCopy from "../../img/portfolio/fileCopy.png";
import Fireplace from "../../img/portfolio/fireplace.png";
import GoogleReviews from "../../img/portfolio/googleReview.png";
import Printer from "../../img/portfolio/printer.png";
import "./Portfolio.css";
// definitely: displays, distributor inventory,
// maybe: invoice,

const Portfolio = () => {
  return (
    <div className="portfolio-container">
      <div className="timeline-wrapper">
      {/* <div className='portfolioH1Wrapper'>
        <h1 className='portfolioH1'>Portfolio</h1>
      </div> */}
        <VerticalTimeline lineColor={"#dedcdc"}>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            icon={<img src={Fireplace} className='portfolioIconImg' alt="fireplace" />}
          >
            <h2 className="vertical-timeline-element-title">
              Fireplace Sizing Guide
            </h2>
            <p className='portfolipPBody'>
              This tool takes customers through 3 steps, getting the type of
              fireplace they have, the dimensions of it, and which gas type they
              have - and uses
            </p>
            <div className="languagesUsed">
              JavaScript • PHP • SQL • CSS • HTML
            </div>
            <div className="linkAndCodeContainer">
              <a
                href="https://www.realfyrestore.com/index.php?route=information/sizeselector"
                className="linkAndCode"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="linkAndCode">
                  Link <FontAwesomeIcon icon={faLink} />
                </div>
              </a>{" "}
            </div>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            icon={<img src={FileCopy} className='portfolioIconImg' alt="Copy file icon" />}
          >
            <h2 className="vertical-timeline-element-title">File Copier</h2>
            <p className='portfolipPBody'>
              This file copier uses FTP to connect to a master website and
              transfer files to another website. All you have to do is call the
              function with the file path.
            </p>
            <div className="languagesUsed">NodeJS</div>
            <div className="linkAndCodeContainer">
              <a
                href="https://github.com/calebrosen/Node-JS-File-Copier"
                className="linkAndCode"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="linkAndCode">
                  Code <FontAwesomeIcon icon={faCode} />
                </div>
              </a>{" "}
            </div>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            icon={
              <img
                src={DistributorInventory}
                className='portfolioIconImg'
                alt="Icon with excel logo and python"
              />
            }
          >
            <h2 className="vertical-timeline-element-title">
              Distributor's Inventory Formatter
            </h2>
            <p className='portfolipPBody'>
              An internal tool that uses Zoho's Mail API and Selenium to
              retrieve inventory counts. These are all converted into CSV's,
              formatted to a certain structure, merged into a master file, and
              then uploaded to Zoho Creator.
            </p>
            <div className="languagesUsed">Python </div>
            <div className="linkAndCodeContainer">
              <a
                href="https://github.com/calebrosen/distributors-inventory"
                className="linkAndCode"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="linkAndCode">
                  Code <FontAwesomeIcon icon={faCode} />
                </div>
              </a>{" "}
            </div>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            icon={<img src={GoogleReviews} className='portfolioIconImg' alt="Google icon" />}
          >
            <h2 className="vertical-timeline-element-title">
              Google Reviews Carousel
            </h2>
            <p className='portfolipPBody'>
              A customer facing carousel that dynamically pulls Google reviews
              from Google's places API and displays them in a carousel.
            </p>
            <div className="languagesUsed">JavaScript • CSS • HTML </div>
            <div className="linkAndCodeContainer">
              <a
                href="https://github.com/calebrosen/distributors-inventory"
                className="linkAndCode"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="linkAndCode">
                  Code <FontAwesomeIcon icon={faCode} />
                </div>
              </a>
              <a
                href=" https://www.dimplexstore.com/our-customer-reviews"
                className="linkAndCode"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="linkAndCode">
                  Link <FontAwesomeIcon icon={faLink} />
                </div>
              </a>
            </div>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            icon={<img src={Printer} className='portfolioIconImg' alt="Printer icon" />}
          >
            <h2 className="vertical-timeline-element-title">
              Printable Display Cards
            </h2>
            <p className='portfolipPBody'>
              An internal tool that uses Zoho API to pull display products and format them into printable cards with product information, price, and a scannable QR code.
            </p>
            <div className="languagesUsed">JavaScript • PHP • CSS • HTML </div>
            <div className="linkAndCodeContainer">
              <a
                href="https://github.com/calebrosen/IRG-Displays"
                className="linkAndCode"
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
  );
};

export default Portfolio;
