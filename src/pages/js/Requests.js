import React, { useState } from "react";
import api from "../../api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ChevronDown,
  ChevronUp,
  Calendar,
  User,
  FileText,
  GraduationCap,
  MessageSquare,
  CreditCard,
  Hash,
} from "lucide-react";

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
    <div className="flex flex-col gap-2">
      {requests?.map((request) => (
        <RequestCard request={request} />
      ))}
    </div>
  );

  // return (
  //   <div className="min-h-screen p-6 bg-white rounded-xl">
  //     {/* Toolbar */}
  //     <div className="mb-6 flex flex-wrap gap-3">
  //       <select className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm shadow-sm">
  //         <option value="">Sort By</option>
  //         <option value="new">Newest</option>
  //         <option value="old">Oldest</option>
  //       </select>

  //       <input
  //         type="text"
  //         placeholder="Search requests..."
  //         className="flex-1 min-w-[250px] rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm shadow-sm"
  //       />
  //     </div>

  //     {/* States */}
  //     {error && (
  //       <div className="rounded-lg bg-red-100 p-4 text-red-700">
  //         {error.message}
  //       </div>
  //     )}

  //     {isLoading && (
  //       <div className="text-center text-slate-500">Loading requests...</div>
  //     )}

  //     {/* Cards */}
  //     <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
  //       {requests?.map((request) => (
  //         <div
  //           key={request.id}
  //           className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
  //         >
  //           {/* Header */}
  //           <div className="mb-4 flex items-start justify-between">
  //             <div>
  //               <h3 className="text-lg font-semibold text-slate-800">
  //                 {request.name}
  //               </h3>

  //               <p className="mt-1 text-sm text-slate-500">
  //                 LRN: {request.lrn}
  //               </p>
  //             </div>

  //             <StatusBadge status={request.status} />
  //           </div>

  //           {/* Date */}
  //           <div className="mb-5">
  //             <p className="text-xs uppercase tracking-wide text-slate-400">
  //               Date Requested
  //             </p>

  //             <p className="mt-1 text-sm font-medium text-slate-700">
  //               {new Date(request.date_requested).toLocaleDateString()}
  //             </p>
  //           </div>

  //           {/* Button */}
  //           <button
  //             onClick={() => setSelectedRequest(request)}
  //             className="w-full rounded-xl bg-[#2b9252] px-4 py-3 font-medium text-white transition hover:bg-[#247b45]"
  //           >
  //             View Details
  //           </button>
  //         </div>
  //       ))}
  //     </div>

  //     {/* Drawer */}
  //     {selectedRequest && (
  //       <>
  //         {/* Overlay */}
  //         <div
  //           className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
  //           onClick={() => setSelectedRequest(null)}
  //         />

  //         {/* Drawer */}
  //         <div className="fixed right-0 top-0 z-50 flex h-screen w-full max-w-md flex-col bg-white shadow-2xl">
  //           {/* Header */}
  //           <div className="bg-[#2b9252] p-6 text-white">
  //             <h2 className="text-2xl font-bold">{selectedRequest.name}</h2>

  //             <p className="mt-1 text-sm text-white/80">Request Details</p>
  //           </div>

  //           {/* Content */}
  //           <div className="flex-1 overflow-y-auto p-6">
  //             <div className="space-y-5">
  //               <div>
  //                 <label className="text-xs uppercase tracking-wide text-slate-400">
  //                   Status
  //                 </label>

  //                 <div className="mt-2">
  //                   <StatusDropdown
  //                     value={selectedRequest.status}
  //                     reqId={selectedRequest.id}
  //                   />
  //                 </div>
  //               </div>

  //               <InfoField label="LRN" value={selectedRequest.lrn} />

  //               <InfoField
  //                 label="Academic Year"
  //                 value={selectedRequest.academic_year}
  //               />

  //               <InfoField label="Purpose" value={selectedRequest.purpose} />

  //               <InfoField
  //                 label="Date Requested"
  //                 value={new Date(
  //                   selectedRequest.date_requested,
  //                 ).toLocaleString()}
  //               />

  //               <InfoField
  //                 label="Email"
  //                 value={selectedRequest.email || "N/A"}
  //               />

  //               <InfoField
  //                 label="Comments"
  //                 value={selectedRequest.comments || "No comments"}
  //               />
  //             </div>
  //           </div>

  //           {/* Footer */}
  //           <div className="border-t p-4">
  //             <button
  //               onClick={() => setSelectedRequest(null)}
  //               className="w-full rounded-xl bg-[#2b9252] px-4 py-3 font-medium text-white transition hover:bg-[#247b45]"
  //             >
  //               Close
  //             </button>
  //           </div>
  //         </div>
  //       </>
  //     )}
  //   </div>
  // );
}

export default Requests;

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

  return (
    <div className="relative w-full">
      <select
        value={selected}
        onChange={(e) => {
          updateRequestStatus.mutate(e.target.value);
        }}
        disabled={updateRequestStatus.isPending}
        className="w-full appearance-none rounded-lg border border-slate-300 bg-white px-4 py-3 pr-10 text-sm focus:border-[#2b9252] focus:outline-none disabled:opacity-50"
      >
        <option value="Pending">Pending</option>
        <option value="Approved">Approved</option>
        <option value="Denied">Denied</option>
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

// import { useState } from "react";

function RequestCard({ request }) {
  const [open, setOpen] = useState(false);

  const statusColors = {
    Approved: "bg-green-100 text-green-700",
    Pending: "bg-yellow-100 text-yellow-700",
    Rejected: "bg-red-100 text-red-700",
  };

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
      {/* Header */}
      <button onClick={() => setOpen(!open)} className="w-full p-5 text-left">
        <div className="flex items-start justify-between gap-4">
          {/* Left */}
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-gray-800">
              {request.name}
            </h2>

            {/* <p className="mt-1 text-sm text-gray-500">{request.purpose}</p> */}
          </div>

          {/* Right */}
          <div className="flex items-center gap-3">
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                statusColors[request.status]
              }`}
            >
              {request.status}
            </span>

            <ChevronDown
              className={`transition-transform ${open ? "rotate-180" : ""}`}
            />
          </div>
        </div>

        {/* Metadata Row */}
        <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <GraduationCap size={15} className="text-[#2f9f63]" />
            {request.academic_year}
          </div>

          <div className="flex items-center gap-1">
            <Calendar size={15} className="text-[#2f9f63]" />
            {formatDate(request.date_requested)}
          </div>

          <div className="flex items-center gap-1">
            <Hash size={15} className="text-[#2f9f63]" />
            {request.id.slice(0, 8)}
          </div>

          <div className="flex items-center gap-1">
            <CreditCard size={15} className="text-[#2f9f63]" />
            {request.lrn}
          </div>
        </div>
      </button>

      {/* Accordion */}
      <div
        className={`grid transition-all duration-300 ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="border-t bg-gray-50 p-5">
            <div className="grid gap-5 md:grid-cols-2">
              <InfoRow
                icon={<User size={18} className="text-[#2f9f63]" />}
                label="Requestor"
                value={request.name}
              />

              <InfoRow
                icon={<GraduationCap size={18} className="text-[#2f9f63]" />}
                label="Academic Year"
                value={request.academic_year}
              />

              <InfoRow
                icon={<FileText size={18} className="text-[#2f9f63]" />}
                label="Purpose"
                value={request.purpose}
              />

              <InfoRow
                icon={<Calendar size={18} className="text-[#2f9f63]" />}
                label="Date Requested"
                value={new Date(request.date_requested).toLocaleString()}
              />

              <InfoRow label="LRN" value={request.lrn} />

              <InfoRow
                label="Request ID"
                value={
                  <code className="rounded bg-gray-100 px-2 py-1 text-xs">
                    {request.id}
                  </code>
                }
              />

              <InfoRow
                label="Requestor ID"
                value={
                  <code className="rounded bg-gray-100 px-2 py-1 text-xs">
                    {request.requestor_id}
                  </code>
                }
              />

              <InfoRow
                icon={<MessageSquare size={18} className="text-[#2f9f63]" />}
                label="Comments"
                value={request.comments || "No comments provided"}
                full
              />
            </div>
          </div>
        </div>
      </div>
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
