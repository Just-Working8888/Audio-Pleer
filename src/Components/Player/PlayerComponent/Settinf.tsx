import Slider from "rc-slider";
import React from "react";
import { TbArrowsShuffle2, TbVolume, TbVolume3 } from "react-icons/tb";
interface SettingProps {
  isVolumeOpen: boolean;
  volumeRef:  React.RefObject<HTMLDivElement>;
  setIsVolumeOpen: any;
  volume: number;
  audioRef: any;
  isRandom: boolean;
  setIsRandom: any;
}
const Setting: React.FC<SettingProps> = ({
  isVolumeOpen,
  volumeRef,
  setIsVolumeOpen,
  volume,
  audioRef,
  isRandom,
  setIsRandom,
}) => {
  return (
    <div className="flex justify-end gap-3 lg:w-1/12">
      <div className="relative flex items-center h-full" ref={volumeRef}>
        {isVolumeOpen && (
          <div className="flex absolute -top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 shadow-lg w-8 h-20 rounded-2xl overflow-hidden bg-neutral-100 py-4 justify-center">
            <Slider
              vertical
              min={0}
              max={1}
              step={0.01}
              value={volume}
              onChange={(val) => {
                audioRef.current!.volume = +val;
              }}
            />
          </div>
        )}
        <button onClick={() => setIsVolumeOpen(!isVolumeOpen)}>
          {volume === 0 ? <TbVolume3 size={20} /> : <TbVolume size={20} />}
        </button>
      </div>
      <button onClick={() => setIsRandom(!isRandom)}>
        <TbArrowsShuffle2 size={20} color={isRandom ? "rgb(126 34 206)" : ""} />
      </button>
    </div>
  );
};

export default Setting;
