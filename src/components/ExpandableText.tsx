import React, { useState } from 'react'

type ExpandableTextProps = {
    children: string;
    maxChars?: number;
}

const ExpandableText = ({ children, maxChars = 100 }: ExpandableTextProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  if(children.length <= maxChars) return <div>{children}</div>
  const text = children.substring(0, maxChars) + "...";
  return (<p>{text}<button onClick={() => setIsExpanded(!isExpanded)}>Read {isExpanded ? "Less" : "More"}</button></p>)
}


export default ExpandableText