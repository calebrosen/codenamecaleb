import { FaStar } from "react-icons/fa";

function AboutMe({ themeColor }) {
  // About me content

  const Star = ({ amount }) => {
    return (
      <span className="inline-flex items-center ml-1">
        {Array.from({ length: amount }, (_, index) => (
          <FaStar
            key={index}
            style={{ verticalAlign: "middle" }}
            color={themeColor.rgb}
            size={10}
          />
        ))}
      </span>
    );
  };

  return (
    <div>
      <h5 className="font-semibold text-[0.9vw] text-neutral-100">About me</h5>
      <div>
        I'm a full stack developer with a strong desire to learn and improve
        everyday.
        <div className="mt-4">
          My stack:
          <ul className="space-y-1 mt-1">
            <li className="flex items-center">
              <span className="text-neutral-300">JavaScript</span>
              <Star amount={5} />
            </li>
            <li className="flex items-center">
              <span className="homeListItemsStack">PHP</span>
              <Star amount={5} />
            </li>
            <li className="flex items-center">
              <span className="homeListItemsStack">MySQL</span>
              <Star amount={5} />
            </li>
            <li className="flex items-center">
              <span className="homeListItemsStack">CSS</span>
              <Star amount={4} />
            </li>
            <li className="flex items-center">
              <span className="homeListItemsStack">NodeJS</span>
              <Star amount={4} />
            </li>
          </ul>
        </div>
        <div className="sidePanelLowerPart mt-4">
          Beyond coding, I love to cook, work out, and watch anime.
        </div>
      </div>
    </div>
  );
}

export default AboutMe;
