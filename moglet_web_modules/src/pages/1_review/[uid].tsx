import Image from "next/image"
import { apiGetReview } from '@/serverApi/1_review/api'
import { useQuery } from "react-query";
import { GetServerSideProps } from 'next';
import { Satisfaction_1, Satisfaction_2, Satisfaction_3 } from 'component/badge/satisfactionBadge';
import style from "./review.module.css"
import VideoPlayer from "component/videoPlayer";
import { RestaurantLinkBtn } from "component/button/restaurantLink";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;
  const { uid } = query;
  const ret = typeof uid === "string" ? parseInt(uid) : 11
  return {
    props: {
      uid : ret
    },
  };
};

interface Props {
  uid: number
}

export default function WebReview(props :Props) {
  const reviewObj = useQuery(['get_review'], () => apiGetReview(props.uid))
  const review = reviewObj?.data?.data?.item
  const naverLink: string={} = review?.naver_map_place_id
  ? `https://m.place.naver.com/place/${review?.naver_map_place_id}`
  : `https://m.map.naver.com/search2/search.naver?query=${review?.name}&sm=hty&style=v5#/map`
  const userProfile = `/original/${review?.profile_filename}`
  const satisfactionBadge = () => {
    switch (review?.visit_satisfaction){
      case 1: return <Satisfaction_1></Satisfaction_1>
      case 2: return <Satisfaction_2></Satisfaction_2>
      case 3: return <Satisfaction_3></Satisfaction_3>
      default : return <Satisfaction_1></Satisfaction_1>
    }
  }

  return (
    <>
      <div className='mobile-view-wrapper'>
        {satisfactionBadge()}
        <div className={style.userInfoContainer}>
          <div className={style.item}>
            <Image
              className="circleImage"
              src={userProfile}
              width={41}
              height={41}
              alt="유저 이미지"
            ></Image>
          </div>
          <div className={[style.item, style.nickname].join(" ")}>
            {review?.nickname}
          </div>
          <div className={[style.item, style.postInfo].join(" ")}>
            {review?.address_place_name}
          </div>
        </div>
        <div className={style.content}>{review?.short_content}</div>
        <div className={style.videoContainer}>
          <VideoPlayer videoUrl={review?.filename} thumbnailUrl={review?.video_thumbnail}/>
        </div>
        <RestaurantLinkBtn
          imgSrc={review?.shop_filename}
          storeName={review?.name}
          storeAddress={review?.address_place_name}
          naverLink={naverLink}
        />
      </div>
    </>
  )
}