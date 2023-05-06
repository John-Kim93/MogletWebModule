export interface Marker {
  latitude: number,
  longitude: number,
  name: string,
  business_shop_uid: number
}

export interface MarkerState {
  markerSlice: {
    markerList: Marker[],
    markerInfo: Marker | null,
    buttonSelector: string,
    buttonVisibility: boolean,
  }
}