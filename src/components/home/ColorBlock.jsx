import { motion } from "framer-motion";
import { useEffect } from "react";
import classNames from "classnames";

const ColorBlock = ({ setThemeColor }) => {
  useEffect(() => {
    ChangeThemeColor("red", "rgb(189, 17, 17)");
  }, []);

  const ChangeThemeColor = (color, rgb) => {
    // Update themeColor state with an object
    setThemeColor({ color, rgb });

    // borders (on hover)
    const elements = document.querySelectorAll(
      ".greenHoverBorderEffectHome, .blueHoverBorderEffectHome, .yellowHoverBorderEffectHome, .pinkHoverBorderEffectHome, .redHoverBorderEffectHome"
    );

    elements.forEach((element) => {
      Array.from(element.classList).forEach((cls) => {
        if (cls.endsWith("HoverBorderEffectHome")) {
          element.classList.remove(cls);
          element.classList.add(color + "HoverBorderEffectHome");
        }
      });
    });
  };

  return (
    <div className="flex-[0.33333333333] min-h-[2.75vw] h-[65%] px-[0.9rem] py-[0.6rem] bg-[rgba(53,53,53,0.192)] shadow-[rgba(0,0,0,0.4)_0px_4px_7px,rgba(0,0,0,0.3)_0px_9px_15px_-5px,rgba(0,0,0,0.2)_0px_-3px_0px] backdrop-blur-[7.5px] rounded-[10px] border-1 border-[#2f2f2f] redHoverBorderEffectHome col-start-3 row-start-1 flex justify-center items-center gap-[0.4rem]"
    >
      <div className="col-start-3 row-start-1 flex justify-center items-start gap-[0.4rem] h-full">
        {[
          { color: "red", rgb: "rgb(189, 17, 17)", className: "redBG" },
          { color: "yellow", rgb: "rgb(212, 177, 21)", className: "yellowBG" },
          { color: "green", rgb: "rgb(36, 163, 19)", className: "greenBG" },
          { color: "blue", rgb: "rgb(9, 176, 226)", className: "blueBG" },
          { color: "pink", rgb: "rgb(212, 13, 238)", className: "pinkBG" },
        ].map(({ color, rgb, className }) => (
          <motion.div
            key={color}
            animate={{
              scale: [1, 1.18, 0.3, 1],
              rotate: [0, 0, 180, 180, 0],
            }}
            transition={{
              duration: 2,
              ease: "easeInOut",
              times: [0, 0.2, 0.5, 0.8, 1],
            }}
          >
            <div
              className={`circle ${className} hover:cursor-pointer`}
              onClick={() => ChangeThemeColor(color, rgb)}
              title={`Change theme to ${color}`}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ColorBlock;
