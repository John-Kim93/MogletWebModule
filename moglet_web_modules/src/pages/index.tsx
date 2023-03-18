import Link from 'next/link'
import style from './Home.module.css'

export default function Home() {
  return (
    <div 
      className={style.mobileViewWrapper}
    >
      <h3 style={{textAlign: 'center'}}>** Welcome to Moglet Web Module **</h3>
      <br />
      <h2>
        <Link href={`/1_review/100`}>1. 단일 Review 보러가기</Link>
      </h2>
      <h2>
        <Link href={`/2_community`}>2. 커뮤니티 Post 보러가기</Link>
      </h2>
      <h2>
        <Link href={`/4_googleMaps`}>4. 지도 서비스 보러가기</Link>
      </h2>
    </div>
  )
}