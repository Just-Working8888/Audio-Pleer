import Slider from "rc-slider";
import React from "react";
import { CurrentMusicType } from "../types";
import { secondsToMinutes } from "../utils";
interface ProgressProps {
  open: boolean;
  currentMusic: CurrentMusicType;
  audioRef: any;

}
const Progress: React.FC<ProgressProps> = ({
  open,
  currentMusic,
  audioRef,
 
}) => {
  return (
    <div
      className={
        open === false
          ? " hidden lg:block items-center  w-6/12 flex-col gap-1  transition-all ease-in duration-300 justify-center"
          : "   px-4  my-4 flex-col gap-1 items-center  transition-all ease-in duration-300 justify-center"
      }
    >
      <Slider
        trackStyle={{ background: "rgb(111, 185, 143)" }}
        handleStyle={{
          border: "2px solid #2C7873",
          background: "#2C7873",
          boxShadow: "none",
          opacity: 1,
        }}
        min={0}
        max={currentMusic.duration}
        value={currentMusic.curTime}
        onChange={(val) => {
          audioRef.current!.currentTime = +val;
        }}
      />
      <div className="flex justify-between text-xs">
        <span>{secondsToMinutes(currentMusic.curTime)}</span>
        <span>{secondsToMinutes(currentMusic.duration)}</span>
      </div>
    </div>
  );
};

export default Progress;
