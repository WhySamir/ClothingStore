import { Play } from "lucide-react";
import { useRef, useState } from "react";

export const VideoPreview = ({ src }: { src: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
    videoRef.current?.play();
  };

  return (
    <div className="relative w-24 h-24 rounded-md overflow-hidden cursor-pointer">
      <video
        ref={videoRef}
        src={src}
        className="w-full h-full object-cover"
        preload="metadata"
      />
      {!isPlaying && (
        <div
          className="absolute inset-0 flex items-center justify-center"
          onClick={handlePlay}
        >
          <div className=" backdrop-blur-md relative bg-opacity-50 rounded-full p-2 flex items-center justify-center">
            <div className="bg-white bg-opacity-50 rounded-full flex items-center justify-center p-1">
              {/* Play icon */}
              <Play
                fill="backdrop-blur-md"
                className="h-3 w-3  backdrop-blur-md"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
