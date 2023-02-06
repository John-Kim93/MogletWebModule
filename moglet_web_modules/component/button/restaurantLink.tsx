import style from "../../style/component/button/button.module.css"
import Image from "next/image"
import { useEffect, useState } from "react";

interface Props {
  imgSrc: string,
  storeName: string,
  storeAddress: string,
}

export function RestaurantLinkBtn(props:Props) {
  const storeImg = `/original/${props?.imgSrc}`
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const handleResize = () => {
      const parentDiv = document.getElementById('parentDiv');
      console.log(parentDiv)
      if (parentDiv) {
        setWidth(parentDiv.offsetWidth);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    console.log(width)
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div
      className={style.container}
    >
      <div
        id="parentDiv"
        className={style.item}
        style={{ borderRadius: '8px', overflow: 'hidden' }}
      >
        <Image
          src={storeImg}
          alt="가게이미지"
          width={width}
          height={width}
        />
      </div>
      <div className={style.item}>
        {props?.storeName}
      </div>
      <div className={style.item}>
        {props?.storeAddress}
      </div>
      <div className={style.item}>
        {'>'}
      </div>
      
    </div>
  )
}