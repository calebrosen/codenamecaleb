import { useEffect, useState } from "react";
import IconGroup from "./IconGroup";
import "sweetalert2/dist/sweetalert2.min.css";
import "../../pages/home/Home.css";
import Avatar from "../../img/home/avatar/Avatar.png";

function CalebBlock({ themeColor }) {
  /* this is for the Icons Group of the Main Content box */

  return (
    <div className="col-start-1 col-end-2 row-start-1 px-4 py-[0.9rem] border-[#2f2f2f] border-1 text-[#dbdbdb] text-[1.15vw] bg-[rgba(53,53,53,0.192)] shadow-[rgba(0,0,0,0.4)_0px_4px_7px,rgba(0,0,0,0.3)_0px_9px_15px_-5px,rgba(0,0,0,0.2)_0px_-3px_0px] backdrop-blur-[7.5px] rounded-[10px] font-medium redHoverBorderEffectHome">
      <div className="row">
        <div className="w-full md:col-span-8 lg:col-span-8 xl:col-span-8 flex flex-col justify-between flex-1 my-[0.3rem]">
          <h4>
            Hi, I'm
            <span className="font-bold text-white">&nbsp;Caleb</span>, a
            software developer.
          </h4>
          <h4 id="sm:display-none">
            Feel free to reach out about any projects you may have in mind, or
            just to say hello.
          </h4>
          <IconGroup themeColor={themeColor} />
        </div>
        <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 relative">
          <img
            src={Avatar}
            className="w-[95%]"
            alt="An avatar of Caleb smiling wearing a white button-up shirt"
          />
        </div>
      </div>
    </div>
  );
}

export default CalebBlock;
