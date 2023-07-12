import React from "react";
import {
  TbPlayerPause,
  TbPlayerPlay,
  TbPlayerSkipBack,
  TbPlayerSkipForward,
} from "react-icons/tb";
import { CurrentMusicType } from "../types";
interface PlayComponent {
  open: boolean;
  skipPrev: any;
  currentMusic: CurrentMusicType;
  audioRef: any;
  skipNext: any;
}
const PlayComponent: React.FC<PlayComponent> = ({
  open,
  skipPrev,
  currentMusic,
  audioRef,
  skipNext,
}) => {
  return (
    <div
      className={
        open === false
          ? "flex items-center justify-center gap-3  transition-all ease-in duration-300 lg:w-2/12"
          : "flex items-center justify-center gap-3 mt-20  transition-all ease-in duration-300 "
      }
    >
      <button onClick={() => skipPrev(currentMusic.src)}>
        <TbPlayerSkipBack size={open === false ? 20 : 40} />
      </button>
      <button
        onClick={() => {
          if (currentMusic.isPlaying) {
            audioRef.current?.pause();
          } else {
            audioRef.current?.play();
          }
        }}
        className="rounded-full p-1 border border-[#2C7873]"
      >
        {currentMusic.isPlaying ? (
          <TbPlayerPause size={open === false ? 26 : 52} />
        ) : (
          <TbPlayerPlay size={open === false ? 26 : 52} />
        )}
      </button>
      <button onClick={() => skipNext(currentMusic.src)}>
        <TbPlayerSkipForward size={open === false ? 20 : 40} />
      </button>
    </div>
  );
};

export default PlayComponent;
