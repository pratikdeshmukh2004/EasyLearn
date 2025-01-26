import { faVolumeHigh, faVolumeLow } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef, useState } from "react";

const AudioController = ({ link }) => {
  const audioRef = useRef(null); // Reference to the audio element
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.75); // Default volume (1 = 100%)

  // Handle volume change
  const handleVolumeChange = (event) => {
    const newVolume = event.target.value;
    audioRef.current.volume = newVolume;
    setVolume(newVolume);
  };

  return (
    <div className="shadow-lg rounded-lg mt-5 p-5">
      <audio
        ref={audioRef}
        className="hidden"
        src="https://github.com/pratikdeshmukh2004/Audio-Player/raw/refs/heads/master/Darkside.mp3"
      ></audio>
      <div className="flex justify-between">
        <button
          onClick={() => audioRef.current.play()}
          className="bg-black hover:bg-gray-700 p-3 px-6 rounded-lg text-white text-sm font-medium"
        >
          Play
        </button>
        <button
          onClick={() => audioRef.current.pause()}
          className="bg-black hover:bg-gray-700 p-3 px-6 rounded-lg text-white text-sm font-medium"
        >
          Pause
        </button>
      </div>
      <div className="mt-6 flex gap-2 justify-between items-center">
        <label htmlFor="volume">
          <FontAwesomeIcon icon={faVolumeLow} />
        </label>
        <input
          type="range"
          id="volume"
          min="0"
          max="1"
          step="0.1"
          value={volume}
          className="w-9/12 h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-gray-800"
          style={{
            background: `linear-gradient(to right, #424242 0%, #424242 ${
              volume * 100
            }%, #ddd ${volume * 100}%, #ddd 100%)`,
          }}
          onChange={handleVolumeChange}
        />
        {volume * 100}%
        <label htmlFor="volume">
          <FontAwesomeIcon icon={faVolumeHigh} />
        </label>
      </div>
    </div>
  );
};

export default AudioController;
