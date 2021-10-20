import {logm} from './custom-logger';

function isVisible(elem) {

  const imgRect = elem.getBoundingClientRect();
  // logm(`imgRect `, imgRect);

  // const documentElementRect = document.documentElement.getBoundingClientRect();
  // logm(`documentElementRect `, documentElementRect);

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
	
	
	// logm('img ', elem);
  // logm("isTopVisible ", isTopVisible);
  // logm("isBottomVisible ", isBottomVisible);

  return isTopVisible || isBottomVisible;
}

export function showVisible() {
  
  // console.clear();
  // logm('showVisible', Array.from(arguments).length? Array.from(arguments)[0]: 'empty');

  for (let img of document.querySelectorAll("img")) {
    let realSrc = img.dataset.src;
    if (!realSrc) continue;

    if (isVisible(img)) {

      img.src = realSrc;

      img.dataset.src = "";
    }

  }
}
