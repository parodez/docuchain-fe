import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { getUserFromToken } from "../../auth";
import { useCreateRequest, useRequests } from "../../hooks/useRequests";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

const requestSchema = z
  .object({
    lrn: z.string().min(1, "LRN is required"),

    name: z.string().min(1, "Name is required"),

    academic_year_start: z.coerce.number().min(1900).max(3000),

    academic_year_end: z.coerce.number().min(1900).max(3000),

    purpose: z.string().min(1, "Purpose is required"),
  })
  .refine((data) => data.academic_year_end >= data.academic_year_start, {
    path: ["academic_year_end"],
    message: "End year must be greater than or equal to start year",
  });

function RequestorDashboard() {
  const navigate = useNavigate();
  const user = getUserFromToken();
  const [showForm, setShowForm] = useState(false);

  // if (!user || !["Requestor"].includes(user.role)) {
  //   return <Navigate to="/requestor/" replace />;
  // }

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/requestor");
  };

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
            </p>

            <h2 style={{ margin: "5px 0 0 0" }}>Requests</h2>

            <p style={{ margin: 0, fontSize: "14px", color: "gray" }}>
              Lists of requests
            </p>
          </div>

          {/* Right side buttons */}
          <div style={{ display: "flex", gap: "10px", alignSelf: "end" }}>
            <button
              onClick={() => setShowForm(true)}
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
        {showForm && (
          <>
            {/* Overlay */}
            <div
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
              onClick={() => setShowForm(false)}
            />

            <NewRequestDrawer onClose={() => setShowForm(false)} />
          </>
        )}

        <Requests />
      </div>

      {/* BOTTOMBAR */}
      {/* <footer className="bottombar">
        © 2025 DocuChain | All Rights Reserved
      </footer> */}
    </div>
  );
}

export default RequestorDashboard;

function Requests() {
  const [selectedRequest, setSelectedRequest] = useState(null);

  const { data: requests, isLoading, error } = useRequests();

  return (
    <div>
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
                {new Date(request.created_at).toLocaleDateString()}
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
                  value={new Date(selectedRequest.created_at).toLocaleString()}
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

function NewRequestDrawer({ onClose }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(requestSchema),
    defaultValues: {
      lrn: "",
      name: "",
      academic_year_start: "",
      academic_year_end: "",
      purpose: "",
    },
  });

  const { mutateAsync: createRequest } = useCreateRequest();

  const onSubmit = async (data) => {
    console.log(data);

    await createRequest(data);

    toast.success("Request Created successfully");

    onClose();
  };

  return (
    <div className="fixed right-0 top-0 z-50 flex h-screen w-full max-w-md flex-col overflow-y-auto bg-white shadow-2xl">
      {/* Header */}
      <div className="bg-[#2b9252] p-6 text-white">
        <h2 className="text-2xl font-bold">New Request</h2>
        <p className="mt-1 text-sm text-white/80">
          Fill in the request details
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-1 flex-col">
        <div className="flex-1 overflow-y-auto space-y-5 p-6">
          {/* LRN */}
          <div>
            <label className="mb-1 block text-sm font-medium">LRN</label>

            <input
              {...register("lrn")}
              className="w-full rounded-lg border p-3"
            />

            {errors.lrn && (
              <p className="mt-1 text-sm text-red-500">{errors.lrn.message}</p>
            )}
          </div>

          {/* Name */}
          <div>
            <label className="mb-1 block text-sm font-medium">Name</label>

            <input
              {...register("name")}
              className="w-full rounded-lg border p-3"
            />

            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          {/* Academic Year Start */}
          <div>
            <label className="mb-1 block text-sm font-medium">
              Academic Year Start
            </label>

            <input
              type="number"
              {...register("academic_year_start")}
              className="w-full rounded-lg border p-3"
            />

            {errors.academic_year_start && (
              <p className="mt-1 text-sm text-red-500">
                {errors.academic_year_start.message}
              </p>
            )}
          </div>

          {/* Academic Year End */}
          <div>
            <label className="mb-1 block text-sm font-medium">
              Academic Year End
            </label>

            <input
              type="number"
              {...register("academic_year_end")}
              className="w-full rounded-lg border p-3"
            />

            {errors.academic_year_end && (
              <p className="mt-1 text-sm text-red-500">
                {errors.academic_year_end.message}
              </p>
            )}
          </div>

          {/* Purpose */}
          <div>
            <label className="mb-1 block text-sm font-medium">Purpose</label>

            <textarea
              rows={4}
              {...register("purpose")}
              className="w-full rounded-lg border p-3"
            />

            {errors.purpose && (
              <p className="mt-1 text-sm text-red-500">
                {errors.purpose.message}
              </p>
            )}
          </div>
        </div>

        <div className="border-t p-4 flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-lg border py-3"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 rounded-lg bg-[#2b9252] py-3 text-white hover:bg-[#247b45] disabled:opacity-50"
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}
