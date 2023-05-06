export interface Marker {
  latitude: number,
  longitude: number,
  name: string,
  business_shop_uid: number
}

export interface MarkerState {
  markerSlice: {
    markerList: Marker[],
    selectedMarker: Marker | null,
  }
}