import React from "react";
import "./Home.scss";

class HomeOverlay extends React.Component {
  render() {
    return (
      <div className="overlay">
        <div className="overlay-content container">
          <div className="row justify-content-center post-big-view">
            <div id="overlayMainElem" className="col-md-10 col-sm-8 p-3 mt-3">
              <div className="row p-2 bg-white shadow-lg p-3 mb-5 bg-body rounded">
                <div className="col p-2">
                  <div className="bd-placeholder-img card-img-top mb-2">
                    <img
                      id="overlay-post-view"
                      className="img-fluid mx-auto d-block user-img"
                      src="#"
                      alt="user post"
                    />
                  </div>

                  <div className="row justify-content-between">
                    <div className="col-2 mb-2">
                      <img
                        className="img-fluid mx-auto"
                        style={{ height: "30px" }}
                        src="https://www.pngkey.com/png/full/73-730477_first-name-profile-image-placeholder-png.png"
                        alt="user profile"
                      />
                    </div>

                    <div className="col">
                      <p className="mb-1">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae tenetur explicabo fugit
                        exercitationem voluptate? Doloribus, quae! Tempore temporibus, libero autem sit, perferendis
                        nostrum velit cum eius maiores quibusdam, at quam.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="col-md-4 d-flex flex-column justify-content-between">
                  <div className="row overflow-auto" style={{ maxHeight: "600px" }}>
                    <div className="col">
                      <div className="row m-2">
                        <div className="col-sm-auto m-2">
                          <img
                            className="img-fluid mx-auto"
                            style={{ height: "30px", width: "30px" }}
                            src="https://www.pngkey.com/png/full/73-730477_first-name-profile-image-placeholder-png.png"
                            alt="user profile"
                          />
                        </div>
                        <div className="col">
                          Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere excepturi labore quo nobis ab
                          illo corrupti. Natus assumenda quisquam asperiores laboriosam nostrum enim blanditiis, quae
                          quas odio quod quibusdam voluptates?
                        </div>
                      </div>
                      <div className="row m-2">
                        <div className="col-sm-auto m-2">
                          <img
                            className="img-fluid mx-auto"
                            style={{ height: "30px", width: "30px" }}
                            src="https://www.pngkey.com/png/full/73-730477_first-name-profile-image-placeholder-png.png"
                            alt="user profile"
                          />
                        </div>
                        <div className="col">
                          Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere excepturi labore quo nobis ab
                          illo corrupti. Natus assumenda quisquam asperiores laboriosam nostrum enim blanditiis, quae
                          quas odio quod quibusdam voluptates?
                        </div>
                      </div>
                      <div className="row m-2">
                        <div className="col-sm-auto m-2">
                          <img
                            className="img-fluid mx-auto"
                            style={{ height: "30px", width: "30px" }}
                            src="https://www.pngkey.com/png/full/73-730477_first-name-profile-image-placeholder-png.png"
                            alt="user profile"
                          />
                        </div>
                        <div className="col">
                          Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere excepturi labore quo nobis ab
                          illo corrupti. Natus assumenda quisquam asperiores laboriosam nostrum enim blanditiis, quae
                          quas odio quod quibusdam voluptates?
                        </div>
                      </div>
                      <div className="row m-2">
                        <div className="col-sm-auto m-2">
                          <img
                            className="img-fluid mx-auto"
                            style={{ height: "30px", width: "30px" }}
                            src="https://www.pngkey.com/png/full/73-730477_first-name-profile-image-placeholder-png.png"
                            alt="user profile"
                          />
                        </div>
                        <div className="col">
                          Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere excepturi labore quo nobis ab
                          illo corrupti. Natus assumenda quisquam asperiores laboriosam nostrum enim blanditiis, quae
                          quas odio quod quibusdam voluptates?
                        </div>
                      </div>
                      <div className="row m-2">
                        <div className="col-sm-auto m-2">
                          <img
                            className="img-fluid mx-auto"
                            style={{ height: "30px", width: "30px" }}
                            src="https://www.pngkey.com/png/full/73-730477_first-name-profile-image-placeholder-png.png"
                            alt="user profile"
                          />
                        </div>
                        <div className="col">
                          Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere excepturi labore quo nobis ab
                          illo corrupti. Natus assumenda quisquam asperiores laboriosam nostrum enim blanditiis, quae
                          quas odio quod quibusdam voluptates?
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row p-3">
                    <div className="col-md-10">
                      <input
                        id="comment-input-big-view"
                        type="text"
                        className="inpt-comment form-control"
                        placeholder="Add your comment"
                        aria-label="Add your comment"
                      />
                    </div>

                    <div className="col-md-2 d-flex justify-content-start">
                      <button id="post-comment-btn-big-view" className="btn btn-outline-secondary">
                        Post
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HomeOverlay;
