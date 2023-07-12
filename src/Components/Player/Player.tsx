import "rc-slider/assets/index.css";
import { useEffect, useRef, useState } from "react";
import { usePlayer } from "./usePlayer";
import Setting from "./PlayerComponent/Settinf";
import Progress from "./PlayerComponent/Progress";
import PlayComponent from "./PlayerComponent/PlayComponent";
import ImageNameAudio from "./PlayerComponent/ImageNameAudio";
import Button from "./PlayerComponent/Button";

export const Player = () => {
  const [isRandom, setIsRandom] = useState(false);
  const [isVolumeOpen, setIsVolumeOpen] = useState(false);
  const [open, setOpen] = useState(true);
  const [volume, setVolume] = useState(100);

  const volumeRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const closeVolume = (e: any) => {
      if (!volumeRef.current?.contains(e.target)) setIsVolumeOpen(false);
    };
    document.addEventListener("click", closeVolume, true);
    return () => {
      document.removeEventListener("click", closeVolume, true);
    };
  }, []);

  const audioRef = useRef<HTMLAudioElement>();
  const { currentMusic, setCurrentMusic, playList } = usePlayer();

  useEffect(() => {
    audioRef.current = new Audio(currentMusic.src);

    audioRef.current.addEventListener("volumechange", (e: any) => {
      setVolume(+e.target.volume);
    });

    audioRef.current.addEventListener("play", () => {
      setCurrentMusic({ isPlaying: true });
    });
    audioRef.current.addEventListener("pause", () => {
      setCurrentMusic({ isPlaying: false });
    });

    audioRef.current.addEventListener("ended", (e: any) => {
      skipNext(new URL(e.target.src).pathname);
    });

    audioRef.current.addEventListener("canplay", () => {
      audioRef.current?.play();
    });

    audioRef.current.addEventListener("loadedmetadata", (e: any) => {
      setCurrentMusic({
        curTime: e.target.currentTime,
        duration: e.target.duration,
      });
    });
    audioRef.current.addEventListener("timeupdate", (e: any) => {
      setCurrentMusic({
        curTime: e.target.currentTime,
      });
    });

    return () => {
      audioRef.current?.pause();
    };
  }, [currentMusic.src]);

  const skipNext = (src: string) => {
    const idx = playList.findIndex((m) => m.src === src);
    if (isRandom) return skipRandom(idx);

    if (idx === playList.length - 1) {
      setCurrentMusic(playList[0], true);
    } else {
      setCurrentMusic(playList[idx + 1], true);
    }
  };

  const skipPrev = (src: string) => {
    const idx = playList.findIndex((m) => m.src === src);
    if (isRandom) return skipRandom(idx);

    if (idx === 0) {
      setCurrentMusic(playList[playList.length - 1]);
    } else {
      setCurrentMusic(playList[idx - 1]);
    }
  };

  const skipRandom = (idx: number) => {
    const randIdx = Math.floor(Math.random() * playList.length);
    if (randIdx === idx) {
      skipRandom(idx);
    } else {
      setCurrentMusic(playList[randIdx]);
    }
  };
  const openHolst = () => {
    setOpen(!open);
  };

  return (
    <div
      className={
        open === false
          ? "fixed w-screen bottom-0 inset-x-0  transition-all ease-in duration-300 h-24 "
          : "fixed w-screen bottom-0 inset-x-0  transition-all ease-in duration-300 h-full"
      }
    >
      <div className="py-3  backdrop-blur-xl  h-full  px-3 text-white shadow-lg shadow-purple-50">
        <Button open={open} openHolst={openHolst} />
        <div
          className={
            open === false
              ? "container items-center mx-auto px-3 lg:px-0 flex justify-between  transition-all ease-in duration-300"
              : "max-w-[800px] mt-9  items-center transition-all ease-in duration-300 mx-auto"
          }
        >
          <ImageNameAudio open={open} currentMusic={currentMusic} />
          <PlayComponent
            open={open}
            skipPrev={skipPrev}
            currentMusic={currentMusic}
            audioRef={audioRef}
            skipNext={skipNext}
          />
          <Progress
            open={open}
            currentMusic={currentMusic}
            audioRef={audioRef}
          />
          <Setting
            setIsRandom={setIsRandom}
            setIsVolumeOpen={setIsVolumeOpen}
            volumeRef={volumeRef}
            audioRef={audioRef}
            isRandom={isRandom}
            volume={volume}
            isVolumeOpen={isVolumeOpen}
          />
        </div>
      </div>
    </div>
  );
};
