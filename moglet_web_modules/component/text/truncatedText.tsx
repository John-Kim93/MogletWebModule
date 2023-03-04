interface props {
  text: string,
  maxLength: number
  class: string
}

function TruncatedText({ text, maxLength, class: className }: props) {
  if (text?.length <= maxLength) {
    return <span>{text}</span>;
  }

  const truncatedText = text?.slice(0, maxLength) + '...';

  return <span className={className} title={text}>{truncatedText}</span>;
}

export default TruncatedText;