import Head from 'next/head'
import { apiGetReview } from '@/serverApi/1_review/api'
import { useQuery } from "react-query";
import { GetServerSideProps } from 'next';

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
  console.log(reviewObj)

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0"/>
      </Head>
      teasdsaassssssssssssssssssssssssssssssssssssssssssssssssssssssteteasdsaasssssssssssssssssssssssssssssssssssssssssssssssssssssste
      teasdsaasssssssssssssssssssssssssssssssssssssssssssssssssssssste
      teasdsaasssssssssssssssssssssssssssssssssssssssssssssssssssssste
      teasdsaasssssssssssssssssssssssssssssssssssssssssssssssssssssste
      teasdsaasssssssssssssssssssssssssssssssssssssssssssssssssssssste
      teasdsaasssssssssssssssssssssssssssssssssssssssssssssssssssssste
      teasdsaasssssssssssssssssssssssssssssssssssssssssssssssssssssste
      teasdsaasssssssssssssssssssssssssssssssssssssssssssssssssssssste
      v
      teasdsaasssssssssssssssssssssssssssssssssssssssssssssssssssssste
      v
      teasdsaasssssssssssssssssssssssssssssssssssssssssssssssssssssste
      teasdsaasssssssssssssssssssssssssssssssssssssssssssssssssssssste
      teasdsaasssssssssssssssssssssssssssssssssssssssssssssssssssssste
      
    </>
  )
}