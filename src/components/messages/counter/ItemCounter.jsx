import { useSelector } from "react-redux";

import { selectItemCount } from "./itemCounterSlice";

export default function ItemCounter(props) {
  const itemCounter = useSelector(selectItemCount);

  return (
    <div className="d-flex">
      <div>
        <span className="fs-2">{itemCounter}</span>
      </div>
    </div>
  );
}
