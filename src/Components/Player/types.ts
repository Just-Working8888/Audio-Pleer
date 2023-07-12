export type PlayerProps = {
  id: number;
  title: string;
  src: string;
  artist?: string;
  thumbnail?: string;
};

export interface CurrentMusicType extends PlayerProps {
  duration?: number;
  curTime?: number;
  isPlaying?: boolean;
}
export type PlayerContextType = {
  currentMusic: CurrentMusicType;
  setCurrentMusic: (cm: Partial<CurrentMusicType>, replace?: boolean) => void;
  playList: PlayerProps[];
};


