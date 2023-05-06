import { InfoBox, Marker, MarkerClusterer } from '@react-google-maps/api';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SearchBtn from 'component/button/searchBtn';
import MoreBtn from 'component/button/moreBtn';
import { useInfiniteQuery } from 'react-query';
import { apiGetMarkers } from '@/serverApi/4_googleMaps/api';
import { MarkerState } from '../../../types/4_GoogleMapsTypes/markerType';


export default function Markers() {
  const markerInfo = useSelector((state: MarkerState) => state.markerSlice);
  console.log(markerInfo)

  const [BtnVisible, setBtnVisible] = useState(false)
  const [searchBtnVisible, setSearchBtnVisible] = useState(false)
  // const [markerPopup, setMarkerPopup] = useState<MarkerInfo | null>(null);
  return(<>mmm</>)
  // const markers = useInfiniteQuery(['markers'], ({ pageParam = 0 }) => apiGetMarkers({
  //   lat: center.lat,
  //   lng: center.lng,
  //   km: km,
  //   offset: pageParam
  // }), {
  //   onSuccess: data => {
  //     setBtnVisible(true)
  //     if (data.pages.length == 1) {
  //       setMarkerList(data?.pages[0].data.item)
  //     } else {
  //       setMarkerList(markerList.concat(data.pages[data.pages.length - 1].data.item))
  //     }
  //   },
  //   onError: err => {
  //     console.log(err, "error on infinite queries")
  //   },
  //   getNextPageParam: (lastPage, allPages) => {
  //     if (lastPage.config.params.offset == 60 || lastPage.data.item.length == 0) {
  //       if (!searchBtnVisible) {
  //         setSearchBtnVisible(true)
  //       }
  //       return undefined
  //     }
  //     return (lastPage.config.params.offset + 12)
  //   },
  //   retry: false,
  //   staleTime: 1 * 60,
  //   refetchOnWindowFocus: false,
  //   refetchOnReconnect: false,
  // })

  // const clickMarker = (uid: number, lat: number, lng: number) => {
  //   setMarkerPopup(null)
  //   setPopup(true)
  //   setReviewUid(uid)
  //   setCenter({lat, lng})
  // }
  
  // const refetchMarkers = ():void => {
  //   markers.remove()
  //   markers.refetch()
  //   setMarkerList([])
  //   setMarkerPopup(null)
  //   setBtnVisible(false)
  //   setSearchBtnVisible(false)
  // }
  
  // const addMarkers = ():void => {
  //   if (markers.status == "success" && markers.hasNextPage && markerList) {
  //     markers.fetchNextPage()
  //     setMarkerPopup(null)
  //     setBtnVisible(false)
  //   }
  // }

  // return (
  //   <>
  //     {markerList.length > 0
  //         ? <MarkerClusterer
  //             averageCenter={false}
  //             imageExtension={'png'}
  //             imagePath={'/marker.png'}
  //             enableRetinaIcons={true}
  //             styles={[
  //               {
  //                 anchorText: [-30, 0],
  //                 textColor: "#000",
  //                 url: '/marker.png',
  //                 width: 34,
  //                 height: 42,
  //                 textSize: 16
  //               }
  //             ]}
  //             maxZoom={16}
  //             gridSize={20}
  //           >
  //             {(clusterer) => {
  //               return(
  //                 <>
  //                   {markerList.map((marker: MarkerInfo, index: number) => 
  //                     <Marker
  //                       key={index}
  //                       position={{ lat: marker.latitude, lng: marker.longitude }}
  //                       title={marker.name}
  //                       onClick={() => {
  //                         clickMarker(marker.business_shop_uid, marker.latitude, marker.longitude)
  //                       }}
  //                       onMouseOver={() => {
  //                         setMarkerPopup(marker)
  //                       }}
  //                       icon={'/marker.png'}
  //                       clusterer={clusterer}
  //                     />
  //                   )}
  //                 </>
  //               )
  //             }}
  //           </MarkerClusterer>
  //         : null}
          
  //         {markerPopup && 
  //           <InfoBox
  //             position={new google.maps.LatLng(markerPopup.latitude, markerPopup.longitude)}
  //             options={{
  //               alignBottom: true,
  //               pixelOffset: new google.maps.Size(-80, -44),
  //               closeBoxURL: ``,
  //               isHidden: false,
  //               maxWidth: 3000,
  //               disableAutoPan: true,
  //               enableEventPropagation:true,
  //               infoBoxClearance: new google.maps.Size(1, 1),
  //             }}

  //           >
  //             <div className={style.shopNameContainer}>
  //               <p>{markerPopup.name}</p>
  //             </div>
  //           </InfoBox>
  //         }
  //         {BtnVisible
  //         ? searchBtnVisible
  //           ? <SearchBtn click={refetchMarkers} />
  //           : <MoreBtn click={addMarkers} />
  //         : null}
          
  //   </>
  // )
}