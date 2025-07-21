import { BsTwitterX } from "react-icons/bs";
import { FaDiscord, FaGithub, FaLinkedin } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import "../../pages/home/Home.css";

function IconGroup({ themeColor }) {
  const rawRgb = themeColor.rgb.replace(/[^\d,]/g, "");
  const boxShadow = `rgb(${rawRgb}) 3px 3px 4px, rgba(0, 0, 0, 0.3) 0px 7px 15px -3px, rgba(${rawRgb}, 0.2) 1px -1.5px 2px inset`;

  const iconContainerStyle = {
    boxShadow,
  };

  const iconContainerClass =
    "transition duration-500 transform hover:scale-105 p-2 rounded-md";

  const copyDiscUserNameToClipboard = () => {
    const textToCopy = "im.caleb";
    navigator.clipboard.writeText(textToCopy).then(() => {
      Swal.fire({
        title: "Copied username!",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
        toast: true,
        background: "rgba(20, 20, 20, 1.0)",
        color: "#f9f9f9",
      });
    });
  };

  return (
    <div className="flex justify-start gap-4 text-2xl py-4">
      <a
        href="https://www.github.com/calebrosen"
        target="_blank"
        rel="noreferrer"
        aria-label="GitHub"
        title="GitHub"
      >
        <div style={iconContainerStyle} className={iconContainerClass}>
          <FaGithub size={35} />
        </div>
      </a>

      <button
        onClick={copyDiscUserNameToClipboard}
        style={iconContainerStyle}
        className={iconContainerClass}
        aria-label="Copy Discord username"
        title="Copy Discord username"
      >
        <FaDiscord size={35} />
      </button>

      <a
        href="https://www.x.com/caleberosen"
        target="_blank"
        rel="noreferrer"
        aria-label="Twitter/X"
        title="Twitter/X"
      >
        <div style={iconContainerStyle} className={iconContainerClass}>
          <BsTwitterX size={35} />
        </div>
      </a>

      <a
        href="mailto:calebethanrosen@gmail.com"
        rel="noreferrer"
        aria-label="Email"
        title="Email"
      >
        <div style={iconContainerStyle} className={iconContainerClass}>
          <MdOutlineEmail size={35} />
        </div>
      </a>

      <a
        href="https://www.linkedin.com/in/caleb-rosen-390b7a178"
        target="_blank"
        rel="noreferrer"
        aria-label="LinkedIn"
        title="LinkedIn"
      >
        <div style={iconContainerStyle} className={iconContainerClass}>
          <FaLinkedin size={35} />
        </div>
      </a>
    </div>
  );
}

export default IconGroup;
