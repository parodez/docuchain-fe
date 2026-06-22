// import React, { useState } from "react";
// import "../css/Requests.css";
// import useFetch from "../../useFetch";
// import api from "../../api";
// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// const fetchRequests = async () => (await api.get("/api/requests")).data;

// function Requests() {
//   const {
//     data: requests,
//     isLoading: loadingRequests,
//     error: errorRequests,
//   } = useQuery({
//     queryKey: ["requests"],
//     queryFn: fetchRequests,
//   });

//   const [selectedRequest, setSelectedRequest] = useState(null);

//   const getStatusIcon = (status) => {
//     if (status === "pending") return <PendingIcon />;
//     if (status === "approved") return <ApprovedIcon />;
//     if (status === "denied") return <DeniedIcon />;
//     return null;
//   };

//   const formatter = new Intl.DateTimeFormat("en-US", {
//     timeZone: "Asia/Manila",
//     month: "2-digit",
//     day: "2-digit",
//     year: "numeric",
//   });

//   return (
//     <div className="requests">
//       <div className="requests-content">
//         <div className="requests-toolbar">
//           <select className="sort-select" defaultValue="">
//             <option value="" disabled>
//               Sort By
//             </option>
//             <option value="new">Newest</option>
//             <option value="old">Oldest</option>
//           </select>

//           <div className="requests-searchwrap">
//             <input type="text" placeholder="Search" />
//           </div>

//           <button className="requests-searchbtn" type="button">
//             Q
//           </button>
//         </div>

//         <div
//           className="requests-body"
//           style={{
//             padding: "20px",
//             display: "grid",
//             gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
//             gap: "15px",
//             maxHeight: "80vh",
//             overflowY: "auto",
//           }}
//         >
//           {errorRequests && <p>Error: {errorRequests.message}</p>}
//           {loadingRequests && <p>Loading...</p>}
//           {!loadingRequests &&
//             requests &&
//             requests.map((x, index) => (
//               <div
//                 key={x.id}
//                 style={{
//                   border: "1px solid #b8b8b870",
//                   borderRadius: "5px",
//                   padding: "15px",
//                   position: "relative",
//                   boxShadow: "0 1px 5px rgba(139, 139, 139, 0.1)",
//                   background: "#fff",
//                   gap: "5px",
//                   display: "flex",
//                   flexDirection: "column",
//                 }}
//               >
//                 {/* Name */}
//                 <div style={{ fontSize: "16px", fontWeight: "bold" }}>
//                   {"Name: " + x.name}
//                 </div>

//                 {/* LRN */}
//                 <div>
//                   {/* <div style={{ fontSize: "14px", color: "#616161" }}>LRN</div> */}
//                   {"LRN: " + x.lrn}
//                 </div>

//                 <div>
//                   {/* {"Date: " +
//                     (x.date_requested
//                       ? new Intl.DateTimeFormat("en-US", {
//                           timeZone: "Asia/Manila",
//                           month: "2-digit",
//                           day: "2-digit",
//                           year: "numeric",
//                           hour: "2-digit",
//                           minute: "2-digit",
//                           hour12: true,
//                         }).format(new Date(x.date_requested))
//                       : "—")} */}
//                   {"Date: " +
//                     new Date(x.date_requested).toLocaleString("en-US", {
//                       month: "2-digit",
//                       day: "2-digit",
//                       year: "numeric",
//                       hour: "2-digit",
//                       minute: "2-digit",
//                       hour12: true,
//                     })}
//                 </div>

//                 {/* Status */}
//                 <div>
//                   <div style={{ fontSize: "14px", color: "#616161" }}>
//                     Status
//                   </div>
//                   {getStatusIcon(x.status.toLowerCase())}
//                 </div>

//                 {/* Details Button */}
//                 <button
//                   onClick={() => setSelectedRequest(x)}
//                   style={{
//                     position: "absolute",
//                     bottom: "10px",
//                     right: "10px",
//                     padding: "5px 10px",
//                     border: "none",
//                     borderRadius: "5px",
//                     // backgroundColor: "#00ff22",
//                     // color: "#fff",
//                     cursor: "pointer",
//                   }}
//                 >
//                   Details
//                 </button>
//               </div>
//             ))}

//           {/* Details Card */}
//           {selectedRequest && (
//             <>
//               {/* Modal */}
//               <div
//                 style={{
//                   position: "fixed",
//                   top: "50%",
//                   left: "50%",
//                   transform: "translate(-50%, -50%)",
//                   background: "#ffffff",
//                   padding: "24px",
//                   borderRadius: "12px",
//                   boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
//                   width: "380px",
//                   zIndex: 1000,
//                   fontFamily: "Arial, sans-serif",
//                   animation: "fadeIn 0.2s ease",
//                 }}
//               >
//                 {/* Header */}
//                 <div style={{ marginBottom: "16px" }}>
//                   <h2
//                     style={{
//                       margin: 0,
//                       fontSize: "20px",
//                       color: "#111",
//                       fontWeight: "600",
//                     }}
//                   >
//                     {selectedRequest.name}
//                   </h2>
//                   <p
//                     style={{
//                       margin: "4px 0 0",
//                       fontSize: "13px",
//                       color: "#777",
//                     }}
//                   >
//                     Request Details
//                   </p>
//                 </div>

//                 {/* Divider */}
//                 <div
//                   style={{
//                     height: "1px",
//                     background: "#eee",
//                     marginBottom: "16px",
//                   }}
//                 />

//                 {/* Content */}
//                 <div
//                   style={{
//                     display: "flex",
//                     flexDirection: "column",
//                     gap: "12px",
//                   }}
//                 >
//                   {/* Status */}
//                   <div>
//                     <span style={{ fontSize: "12px", color: "#666" }}>
//                       Status
//                     </span>
//                     <div style={{ marginTop: "4px" }}>
//                       <StatusDropdown
//                         value={selectedRequest.status}
//                         reqId={selectedRequest.id}
//                         // refetchRequests={refetchRequests}
//                       />
//                     </div>
//                   </div>

//                   {/* Info Fields */}
//                   {[
//                     { label: "LRN", value: selectedRequest.lrn },
//                     {
//                       label: "Academic Year",
//                       value: selectedRequest.academic_year,
//                     },
//                     { label: "Purpose", value: selectedRequest.purpose },
//                     {
//                       label: "Date Requested",
//                       value: selectedRequest.date_requested,
//                     },
//                     { label: "Email", value: selectedRequest.email },
//                   ].map((item, i) => (
//                     <div key={i}>
//                       <span style={{ fontSize: "12px", color: "#666" }}>
//                         {item.label}
//                       </span>
//                       <div
//                         style={{
//                           marginTop: "2px",
//                           fontSize: "14px",
//                           color: "#222",
//                           fontWeight: "500",
//                           wordBreak: "break-word",
//                         }}
//                       >
//                         {item.value}
//                       </div>
//                     </div>
//                   ))}
//                 </div>

//                 {/* Footer */}
//                 <div
//                   style={{
//                     marginTop: "20px",
//                     display: "flex",
//                     justifyContent: "flex-end",
//                   }}
//                 >
//                   <button
//                     onClick={() => setSelectedRequest(null)}
//                     style={{
//                       padding: "8px 14px",
//                       border: "none",
//                       borderRadius: "8px",
//                       background: "#ef4444",
//                       color: "#fff",
//                       fontSize: "13px",
//                       cursor: "pointer",
//                       transition: "all 0.2s ease",
//                     }}
//                   >
//                     Close
//                   </button>
//                 </div>
//               </div>

//               {/* Overlay */}
//               <div
//                 onClick={() => setSelectedRequest(null)}
//                 style={{
//                   position: "fixed",
//                   top: 0,
//                   left: 0,
//                   width: "100%",
//                   height: "100%",
//                   background: "rgba(0,0,0,0.5)",
//                   backdropFilter: "blur(2px)",
//                   zIndex: 999,
//                 }}
//               />

//               {/* Animation */}
//               <style>
//                 {`
//                   @keyframes fadeIn {
//                     from {
//                       opacity: 0;
//                       transform: translate(-50%, -60%);
//                     }
//                     to {
//                       opacity: 1;
//                       transform: translate(-50%, -50%);
//                     }
//                   }
//                 `}
//               </style>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Requests;

// const ApprovedIcon = () => {
//   return (
//     <span
//       style={{
//         display: "inline-block",
//         padding: "2px 8px",
//         fontSize: "12px",
//         fontWeight: 500,
//         borderRadius: "2px",
//         backgroundColor: "#dcfce7", // light green
//         color: "#2b9252", // dark green text
//         width: "fit-content",
//       }}
//     >
//       APPROVED
//     </span>
//   );
// };

// const DeniedIcon = () => {
//   return (
//     <span
//       style={{
//         display: "inline-block",
//         padding: "2px 8px",
//         fontSize: "12px",
//         fontWeight: 500,
//         borderRadius: "2px",
//         backgroundColor: "#fee2e2", // light red
//         color: "#b91c1c", // dark red text
//         width: "fit-content",
//       }}
//     >
//       DENIED
//     </span>
//   );
// };

// const PendingIcon = () => {
//   return (
//     <span
//       style={{
//         display: "inline-block",
//         padding: "2px 8px",
//         fontSize: "12px",
//         fontWeight: 500,
//         borderRadius: "2px",
//         backgroundColor: "#fef9c3", // light yellow
//         color: "#a16207", // dark yellow/brown text
//         width: "fit-content",
//       }}
//     >
//       PENDING
//     </span>
//   );
// };

// const StatusDropdown = ({ value, reqId }) => {
//   const [selected, setSelected] = useState(value || "");
//   const queryClient = useQueryClient();

//   const updateRequestStatus = useMutation({
//     mutationFn: async (status) => {
//       const res = await api.patch(`/api/requests/${reqId}/status`, { status });
//       return res.data;
//     },
//     onSuccess: (_, newValue) => {
//       queryClient.invalidateQueries({ queryKey: ["requests"] });
//       setSelected(newValue);
//     },
//   });

//   const options = [
//     { label: "Pending", value: "Pending" },
//     { label: "Approved", value: "Approved" },
//     { label: "Denied", value: "Denied" },
//   ];

//   return (
//     <div style={{ position: "relative", width: "100%" }}>
//       <select
//         value={selected}
//         onChange={(e) => {
//           updateRequestStatus.mutate(e.target.value);
//         }}
//         disabled={updateRequestStatus.isPending}
//         style={{
//           width: "100%",
//           padding: "10px 36px 10px 12px", // space for spinner
//           borderRadius: "8px",
//           border: "1px solid #ccc",
//           fontSize: "14px",
//           appearance: "none",
//           background: updateRequestStatus.isPending ? "#f9fafb" : "#fff",
//           cursor: updateRequestStatus.isPending ? "not-allowed" : "pointer",
//         }}
//       >
//         {options.map((opt) => (
//           <option key={opt.value} value={opt.value}>
//             {opt.label}
//           </option>
//         ))}
//       </select>

//       {/* Right-side element: spinner OR arrow */}
//       <div
//         style={{
//           position: "absolute",
//           right: "10px",
//           top: "50%",
//           transform: "translateY(-50%)",
//           display: "flex",
//           alignItems: "center",
//           pointerEvents: "none",
//         }}
//       >
//         {updateRequestStatus.isPending ? (
//           <div
//             style={{
//               width: "14px",
//               height: "14px",
//               border: "2px solid #ccc",
//               borderTop: "2px solid #4f46e5",
//               borderRadius: "50%",
//               animation: "spin 0.6s linear infinite",
//             }}
//           />
//         ) : (
//           <span style={{ fontSize: "12px", color: "#666" }}>▼</span>
//         )}
//       </div>

//       {/* Animation */}
//       <style>
//         {`
//           @keyframes spin {
//             to { transform: rotate(360deg); }
//           }
//         `}
//       </style>
//     </div>
//   );
// };


import React, { useState } from "react";
import api from "../../api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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
    <div className="min-h-screen p-6 bg-white rounded-xl">
      {/* Toolbar */}
      <div className="mb-6 flex flex-wrap gap-3">
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
      </div>

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
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
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
              <h2 className="text-2xl font-bold">
                {selectedRequest.name}
              </h2>

              <p className="mt-1 text-sm text-white/80">
                Request Details
              </p>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-5">
                <div>
                  <label className="text-xs uppercase tracking-wide text-slate-400">
                    Status
                  </label>

                  <div className="mt-2">
                    <StatusDropdown
                      value={selectedRequest.status}
                      reqId={selectedRequest.id}
                    />
                  </div>
                </div>

                <InfoField
                  label="LRN"
                  value={selectedRequest.lrn}
                />

                <InfoField
                  label="Academic Year"
                  value={selectedRequest.academic_year}
                />

                <InfoField
                  label="Purpose"
                  value={selectedRequest.purpose}
                />

                <InfoField
                  label="Date Requested"
                  value={new Date(
                    selectedRequest.date_requested
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

export default Requests;

function InfoField({ label, value }) {
  return (
    <div className="border-b border-slate-100 pb-4">
      <p className="text-xs uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <p className="mt-1 break-words font-medium text-slate-800">
        {value}
      </p>
    </div>
  );
}

function StatusBadge({ status }) {
  const normalized = status?.toLowerCase();

  const styles = {
    approved:
      "bg-green-100 text-green-700 border border-green-200",
    denied:
      "bg-red-100 text-red-700 border border-red-200",
    pending:
      "bg-yellow-100 text-yellow-700 border border-yellow-200",
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
      const res = await api.patch(
        `/api/requests/${reqId}/status`,
        { status }
      );

      return res.data;
    },
    onSuccess: (_, newValue) => {
      queryClient.invalidateQueries({
        queryKey: ["requests"],
      });

      setSelected(newValue);
    },
  });

  return (
    <select
      value={selected}
      onChange={(e) => {
        setSelected(e.target.value);
        updateRequestStatus.mutate(e.target.value);
      }}
      disabled={updateRequestStatus.isPending}
      className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm focus:border-[#2b9252] focus:outline-none"
    >
      <option value="Pending">Pending</option>
      <option value="Approved">Approved</option>
      <option value="Denied">Denied</option>
    </select>
  );
}