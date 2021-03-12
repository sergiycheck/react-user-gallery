
function AddListenerForSearchInput(){

  document.addEventListener("DOMContentLoaded",()=>{

    const searchInput = document.getElementById("search");
    const searchCol = document.querySelector(".seach-col");

    const seachColClassAdd = function addClasses(){
      searchCol.classList.toggle("col-md-auto");
      searchCol.classList.add("col-md-4");
    }

    const seachColClassRemove = function removeClasses(){
      searchCol.classList.toggle("col-md-auto");
      searchCol.classList.remove("col-md-4");
    }

    searchInput.addEventListener('focus',()=>{
      seachColClassAdd();
    },false);

    searchInput.addEventListener('blur',()=>{
      seachColClassRemove();
    },false);

  });
}

//https://www.w3schools.com/tags/ref_av_dom.asp

function skipVideoOnEnd(){
  console.log('user-script skipVideoOnEnd');

  //setTimeout(()=>{

    const carouselInner = document.querySelector(".carousel-inner");
    if(carouselInner){
      carouselInner.querySelector(".carousel-item").classList.add("active");
    }

    AddClickListenerForCarouselNextBtn();

    let loadVideosTimerId = setTimeout(()=>{

      const videos = document.querySelectorAll(".carousel-video-element");
      videos.forEach(vid=>{
        vid.pause();
        vid.muted = true;
        let targetElement = vid.parentNode;
        do{
          if(targetElement.classList &&
              targetElement.classList.contains("active")){
            vid.play();
            videoEndedHandler(vid);
            return;
          }
          targetElement = targetElement.parentNode;
        }while(targetElement)
        clearTimeout(loadVideosTimerId);
      });

    },100);//animation time?


  //},10);



}

function videoEndedHandler(vid){
	if(vid){
		vid.onended = function(){
			document.querySelector(".carsl-control-next").click();
		};
	}

}



function AddClickListenerForCarouselNextBtn(){
  btnClasses = [".carsl-control-next",".carsl-control-prev"];

  setListenersForNextPrevButtons(btnClasses);

  function setListenersForNextPrevButtons(buttonClasses){
    Array.from(buttonClasses).forEach(btnClass=>{
      const btnNexVideo = document.querySelector(btnClass);

      btnNexVideo.addEventListener('click',()=>{
        findVideoAndPauseOrPlay(pauseActiveVideo);
        setTimeout(()=>{
          findVideoAndPauseOrPlay(playNextVideo,videoEndedHandler);
        },650);
      });
    });

  }

  function findVideoAndPauseOrPlay(pauseOrPlayVideo,videoHandler){
    let items = document.querySelectorAll(".carousel-item");
    items.forEach(item=>{
      if(item && item.classList.contains("active")){
        let vid = item.querySelector(".carousel-video-element");

        if(typeof pauseOrPlayVideo == 'function')
          pauseOrPlayVideo(vid);
        if(typeof videoHandler == 'function')
          videoHandler(vid);
        return;
      }
    });
  }

}
function pauseActiveVideo(vid){
  if (vid && !vid.paused){
    vid.pause();
		vid.currentTime = 0;
  }
}

function playNextVideo(vid){
	if (vid && vid.paused) {
		vid.play();
	}
}


function showBigPostWithClassName(){
  console.log('user-script showBigPostWithClassName');

  //setTimeout(()=>{

    let posts = document.querySelectorAll(".click-big-post");
    posts.forEach(p=>{
      p.addEventListener('click',(event)=>{
        showBigPostViewFromClass(event.target);
      })
    });

  //},10);


}

function showBigPostViewFromClass(postSourceElement){
	let postSourceUrl = Object.values(postSourceElement.attributes).find(a=>a.name=="src").value;
	document.querySelector(".overlay").style.height = "100%";
	setTimeout(()=>{
		closeBigPostView();
		setPostSource(postSourceUrl);
	},10)

}

//https://www.blustemy.io/detecting-a-click-outside-an-element-in-javascript/
function closeBigPostView(){
	let overlayElem = document.querySelector(".overlay");

	overlayElem.addEventListener("click", (evt) => {
    const overlayMainElem = document.getElementById("overlayMainElem");
    let targetElement = evt.target; // clicked element

    do {
        if (targetElement == overlayMainElem) {
            // This is a click inside. Do nothing, just return.
            return;
        }
        // Go up the DOM
        targetElement = targetElement.parentNode;//detecting parent nodes
    } while (targetElement);

    // This is a click outside.
    document.querySelector(".overlay").style.height = "0%";

		//document.querySelector(".overlay").style.display = "none";
});
}

function setPostSource(sourceName){
	document.getElementById("overlay-post-view").setAttribute("src",sourceName);
}

function commentReadMoreWithClassName(){
  console.log('user-script commentReadMoreWithClassName');
  //todo: uncomment
  //setTimeout(()=>{

    let posts = document.querySelectorAll(".readmore");
    posts.forEach(p=>{
      p.addEventListener('click',(event)=>{
        commentReadMoreWithClass(event.target.parentElement);
      })
    });

  //},10)


}

//todo: add animation to comment read more
function commentReadMoreWithClass(commentContent){
	const readMoreSpanPromise =  new Promise((resolve,reject)=>{
		resolve(commentContent.querySelector(".readmore"));
	});
	readMoreSpanPromise.then((readMoreSpan)=>{
		let dots = commentContent.querySelector(".dots");
		let moreText = commentContent.querySelector(".more");
		if(dots.style.display=="none"){
			dots.style.display = "inline";
			moreText.style.display = "none";
			readMoreSpan.innerText = "read more"
		}else{
			dots.style.display = "none";
			moreText.style.display = "inline";
			readMoreSpan.innerText = "read less"
		}
	});
};


function clickSideBarToggler(){
	const sidebar = document.querySelector(".sidebar");
	document.getElementById("sidebarCollapse").addEventListener('click',()=>{
		sidebar.classList.toggle("active")
	});
}


function addMessage(){
	const sendMsgBtn = document.getElementById("send-message-btn");

	sendMsgBtn.addEventListener('click',()=>{
		const mS = ['Jan', 'Feb', 'Mar', 'Apr', 'May',
	 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

		const messageContainer = document.querySelector(".chat-message-container");
		const msgDataMessage = document.getElementById("message-data");
		const inputMessage = msgDataMessage.innerText;
		msgDataMessage.innerText ="";

		let messageWrapper = createElement({tagName:"div",className:"my-2 me-3 align-self-end"});
		let messageRound = createElement({tagName:"div",className:"rounded d-flex mb-1"});
		let bglight = createElement({tagName:"div",className:"bg-light"});
		let msgControls = createElement({tagName:"div",className:"d-flex justify-content-end"});
		let edit = createElement({tagName:"small",className:"text-muted me-2 edit-msg"});
		edit.innerText = "Edit"
		let deleteBtn = createElement({
			tagName:"button",
			className:"btn-close",
			attributes:{
				"data-bs-dismiss":"toast",
				"aria-label":"Close"
			}
		});
		let pdiv = createElement({tagName:"div",className:"p-2"});
		let txtData = createElement({
			tagName:"p",
			className:"text-small mb-0 text-white bg-primary p-2 rounded"});
		txtData.innerText = inputMessage;

		let pDate = createElement({tagName:"p",className:"small text-muted"});
		let time = new Date();
		let hoursAndMinutes = time.toLocaleString('en-US', {
			hour: 'numeric', minute: 'numeric', hour12: true });
		let monthNum = time.getMonth();
		pDate.innerText = `${hoursAndMinutes} | ${mS[monthNum-1]}. ${monthNum}`;

		pdiv.appendChild(txtData);
		msgControls.appendChild(edit);
		msgControls.appendChild(deleteBtn);

		bglight.appendChild(msgControls);
		bglight.appendChild(pdiv);



		messageRound.appendChild(bglight);
		messageWrapper.appendChild(messageRound);
		messageWrapper.appendChild(pDate);
		//messageContainer.insertBefore(messageWrapper,messageContainer.lastChild);
		messageContainer.appendChild(messageWrapper);


	},false)

}

function createElement({ tagName, className, attributes = {} }) {
	const element = document.createElement(tagName);

	if (className) {
			const classNames = className.split(' ').filter(Boolean);
			element.classList.add(...classNames);
	}

	Object.keys(attributes).forEach((key) =>
			element.setAttribute(key, attributes[key]));

	return element;
}

