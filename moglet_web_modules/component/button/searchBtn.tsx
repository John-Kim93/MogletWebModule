import style from "./searchBtn.module.css"

interface Props {
  click: ()=>void,
}

export default function SearchBtn(props:Props) {
  return (
    <button className={style.button} onClick={props.click}>또 머글랭!</button>
  )
}