import style from "../../style/component/button/button.module.css"
import Image from "next/image"
import Link from "next/link";

interface Props {
  imgSrc: string,
  storeName: string,
  storeAddress: string,
  naverLink: string,
}

export function RestaurantLinkBtn(props:Props) {

  return (
    <div className={style.wrapper}>
      <Link
        href={props?.naverLink}
        className={style.container}
      >
        <div
          className={style.item}
          style={{ borderRadius: '8px', overflow: 'hidden' }}
        >
          <img
            src={props?.imgSrc}
            alt="가게이미지"
          />
        </div>
        <div className={style.item}>
          {props?.storeName}
        </div>
        <div className={style.item}>
          {props?.storeAddress}
        </div>
        <div className={style.item}>
          <Image src="/ArrowForLink.png" alt="arrow" width={5} height={10} />
        </div>
      </Link>
    </div>
  )
}