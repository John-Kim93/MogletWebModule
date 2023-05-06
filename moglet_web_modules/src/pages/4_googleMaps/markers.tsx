import { useDispatch, useSelector } from 'react-redux';
import { useInfiniteQuery } from 'react-query';

import style from "./googleMaps.module.css"
import { InfoBox, Marker, MarkerClusterer } from '@react-google-maps/api';
import { apiGetMarkers } from '@/serverApi/4_googleMaps/api';
import { MarkerState } from '../../../types/4_GoogleMapsTypes/markerType';
import { GMapState } from '../../../types/4_GoogleMapsTypes/mapType';
import { closeMarkerInfo, addMarkerList, showMarkerInfo, resetMarkerList,
  ddoToDuBtn, duToDdoBtn, hideButton, showButton } from '../../store/4_GoogleMapsStore/markerSlice'
import { setReviewUid } from '../../store/4_GoogleMapsStore/reviewTableSlice'
import { setCenter } from '../../store/4_GoogleMapsStore/mapSlice'

import SearchBtn from 'component/button/searchBtn';
import MoreBtn from 'component/button/moreBtn';



export default function Markers() {
  const dispatch = useDispatch()
  const markerInfo = useSelector((state: MarkerState) => state.markerSlice);
  const mapInfo = useSelector((state: GMapState) => state.mapSlice);

  const markers = useInfiniteQuery(['markers'], ({ pageParam = 0 }) => apiGetMarkers({
    lat: mapInfo.center.lat,
    lng: mapInfo.center.lng,
    km: mapInfo.km,
    offset: pageParam
  }), {
    onSuccess: data => {
      if (data?.pages.length == 6 || data?.pages[data.pages.length - 1]?.data?.item.length == 0){
        dispatch(duToDdoBtn())
      }
      dispatch(showButton())
      dispatch(addMarkerList(data?.pages[data.pages.length - 1]?.data?.item))
    },
    onError: err => {
      console.log(err, "error on infinite queries")
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.config.params.offset == 60 || lastPage.data.item.length == 0) {
        return undefined
      }
      return (lastPage.config.params.offset + 12)
    },
    retry: false,
    staleTime: 1 * 60,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  })

  const clickMarker = (uid: number, lat: number, lng: number) => {
    dispatch(closeMarkerInfo())
    dispatch(setReviewUid(uid))
    dispatch(setCenter({lat, lng}))
  }

  const refetchMarkers = ():void => {
    markers.remove()
    dispatch(resetMarkerList())
    dispatch(closeMarkerInfo())

    markers.refetch()
    dispatch(hideButton())
    dispatch(ddoToDuBtn())
  }
  
  const addMarkers = ():void => {
    if (markers.status == "success" && markers.hasNextPage && markerInfo.markerList) {
      markers.fetchNextPage()
      dispatch(closeMarkerInfo())
      dispatch(hideButton())
    }
  }

  return (
    <>
      {markerInfo.markerList.length > 0
        ? <MarkerClusterer
          averageCenter={false}
          imageExtension={'png'}
          imagePath={'/marker.png'}
          enableRetinaIcons={true}
          styles={[{
              anchorText: [-30, 0],
              textColor: "#000",
              url: '/marker.png',
              width: 34,
              height: 42,
              textSize: 16
          }]}
          maxZoom={18}
          gridSize={20}
        >
          {(clusterer) => {
            return(
              <>
                {markerInfo.markerList.map((marker, index: number) => 
                  <Marker
                    key={index}
                    position={{ lat: marker.latitude, lng: marker.longitude }}
                    title={marker.name}
                    onClick={() => {
                      clickMarker(marker.business_shop_uid, marker.latitude, marker.longitude)
                    }}
                    onMouseOver={() => {
                      dispatch(showMarkerInfo(marker))
                    }}
                    icon={'/marker.png'}
                    clusterer={clusterer}
                  />
                )}
              </>
            )
          }}
          </MarkerClusterer>
        : null}
          
        {markerInfo.markerInfo && 
          <InfoBox
            position={new google.maps.LatLng(markerInfo.markerInfo.latitude, markerInfo.markerInfo.longitude)}
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
              <p>{markerInfo.markerInfo.name}</p>
            </div>
          </InfoBox>
        }

          {markerInfo.buttonVisibility
          ? markerInfo.buttonSelector == "ddo"
            ? <SearchBtn click={refetchMarkers} />
            : <MoreBtn click={addMarkers} />
          : null}
    </>
  )
}