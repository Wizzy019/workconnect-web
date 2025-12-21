

function Card({title, label, text, box, action, className = "" }) {
  return (
    <div className={`p-2 shadow-xl rounded bg-white ${className}`}>
        {title && title}
        {label && label}
        {text && text} 
        {box && box}
        {action && action}
    </div>
  );
}

export default Card