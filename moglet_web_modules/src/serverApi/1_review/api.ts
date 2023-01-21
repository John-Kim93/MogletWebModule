import axios from 'axios';

export const apiGetReview = (reviewUid :number) =>
	axios({
		method: 'get',
		url: '/api/public/business/shop/video/info',
    params: {business_shop_video_uid : reviewUid}
	})