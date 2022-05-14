import { Song } from "@prisma/client";

interface ISongChoice {
  onClick: (songId: number) => void;
  song: Song;
}

const SongChoice: React.FC<ISongChoice> = ({ onClick, song }) => {
  const { title, album, id } = song;
  return (
    <div
      onClick={() => onClick(id)}
      className="bg-cover bg-no-repeat h-full w-1/2 relative flex justify-center items-center text-white cursor-pointer text-xl sm:text-4xl"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('img/${album}.jpeg')`,
      }}
    >
      {title}
    </div>
  );
};

export default SongChoice;
