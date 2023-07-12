import { createContext, FC, ReactNode, useContext, useState } from "react";

import { musics } from "./musics";
import { Player } from "./Player";
import { CurrentMusicType, PlayerContextType } from "./types";
import { defaultMusic } from "./utils";

const PlayerContext = createContext<PlayerContextType>({
  playList: musics,
  currentMusic: defaultMusic,
  setCurrentMusic: () => {},
});

export const usePlayer = (): PlayerContextType => useContext(PlayerContext);

export const PlayerProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [currentMusic, setCurrentMusic] = useState<CurrentMusicType>(defaultMusic);

  const updateCurrentMusic = (newMusic: Partial<CurrentMusicType>, replaceCurrent: boolean = false) => {
    if (replaceCurrent && newMusic.src !== currentMusic.src) {
      setCurrentMusic(newMusic as CurrentMusicType);
    } else {
      setCurrentMusic((prevCurrentMusic) => ({ ...prevCurrentMusic, ...newMusic }));
    }
  };

  return (
    <PlayerContext.Provider value={{ currentMusic, setCurrentMusic: updateCurrentMusic, playList: musics }}>
      {children}
      {currentMusic.src && <Player />}
    </PlayerContext.Provider>
  );
};