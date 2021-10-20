

import { useRef } from "react";

import { logm } from "../../helpers/custom-logger";

export function DismissibleAlert() {

  const alertComponent = useRef(null);

	const handleButtonClick = (e) => {
		logm('clicking button remove alert');

		alertComponent.current.remove();
	}

  return (
    <div ref={alertComponent} className="alert mb-0 alert-warning fade show d-flex justify-content-between" role="alert">

      <div className="d-flex align-items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          className="bi bi-exclamation-triangle-fill flex-shrink-0 me-2"
          viewBox="0 0 16 16"
          role="img"
          aria-label="Warning:"
        >
          <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
        </svg>
        <div>Demo version! There are some bugs that can arise</div>
      </div>

      <input type="button" onClick={handleButtonClick} className="btn-close"></input>
    </div>
  );
}