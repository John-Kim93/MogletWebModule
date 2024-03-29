// import Image from "next/image"
import { apiGetReview } from '@/serverApi/1_review/api'
import { useQuery } from "react-query";
import { GetServerSideProps } from 'next';
import { Satisfaction_1, Satisfaction_2, Satisfaction_3 } from 'component/badge/satisfactionBadge';
import style from "./review.module.css"
import VideoPlayer from "component/videoPlayer";
import { RestaurantLinkBtn } from "component/button/restaurantLink";
import { useColorMode } from "@chakra-ui/react";
import TimeCalculatedText from 'repositories/timeCalculatedText';
import { Review } from 'types/types';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;
  const { uid } = query;
  const ret = typeof uid === "string" ? parseInt(uid) : 100
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
  const { colorMode, toggleColorMode } = useColorMode();
  if (colorMode === 'dark') {
    toggleColorMode()
  }
  const reviewObj = useQuery('get_review', () => apiGetReview(props.uid))
  const review: Review = reviewObj?.data?.data?.item
  const createdTime = TimeCalculatedText(review?.created_time)
  const videoUrl:string = review?.filename
  const thumbnailImg: string = review?.video_thumbnail.includes("Thumbnail")
  ? `/convert/${review?.video_thumbnail}`
  : `/original/${review?.video_thumbnail}`
  const imageSrc: string = review?.shop_filename.includes("Thumbnail")
  ? `/convert/${review?.shop_filename}`
  : `/original/${review?.shop_filename}`
  const naverLink: string = review?.naver_map_place_id
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
            <img
              src={userProfile}
              alt="유저 이미지"
            ></img>
          </div>
          <div className={[style.item, style.nickname].join(" ")}>
            {review?.nickname}
          </div>
          <div className={[style.item, style.postInfo].join(" ")}>
            {createdTime} <div className={style.pointSeperator}></div> {review?.address_place_name}
          </div>
        </div>
        <div className={style.content}>{review?.short_content}</div>
        <div className={style.videoContainer}>
          <VideoPlayer videoUrl={videoUrl} thumbnailImg={thumbnailImg} />
        </div>
        <RestaurantLinkBtn
          imgSrc={imageSrc}
          storeName={review?.name}
          storeAddress={review?.address_place_name}
          naverLink={naverLink}
        />
      </div>
    </>
  )
}