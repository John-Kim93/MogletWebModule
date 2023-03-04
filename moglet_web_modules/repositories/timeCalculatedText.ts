import moment from 'moment';

export default function TimeCalculatedText(dateTimeString:string) {
  const dateTime = moment(dateTimeString);
  const now = moment();
  const diffInSeconds = now.diff(dateTime, 'seconds');

  if (diffInSeconds < 60) {
    return '방금 전';
  } else if (diffInSeconds < 60 * 60) {
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    return `${diffInMinutes}분 전`;
  } else if (diffInSeconds < 60 * 60 * 24) {
    const diffInHours = Math.floor(diffInSeconds / (60 * 60));
    return `${diffInHours}시간 전`;
  } else if (diffInSeconds < 60 * 60 * 24 * 30) {
    const diffInDays = Math.floor(diffInSeconds / (60 * 60 * 24));
    return `${diffInDays}일 전`;
  } else if (diffInSeconds < 60 * 60 * 24 * 365) {
    const diffInMonths = Math.floor(diffInSeconds / (60 * 60 * 24 * 30));
    return `${diffInMonths}개월 전`;
  } else {
    const diffInYears = Math.floor(diffInSeconds / (60 * 60 * 24 * 365));
    return `${diffInYears}년 전`;
  }
}