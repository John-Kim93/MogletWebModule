import axios from 'axios'

export const apiGetCommunity = (lastUid: number) =>
  axios({
    method: 'get',
    url: '/api/public/community/list',
    params: {last_uid : lastUid}
  })