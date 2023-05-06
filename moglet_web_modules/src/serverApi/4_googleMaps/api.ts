import axios from 'axios';

export const apiGetReviewTable = (reviewUid :number) => axios({
		method: 'get',
		url: '/api/public/home/review/list',
    params: {
			business_shop_uid : reviewUid,
			video_type: 0,
			second_type: 0,
			is_filter: 0,
			offset: 0
		}
	})

interface MarkerReq {
	lat: number,
	lng: number,
	km: number,
	offset: number
}

export const apiGetMarkers = (req: MarkerReq) => axios({
		method: 'get',
		url: '/api/public/home/shop/list',
		params: {
			latitude: req.lat,
			longitude: req.lng,
			km: req.km,
			sort_type: 1,
			is_open: 0,
			is_park: 0,
			random_seed: "133q1234",
			offset: req.offset,
		}
	})
