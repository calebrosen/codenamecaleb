import { faCode } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    VerticalTimeline,
    VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import Fireplace from "../../img/portfolio/fireplace.png";
import "./Portfolio.css";
// definitely: displays, distributor inventory,
// maybe: invoice,

const Portfolio = () => {
  return (
    <div className="portfolio-container">
      <div className="timeline-wrapper">
        <VerticalTimeline
        lineColor={ "#ff00ee" }
        >
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            icon={<img src={Fireplace} alt="fireplace" />}
          >
            <h2 className="vertical-timeline-element-title">
              Fireplace Sizing Guide
            </h2>
            <p>
              This tool takes customers through 3 steps, getting the type of
              fireplace they have, the dimensions of it, and which gas type they
              have - and uses
            </p>
            <div className="languagesUsed">JavaScript • PHP • SQL</div>
            <div className="linkAndCodeContainer">
                <a
                href="https://www.realfyrestore.com/index.php?route=information/sizeselector"
                target="_blank"
                >
                <div className="linkAndCode">Live Link</div>
                </a>{" "}
                <div className="linkAndCode">
                Code <FontAwesomeIcon icon={faCode} />
                </div>
            </div>
          </VerticalTimelineElement>
        </VerticalTimeline>
      </div>
    </div>
  );
};

export default Portfolio;
