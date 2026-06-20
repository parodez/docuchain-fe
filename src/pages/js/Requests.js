import React, { useState } from "react";
import "../css/Requests.css";
import useFetch from "../../useFetch";

function Requests() {
  // const requests = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  const [requests, loadingRequests, errorRequests, refetchRequests] = useFetch(
    "http://localhost:5000/api/requests/all",
  );

  const [selectedRequest, setSelectedRequest] = useState(null);

  const getStatusIcon = (status) => {
    if (status === "pending") return <PendingIcon />;
    if (status === "approved") return <ApprovedIcon />;
    if (status === "denied") return <DeniedIcon />;
    return null;
  };

  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Manila",
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });

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

        {/* <div className="requests-body">
          {errorRequests && <p>Error: {errorRequests.message}</p>}
          {loadingRequests && <p>Loading...</p>}
          {!loadingRequests &&
            requests &&
            requests.map((x) => (
              <div
                key={x._id}
                className={`request-card ${x === 1 ? "active" : ""}`}
              >
                <div className="avatar" />
                <div className="lines">
                  <p>{x.name}</p>
                  <p>{x.lrn}</p>
                  <p>{x.status}</p>
                </div>
              </div>
            ))}
        </div> */}
        <div
          className="requests-body"
          style={{
            padding: "20px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: "15px",
            maxHeight: "80vh",
            overflowY: "auto",
          }}
        >
          {errorRequests && <p>Error: {errorRequests.message}</p>}
          {loadingRequests && <p>Loading...</p>}
          {!loadingRequests &&
            requests &&
            requests.map((x, index) => (
              <div
                key={index}
                style={{
                  border: "1px solid #b8b8b870",
                  borderRadius: "5px",
                  padding: "15px",
                  position: "relative",
                  boxShadow: "0 1px 5px rgba(139, 139, 139, 0.1)",
                  background: "#fff",
                  gap: "5px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {/* Name */}
                <div style={{ fontSize: "16px", fontWeight: "bold" }}>
                  {"Name: " + x.name}
                </div>

                {/* LRN */}
                <div>
                  {/* <div style={{ fontSize: "14px", color: "#616161" }}>LRN</div> */}
                  {"LRN: " + x.lrn}
                </div>

                <div>
                  {/* {"Date: " +
                    (x.date_requested
                      ? new Intl.DateTimeFormat("en-US", {
                          timeZone: "Asia/Manila",
                          month: "2-digit",
                          day: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        }).format(new Date(x.date_requested))
                      : "—")} */}
                  {"Date: " +
                    new Date(x.date_requested).toLocaleString("en-US", {
                      month: "2-digit",
                      day: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}
                </div>

                {/* Status */}
                <div>
                  <div style={{ fontSize: "14px", color: "#616161" }}>
                    Status
                  </div>
                  {getStatusIcon(x.status.toLowerCase())}
                </div>

                {/* Details Button */}
                <button
                  onClick={() => setSelectedRequest(x)}
                  style={{
                    position: "absolute",
                    bottom: "10px",
                    right: "10px",
                    padding: "5px 10px",
                    border: "none",
                    borderRadius: "5px",
                    // backgroundColor: "#00ff22",
                    // color: "#fff",
                    cursor: "pointer",
                  }}
                >
                  Details
                </button>
              </div>
            ))}

          {/* Details Card */}
          {selectedRequest && (
            <>
              {/* Modal */}
              <div
                style={{
                  position: "fixed",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  background: "#ffffff",
                  padding: "24px",
                  borderRadius: "12px",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
                  width: "380px",
                  zIndex: 1000,
                  fontFamily: "Arial, sans-serif",
                  animation: "fadeIn 0.2s ease",
                }}
              >
                {/* Header */}
                <div style={{ marginBottom: "16px" }}>
                  <h2
                    style={{
                      margin: 0,
                      fontSize: "20px",
                      color: "#111",
                      fontWeight: "600",
                    }}
                  >
                    {selectedRequest.name}
                  </h2>
                  <p
                    style={{
                      margin: "4px 0 0",
                      fontSize: "13px",
                      color: "#777",
                    }}
                  >
                    Request Details
                  </p>
                </div>

                {/* Divider */}
                <div
                  style={{
                    height: "1px",
                    background: "#eee",
                    marginBottom: "16px",
                  }}
                />

                {/* Content */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                  }}
                >
                  {/* Status */}
                  <div>
                    <span style={{ fontSize: "12px", color: "#666" }}>
                      Status
                    </span>
                    <div style={{ marginTop: "4px" }}>
                      <StatusDropdown
                        defaultValue={selectedRequest.status}
                        reqId={selectedRequest._id}
                        refetchRequests={refetchRequests}
                      />
                    </div>
                  </div>

                  {/* Info Fields */}
                  {[
                    { label: "LRN", value: selectedRequest.lrn },
                    {
                      label: "Academic Year",
                      value: selectedRequest.academic_year,
                    },
                    { label: "Purpose", value: selectedRequest.purpose },
                    {
                      label: "Date Requested",
                      value: selectedRequest.date_requested,
                    },
                    { label: "Email", value: selectedRequest.email },
                  ].map((item, i) => (
                    <div key={i}>
                      <span style={{ fontSize: "12px", color: "#666" }}>
                        {item.label}
                      </span>
                      <div
                        style={{
                          marginTop: "2px",
                          fontSize: "14px",
                          color: "#222",
                          fontWeight: "500",
                          wordBreak: "break-word",
                        }}
                      >
                        {item.value}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div
                  style={{
                    marginTop: "20px",
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <button
                    onClick={() => setSelectedRequest(null)}
                    style={{
                      padding: "8px 14px",
                      border: "none",
                      borderRadius: "8px",
                      background: "#ef4444",
                      color: "#fff",
                      fontSize: "13px",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                    }}
                  >
                    Close
                  </button>
                </div>
              </div>

              {/* Overlay */}
              <div
                onClick={() => setSelectedRequest(null)}
                style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  background: "rgba(0,0,0,0.5)",
                  backdropFilter: "blur(2px)",
                  zIndex: 999,
                }}
              />

              {/* Animation */}
              <style>
                {`
                  @keyframes fadeIn {
                    from {
                      opacity: 0;
                      transform: translate(-50%, -60%);
                    }
                    to {
                      opacity: 1;
                      transform: translate(-50%, -50%);
                    }
                  }
                `}
              </style>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Requests;

const ApprovedIcon = () => {
  return (
    <span
      style={{
        display: "inline-block",
        padding: "2px 8px",
        fontSize: "12px",
        fontWeight: 500,
        borderRadius: "2px",
        backgroundColor: "#dcfce7", // light green
        color: "#2b9252", // dark green text
        width: "fit-content",
      }}
    >
      APPROVED
    </span>
  );
};

const DeniedIcon = () => {
  return (
    <span
      style={{
        display: "inline-block",
        padding: "2px 8px",
        fontSize: "12px",
        fontWeight: 500,
        borderRadius: "2px",
        backgroundColor: "#fee2e2", // light red
        color: "#b91c1c", // dark red text
        width: "fit-content",
      }}
    >
      DENIED
    </span>
  );
};

const PendingIcon = () => {
  return (
    <span
      style={{
        display: "inline-block",
        padding: "2px 8px",
        fontSize: "12px",
        fontWeight: 500,
        borderRadius: "2px",
        backgroundColor: "#fef9c3", // light yellow
        color: "#a16207", // dark yellow/brown text
        width: "fit-content",
      }}
    >
      PENDING
    </span>
  );
};

const StatusDropdown = ({ defaultValue, reqId, refetchRequests }) => {
  const [selected, setSelected] = useState(defaultValue || "");
  const [loading, setLoading] = useState(false);

  const options = [
    { label: "Pending", value: "Pending" },
    { label: "Approved", value: "Approved" },
    { label: "Denied", value: "Denied" },
  ];

  const token = localStorage.getItem("token");

  const handleChange = async (e) => {
    const value = e.target.value;
    setSelected(value);
    setLoading(true);

    try {
      const response = await fetch(
        `http://localhost:5000/api/requests/${reqId}/status`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: value }),
        },
      );

      if (!response.ok) {
        throw new Error("Request failed");
      }

      // optionally handle response data
      const data = await response.json();
      setLoading(false);
      alert("Success Updating Status!");
      refetchRequests();
    } catch (error) {
      setLoading(false);
      alert("Something went wrong!");
    }
  };

  return (
    <div style={{ position: "relative", width: "100%" }}>
      <select
        value={selected}
        onChange={handleChange}
        disabled={loading}
        style={{
          width: "100%",
          padding: "10px 36px 10px 12px", // space for spinner
          borderRadius: "8px",
          border: "1px solid #ccc",
          fontSize: "14px",
          appearance: "none",
          background: loading ? "#f9fafb" : "#fff",
          cursor: loading ? "not-allowed" : "pointer",
        }}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {/* Right-side element: spinner OR arrow */}
      <div
        style={{
          position: "absolute",
          right: "10px",
          top: "50%",
          transform: "translateY(-50%)",
          display: "flex",
          alignItems: "center",
          pointerEvents: "none",
        }}
      >
        {loading ? (
          <div
            style={{
              width: "14px",
              height: "14px",
              border: "2px solid #ccc",
              borderTop: "2px solid #4f46e5",
              borderRadius: "50%",
              animation: "spin 0.6s linear infinite",
            }}
          />
        ) : (
          <span style={{ fontSize: "12px", color: "#666" }}>▼</span>
        )}
      </div>

      {/* Animation */}
      <style>
        {`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};
