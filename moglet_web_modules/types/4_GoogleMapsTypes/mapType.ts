export interface GMap {
  km: number,
  center: {
    lat: number,
    lng: number
  }
}

export interface GMapState {
  mapSlice: GMap
}