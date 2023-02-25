import Hls from 'hls.js';
import React, { useRef, useEffect } from 'react'

interface VideoPlayerProps {
  videoUrl: string;
  // thumbnailImg: string;
}

export default function VideoPlayer(props: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  const handleEnded = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0
      // videoRef.current.play()
    }
  }
  
  const handleTouchStart = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play()
      } else {
        videoRef.current.pause()
      }
    }
  }

  useEffect(() => {
    const video = videoRef.current
    if (video && props.videoUrl) {
      if (Hls.isSupported()) {
        const hls = new Hls()
        hls.loadSource(`/convert/${props.videoUrl}`)
        hls.attachMedia(video)
      } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
        videoRef.current.src = `/convert/${props.videoUrl}`
      }
    }
  }, [props.videoUrl]);

  return (
    <video 
      style={{ width: '80%', height: 'auto' } as React.CSSProperties}
      ref={videoRef}
      controls
      onEnded={handleEnded}
      onTouchStart={handleTouchStart}
    />
  );
}
