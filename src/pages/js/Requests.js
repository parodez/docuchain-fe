import { useState } from "react";
import { useRequests } from "../../hooks/useRequests";

const Requests = () => {
  const [activeFilter, setActiveFilter] = useState(0);

  // const { data: requests, isLoading } = useRequests();

  const requests = [
    {
      name: "Juan Dela Cruz",
      lrn: "123456789012",
      academic_year: "2025-2026",
      purpose: "Employment",
      status: "Approved",
    },
    {
      name: "Maria Santos",
      lrn: "987654321098",
      academic_year: "2025-2026",
      purpose: "Employment",
      status: "Pending",
    },
    {
      name: "John Reyes",
      lrn: "456789123456",
      academic_year: "2024-2025",
      purpose: "Employment",
      status: "Released",
    },
    {
      name: "Angela Garcia",
      lrn: "741852963147",
      academic_year: "2025-2026",
      purpose: "Employment",
      status: "Processing",
    },
    {
      name: "Mark Lopez",
      lrn: "852963741258",
      academic_year: "2023-2024",
      purpose: "Employment",
      status: "Rejected",
    },
  ];

  const statusColors = {
    Approved: "bg-green-100 text-green-700",
    Pending: "bg-yellow-100 text-yellow-700",
    Released: "bg-emerald-100 text-emerald-700",
    Processing: "bg-blue-100 text-blue-700",
    Rejected: "bg-red-100 text-red-700",
  };

  return (
    <div className="space-y-4">
      <div>
        <span className="text-lg font-semibold">Request Management</span>
        <p className="text-slate-800 text-sm">
          Monitor and validate document issuance requests from requestors.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {[
          "All Requests",
          "Pending Action",
          "Approved",
          "Processing",
          "Completed",
          "Rejected",
        ].map((filter, i) => (
          <button
            className={`px-4 py-1 rounded-full ${activeFilter === i ? "bg-green-700 text-white" : "bg-green-800/10"}  text-sm font-`}
            onClick={() => {
              setActiveFilter(i);
            }}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="p-4 rounded-xl space-y-2 shadow-md border bg-white">
          <div className="text-sm tracking-widest">TOTAL REQUESTS</div>
          <div>
            <span className="font-bold">{requests && requests?.length}</span>
          </div>
        </div>
        <div className="p-4 rounded-xl space-y-2 shadow-md border bg-white">
          <div className="text-sm tracking-widest">PENDING STATUS</div>
          <div>
            <span className="font-bold">{requests && requests?.length}</span>
          </div>
        </div>
        <div className="p-4 rounded-xl space-y-2 shadow-md border bg-white">
          <div className="text-sm tracking-widest">COMPLETED</div>
          <div>
            <span className="font-bold">{requests && requests?.length}</span>
          </div>
        </div>
      </div>
      <div>
        <div className="overflow-x-auto rounded-xl border bg-white shadow">
          <table className="min-w-full text-sm">
            <thead className="bg-green-800/10 border-b">
              <tr>
                {["Name", "LRN", "Academic year", "Purpose", "Status"].map(
                  (title) => (
                    <th className="px-6 py-4 text-left text-base font-bold text-green-700">
                      {title}
                    </th>
                  ),
                )}
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 text-[15px] text-gray-700">
              {requests?.length > 0 ? (
                requests.map((request, index) => (
                  <tr
                    key={index}
                    className="hover:bg-green-50 transition-colors"
                  >
                    <td className="px-6 py-4">{request.name}</td>
                    <td className="px-6 py-4">{request.lrn}</td>
                    <td className="px-6 py-4">{request.academic_year}</td>
                    <td className="px-6 py-4">{request.purpose}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusColors[request.status]}`}
                      >
                        {request.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-16 text-center">
                    <div className="flex flex-col items-center">
                      <svg
                        className="mb-3 h-12 w-12 text-gray-300"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={1.5}
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 8.25v10.5A2.25 2.25 0 0117.25 21H6.75A2.25 2.25 0 014.5 18.75V5.25A2.25 2.25 0 016.75 3h7.19a2.25 2.25 0 011.59.66l3.31 3.31a2.25 2.25 0 01.66 1.59z"
                        />
                      </svg>

                      <h3 className="text-lg font-semibold text-gray-700">
                        No requests found
                      </h3>

                      <p className="mt-1 text-sm text-gray-500">
                        Student requests will appear here once they are
                        submitted.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Requests;

// import React, { useEffect, useState } from "react";
// import {
//   ChevronDown,
//   Calendar,
//   User,
//   FileText,
//   GraduationCap,
//   MessageSquare,
//   CreditCard,
//   Hash,
// } from "lucide-react";
// import { useRequests, useUpdateRequestStatus } from "../../hooks/useRequests";
// import { toast } from "sonner";

// function Requests() {
//   const { data: requests, isLoading, error } = useRequests();

//   if (isLoading) {
//     return (
//       <div className="text-center h-full w-full flex items-center justify-center font-semibold">
//         Loading Requests...
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="text-center h-full w-full flex items-center justify-center font-semibold">
//         Error loading Requests
//       </div>
//     );
//   }

//   return (
//     <div className="flex flex-col gap-2">
//       {requests?.map((request) => (
//         <RequestCard key={request.id} request={request} />
//       ))}
//     </div>
//   );
// }

// export default Requests;

// function StatusDropdown({ value, reqId }) {
//   const [selected, setSelected] = useState(value);
//   const updateRequestStatus = useUpdateRequestStatus();

//   useEffect(() => {
//     setSelected(value);
//   }, [value]);

//   const handleChange = async (e) => {
//     const newValue = e.target.value;

//     try {
//       await updateRequestStatus.mutateAsync({
//         id: reqId,
//         status: newValue,
//       });
//       setSelected(newValue);
//       toast.success("Status updated successfully");
//     } catch {
//       setSelected(value);
//       toast.error("Error updating status");
//     }
//   };

//   return (
//     <div className="relative w-full">
//       <select
//         value={selected}
//         onChange={handleChange}
//         disabled={updateRequestStatus.isPending}
//         className={`rounded-full border px-3 py-1 text-xs font-semibold outline-none transition cursor-pointer appearance-none pr-10 ${
//           statusStyles[selected]
//         }`}
//       >
//         <option value="Pending">Pending</option>
//         <option value="Approved">Approved</option>
//         <option value="Denied">Denied</option>
//       </select>

//       <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
//         {updateRequestStatus.isPending ? (
//           <div className="h-4 w-4 animate-spin rounded-full border-2 border-slate-300 border-t-slate-600" />
//         ) : (
//           <svg
//             className="h-4 w-4 text-slate-500"
//             viewBox="0 0 20 20"
//             fill="currentColor"
//           >
//             <path
//               fillRule="evenodd"
//               d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.94a.75.75 0 111.08 1.04l-4.24 4.5a.75.75 0 01-1.08 0l-4.24-4.5a.75.75 0 01.02-1.06z"
//               clipRule="evenodd"
//             />
//           </svg>
//         )}
//       </div>
//     </div>
//   );
// }

// function RequestCard({ request }) {
//   const [open, setOpen] = useState(false);

//   const formatDate = (date) =>
//     new Date(date).toLocaleDateString("en-US", {
//       month: "short",
//       day: "numeric",
//       year: "numeric",
//     });

//   return (
//     <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300">
//       {/* Header */}
//       <div className="w-full p-5 text-left">
//         <div className="flex items-start justify-between gap-4">
//           {/* Left */}
//           <div className="flex-1">
//             <h2 className="text-lg font-semibold text-gray-800">
//               {request.name}
//             </h2>
//           </div>

//           {/* Right */}
//           <div className="flex flex-col items-end gap-3">
//             <StatusDropdown value={request.status} reqId={request.id} />
//           </div>
//         </div>

//         {/* Metadata Row */}
//         <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-500">
//           <div className="flex items-center gap-1">
//             <GraduationCap size={15} className="text-[#2f9f63]" />
//             {request.academic_year}
//           </div>

//           <div className="flex items-center gap-1">
//             <Calendar size={15} className="text-[#2f9f63]" />
//             {formatDate(request.date_requested)}
//           </div>

//           <div className="flex items-center gap-1">
//             <Hash size={15} className="text-[#2f9f63]" />
//             {request.id.slice(0, 8)}
//           </div>

//           <div className="flex items-center gap-1">
//             <CreditCard size={15} className="text-[#2f9f63]" />
//             {request.lrn}
//           </div>
//         </div>
//       </div>

//       {/* Accordion Toggle */}
//       <button
//         onClick={() => setOpen(!open)}
//         className="group flex w-full items-center justify-between border-t border-dotted px-5 py-3"
//       >
//         <p className="text-sm group-hover:text-[#2f9f63]">
//           {open ? "Hide Details" : "Show Details"}
//         </p>

//         <ChevronDown
//           className={`size-5 transition-transform group-hover:text-[#2f9f63] ${
//             open ? "rotate-180" : ""
//           }`}
//         />
//       </button>

//       {/* Accordion */}
//       <div
//         className={`grid transition-all duration-300 ${
//           open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
//         }`}
//       >
//         <div className="overflow-hidden">
//           <div className="bg-[#f5f4ea]/20 p-5">
//             <div className="grid gap-5 md:grid-cols-2">
//               <InfoRow
//                 icon={<User size={18} className="text-[#2f9f63]" />}
//                 label="Requestor"
//                 value={request.name}
//               />

//               <InfoRow
//                 icon={<GraduationCap size={18} className="text-[#2f9f63]" />}
//                 label="Academic Year"
//                 value={request.academic_year}
//               />

//               <InfoRow
//                 icon={<FileText size={18} className="text-[#2f9f63]" />}
//                 label="Purpose"
//                 value={request.purpose}
//               />

//               <InfoRow
//                 icon={<Calendar size={18} className="text-[#2f9f63]" />}
//                 label="Date Requested"
//                 value={new Date(request.date_requested).toLocaleString()}
//               />

//               <InfoRow
//                 icon={<CreditCard size={18} className="text-[#2f9f63]" />}
//                 label="LRN"
//                 value={request.lrn}
//               />

//               <InfoRow
//                 icon={<Hash size={18} className="text-[#2f9f63]" />}
//                 label="Request ID"
//                 value={
//                   <code className="rounded bg-gray-100 px-2 py-1 text-xs">
//                     {request.id}
//                   </code>
//                 }
//               />

//               <InfoRow
//                 icon={<Hash size={18} className="text-[#2f9f63]" />}
//                 label="Requestor ID"
//                 value={
//                   <code className="rounded bg-gray-100 px-2 py-1 text-xs">
//                     {request.requestor_id}
//                   </code>
//                 }
//               />

//               <InfoRow
//                 icon={<MessageSquare size={18} className="text-[#2f9f63]" />}
//                 label="Comments"
//                 value={request.comments || "No comments provided"}
//                 full
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// function InfoRow({ icon, label, value, full }) {
//   return (
//     <div className={full ? "md:col-span-2" : ""}>
//       <div className="mb-1 flex items-center gap-2 text-sm font-medium text-gray-500">
//         {icon}
//         {label}
//       </div>

//       <div className="rounded-lg border border-gray-200 bg-white p-3 text-gray-800 shadow-sm">
//         {value}
//       </div>
//     </div>
//   );
// }

// const statusStyles = {
//   Approved: "bg-green-100 text-green-700 border-green-200",
//   Pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
//   Denied: "bg-red-100 text-red-700 border-red-200",
// };
