
import { StatusData } from "../../api/ApiRoutes";
import { Loader } from "../helperComponents/Loader";
import { useEffect } from "react";


export const useLoadingStatusToRenderLoader = (trackingStatus) => {
	
  let statusPostLoadingData = "";
  if (trackingStatus === StatusData.loading) {
    statusPostLoadingData = <Loader></Loader>;
  } else if (trackingStatus === StatusData.succeeded) {
    statusPostLoadingData = "";
  }

  return { statusPostLoadingData };
};


export const useStatusAndArrOfIdsToFetchData = (
  { itemsStatus, idsArr, allItemsLength, scrollHandler },
  fetchCallBack
) => {
  useEffect(() => {
    const requestProcessing = itemsStatus === StatusData.loading;
    if (requestProcessing) {
      console.log("requestProcessing");
      return;
    }

    const allPostsFetched = idsArr.length >= allItemsLength;
    const somePostsFetched = idsArr.length > 0;

    if (allPostsFetched && somePostsFetched) {
      console.log("allPostsFetched && somePostsFetched");

      window.removeEventListener("scroll", scrollHandler);
      return;
    }

    const statusChangedToFetchMorePosts = itemsStatus === StatusData.idle;
    if (statusChangedToFetchMorePosts) {
      console.log("statusChangedToFetchMorePosts");

      fetchCallBack();
    }

    return ()=>{
      console.log('reset callback');
    }
  }, [
    itemsStatus,
    idsArr.length,
    allItemsLength,
    scrollHandler,
    fetchCallBack,
  ]);
};

export const scrollHandlerWithCallBack = (checkIfAtTheBottom, callback) => {
  return function scrollHandler() {
    if (checkIfAtTheBottom()) {
      callback();
    }
  };
};


export const useLoadingStatusToAddOrRemoveScrollListeners = ({itemIdsArr, allItemsLength, handler}) =>{

  useEffect(() => {
    const allSearchedPostsNotFetched =
    itemIdsArr.length !== allItemsLength;
    const fetchedSomeSearchPosts = itemIdsArr.length > 0;

    if (allSearchedPostsNotFetched && fetchedSomeSearchPosts) {
      console.log(
        "allSearchedPostsNotFetched && fetchedSomeSearchPosts setting handleScroll"
      );

      window.addEventListener("scroll", handler);
    }

    return function removeScrollListener() {
      console.log("removeScrollListener");

      window.removeEventListener("scroll", handler);
    };
  });
}