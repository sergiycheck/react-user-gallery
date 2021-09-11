
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import { useDispatch } from "react-redux";
import { addLikeToPost } from "./postSlice";
import classNames from "classnames";


export const PostReactions = ({ postId, likeCount, isLiked }) =>{
  const dispatch = useDispatch();

  const addLikeToPostHandler = (e) => {
    dispatch(addLikeToPost({ postId }));
  };

  return (
    <div className="col-sm-2">
      <div className="d-flex justify-content-start align-items-center">
        <div className="d-flex justify-content-end ">
          <FavoriteBorderIcon
            className={classNames("heart", { heartFilled: isLiked })}
            onClick={addLikeToPostHandler}
          ></FavoriteBorderIcon>

          <span className="mx-2">{likeCount}</span>
        </div>
      </div>
    </div>
  );
}