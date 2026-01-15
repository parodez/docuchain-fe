import React from "react";
import Header from "../../Header";
import "./Requests.css";

function Requests() {
  const requests = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  return (
    <div className="requests">
      <Header />
      <div className="requests-container">
        <div className="requests-main">
          <h1>Requests</h1>
          <div className="requests-content">
            <div className="requests-search-container">
              <div className="sort-button">
                <p>Sort By</p>
                <p>^</p>
              </div>
              <div className="requests-search-div">
                <input
                  type="text"
                  className="requests-search"
                  placeholder="File name"
                />
                <div className="search-button">Q</div>
              </div>
            </div>
            <div className="requests-body">
              {requests.map((x) => {
                return (
                  <div key={x} className="request">
                    <div />
                    <div>
                      <div />
                      <div />
                      <div />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Requests;
