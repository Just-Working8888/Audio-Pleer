import React from "react";
import { DefaultThumbnail } from "../DefaultThumbnail";
import { CurrentMusicType } from "../types";
interface ImageNameAudioProps {
  open: boolean;
  currentMusic: CurrentMusicType;
}
const ImageNameAudio: React.FC<ImageNameAudioProps> = ({
  open,
  currentMusic,
}) => {
  return (
    <div
      className={
        open === false
          ? "flex items-center lg:w-3/12 gap-2  transition-all ease-in duration-300"
          : " transition-all ease-in-out duration-300"
      }
    >
      <div
        className={
          open === false
            ? "w-14 h-14 lg:flex-shrink-0 cover  transition-all ease-in duration-300"
            : "w-full h-full  mx-auto  transition-all ease-in duration-300"
        }
      >
        {currentMusic.thumbnail ? (
          <img
            src={currentMusic.thumbnail}
            alt={currentMusic.title}
            className={
              open === false
                ? "rounded-lg w-full h-full"
                : "rounded-lg mx-auto   transition-all ease-in duration-300 md:w-[50%] md:h-[50%] w-[85%] h-[85%] "
            }
          />
        ) : (
          <DefaultThumbnail />
        )}
      </div>
      <div
        className={
          open === false
            ? "flex flex-col gap-1  transition-all ease-in duration-300"
            : " transition-all ease-in duration-300 text-center my-4"
        }
      >
        <h6 className="text-2xl font-semibold">{currentMusic.title}</h6>
        <span className="text-xl text-gray-400">{currentMusic.artist}</span>
      </div>
    </div>
  );
};

export default ImageNameAudio;
