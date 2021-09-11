
import { useSelector } from "react-redux";
import { selectVideoById } from "./videosSlice";


export const VideoComponent = (props) => {
  const { videoId } = props;
  const video = useSelector((state) => selectVideoById(state, videoId));

  return (
    <div className="carousel-item">
      <div className="d-flex justify-content-center">
        <div className="video-container">
          <video className="carousel-video-element rounded" muted controls preload="none">
            <source
              data-testid="video-source-element"
              src={video.link}
              type="video/mp4"
            />
            Your browser does not support HTML5 video.
          </video>
        </div>
      </div>
    </div>
  );
};