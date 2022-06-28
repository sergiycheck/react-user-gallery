export default function activateHomeHandlers() {
  skipVideoOnEnd();
}

function skipVideoOnEnd() {
  const carouselInner = document.querySelector(".carousel-inner");
  if (carouselInner) {
    carouselInner.querySelector(".carousel-item").classList.add("active");
  }

  AddClickListenerForCarouselNextBtn();

  let loadVideosTimerId = setTimeout(() => {
    const videos = document.querySelectorAll(".carousel-video-element");
    videos.forEach((vid) => {
      if (vid instanceof HTMLMediaElement) {
        HTMLMediaElement.prototype.pause.call(vid);
      }

      vid.muted = true;
      let targetElement = vid.parentNode;
      do {
        if (targetElement.classList && targetElement.classList.contains("active")) {
          //vid.play();
          videoEndedHandler(vid);
          return;
        }
        targetElement = targetElement.parentNode;
      } while (targetElement);

      clearTimeout(loadVideosTimerId);
    });
  }, 100); //animation time?
}

function videoEndedHandler(vid) {
  if (vid) {
    vid.onended = function () {
      document.querySelector(".carsl-control-next").click();
    };
  }
}

function AddClickListenerForCarouselNextBtn() {
  let btnClasses = [".carsl-control-next", ".carsl-control-prev"];

  setListenersForNextPrevButtons(btnClasses);

  function setListenersForNextPrevButtons(buttonClasses) {
    Array.from(buttonClasses).forEach((btnClass) => {
      const btnNexVideo = document.querySelector(btnClass);

      if (btnNexVideo) {
        btnNexVideo.addEventListener("click", () => {
          findVideoAndPauseOrPlay(pauseActiveVideo);
          setTimeout(() => {
            findVideoAndPauseOrPlay(playNextVideo, videoEndedHandler);
          }, 650);
        });
      }
    });
  }

  function findVideoAndPauseOrPlay(pauseOrPlayVideo, videoHandler) {
    let items = document.querySelectorAll(".carousel-item");
    items.forEach((item) => {
      if (item && item.classList.contains("active")) {
        let vid = item.querySelector(".carousel-video-element");

        if (typeof pauseOrPlayVideo === "function") pauseOrPlayVideo(vid);
        if (typeof videoHandler === "function") videoHandler(vid);
        return;
      }
    });
  }
}
function pauseActiveVideo(vid) {
  if (vid && !vid.paused) {
    vid.pause();
    vid.currentTime = 0;
  }
}

function playNextVideo(vid) {
  if (vid && vid.paused) {
    if (vid instanceof HTMLMediaElement) {
      vid.play();
    }
  }
}
