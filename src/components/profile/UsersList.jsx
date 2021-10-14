import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";

import {
  selectUsersIds,
  selectUsersStatus,
  selectFetchedAllUsersLength,
  changeUsersStatusToStartFetching,
  selectUserById,
  fetchUsers,
} from "./usersSlice";

import {
  useLoadingStatusToRenderLoader,
  useStatusAndArrOfIdsToFetchData,
  scrollHandlerWithCallBack,
  useLoadingStatusToAddOrRemoveScrollListeners,
} from "../loadMoreDataOnScrollLogic/loadMoreDataRenderAndHooks.js";

import { atTheBottom } from "../../helpers/atTheBottom";

import { StatusData } from "../../api/ApiRoutes";

import { showVisible } from "../../helpers/imgLazyLoading";

import { CardPlaceholder } from "../helperComponents/CardPlaceholder/CardPlaceholder.jsx";

import { Link } from "react-router-dom";

import classNames from "classnames";

import styles from "./UsersList.module.scss";

export const UsersList = (props) => {
  const dispatch = useDispatch();

  const usersIds = useSelector((state) => selectUsersIds(state));
  const usersStatus = useSelector((state) => selectUsersStatus(state));

  const allFetchedUsersLength = useSelector((state) =>
    selectFetchedAllUsersLength(state)
  );

  const increment = 10;
  const [from, setFromPaginationProp] = useState(0);
  const [to, setToPaginationProp] = useState(increment);

  const handleScroll = scrollHandlerWithCallBack(atTheBottom, () => {
    dispatch(changeUsersStatusToStartFetching({ newStatus: StatusData.idle }));
  });

  useLoadingStatusToAddOrRemoveScrollListeners({
    itemIdsArr: usersIds,
    allItemsLength: allFetchedUsersLength,
    handler: handleScroll,
  });

  useStatusAndArrOfIdsToFetchData(
    {
      itemsStatus: usersStatus,
      idsArr: usersIds,
      allItemsLength: allFetchedUsersLength,
      scrollHandler: handleScroll,
    },
    async function fetchUsersAndSetPagination() {
      await dispatch(fetchUsers({ from, to }));
      setPaginationProperties(from + increment, to + increment);
    }
  );

  const setPaginationProperties = (from, to) => {
    setFromPaginationProp(from);
    setToPaginationProp(to);
  };

  const renderedContentUsers = usersIds.map((userId) => {
    return <UserExcerpt key={userId} userId={userId}></UserExcerpt>;
  });

  const { statusPostLoadingData } =
    useLoadingStatusToRenderLoader(usersStatus);

  console.log(
    "statusUsersLoadingData",
    statusPostLoadingData,
    " usersStatus ",
    usersStatus
  );

  return (
    <div className="container">
      <div
        className={classNames("fs-4 row justify-content-center rounded")}
        style={{ minHeight: `300px` }}
      >
        {renderedContentUsers}
        {statusPostLoadingData}
      </div>
    </div>
  );
};

export const UserExcerpt = ({ userId }) => {
  const user = useSelector((state) => selectUserById(state, userId));

  useEffect(() => {
    showVisible("userExcerpts");
  }, [userId]);

  if (!user) {
    return (
      <div className="row">
        <div className="col-md-10">
          <CardPlaceholder
            showAvatarContent={true}
            showCardImage={false}
          ></CardPlaceholder>
        </div>
      </div>
    );
  }

  return (
    <div className="row my-2 border-bottom">
      <div className="col">
        <div>
          <img
            className={classNames("img-fluid mx-auto", styles.userAvatarImg)}
            src="/assets/img/img-placeholder.gif"
            data-src={user.image}
            alt="user profile"
          />
        </div>
      </div>
      <div className="col">
        <Link className={styles.userLinkStyle} to={`/profile/${user.id}`}>
          <b>
            {user.firstName} {user.lastName}
          </b>
        </Link>
      </div>
    </div>
  );
};
