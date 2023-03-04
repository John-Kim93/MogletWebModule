import { apiGetCommunity } from "@/serverApi/2_community/api";
import { useColorMode } from "@chakra-ui/react";
import InfiniteScroll from 'react-infinite-scroll-component';
import { useInfiniteQuery } from 'react-query';
import { Review } from "types/types";
import Post from "./post";


export default function WebCommunity() {
  const { colorMode, toggleColorMode } = useColorMode();
  if (colorMode === 'dark') {
    toggleColorMode()
  }
  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery(
    'posts',
    ({ pageParam = 0 }) => apiGetCommunity(pageParam),
    {
      getNextPageParam: (lastPage) => {
        const nextPage = lastPage?.data.item[11].uid
        return nextPage
      }
    }
  )
  const posts = data?.pages.flatMap((page) => page.data.item) ?? [];
  
  return (
    <InfiniteScroll
      dataLength={posts.length}
      next={fetchNextPage}
      hasMore={hasNextPage ? hasNextPage : false}
      loader={<div>빨리 보여주세요.. 배고파서 현기증 나니까요..</div>}>
      <ul>
        {posts.map((post: Review) => (
          <li key={post.uid}>
            <Post data={post} />
          </li>
        ))}
      </ul>
    </InfiniteScroll>
  )
}