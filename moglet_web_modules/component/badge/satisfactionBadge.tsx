import style from "../../style/component/badge/badge.module.css"

export function Satisfaction_1() {
  return (
    <div className={[style.badgeContainer, style.satiBadgeColor1].join(' ')}>
      <p>만족해요</p>
    </div>
  )
}
export function Satisfaction_2() {
  return (
    <div className={[style.badgeContainer, style.satiBadgeColor2].join(' ')}>
      <p>보통이에요</p>
    </div>
  )
}
export function Satisfaction_3() {
  return (
    <div className={[style.badgeContainer, style.satiBadgeColor3].join(' ')}>
      <p>아쉬워요</p>
    </div>
  )
}