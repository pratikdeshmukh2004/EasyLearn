import {
  faMinusSquare,
  faPlusSquare
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

const AudioController = ({ link, isPlaying, setIsPlaying, playText, pauseText }) => {
  const [audio, setAudio] = useState(new Audio(link)); // Store Audio object in state
  const [volume, setVolume] = useState(0.75); // Default volume (1 = 100%)
  const [speed, setSpeed] = useState(1);

  useEffect(() => {
    const newAudio = new Audio(link);
    newAudio.playbackRate = speed;
    newAudio.volume = volume;
    setAudio(newAudio);

    // Handle when audio ends
    const handleEnded = () => {
      setIsPlaying(false);
    };

    newAudio.addEventListener('ended', handleEnded);

    // Cleanup
    return () => {
      newAudio.pause();
      newAudio.remove(); // Remove the audio object
      newAudio.removeEventListener('ended', handleEnded);
      setIsPlaying(false);
    };
  }, [link]);

  useEffect(() => {
    if (isPlaying) {
      audio.play();
    } else {
      audio.pause();
    }
  }, [isPlaying, audio]);

  useEffect(() => {
    audio.volume = volume;
  }, [volume, audio]);

  useEffect(() => {
    audio.playbackRate = speed;
  }, [speed, audio]);

  const changeVolume = (value) => {
    const newVolume = Math.min(1, Math.max(0, volume + value));
    setVolume(newVolume);
  };

  const changeSpeed = (value) => {
    const newSpeed = Math.min(6, Math.max(0.5, speed + value));
    setSpeed(newSpeed);
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      setIsPlaying(false);
      audio.pause();
    } else {
      setIsPlaying(true);
      audio.play();
    }
  };

  return (
    <div className="shadow-custom rounded-lg mt-5 p-5">
      <div className="flex items-center justify-between">
        <button
          onClick={togglePlayPause}
          className="bg-black hover:bg-gray-700 w-full p-3 px-6 rounded-lg text-white text-sm font-medium"
        >
          {isPlaying ? pauseText : playText}
        </button>
      </div>

      <p htmlFor="volume" className="text-sm mt-3 mx-auto text-center">
        Volume {Math.round(volume * 100)}%
      </p>
      <div className="flex gap-2 justify-between items-center relative">
        <FontAwesomeIcon
          size="2xl"
          className="cursor-pointer"
          onClick={() => changeVolume(-0.1)}
          icon={faMinusSquare}
        />
        <div className="relative w-8/12">
          <input
            type="range"
            id="volume"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-gray-800"
            style={{
              background: `linear-gradient(to right, #424242 0%, #424242 ${volume * 100}%, #ddd ${volume * 100}%, #ddd 100%)`,
            }}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
          />
        </div>
        <FontAwesomeIcon
          onClick={() => changeVolume(0.2)}
          className="cursor-pointer"
          size="2xl"
          icon={faPlusSquare}
        />
      </div>

      <p htmlFor="speed" className="text-sm mt-3 mx-auto text-center">
        Speed {speed}x
      </p>
      <div className="flex gap-2 justify-between items-center relative">
        <FontAwesomeIcon
          size="2xl"
          onClick={() => changeSpeed(-0.5)}
          icon={faMinusSquare}
          className="cursor-pointer"
        />
        <div className="relative w-8/12">
          <input
            type="range"
            id="speed"
            min="0.5"
            max="6"
            step="0.5"
            value={speed}
            style={{
              background: `linear-gradient(to right, #424242 0%, #424242 ${((speed - 0.5) / 5.5) * 100}%, #ddd ${((speed - 0.5) / 5.5) * 100}%, #ddd 100%)`,
            }}
            className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-gray-800"
            onChange={(e) => setSpeed(parseFloat(e.target.value))}
          />
        </div>
        <FontAwesomeIcon
          onClick={() => changeSpeed(0.5)}
          className="cursor-pointer"
          size="2xl"
          icon={faPlusSquare}
        />
      </div>
    </div>
  );
};

export default AudioController;
