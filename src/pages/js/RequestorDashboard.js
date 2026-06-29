import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
// import useFetch from "../../useFetch";
import { getUserRole } from "../../auth";

function RequestorDashboard() {
  // const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const role = getUserRole();

  if (!["Requestor"].includes(role)) {
    return <Navigate to="/requestor/" replace />;
  }

  // const [email, loadingEmail, errorEmail, refetchEmail] = useFetch(
  //   "http://localhost:5000/get-email",
  // );

  // const [requests, loadingRequests, errorRequests, refetchRequests] = useFetch(
  //   "http://localhost:5000/api/requests",
  // );

  // const [selected, setSelected] = useState(null);
  // const [showForm, setShowForm] = useState(false);

  // const [form, setForm] = useState({
  //   name: "",
  //   lrn: "",
  //   academic_year: "",
  //   grade: "",
  //   purpose: "",
  // });

  const handleSubmit = async () => {
    // try {
    //   const res = await fetch("http://localhost:5000/api/requests", {
    //     method: "POST",
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ ...form }),
    //   });
    //   const data = await res.json();
    //   if (!res.ok) {
    //     throw new Error(data.msg || "Failed to verify OTP");
    //   } else {
    //     alert("Request submitted successfully!");
    //     refetchRequests();
    //     setShowForm(false);
    //     setForm({
    //       name: "",
    //       lrn: "",
    //       academic_year: "",
    //       grade: "",
    //       purpose: "",
    //     });
    //   }
    // } catch (error) {
    //   alert("Error submitting request: " + error.message);
    // }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/requestor");
  };

  // if (!token) {
  //   return <Navigate to="/requestor" replace />;
  // }

  return (
    <div>
      {/* TOPBAR */}
      <header className="topbar">
        <div className="topbar-left">
          <img src="/gulodLogo.png" alt="Logo" className="logo" />
          <span className="school-name">Gulod National Highschool</span>
        </div>
      </header>

      <div style={{ fontFamily: "Arial", padding: "20px" }}>
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: "20px",
          }}
        >
          {/* Left side */}
          <div>
            {/* Logged-in email */}
            <p style={{ margin: 0, fontSize: "13px", color: "#555" }}>
              Logged in as:{" "}
              {/* <strong>{!email && loadingEmail ? "Loading..." : email}</strong> */}
            </p>

            <h2 style={{ margin: "5px 0 0 0" }}>Requests</h2>

            <p style={{ margin: 0, fontSize: "14px", color: "gray" }}>
              Lists of requests
            </p>
          </div>

          {/* Right side buttons */}
          <div style={{ display: "flex", gap: "10px", alignSelf: "end" }}>
            <button
              // onClick={() => setShowForm(true)}
              style={{
                padding: "8px 16px",
                backgroundColor: "#52c41a",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              New Request
            </button>

            <button
              style={{
                padding: "8px 16px",
                backgroundColor: "#ff4d4f",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "15px",
          }}
        >
          {/* {!loadingRequests &&
            requests &&
            requests.map((req) => (
              <div
                key={req._id}
                onClick={() => setSelected(req)}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  padding: "15px",
                  cursor: "pointer",
                  backgroundColor: "#fafafa",
                }}
              >
                <h4 style={{ margin: "0 0 5px 0" }}>{req.name}</h4>
                <p style={{ margin: 0, fontSize: "13px", color: "gray" }}>
                  LRN: {req.lrn}
                </p>
              </div>
            ))} */}
        </div>

        {/* Details Modal */}
        {/* {selected && (
          <div
            onClick={() => setSelected(null)}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0,0,0,0.4)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                backgroundColor: "#fff",
                padding: "20px",
                borderRadius: "10px",
                width: "300px",
              }}
            >
              <h3>{selected.name}</h3>
              <p>
                <strong>LRN:</strong> {selected.lrn}
              </p>
              <p>
                <strong>Academic Year:</strong> {selected.academic_year}
              </p>
              <p>
                <strong>Grade Level:</strong> {selected.grade}
              </p>
              <p>
                <strong>Purpose:</strong> {selected.purpose}
              </p>
              <p>
                <strong>Date Requested:</strong> {selected.date_requested}
              </p>

              <button
                onClick={() => setSelected(null)}
                style={{
                  marginTop: "10px",
                  padding: "6px 12px",
                  border: "none",
                  backgroundColor: "#1890ff",
                  color: "#fff",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Close
              </button>
            </div>
          </div>
        )} */}

        {/* Form Modal */}
        {/* {showForm && (
          <div
            onClick={() => setShowForm(false)}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0,0,0,0.4)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                backgroundColor: "#fff",
                padding: "20px",
                borderRadius: "10px",
                width: "300px",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <h3>New Request</h3>

              {["name", "lrn", "academic_year", "grade", "purpose"].map(
                (field) => (
                  <input
                    key={field}
                    placeholder={field.toUpperCase()}
                    value={form[field]}
                    onChange={(e) =>
                      setForm({ ...form, [field]: e.target.value })
                    }
                    style={{
                      padding: "8px",
                      borderRadius: "5px",
                      border: "1px solid #ccc",
                    }}
                  />
                ),
              )}

              <button
                onClick={handleSubmit}
                style={{
                  padding: "8px",
                  backgroundColor: "#52c41a",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Submit
              </button>
            </div>
          </div>
        )} */}
      </div>

      {/* BOTTOMBAR */}
      {/* <footer className="bottombar">
        © 2025 DocuChain | All Rights Reserved
      </footer> */}
    </div>
  );
  // return (
  //   <div>
  //     {/* TOPBAR */}
  //     <header className="topbar">
  //       <div className="topbar-left">
  //         <img src="/gulodLogo.png" alt="Logo" className="logo" />
  //         <span className="school-name">Gulod National Highschool</span>
  //       </div>
  //     </header>

  //     <div style={{ fontFamily: "Arial", padding: "20px" }}>
  //       {/* Header */}
  //       <div
  //         style={{
  //           display: "flex",
  //           justifyContent: "space-between",
  //           alignItems: "flex-start",
  //           marginBottom: "20px",
  //         }}
  //       >
  //         {/* Left side */}
  //         <div>
  //           {/* Logged-in email */}
  //           <p style={{ margin: 0, fontSize: "13px", color: "#555" }}>
  //             Logged in as:{" "}
  //             <strong>{!email && loadingEmail ? "Loading..." : email}</strong>
  //           </p>

  //           <h2 style={{ margin: "5px 0 0 0" }}>Requests</h2>

  //           <p style={{ margin: 0, fontSize: "14px", color: "gray" }}>
  //             Lists of requests
  //           </p>
  //         </div>

  //         {/* Right side buttons */}
  //         <div style={{ display: "flex", gap: "10px", alignSelf: "end" }}>
  //           <button
  //             onClick={() => setShowForm(true)}
  //             style={{
  //               padding: "8px 16px",
  //               backgroundColor: "#52c41a",
  //               color: "#fff",
  //               border: "none",
  //               borderRadius: "5px",
  //               cursor: "pointer",
  //             }}
  //           >
  //             New Request
  //           </button>

  //           <button
  //             style={{
  //               padding: "8px 16px",
  //               backgroundColor: "#ff4d4f",
  //               color: "#fff",
  //               border: "none",
  //               borderRadius: "5px",
  //               cursor: "pointer",
  //             }}
  //             onClick={handleLogout}
  //           >
  //             Logout
  //           </button>
  //         </div>
  //       </div>

  //       {/* Grid */}
  //       <div
  //         style={{
  //           display: "grid",
  //           gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
  //           gap: "15px",
  //         }}
  //       >
  //         {!loadingRequests &&
  //           requests &&
  //           requests.map((req) => (
  //             <div
  //               key={req._id}
  //               onClick={() => setSelected(req)}
  //               style={{
  //                 border: "1px solid #ddd",
  //                 borderRadius: "8px",
  //                 padding: "15px",
  //                 cursor: "pointer",
  //                 backgroundColor: "#fafafa",
  //               }}
  //             >
  //               <h4 style={{ margin: "0 0 5px 0" }}>{req.name}</h4>
  //               <p style={{ margin: 0, fontSize: "13px", color: "gray" }}>
  //                 LRN: {req.lrn}
  //               </p>
  //             </div>
  //           ))}
  //       </div>

  //       {/* Details Modal */}
  //       {selected && (
  //         <div
  //           onClick={() => setSelected(null)}
  //           style={{
  //             position: "fixed",
  //             top: 0,
  //             left: 0,
  //             width: "100%",
  //             height: "100%",
  //             backgroundColor: "rgba(0,0,0,0.4)",
  //             display: "flex",
  //             justifyContent: "center",
  //             alignItems: "center",
  //           }}
  //         >
  //           <div
  //             onClick={(e) => e.stopPropagation()}
  //             style={{
  //               backgroundColor: "#fff",
  //               padding: "20px",
  //               borderRadius: "10px",
  //               width: "300px",
  //             }}
  //           >
  //             <h3>{selected.name}</h3>
  //             <p>
  //               <strong>LRN:</strong> {selected.lrn}
  //             </p>
  //             <p>
  //               <strong>Academic Year:</strong> {selected.academic_year}
  //             </p>
  //             <p>
  //               <strong>Grade Level:</strong> {selected.grade}
  //             </p>
  //             <p>
  //               <strong>Purpose:</strong> {selected.purpose}
  //             </p>
  //             <p>
  //               <strong>Date Requested:</strong> {selected.date_requested}
  //             </p>

  //             <button
  //               onClick={() => setSelected(null)}
  //               style={{
  //                 marginTop: "10px",
  //                 padding: "6px 12px",
  //                 border: "none",
  //                 backgroundColor: "#1890ff",
  //                 color: "#fff",
  //                 borderRadius: "5px",
  //                 cursor: "pointer",
  //               }}
  //             >
  //               Close
  //             </button>
  //           </div>
  //         </div>
  //       )}

  //       {/* Form Modal */}
  //       {showForm && (
  //         <div
  //           onClick={() => setShowForm(false)}
  //           style={{
  //             position: "fixed",
  //             top: 0,
  //             left: 0,
  //             width: "100%",
  //             height: "100%",
  //             backgroundColor: "rgba(0,0,0,0.4)",
  //             display: "flex",
  //             justifyContent: "center",
  //             alignItems: "center",
  //           }}
  //         >
  //           <div
  //             onClick={(e) => e.stopPropagation()}
  //             style={{
  //               backgroundColor: "#fff",
  //               padding: "20px",
  //               borderRadius: "10px",
  //               width: "300px",
  //               display: "flex",
  //               flexDirection: "column",
  //               gap: "10px",
  //             }}
  //           >
  //             <h3>New Request</h3>

  //             {["name", "lrn", "academic_year", "grade", "purpose"].map(
  //               (field) => (
  //                 <input
  //                   key={field}
  //                   placeholder={field.toUpperCase()}
  //                   value={form[field]}
  //                   onChange={(e) =>
  //                     setForm({ ...form, [field]: e.target.value })
  //                   }
  //                   style={{
  //                     padding: "8px",
  //                     borderRadius: "5px",
  //                     border: "1px solid #ccc",
  //                   }}
  //                 />
  //               ),
  //             )}

  //             <button
  //               onClick={handleSubmit}
  //               style={{
  //                 padding: "8px",
  //                 backgroundColor: "#52c41a",
  //                 color: "#fff",
  //                 border: "none",
  //                 borderRadius: "5px",
  //                 cursor: "pointer",
  //               }}
  //             >
  //               Submit
  //             </button>
  //           </div>
  //         </div>
  //       )}
  //     </div>

  //     {/* BOTTOMBAR */}
  //     {/* <footer className="bottombar">
  //       © 2025 DocuChain | All Rights Reserved
  //     </footer> */}
  //   </div>
  // );
}

// const requestsData = [
//   {
//     id: 1,
//     name: "Juan Dela Cruz",
//     lrn: "123456789012",
//     year: "2024-2025",
//     grade: "Grade 10",
//     purpose: "Employment",
//   },
//   {
//     id: 2,
//     name: "Maria Santos",
//     lrn: "987654321098",
//     year: "2023-2024",
//     grade: "Grade 12",
//     purpose: "Scholarship",
//   },
//   {
//     id: 3,
//     name: "Pedro Reyes",
//     lrn: "456789123456",
//     year: "2022-2023",
//     grade: "Grade 11",
//     purpose: "Transfer",
//   },
// ];

export default RequestorDashboard;
