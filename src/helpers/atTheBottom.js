
export const atTheBottom = () => {


  const heightAndOffset = Math.ceil(window.innerHeight + window.pageYOffset);

  const bodyOffsetHeight = Math.floor(document.body.offsetHeight);

  if (heightAndOffset >= bodyOffsetHeight - 5) {
    // console.log("At the bottom!");
    return true;
  }
  return false;
};


// const logPositionScroll = _ =>{
//   const rect = document.documentElement.getBoundingClientRect();

//   document.getElementById('PositionAlertMessage').innerText = `

//   heightAndOffset: ${Math.ceil(window.innerHeight + window.pageYOffset)}
//   bodyOffsetHeight: ${Math.floor(document.body.offsetHeight)}
  
//   documentElement.clientHeight: ${document.documentElement.clientHeight}

//   documentElementOffsetHeight: ${Math.floor(document.documentElement.offsetHeight)}
//   rect x: ${rect.x}
//   rect y: ${rect.y}
//   rect height: ${rect.height}
//   rect bottom: ${rect.bottom}
//   rect top: ${rect.top}
//   `;
// }
