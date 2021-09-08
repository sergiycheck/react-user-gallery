import React from 'react';
import { useState } from "react";

export const ReadMoreText = ({ content }) => {
  const textShortPart = content.substring(0, 120);
  const textRemainingPart = content.substring(120, content.length);

  const [readMoreSpan, setReadMoreState] = useState(false);
  const [readMoreText, setReadMoreText] = useState("read more");
  const setReadMoreParams = () => {
    setReadMoreState(!readMoreSpan);
    if (readMoreSpan) {
      setReadMoreText(" read more");
    } else {
      setReadMoreText(" read less");
    }
  };

  return (
    <React.Fragment>
      {textShortPart}

      {!readMoreSpan && <span className="dots">...</span>}

      {readMoreSpan && <span className="more">{textRemainingPart}</span>}

      <span onClick={setReadMoreParams} className="readmore">
        {readMoreText}
      </span>
    </React.Fragment>
  );
};