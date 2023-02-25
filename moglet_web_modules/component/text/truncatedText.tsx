import style from '../../style/component/text/truncatedText.module.css'

interface props {
  text: string,
  maxLength: number
}

function TruncatedText({ text, maxLength }: props) {
  if (text?.length <= maxLength) {
    return <span>{text}</span>;
  }

  const truncatedText = text?.slice(0, maxLength) + '...';

  return <span className={style.content} title={text}>{truncatedText}</span>;
}

export default TruncatedText;