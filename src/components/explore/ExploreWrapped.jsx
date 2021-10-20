
import { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

import { StatusData } from "../../api/ApiRoutes";

import "./Explore.scss";

import { atTheBottom } from "../../helpers/atTheBottom";

import {
  useLoadingStatusToRenderLoader,
  useStatusAndArrOfIdsToFetchData,
  scrollHandlerWithCallBack,
  useLoadingStatusToAddOrRemoveScrollListeners,
} from "../loadMoreDataOnScrollLogic/loadMoreDataRenderAndHooks.js";

import { ExplorePostExcerpt } from "./ExplorePostExcerpt.jsx";

export const ExploreWrapped = ({ explorePageDataMethods }) => {
  
  const {
    selectItemsIds,

    selectItemById,

    selectItemsStatus,

    selectFetchedAllItemsLength,

    changeItemsStatusToStartFetching,
    fetchItems,

  } = explorePageDataMethods;

  const dispatch = useDispatch();

  const orderedExplorePostIds = useSelector(selectItemsIds);

  const explorePostsStatus = useSelector(selectItemsStatus);
  const allFetcheExploredPostsLength = useSelector(selectFetchedAllItemsLength);

  const increment = 5;
  const [from, setFromPaginationProp] = useState(0);
  const [to, setToPaginationProp] = useState(increment);


  const handleScroll = scrollHandlerWithCallBack(atTheBottom, () => {
    dispatch(
      changeItemsStatusToStartFetching({ newStatus: StatusData.idle })
    );
  });


  useLoadingStatusToAddOrRemoveScrollListeners({
    itemIdsArr: orderedExplorePostIds,
    allItemsLength: allFetcheExploredPostsLength,
    handler: handleScroll,
  });

  useStatusAndArrOfIdsToFetchData(
    {
      itemsStatus: explorePostsStatus,
      idsArr: orderedExplorePostIds,
      allItemsLength: allFetcheExploredPostsLength,
      scrollHandler: handleScroll,
    },

    async function fetchPostAndSetPagination() {
      
      //debugger //here if from ===5
      if(Object.keys(explorePageDataMethods).includes('postId')){

        const {postId} = explorePageDataMethods;
        await dispatch(fetchItems({ from, to, postId }));
      
      }else if(Object.keys(explorePageDataMethods).includes('userId')){
        
        const {userId} = explorePageDataMethods;
        await dispatch(fetchItems({ from, to, userId }));
      }else{

        await dispatch(fetchItems({ from, to }));
      }

      // debugger;
      setPaginationProperties(from + increment, to + increment);
    }
  );

  const setPaginationProperties = (from, to) => {
    setFromPaginationProp(from);
    setToPaginationProp(to);
  };

  const { statusPostLoadingData } =
    useLoadingStatusToRenderLoader(explorePostsStatus);

  const explorePostsContent = orderedExplorePostIds.map((postId, index) => {
    return (
      <ExplorePostExcerpt
        key={postId}
        postId={postId}
        selectDataById={selectItemById}
      ></ExplorePostExcerpt>
    );
  });

  return (
    <div className="container-fluid photos">
      <div className="row align-items-stretch my-4 p-2">
        {explorePostsContent}

        {statusPostLoadingData}
      </div>
    </div>
  );
};
