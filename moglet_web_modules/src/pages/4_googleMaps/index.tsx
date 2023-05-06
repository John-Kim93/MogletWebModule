import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReviewTable from './reviewTable';
import style from "./googleMaps.module.css"
import { useQuery } from 'react-query';
import { apiGetReviewTable } from '@/serverApi/4_googleMaps/api';
import Markers from './markers';
import { GMapState } from '../../../types/4_GoogleMapsTypes/mapType';

const KEY :string = process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY ? process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY : "NULL" 

export default function GoogleMaps() {
  const map = useRef<GoogleMap>(null)
  const mapInfo = useSelector((state: GMapState) => state.mapSlice);
  console.log(mapInfo)
  const [popup, setPopup] = useState(false)
  const [reviewUid, setReviewUid] = useState(0)
  
  // const handlingDragEnd = () => {
  //   if (map.current) {
  //     const zoomLv = map.current?.state?.map?.getZoom()
  //     const curLat = map.current?.state?.map?.getCenter()?.lat()
  //     const curLng = map.current?.state?.map?.getCenter()?.lng()
  //     setMarkerPopup(null)
  //     if (curLat && curLng) {
  //       setCenter({lat: curLat, lng: curLng})
  //       setSearchBtnVisible(true)
  //     }
  //     if (zoomLv) {
  //       if (zoomLv < 14) {
  //         setKm(3)
  //       } else if (zoomLv < 16) {
  //         setKm(1)
  //       } else if (zoomLv < 17) {
  //         setKm(0.3)
  //       } else if (zoomLv >= 18) {
  //         setKm(0.1)
  //       }
  //     }
  //   }
  // }
  
  // const handlingZoomChange = () => {
  //   if (map.current) {
  //     const newZoom = map.current?.state?.map?.getZoom()
  //     if (newZoom) {
  //       setzoom(newZoom)
  //       setSearchBtnVisible(true)
  //       setMarkerPopup(null)
  //     }
  //   }
  // }

  return (
    <LoadScript
    googleMapsApiKey={KEY}
    >
      <div className={style.overlay}>
        <GoogleMap
          ref={map}
          mapContainerStyle={{width:"100vw", height:"100vh"}}
          center={{lat: 37.5662952, lng: 126.9779451}}
          zoom={15}
          options={{
            minZoom: 13,
            disableDefaultUI:true,
            styles: [{
              featureType: "poi",
              elementType: "labels",
              stylers: [{ visibility: "off" }],
            }]
          }}
          // onDragEnd={handlingDragEnd}
          // onZoomChanged={handlingZoomChange}
          // onClick={()=>{
          //   setMarkerPopup(null)
          //   setPopup(false)
          // }}
        >
          { /* Child components, such as markers, info windows, etc. */ }
          <Markers />
        </GoogleMap>
      </div>
      {/* {popup && <ReviewTable reviewTableRet={reviewTableRet} />} */}
    </LoadScript>
  )
}
