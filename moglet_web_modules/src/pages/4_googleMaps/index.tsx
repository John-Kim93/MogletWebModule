import { GoogleMap, InfoBox, LoadScript, Marker, MarkerClusterer } from '@react-google-maps/api';
import { useEffect, useRef, useState } from 'react';
import ReviewTable from './reviewTable';
import style from "./googleMaps.module.css"
import { useInfiniteQuery, useQuery } from 'react-query';
import { Marker as MarkerInfo } from 'types/types';
import { apiGetMarkers, apiGetReviewTable } from '@/serverApi/4_googleMaps/api';
import SearchBtn from 'component/button/searchBtn';
import MoreBtn from 'component/button/moreBtn';

const KEY :string = process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY ? process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY : "NULL" 

export default function GoogleMaps() {
  // markers = { data, fetchNextPage, hasNextPage, status, remove, refetch }
  const markers = useInfiniteQuery(['markers'], ({ pageParam = 0 }) => apiGetMarkers({
    lat: center.lat,
    lng: center.lng,
    km: km,
    offset: pageParam
  }), {
    getNextPageParam: (lastPage, allPages) => {
      return allPages.length * 12
    }
  })

  const [markerList, setMarkerList] = useState(markers.data?.pages[0].data.item)
  useEffect( () => {
    if (!markerList) {
      setMarkerList(markers.data?.pages[0].data.item)
      markers.fetchNextPage()
    }
  }, [markers])
  
  const map = useRef<GoogleMap>(null)
  const [searchBtnVisible, setSearchBtnVisible] = useState(false)
  const [popup, setPopup] = useState(false)
  const [markerPopup, setMarkerPopup] = useState<MarkerInfo | null>(null);
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
      setMarkerPopup(null)
      if (curLat && curLng) {
        setCenter({lat: curLat, lng: curLng})
        setSearchBtnVisible(true)
      }
      if (zoomLv) {
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
      if (newZoom) {
        setzoom(newZoom)
        setSearchBtnVisible(true)
        setMarkerPopup(null)
      }
    }
  }
  
  const clickMarker = (uid: number, lat: number, lng: number) => {
    setMarkerPopup(null)
    setPopup(true)
    setReviewUid(uid)
    setCenter({lat, lng})
  }

  const refetchMarkers = ():void => {
    console.log("here")
    markers.remove()
    markers.refetch()
    setMarkerPopup(null)
    setSearchBtnVisible(false)
  }

  const addMarkers = ():void => {
    if (markers.status == "success") {
      markers.fetchNextPage()
      setMarkerList(markerList.concat(markers.data.pages[markers.data.pages.length - 1].data.item))
      setMarkerPopup(null)
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
          center={center}
          zoom={zoom}
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
            setMarkerPopup(null)
            setPopup(false)
          }}
        >
          { /* Child components, such as markers, info windows, etc. */ }
          {markerList 
          ? <MarkerClusterer
              averageCenter={false}
              imageExtension={'png'}
              imagePath={'/marker.png'}
              enableRetinaIcons={true}
              styles={[
                {
                  anchorText: [-30, 0],
                  textColor: "#000",
                  url: '/marker.png',
                  width: 34,
                  height: 42,
                  textSize: 16
                }
              ]}
              maxZoom={16}
              gridSize={20}
            >
              {(clusterer) =>
                markerList.map((marker: MarkerInfo, index: number) => (
                  <Marker
                    key={index}
                    position={{ lat: marker.latitude, lng: marker.longitude }}
                    title={marker.name}
                    onClick={() => {
                      clickMarker(marker.business_shop_uid, marker.latitude, marker.longitude)
                    }}
                    onMouseOver={() => {
                      setMarkerPopup(marker)
                    }}
                    icon={'/marker.png'}
                    clusterer={clusterer}
                  />
              ))}
            </MarkerClusterer>
          : null
          }
          
          {markerPopup && 
            <InfoBox
              position={new google.maps.LatLng(markerPopup.latitude, markerPopup.longitude)}
              options={{
                alignBottom: true,
                pixelOffset: new google.maps.Size(-80, -44),
                closeBoxURL: ``,
                isHidden: false,
                maxWidth: 3000,
                disableAutoPan: true,
                enableEventPropagation:true,
                infoBoxClearance: new google.maps.Size(1, 1),
              }}

            >
              <div className={style.shopNameContainer}>
                <p>{markerPopup.name}</p>
              </div>
            </InfoBox>
          }
          {searchBtnVisible
          ? <SearchBtn click={refetchMarkers} />
          : <MoreBtn click={addMarkers} />}
        </GoogleMap>
      </div>
      {popup && <ReviewTable reviewTableRet={reviewTableRet} />}
    </LoadScript>
  )
}