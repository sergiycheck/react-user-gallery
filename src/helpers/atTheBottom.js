// function getRandomInt(min, max) {
//   min = Math.ceil(min);
//   max = Math.floor(max);
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// }

// import { logm } from "./custom-logger";

export const atTheBottom = () => {
  // logPositionScroll()

  const heightAndOffset = Math.ceil(window.innerHeight + window.pageYOffset);

  let bodyOffsetHeight = Math.floor(document.body.offsetHeight && document.documentElement.offsetHeight);
  if (bodyOffsetHeight === 0) {
    bodyOffsetHeight = Math.floor(document.body.offsetHeight || document.documentElement.offsetHeight);
  }

  if (heightAndOffset >= bodyOffsetHeight - 5) {
    // logm("At the bottom!");
    return true;
  }
  return false;
};

export const logPositionScroll = (_) => {
  const rect = document.documentElement.getBoundingClientRect();

  const bodyAndDocumentElementOffsetHeight = Math.floor(
    document.body.offsetHeight && document.documentElement.offsetHeight
  );
  const bodyOrDocumentElementOffsetHeight = Math.floor(
    document.body.offsetHeight || document.documentElement.offsetHeight
  );

  document.getElementById("PositionAlertMessage").innerText = `

  heightAndOffset: ${Math.ceil(window.innerHeight + window.pageYOffset)}
  bodyOffsetHeight: ${Math.floor(document.body.offsetHeight)}
  bodyAndDocumentElementOffsetHeight: ${bodyAndDocumentElementOffsetHeight}
  bodyOrDocumentElementOffsetHeight: ${bodyOrDocumentElementOffsetHeight}
  
  documentElement.clientHeight: ${document.documentElement.clientHeight}

  documentElementOffsetHeight: ${Math.floor(document.documentElement.offsetHeight)}
  rect x: ${rect.x}
  rect y: ${rect.y}
  rect height: ${rect.height}
  rect bottom: ${rect.bottom}
  rect top: ${rect.top}
  `;
};
