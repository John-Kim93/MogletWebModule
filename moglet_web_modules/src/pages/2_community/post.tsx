import Link from 'next/link'
import { Satisfaction_1, Satisfaction_2, Satisfaction_3 } from "component/badge/satisfactionBadge"
import { RestaurantLinkBtn } from "component/button/restaurantLink"
import VideoPlayer from "component/videoPlayer"
import TimeCalculatedText from "repositories/timeCalculatedText"
import style from "./post.module.css"
import TruncatedText from 'component/text/truncatedText'
import { Review } from "types/types"
import { LazyLoadComponent } from 'react-lazy-load-image-component'

interface Props {
  data: Review
}

export default function Post(props: Props) {
  const data = props.data
  const createdTime = TimeCalculatedText(data?.created_time)
  const videoUrl:string = data?.filename
  const thumbnailImg = `/convert/${data?.video_thumbnail}`
  const imageSrc: string = data?.shop_filename.includes("Thumbnail")
  ? `/convert/${data?.shop_filename}`
  : `/original/${data?.shop_filename}`
  const naverLink: string = data?.naver_map_place_id
  ? `https://m.place.naver.com/place/${data?.naver_map_place_id}`
  : `https://m.map.naver.com/search2/search.naver?query=${data?.name}&sm=hty&style=v5#/map`
  const userProfile = `/original/${data?.profile_filename}`
  const satisfactionBadge = () => {
    switch (data?.visit_satisfaction){
      case 1: return <Satisfaction_1></Satisfaction_1>
      case 2: return <Satisfaction_2></Satisfaction_2>
      case 3: return <Satisfaction_3></Satisfaction_3>
      default : return <Satisfaction_1></Satisfaction_1>
    }
  }

  return (
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
          {data?.nickname}
        </div>
        <div className={[style.item, style.postInfo].join(" ")}>
          {createdTime} <div className={style.pointSeperator}></div> {data?.address_place_name}
        </div>
      </div>
      <Link href={`/1_review/${data?.uid}`} className={style.item} >
        <TruncatedText text={data?.short_content} maxLength={100} />
      </Link>
      <div className={style.videoContainer}>
        <LazyLoadComponent>
          <VideoPlayer videoUrl={videoUrl} thumbnailImg={thumbnailImg} />
        </LazyLoadComponent>
      </div>
      <RestaurantLinkBtn
        imgSrc={imageSrc}
        storeName={data?.name}
        storeAddress={data?.address_place_name}
        naverLink={naverLink}
      />
    </div>
  )
}