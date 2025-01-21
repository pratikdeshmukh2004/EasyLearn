import React, { useRef, useState } from "react";

const AudioController = () => {
  const audioRef = useRef(null); // Reference to the audio element
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1); // Default volume (1 = 100%)

  // Play or pause audio
  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Update current time
  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  // Change audio position
  const handleSeek = (event) => {
    const newTime = event.target.value;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  // Handle volume change
  const handleVolumeChange = (event) => {
    const newVolume = event.target.value;
    audioRef.current.volume = newVolume;
    setVolume(newVolume);
  };

  // Load metadata to get duration
  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  return (
    <div>
      <audio
        ref={audioRef}
        src="https://github.com/pratikdeshmukh2004/Audio-Player/raw/refs/heads/master/Darkside.mp3"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
      ></audio>
      <div>
        <button onClick={togglePlayPause}>
          {isPlaying ? "Pause" : "Play"}
        </button>
        <div>
          <input
            type="range"
            min="0"
            max={duration}
            value={currentTime}
            onChange={handleSeek}
          />
          <span>
            {Math.floor(currentTime)} / {Math.floor(duration)} seconds
          </span>
        </div>
        <div>
          <label htmlFor="volume">Volume</label>
          <input
            type="range"
            id="volume"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={handleVolumeChange}
          />
        </div>
      </div>
    </div>
  );
};

export default AudioController;
