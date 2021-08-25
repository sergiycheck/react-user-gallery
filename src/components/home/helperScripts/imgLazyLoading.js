function isVisible(elem) {
  const imgRect = elem.getBoundingClientRect();
  // console.log(`imgRect `, imgRect);

  const documentElementRect = document.documentElement.getBoundingClientRect();
  // console.log(`documentElementRect `, documentElementRect);

  // document.querySelector('#PositionAlertMessage').innerHTML = `
  // 	imgRect.top  ${imgRect.top} <br\>
  // 	imgRect.bottom ${imgRect.bottom} <br\>
  // 	documentElementRect.top ${documentElementRect.top} <br\>
  // 	documentElementRect.bottom ${documentElementRect.bottom} <br\>
  // 	document.documentElement.clientHeight ${document.documentElement.clientHeight} <br\>
  // 	document.documentElement.scrollHeight ${document.documentElement.scrollHeight} <br\>
  // 	document.body.scrollTop ${document.body.scrollTop} <br\>
  // `;

  const isTopVisible =
    imgRect.top > 0 && imgRect.top <= 2 * document.documentElement.clientHeight;

  const isBottomVisible =
    imgRect.bottom >= -1 * document.documentElement.clientHeight &&
    imgRect.bottom < document.documentElement.clientHeight;
	
	// console.clear();
	// console.log('img ', elem);
  // console.log("isTopVisible ", isTopVisible);
  // console.log("isBottomVisible ", isBottomVisible);

  return isTopVisible || isBottomVisible;
}

export function showVisible() {
  for (let img of document.querySelectorAll("img")) {
    let realSrc = img.dataset.src;
    if (!realSrc) continue;

    if (isVisible(img)) {
      // console.log(`img is visible `, img);

      img.src = realSrc;

      img.dataset.src = "";
    }

  }
}
