import { useEffect, useRef } from 'react'
import Hls from 'hls.js'
import Player from 'plyr'
import 'plyr/dist/plyr.css'

interface Props {
  videoUrl: String,
  thumbnailUrl: String,
}

export default function VideoPlayer({ videoUrl, thumbnailUrl } :Props) {
  const src = `/convert/${videoUrl}`
  const videoRef = useRef(null)

  useEffect(() => {
    const video: HTMLElement | null = videoRef?.current
    if (!video) return
    if (Hls.isSupported()) {
      const hls = new Hls()
      hls.loadSource(src)
      const player = new Player(video);
      player.source = {
        type: 'video',
        sources: [],
      }
      hls.attachMedia(video)
    } else {
      console.error(
        'This is an old browser that does not support MSE https://developer.mozilla.org/en-US/docs/Web/API/Media_Source_Extensions_API'
      )
    }
  }, [src, videoRef])

  return (
    <>
      <video ref={videoRef} crossOrigin="anonymous" />
    </>
  )
}