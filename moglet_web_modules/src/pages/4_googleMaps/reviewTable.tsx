import style from "./googleMaps.module.css"
import { useColorMode } from "@chakra-ui/react";
import { Review as ReviewType } from "types/types";
import { useQuery } from "react-query";
import { apiGetReviewTable } from "@/serverApi/4_googleMaps/api";
import Post from '../2_community/post';

interface Props {
  reviewUid: number
}

export default function ReviewTable({reviewUid}: Props) {
  // dark mode
  const { colorMode, toggleColorMode } = useColorMode();
  if (colorMode === 'dark') {
    toggleColorMode()
  }

  const reviewTableRet = useQuery(['review_table', reviewUid], ()=>apiGetReviewTable(reviewUid))?.data?.data?.item

  return(
    <div className={style.wrapper}>
      <h2>리뷰 보기</h2>
      <hr />
      <div className={style.contentContainer}>
        {reviewTableRet && reviewTableRet.length ? 
          <ul>
            {reviewTableRet?.map((review: ReviewType) => (
              <li key={review.uid}>
                <Post data={review} />
              </li>
            ))}
          </ul>
        : <p>리뷰 업슴 ㅠㅠ</p>
        }
      </div>
    </div>
  )
}