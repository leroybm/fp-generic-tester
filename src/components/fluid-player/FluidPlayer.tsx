import fluidPlayer from 'fluid-player';
import './FluidPlayer.css';
import {useEffect, useRef} from "react";

export function FluidPlayer({ playerOptions }: { playerOptions: Partial<FluidPlayerOptions> }) {
  const videoHolderRef = useRef<HTMLDivElement>(null);
  const playerInstanceRef = useRef<FluidPlayerInstance | null>(null);

  useEffect(() => {
    let videoElement: HTMLVideoElement;
    let currentInstance: FluidPlayerInstance;

    // Creates the player instance manually since it doesn't work well with reactive changes
    if (videoHolderRef.current) {
      const sourceElement = document.createElement('source');
      sourceElement.src = 'https://cdn.fluidplayer.com/videos/valerian-1080p.mkv';
      sourceElement.type = 'video/mp4';

      videoElement = document.createElement('video');
      videoElement.style.width = '100%';
      videoElement.appendChild(sourceElement);

      videoHolderRef.current.appendChild(videoElement);
      playerInstanceRef.current = currentInstance = fluidPlayer(videoElement, playerOptions)
    }

    return () => {
      currentInstance.destroy();
      videoElement.remove();
    }
  }, [playerOptions]);

  return (
    <div className="w-100" ref={videoHolderRef}>

    </div>
  )
}
