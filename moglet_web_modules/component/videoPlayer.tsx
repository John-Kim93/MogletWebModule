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

  function checkMobile(){
 
    var varUA = navigator?.userAgent?.toLowerCase(); //userAgent 값 얻기
 
    if ( varUA.indexOf('android') > -1) {
      return "android";
    } else if ( varUA.indexOf("iphone") > -1||varUA.indexOf("ipad") > -1||varUA.indexOf("ipod") > -1 ) {
      return "ios";
    } else {
      return "other";
    }
  }


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

  switch(checkMobile()) {
    case "ios":
      return (
        <>
          <video src={src} crossOrigin="anonymous" />
        </>
      )
    default:
      return (
        <>
          <video ref={videoRef} crossOrigin="anonymous" />
        </>
      )
  }
}