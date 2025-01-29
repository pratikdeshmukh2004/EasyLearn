import { faVolumeHigh, faVolumeLow } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import Lottie from "react-lottie";
import audioData from "../animations/audio_playing.json";

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

  useEffect(() => {
    audioRef.current.pause();
    setIsPlaying(false);
  }, [link]);

  return (
    <div className="shadow-custom rounded-lg mt-5 p-5">
      <audio ref={audioRef} className="hidden" src={link}></audio>
      <div className="flex items-center justify-between">
        <button
          onClick={() => {
            audioRef.current.play();
            setIsPlaying(true);
          }}
          className="bg-black hover:bg-gray-700 p-3 px-6 rounded-lg text-white text-sm font-medium"
        >
          Play
        </button>
        <select>
          <option>Speed</option>
          <option>1x</option>
        </select>

        <button
          onClick={() => {
            audioRef.current.pause();
            setIsPlaying(false);
          }}
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
