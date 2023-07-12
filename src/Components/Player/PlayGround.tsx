import { TbPlayerPause, TbPlayerPlay } from "react-icons/tb";
import { DefaultThumbnail } from "./DefaultThumbnail";
import { usePlayer } from "./usePlayer";

export const PlayGround = () => {
  const { playList, setCurrentMusic, currentMusic } = usePlayer();

  return (
    <div className=" w-screen  h-screen overflow-auto bg-[#021C1E]">
      <div className="flex flex-col pr-20   gap-4 mx-4 md:mx-auto mt-6 mb-20">
        {playList.map((music) => {
          const isPlaying = currentMusic.src === music.src;
          return (
            <div
              key={music.id}
              onClick={() => {
                setCurrentMusic(music, true);
              }}
              className={`${
                isPlaying ? "loader" : "border-transparent"
              } flex gap-2 text-xs   rounded-r-full p-2 relative cursor-pointer  duration-300 shadow-lg hover:shadow-none bg-[#004445] hover:bg-[#2C7873] transition   overflow-hidden text-white`}
            >
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <div className="w-3/12 h-24">
                {music.thumbnail ? (
                  <img
                    className="rounded-lg h-full  object-cover"
                    alt={music.title}
                    src={music.thumbnail}
                  />
                ) : (
                  <DefaultThumbnail />
                )}
              </div>
              <div className="w-8/12 flex flex-col gap-2 justify-center">
                <h6 className="font-semibold text-sm"> <h3> {music.title}{isPlaying ? '...' : ''}</h3></h6>
                <p className="text-xs text-gray-400">{music.artist}</p>
              </div>
              <div className="w-1/12 flex justify-center items-center text-3xl rounded-full bg-[#6fb98f24]">
                {isPlaying ? <TbPlayerPause /> : <TbPlayerPlay />}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
