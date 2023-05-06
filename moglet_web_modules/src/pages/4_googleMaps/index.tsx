import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReviewTable from './reviewTable';
import style from "./googleMaps.module.css"
import Markers from './markers';
import { closeMarkerInfo, duToDdoBtn } from '../../store/4_GoogleMapsStore/markerSlice'
import { setCenter, setKm } from '../../store/4_GoogleMapsStore/mapSlice'
import { hideReviewTable } from '../../store/4_GoogleMapsStore/reviewTableSlice'

import { GMapState } from '../../../types/4_GoogleMapsTypes/mapType';
import { ReviewState } from 'types/4_GoogleMapsTypes/reviewType';


const KEY :string = process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY ? process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY : "NULL" 

export default function GoogleMaps() {
  const mapInfo = useSelector((state: GMapState) => state.mapSlice)
  const reviewInfo = useSelector((state: ReviewState) => state.reviewTableSlice)
  const dispatch = useDispatch()
  
  const map = useRef<GoogleMap>(null)

  const handlingDragEnd = () => {
    if (map.current) {
      const curLat = map.current?.state?.map?.getCenter()?.lat()
      const curLng = map.current?.state?.map?.getCenter()?.lng()
      dispatch(closeMarkerInfo())
      if (curLat && curLng) {
        dispatch(setCenter({lat: curLat, lng: curLng}))
        dispatch(duToDdoBtn())
      }
    }
  }
  
  const handlingZoomChange = () => {
    if (map.current) {
      const zoomLv = map.current?.state?.map?.getZoom()
      console.log(zoomLv)
      if (zoomLv) {
        if (zoomLv < 15) {
          dispatch(setKm(3))
        } else if (zoomLv < 17) {
          dispatch(setKm(1))
        } else if (zoomLv < 18) {
          dispatch(setKm(0.3))
        } else if (zoomLv >= 18) {
          dispatch(setKm(0.1))
        }
        dispatch(duToDdoBtn())
        dispatch(closeMarkerInfo())
      }
    }
  }

  return (
    <LoadScript
    googleMapsApiKey={KEY}
    >
      <div className={style.overlay}>
        <GoogleMap
          ref={map}
          mapContainerStyle={{width:"100vw", height:"100vh"}}
          center={mapInfo.center}
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
          onDragEnd={handlingDragEnd}
          onZoomChanged={handlingZoomChange}
          onClick={()=>{
            dispatch(closeMarkerInfo())
            dispatch(hideReviewTable())
          }}
        >
          <Markers />
        </GoogleMap>
      </div>
      {reviewInfo && reviewInfo.reviewTableVisibility && <ReviewTable />}
    </LoadScript>
  )
}
