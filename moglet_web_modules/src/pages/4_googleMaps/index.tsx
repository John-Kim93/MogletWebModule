import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { useRef, useState } from 'react';
import ReviewTable from './reviewTable';
import style from "./googleMaps.module.css"

const KEY :string = process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY ? process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY : "NULL" 

type MarkerInfo = {
  lat: number;
  lng: number;
  name: string;
  uid: number;
}

const markers: MarkerInfo[] = [
  {
    lat: 37.5614677,
    lng: 126.9857406,
    name: '쏠라운지 위드 그레이프',
    uid: 1
  },
  {
    lat: 37.5736565,
    lng: 126.9742286,
    name: "오늘은즉떡 광화문점",
    uid : 100 
  },
];

export default function GoogleMaps() {
  const map = useRef<GoogleMap>(null)
  const [popup, setPopup] = useState(false)
  const [reviewUid, setReviewUid] = useState(0)
  const [center, setCenter] = useState({
    lat: 37.5662952,
    lng: 126.9779451
  })

  const handlingDragEnd = () => {
    if (map.current) {
      // console.log(map.current?.state?.map?.getCenter()?.lat())
      // console.log(map.current?.state?.map?.getCenter()?.lng())
      // console.log(map.current?.state?.map?.getZoom())
      // setPopup(false)
    }
  }
  const clickMarker = (uid: number, lat: number, lng: number) => {
    setPopup(true)
    setReviewUid(uid)
    setCenter({lat, lng})
  }

  return (
    <LoadScript
      googleMapsApiKey={KEY}
    >
      <div className={style.overlay}>
        <GoogleMap
          ref={map}
          mapContainerStyle={{width:"100vw", height:"100vh"}}
          center={center}
          zoom={15}
          options={{
            minZoom: 13,
            disableDefaultUI:true,
          }}
          onDragEnd={handlingDragEnd}
          onClick={()=>setPopup(false)}
        >
          { /* Child components, such as markers, info windows, etc. */ }
          {markers.map((marker: MarkerInfo, index: number) => (
            <Marker
              key={index}
              position={{ lat: marker.lat, lng: marker.lng }}
              title={marker.name}
              onClick={() => {
                clickMarker(marker.uid, marker.lat, marker.lng)
              }}
            />
          ))}
        </GoogleMap>
      </div>
      {popup && <ReviewTable close={()=>{setPopup(false)}} reviewUid={reviewUid} />}
    </LoadScript>
  )
}