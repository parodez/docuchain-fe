import React, { useEffect, useState } from "react";
import {
  ChevronDown,
  Calendar,
  User,
  FileText,
  GraduationCap,
  MessageSquare,
  CreditCard,
  Hash,
} from "lucide-react";
import { useRequests, useUpdateRequestStatus } from "../../hooks/useRequests";
import { toast } from "sonner";

function Requests() {
  const { data: requests, isLoading, error } = useRequests();

  if (isLoading) {
    return (
      <div className="text-center h-full w-full flex items-center justify-center font-semibold">
        Loading Requests...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center h-full w-full flex items-center justify-center font-semibold">
        Error loading Requests
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {requests?.map((request) => (
        <RequestCard key={request.id} request={request} />
      ))}
    </div>
  );
}

export default Requests;

function StatusDropdown({ value, reqId }) {
  const [selected, setSelected] = useState(value);
  const updateRequestStatus = useUpdateRequestStatus();

  useEffect(() => {
    setSelected(value);
  }, [value]);

  const handleChange = async (e) => {
    const newValue = e.target.value;

    try {
      await updateRequestStatus.mutateAsync({
        id: reqId,
        status: newValue,
      });
      setSelected(newValue);
      toast.success("Status updated successfully");
    } catch {
      setSelected(value);
      toast.error("Error updating status");
    }
  };

  return (
    <div className="relative w-full">
      <select
        value={selected}
        onChange={handleChange}
        disabled={updateRequestStatus.isPending}
        className={`rounded-full border px-3 py-1 text-xs font-semibold outline-none transition cursor-pointer appearance-none pr-10 ${
          statusStyles[selected]
        }`}
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

function RequestCard({ request }) {
  const [open, setOpen] = useState(false);

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300">
      {/* Header */}
      <div className="w-full p-5 text-left">
        <div className="flex items-start justify-between gap-4">
          {/* Left */}
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-gray-800">
              {request.name}
            </h2>
          </div>

          {/* Right */}
          <div className="flex flex-col items-end gap-3">
            <StatusDropdown value={request.status} reqId={request.id} />
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
      </div>

      {/* Accordion Toggle */}
      <button
        onClick={() => setOpen(!open)}
        className="group flex w-full items-center justify-between border-t border-dotted px-5 py-3"
      >
        <p className="text-sm group-hover:text-[#2f9f63]">
          {open ? "Hide Details" : "Show Details"}
        </p>

        <ChevronDown
          className={`size-5 transition-transform group-hover:text-[#2f9f63] ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Accordion */}
      <div
        className={`grid transition-all duration-300 ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="bg-[#f5f4ea]/20 p-5">
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

              <InfoRow
                icon={<CreditCard size={18} className="text-[#2f9f63]" />}
                label="LRN"
                value={request.lrn}
              />

              <InfoRow
                icon={<Hash size={18} className="text-[#2f9f63]" />}
                label="Request ID"
                value={
                  <code className="rounded bg-gray-100 px-2 py-1 text-xs">
                    {request.id}
                  </code>
                }
              />

              <InfoRow
                icon={<Hash size={18} className="text-[#2f9f63]" />}
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

const statusStyles = {
  Approved: "bg-green-100 text-green-700 border-green-200",
  Pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
  Denied: "bg-red-100 text-red-700 border-red-200",
};
