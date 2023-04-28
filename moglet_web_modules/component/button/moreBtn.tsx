import style from "./moreBtn.module.css"

interface Props {
  click: ()=>void,
}

export default function MoreBtn(props:Props) {
  return (
    <button className={style.button} onClick={props.click}>더 머글랭!</button>
  )
}