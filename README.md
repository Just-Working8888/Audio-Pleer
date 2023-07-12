# Instructions

_This page also contains some Code for me to speed up the Video_

- Install Tailwind CSS with Create React App (I already did it) [Link](https://tailwindcss.com/docs/guides/create-react-app)
- Install these packages (I already did it): `yarn add rc-slider react-icons`
- Take a look at `package.json`, `postcss.config.js`, `tailwind.config.js` and `index.css`

- You can find some Music on public folder of this project
- Musics list

`/musics/index.ts`

```typescript
import { PlayerProps } from "../types";
// Music Source https://pixabay.com/music/

export const musics: PlayerProps[] = [
  {
    id: 1,
    title: "Anthem of Victory",
    src: "/files/anthem-of-victory-111206.mp3",
    artist: "DaddysMusic",
    thumbnail: "/files/anthem-of-victory-111206.webp",
  },
  {
    id: 2,
    title: "Goldn",
    src: "/files/goldn-116392.mp3",
    artist: "prazkhanal",
    thumbnail: "/files/goldn-116392.webp",
  },
  {
    id: 3,
    title: "Guitar Electro Sport Trailer",
    src: "/files/guitar-electro-sport-trailer-115571.mp3",
    artist: "Gvidon",
    thumbnail: "/files/guitar-electro-sport-trailer-115571.webp",
  },
  {
    id: 4,
    title: "Inspiring Cinematic Ambient",
    src: "/files/inspiring-cinematic-ambient-116199.mp3",
    artist: "Music For Videos",
    thumbnail: "/files/inspiring-cinematic-ambient-116199.webp",
  },
  {
    id: 5,
    title: "Lofi Study",
    src: "/files/lofi-study-112191.mp3",
    artist: "FASSounds",
    thumbnail: "/files/lofi-study-112191.webp",
  },
  {
    id: 6,
    title: "Stomping Rock (Four Shots)",
    src: "/files/stomping-rock-four-shots-111444.mp3",
    artist: "AlexGrohl",
    thumbnail: "/files/stomping-rock-four-shots-111444.webp",
  },
  {
    id: 7,
    title: "Save As",
    src: "/files/save-as-115826.mp3",
    artist: "tobylane",
  },
  {
    id: 8,
    title: "Milk Shake",
    src: "/files/milk-shake-116330.mp3",
    artist: "Coma-Media",
  },
  {
    id: 9,
    title: "Inspiring Emotional Uplifting Piano",
    src: "/files/inspiring-emotional-uplifting-piano-112623.mp3",
    artist: "Music For Videos",
  },
];
```

- Create Player component and import it to App.tsx

Here is the Player Type:

`types.ts`:

```typescript
export type PlayerProps = {
  id: number;
  title: string;
  src: string;
  artist?: string;
  thumbnail?: string;
};
```

- We need to add a lot of stuff to `PLayer.tsx`. But for now Lets create a React hook on top of our Player component.

`types.ts`:

```typescript
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
```

- Add PlayerProvider to app.tsx
- for testing our component we need a PlayGround take a look before copy it:

`PlayGround.tsx`

```typescript
import { TbPlayerPause, TbPlayerPlay } from "react-icons/tb";
import { DefaultThumbnail } from "./DefaultThumbnail";
import { usePlayer } from "./usePlayer";

export const PlayGround = () => {
  const { playList, setCurrentMusic, currentMusic } = usePlayer();
  return (
    <div className="w-screen h-screen overflow-auto bg-[#1e1e2f]">
      <div className="flex flex-col max-w-lg gap-4 mx-4 md:mx-auto mt-6 mb-20">
        {playList.map((music) => {
          const isPlaying = currentMusic.src === music.src;
          return (
            <div
              key={music.id}
              onClick={() => {
                setCurrentMusic(music, true);
              }}
              className={`${
                isPlaying ? " border-purple-500" : "border-transparent"
              } flex gap-2 text-xs relative cursor-pointer transition-shadow duration-300 shadow-lg hover:shadow-none bg-[#27293d] rounded-2xl overflow-hidden text-white border-2 border-dashed`}
            >
              <div className="w-3/12 h-24">
                {music.thumbnail ? (
                  <img
                    className="rounded-lg h-full w-full object-cover"
                    alt={music.title}
                    src={music.thumbnail}
                  />
                ) : (
                  <DefaultThumbnail />
                )}
              </div>
              <div className="w-8/12 flex flex-col gap-2 justify-center">
                <h6 className="font-semibold text-sm">{music.title}</h6>
                <p className="text-xs text-gray-400">{music.artist}</p>
              </div>
              <div className="w-1/12 flex justify-center items-center text-3xl bg-black/10">
                {isPlaying ? <TbPlayerPause /> : <TbPlayerPlay />}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
```

- Add functionality to the player
  - Volume changer
  - Player Progress
  - Play/Pause and Next/Prev
  - Random Navigation
