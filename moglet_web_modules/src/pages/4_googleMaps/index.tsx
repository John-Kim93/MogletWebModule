import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { useEffect, useRef, useState } from 'react';
import ReviewTable from './reviewTable';
import style from "./googleMaps.module.css"
import { useQuery } from 'react-query';
import { Marker as MarkerInfo } from 'types/types';
import { apiGetMarkers, apiGetReviewTable } from '@/serverApi/4_googleMaps/api';
import SearchBtn from 'component/button/searchBtn';

const KEY :string = process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY ? process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY : "NULL" 

export default function GoogleMaps() {
  const markers = useQuery('markers', ()=>apiGetMarkers({
    lat: center.lat,
    lng: center.lng,
    km: km,
    offset: 0
  }))
  
  const map = useRef<GoogleMap>(null)
  const [searchBtnVisible, setsearchBtnVisible] = useState(false)
  const [popup, setPopup] = useState(false)
  const [reviewUid, setReviewUid] = useState(0)
  const [center, setCenter] = useState({
    lat: 37.5662952,
    lng: 126.9779451
  })
  const [zoom, setzoom] = useState(15)
  const [km, setKm] = useState(1)

  const reviewTableRet = useQuery(['review_table', reviewUid], ()=>apiGetReviewTable(reviewUid))?.data?.data?.item

  const handlingDragEnd = () => {
    if (map.current) {
      const zoomLv = map.current?.state?.map?.getZoom()
      const curLat = map.current?.state?.map?.getCenter()?.lat()
      const curLng = map.current?.state?.map?.getCenter()?.lng()
      if (curLat && curLng) {
        setCenter({lat: curLat, lng: curLng})
        setsearchBtnVisible(true)
      }
      if (zoomLv) {
        console.log(zoomLv)
        if (zoomLv < 14) {
          setKm(3)
        } else if (zoomLv < 16) {
          setKm(1)
        } else if (zoomLv < 17) {
          setKm(0.3)
        } else if (zoomLv >= 18) {
          setKm(0.1)
        }
      }
    }
  }

  const handlingZoomChange = () => {
    if (map.current) {
      const newZoom = map.current?.state?.map?.getZoom()
      if (newZoom) setzoom(newZoom)
    }
  }
  
  const clickMarker = (uid: number, lat: number, lng: number) => {
    setPopup(true)
    setReviewUid(uid)
    setCenter({lat, lng})
  }

  const refetchMarkers = ():void => {
    markers.refetch()
    setsearchBtnVisible(false)
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
          zoom={zoom}
          options={{
            minZoom: 13,
            disableDefaultUI:true,
          }}
          onDragEnd={handlingDragEnd}
          onZoomChanged={handlingZoomChange}
          onClick={()=>setPopup(false)}
        >
          { /* Child components, such as markers, info windows, etc. */ }
          {markers?.data?.data?.item.map((marker: MarkerInfo, index: number) => (
            <Marker
              key={index}
              position={{ lat: marker.latitude, lng: marker.longitude }}
              title={marker.name}
              onClick={() => {
                clickMarker(marker.uid, marker.latitude, marker.longitude)
              }}
            />
          ))}
          {searchBtnVisible && <SearchBtn click={refetchMarkers} />}
        </GoogleMap>
      </div>
      {popup && <ReviewTable reviewTableRet={reviewTableRet} />}
    </LoadScript>
  )
}