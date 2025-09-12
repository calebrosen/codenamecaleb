import { motion } from "framer-motion";
import { useState } from "react";
import { FiArrowUpRight } from "react-icons/fi";

import "sweetalert2/dist/sweetalert2.min.css";

import AboutMe from "../../components/home/blocks/AboutMe.jsx";
import TimeBlock from "../../components/home/blocks/TimeBlock.jsx";
import ColorBlock from "../../components/home/blocks/ColorBlock.jsx";
import BalloonGame from "../../components/home/balloonGame/BalloonGame.jsx";
import CalebBlock from "../../components/home/blocks/CalebBlock.jsx";

const HomePage = () => {
  const [themeColor, setThemeColor] = useState({
    color: "red",
    rgb: "rgb(189, 17, 17)",
  });

  return (
    <div className="relative h-screen">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: "rgb(20, 20, 20)",
            backgroundSize: "5.2rem 5.2rem",
            backgroundImage: `
            linear-gradient(to right, rgba(44, 43, 43, 1) 1px, transparent 0),
            linear-gradient(to bottom, rgb(44, 43, 43) 1px, transparent 0)
          `,
          }}
        />
      </div>

      <div className="fixed inset-0 z-[-1] pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(20,20,20,0.8) 1%, rgba(20,20,20,0.96) 40%, rgba(23,23,23,1) 100%)",
          }}
        />
      </div>

      <div className="relative z-10">
        <div className="p-3 lg:p-0 lg:grid lg:[grid-template-columns:78%_22%] lg:[grid-template-rows:subgrid] lg:gap-4 lg:mt-[4.5%] lg:mx-[20%] lg:max-h-[5px] lg:items-start">
          <motion.div
            initial={{ scale: 0.8, y: 500 }}
            animate={{ scale: 1, y: 0 }}
            transition={{
              type: "spring",
              stiffness: 70,
              damping: 12,
              duration: 0.5,
            }}
          >
            <CalebBlock themeColor={themeColor} />
          </motion.div>


          <motion.div
            initial={{ scale: 0.6, y: 700 }}
            animate={{ scale: 1, y: 0 }}
            transition={{
              type: "spring",
              stiffness: 70,
              damping: 12,
              duration: 0.5,
              delay: 0.2,
            }}
            className="lg:max-h-full lg:min-h-full lg:h-fit lg:text-[0.78vw] mt-4 lg:m-0 mt-4 border-1 border-[#2f2f2f] lg:col-start-2 lg:col-end-3 lg:row-start-1 lg:row-span-2 lg:pt-[0.825rem] lg:pr-4 pb-[0.2rem] lg:pl-4 text-[#dbdbdb] bg-[rgba(53,53,53,0.192)] shadow-[rgba(0,0,0,0.4)_0px_4px_7px,rgba(0,0,0,0.3)_0px_9px_15px_-5px,rgba(0,0,0,0.2)_0px_-3px_0px] backdrop-blur-[7.5px] rounded-[10px] redHoverBorderEffectHome"
          >
            <AboutMe themeColor={themeColor} />
          </motion.div>

          <motion.div
            initial={{ scale: 0.6, y: 700 }}
            animate={{ scale: 1, y: 0 }}
            transition={{
              type: "spring",
              stiffness: 70,
              damping: 12,
              duration: 0.5,
              delay: 0.1,
            }}
          >
            <div className="grid grid-cols-3 grid-rows-[auto_auto] gap-y-0 gap-x-4 text-[#dbdbdb]">
              <BalloonGame themeColor={themeColor} />
              <a href="/portfolio" className="no-underline">
                <div className="flex-[0.33333333333] min-h-[2.75vw] h-[65%] px-[0.9rem] py-[0.6rem] bg-[rgba(53,53,53,0.192)] shadow-[rgba(0,0,0,0.4)_0px_4px_7px,rgba(0,0,0,0.3)_0px_9px_15px_-5px,rgba(0,0,0,0.2)_0px_-3px_0px] backdrop-blur-[7.5px] rounded-[10px] border-1 border-[#2f2f2f] relative z-[5] transition-all duration-100 ease-in-out flex items-center text-[1.25vw] portfolioBackground redHoverBorderEffectHome">
                  <div className="flex justify-between items-center w-full">
                    <span>Portfolio</span>
                    <FiArrowUpRight color={themeColor.rgb} />
                  </div>
                </div>
              </a>

              <ColorBlock
                themeColor={themeColor}
                setThemeColor={setThemeColor}
              />

              <div
                className="col-start-2 col-end-[-1] row-start-2 grid gap-4"
                style={{ gridTemplateColumns: "7.75fr 2.25fr" }}
              >
                <div className="col-start-1 px-[0.9rem] border-1 border-[#2f2f2f] bg-[rgba(53,53,53,0.192)] shadow-[rgba(0,0,0,0.4)_0px_4px_7px,rgba(0,0,0,0.3)_0px_9px_15px_-5px,rgba(0,0,0,0.2)_0px_-3px_0px] backdrop-blur-[7.5px] rounded-[10px] redHoverBorderEffectHome">
                  <div className="flex justify-around items-center h-full min-h-[2.75rem] text-[1.2vw] text-center">
                    <TimeBlock themeColor={themeColor} />
                  </div>
                </div>
                <div className="col-start-2 px-[0.9rem] py-[0.2rem] text-[0.8vw] border-1 border-[#2f2f2f] bg-[rgba(53,53,53,0.192)] shadow-[rgba(0,0,0,0.4)_0px_4px_7px,rgba(0,0,0,0.3)_0px_9px_15px_-5px,rgba(0,0,0,0.2)_0px_-3px_0px] backdrop-blur-[7.5px] rounded-[10px] redHoverBorderEffectHome">
                  <div className="flex justify-around items-center h-full min-h-[2.75rem] text-[0.8vw] text-center">
                    <div>
                      Built with{" "}
                      <span
                        style={{
                          color: themeColor.rgb,
                          fontSize: "0.9vw",
                          fontWeight: "700",
                        }}
                      >
                        ♡
                      </span>{" "}
                      in React
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
