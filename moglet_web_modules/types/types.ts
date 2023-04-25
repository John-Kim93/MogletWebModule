export interface Review {
  uid: number,
  visit_satisfaction: number,
  profile_filename: string,
  nickname: string,
  created_time: string,
  address_place_name: string,
  short_content: string,
  filename: string,
  video_thumbnail: string,
  shop_filename: string,
  name: string,
  naver_map_place_id: string,
}


export interface Marker {
  latitude: number,
  longitude: number,
  name: string,
  business_shop_uid: number
}
