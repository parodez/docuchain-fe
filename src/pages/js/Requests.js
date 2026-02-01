import React from "react";
import "../css/Requests.css";

function Requests() {
  const requests = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  return (
    <div className="requests">
      <div className="requests-content">
        <div className="requests-toolbar">
          <select className="sort-select" defaultValue="">
            <option value="" disabled>
              Sort By
            </option>
            <option value="new">Newest</option>
            <option value="old">Oldest</option>
          </select>

          <div className="requests-searchwrap">
            <input type="text" placeholder="Search" />
          </div>

          <button className="requests-searchbtn" type="button">
            Q
          </button>
        </div>

        <div className="requests-body">
          {requests.map((x) => (
            <div key={x} className={`request-card ${x === 1 ? "active" : ""}`}>
              <div className="avatar" />
              <div className="lines">
                <div />
                <div />
                <div />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Requests;
