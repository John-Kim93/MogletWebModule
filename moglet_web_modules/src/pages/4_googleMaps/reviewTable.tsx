import style from "./googleMaps.module.css"
import { useColorMode } from "@chakra-ui/react";
import { Review as ReviewType } from "types/types";
import { useQuery } from "react-query";
import { apiGetReviewTable } from "@/serverApi/4_googleMaps/api";
import Post from '../2_community/post';

interface Props {
  close: () => void,
  reviewUid: number,
}

export default function ReviewTable({close, reviewUid} :Props) {
  const { colorMode, toggleColorMode } = useColorMode();
  if (colorMode === 'dark') {
    toggleColorMode()
  }

  const reviewTableRet: ReviewType[] = useQuery('review_table', ()=>apiGetReviewTable(reviewUid)).data?.data?.item

  return(
    <div className={style.wrapper}>
      <h2>리뷰 보기</h2>
      <hr />
      <div className={style.contentContainer}>
        <ul>
          {reviewTableRet?.map((review: ReviewType) => (
            <li key={review.uid}>
              <Post data={review} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}