import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
// import useFetch from "../../useFetch";
import { getUserFromToken, getUserRole } from "../../auth";
import api from "../../api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Calendar,
  ChevronDown,
  CreditCard,
  FileText,
  GraduationCap,
  Hash,
  MessageSquare,
  User,
} from "lucide-react";

function RequestorDashboard() {
  // const token = localStorage.getItem("token");
  const navigate = useNavigate();

  // const role = getUserRole();
  const user = getUserFromToken();

  if (!user || !["Requestor"].includes(user.role)) {
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
              {user.email ? <strong>{user.email}</strong> : "Loading..."}
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
        <Requests />
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

// const Requests = () => {
//   const {
//     data: requests,
//     isLoading,
//     error,
//   } = useQuery({
//     queryKey: ["requests"],
//     queryFn: async () => {
//       const res = await api.get("/api/requests");
//       return res.data;
//     },
//   });

//   return (
//     <>
//       {requests?.map((request) => (
//         <RequestCard request={request} />
//       ))}
//     </>
//   );
// };

export default RequestorDashboard;

function Requests() {
  const [selectedRequest, setSelectedRequest] = useState(null);

  const {
    data: requests,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["requests"],
    queryFn: async () => {
      const res = await api.get("/api/requests");
      return res.data;
    },
  });

  return (
    <div>
      {/* Toolbar */}
      {/* <div className="mb-6 flex flex-wrap gap-3">
        <select className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm shadow-sm">
          <option value="">Sort By</option>
          <option value="new">Newest</option>
          <option value="old">Oldest</option>
        </select>

        <input
          type="text"
          placeholder="Search requests..."
          className="flex-1 min-w-[250px] rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm shadow-sm"
        />
      </div> */}

      {/* States */}
      {error && (
        <div className="rounded-lg bg-red-100 p-4 text-red-700">
          {error.message}
        </div>
      )}

      {isLoading && (
        <div className="text-center text-slate-500">Loading requests...</div>
      )}

      {/* Cards */}
      <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
        {requests?.map((request) => (
          <div
            key={request.id}
            className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
          >
            {/* Header */}
            <div className="mb-4 flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-slate-800">
                  {request.name}
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  LRN: {request.lrn}
                </p>
              </div>

              <StatusBadge status={request.status} />
            </div>

            {/* Date */}
            <div className="mb-5">
              <p className="text-xs uppercase tracking-wide text-slate-400">
                Date Requested
              </p>

              <p className="mt-1 text-sm font-medium text-slate-700">
                {new Date(request.date_requested).toLocaleDateString()}
              </p>
            </div>

            {/* Button */}
            <button
              onClick={() => setSelectedRequest(request)}
              className="w-full rounded-xl bg-[#2b9252] px-4 py-3 font-medium text-white transition hover:bg-[#247b45]"
            >
              View Details
            </button>
          </div>
        ))}
      </div>

      {/* Drawer */}
      {selectedRequest && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            onClick={() => setSelectedRequest(null)}
          />

          {/* Drawer */}
          <div className="fixed right-0 top-0 z-50 flex h-screen w-full max-w-md flex-col bg-white shadow-2xl">
            {/* Header */}
            <div className="bg-[#2b9252] p-6 text-white">
              <h2 className="text-2xl font-bold">{selectedRequest.name}</h2>

              <p className="mt-1 text-sm text-white/80">Request Details</p>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-5">
                <div>
                  <label className="text-xs uppercase tracking-wide text-slate-400">
                    Status
                  </label>

                  <div className="mt-2">
                    {/* <StatusDropdown
                      value={selectedRequest.status}
                      reqId={selectedRequest.id}
                    /> */}
                    <StatusBadge status={selectedRequest.status} />
                  </div>
                </div>

                <InfoField label="LRN" value={selectedRequest.lrn} />

                <InfoField
                  label="Academic Year"
                  value={selectedRequest.academic_year}
                />

                <InfoField label="Purpose" value={selectedRequest.purpose} />

                <InfoField
                  label="Date Requested"
                  value={new Date(
                    selectedRequest.date_requested,
                  ).toLocaleString()}
                />

                <InfoField
                  label="Email"
                  value={selectedRequest.email || "N/A"}
                />

                <InfoField
                  label="Comments"
                  value={selectedRequest.comments || "No comments"}
                />
              </div>
            </div>

            {/* Footer */}
            <div className="border-t p-4">
              <button
                onClick={() => setSelectedRequest(null)}
                className="w-full rounded-xl bg-[#2b9252] px-4 py-3 font-medium text-white transition hover:bg-[#247b45]"
              >
                Close
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function InfoRow({ icon, label, value, full }) {
  return (
    <div className={full ? "md:col-span-2" : ""}>
      <div className="mb-1 flex items-center gap-2 text-sm font-medium text-gray-500">
        {icon}
        {label}
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-3 text-gray-800 shadow-sm">
        {value}
      </div>
    </div>
  );
}

function InfoField({ label, value }) {
  return (
    <div className="border-b border-slate-100 pb-4">
      <p className="text-xs uppercase tracking-wide text-slate-400">{label}</p>

      <p className="mt-1 break-words font-medium text-slate-800">{value}</p>
    </div>
  );
}

function StatusBadge({ status }) {
  const normalized = status?.toLowerCase();

  const styles = {
    approved: "bg-green-100 text-green-700 border border-green-200",
    denied: "bg-red-100 text-red-700 border border-red-200",
    pending: "bg-yellow-100 text-yellow-700 border border-yellow-200",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${
        styles[normalized] || "bg-slate-100 text-slate-700"
      }`}
    >
      {status?.toUpperCase()}
    </span>
  );
}
function StatusDropdown({ value, reqId }) {
  const [selected, setSelected] = useState(value);
  const queryClient = useQueryClient();

  const updateRequestStatus = useMutation({
    mutationFn: async (status) => {
      const res = await api.patch(`/api/requests/${reqId}/status`, { status });

      return res.data;
    },
    onSuccess: (_, newValue) => {
      queryClient.invalidateQueries({
        queryKey: ["requests"],
      });

      setSelected(newValue);
    },
  });

  const optionClassName = "bg-white text-black";

  return (
    <div className="relative w-full">
      <select
        value={selected}
        onChange={(e) => {
          updateRequestStatus.mutate(e.target.value);
        }}
        disabled={updateRequestStatus.isPending}
        // className="w-full appearance-none rounded-lg border border-slate-300 bg-white px-4 py-3 pr-10 text-sm focus:border-[#2b9252] focus:outline-none disabled:opacity-50"
        className={`rounded-full border px-3 py-1 text-xs font-semibold outline-none transition cursor-pointer appearance-none pr-10 ${
          statusStyles[selected]
        }`}
      >
        <option value="Pending" className={optionClassName}>
          Pending
        </option>
        <option value="Approved" className={optionClassName}>
          Approved
        </option>
        <option value="Denied" className={optionClassName}>
          Denied
        </option>
      </select>

      <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
        {updateRequestStatus.isPending ? (
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-slate-300 border-t-slate-600" />
        ) : (
          <svg
            className="h-4 w-4 text-slate-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.94a.75.75 0 111.08 1.04l-4.24 4.5a.75.75 0 01-1.08 0l-4.24-4.5a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </div>
    </div>
  );
}

const statusStyles = {
  Approved: "bg-green-100 text-green-700 border-green-200",
  Pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
  Denied: "bg-red-100 text-red-700 border-red-200",
};
