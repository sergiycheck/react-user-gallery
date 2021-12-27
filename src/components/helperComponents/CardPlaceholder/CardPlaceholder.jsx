import cardModule from "./CardPlaceholder.module.scss";
import classNames from "classnames";

export const CardPlaceholder = ({ showAvatarContent, showCardImage = true }) => {
  const circularClasses = classNames(cardModule["load-wrapper"], cardModule["circular"]);

  return (
    <div className={cardModule["cards-container"]}>
      <div data-testid="post-card-placeholder" className={cardModule["card"]}>
        {showCardImage && (
          <div className={cardModule["card-image"]}>
            <div className={cardModule["load-wrapper"]}>
              <div className={cardModule["activity"]}></div>
            </div>
          </div>
        )}

        {showAvatarContent && (
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
        )}
      </div>
    </div>
  );
};
