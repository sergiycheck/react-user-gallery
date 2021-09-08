import cardModule from "./CardPlaceholder.module.scss";
import classNames from "classnames";


export const CardPlaceholder = () => {

  const circularClasses = classNames(
    cardModule["load-wrapper"],
    cardModule["circular"]
  );

  return (
    <section className="col-sm-8 d-flex justify-content-center">
      <div className={cardModule["cards-container"]}>
        <div className={cardModule["card"]}>
          <div className={cardModule["card-image"]}>
            <div className={cardModule["load-wrapper"]}>
              <div className={cardModule["activity"]}></div>
            </div>
          </div>

          <div className={cardModule["card-content"]}>
            <div className={cardModule["card-avatar"]}>
              <div className={circularClasses}>
                <div className={cardModule["activity"]}></div>
              </div>
            </div>

            <div className={cardModule["card-avatar-text"]}>
              <div className={cardModule["load-wrapper"]}>
                <div className={cardModule["activity"]}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
