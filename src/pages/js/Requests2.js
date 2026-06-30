import React, { useMemo, useState } from "react";
import api from "../../api";
import { useQuery } from "@tanstack/react-query";
import { Search, X } from "lucide-react";

const STATUS_OPTIONS = [
  "Pending",
  "Approved",
  "Rejected",
  "Processing",
];

function Requests2() {
  const [search, setSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const {
    data: requests = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["requests"],
    queryFn: async () => {
      const res = await api.get("/api/requests");
      return res.data;
    },
  });

  const filteredRequests = useMemo(() => {
    const keyword = search.toLowerCase();

    return requests.filter((request) => {
      return (
        request.name.toLowerCase().includes(keyword) ||
        request.lrn.includes(keyword) ||
        request.purpose.toLowerCase().includes(keyword) ||
        request.academic_year.toLowerCase().includes(keyword)
      );
    });
  }, [requests, search]);

  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredRequests.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredRequests.map((r) => r.id));
    }
  };

  const handleStatusChange = (id, status) => {
    console.log("Update Status", {
      id,
      status,
    });

    // TODO:
    // mutation.mutate({ id, status });
  };

  const handleBulkStatusChange = (status) => {
    console.log("Bulk Update", {
      ids: selectedIds,
      status,
    });

    // TODO:
    // mutation here

    setSelectedIds([]);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        Loading requests...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center py-10 text-red-500">
        Failed to load requests.
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* Toolbar */}

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        <div className="relative w-full md:w-80">

          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search requests..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 outline-none focus:border-[#2f9f63]"
          />

        </div>

        <div className="flex items-center gap-3">

          {selectedIds.length > 0 && (
            <span className="text-sm text-gray-500">
              {selectedIds.length} selected
            </span>
          )}

          <select
            defaultValue=""
            className="rounded-lg border border-gray-300 px-3 py-2"
            onChange={(e) => {
              if (!e.target.value) return;

              handleBulkStatusChange(e.target.value);

              e.target.value = "";
            }}
          >
            <option value="">
              Bulk Change Status
            </option>

            {STATUS_OPTIONS.map((status) => (
              <option
                key={status}
                value={status}
              >
                {status}
              </option>
            ))}
          </select>

        </div>

      </div>

      {/* TABLE STARTS HERE */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">

        <div className="overflow-x-auto">

          <table className="min-w-full text-sm">

            <thead className="bg-gray-50">

              <tr className="border-b">

                <th className="w-12 px-4 py-3">

                  <input
                    type="checkbox"
                    className="accent-[#2f9f63]"
                    checked={
                      filteredRequests.length > 0 &&
                      selectedIds.length === filteredRequests.length
                    }
                    onChange={toggleSelectAll}
                  />

                </th>

                <th className="px-4 py-3 text-left font-semibold">
                  Name
                </th>

                <th className="px-4 py-3 text-left font-semibold">
                  LRN
                </th>

                <th className="px-4 py-3 text-left font-semibold">
                  Purpose
                </th>

                <th className="px-4 py-3 text-left font-semibold">
                  Academic Year
                </th>

                <th className="px-4 py-3 text-left font-semibold">
                  Date Requested
                </th>

                <th className="px-4 py-3 text-left font-semibold">
                  Status
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredRequests.length === 0 && (

                <tr>

                  <td
                    colSpan={7}
                    className="py-10 text-center text-gray-500"
                  >
                    No requests found.
                  </td>

                </tr>

              )}

              {filteredRequests.map((request) => (

                <tr
                  key={request.id}
                  onClick={() => setSelectedRequest(request)}
                  className={`cursor-pointer border-b transition hover:bg-[#2f9f63]/5 ${
                    selectedIds.includes(request.id)
                      ? "bg-[#2f9f63]/10"
                      : ""
                  }`}
                >

                  <td
                    className="px-4 py-4"
                    onClick={(e) => e.stopPropagation()}
                  >

                    <input
                      type="checkbox"
                      className="accent-[#2f9f63]"
                      checked={selectedIds.includes(request.id)}
                      onChange={() => toggleSelect(request.id)}
                    />

                  </td>

                  <td className="px-4 py-4 font-medium">
                    {request.name}
                  </td>

                  <td className="px-4 py-4">
                    {request.lrn}
                  </td>

                  <td className="px-4 py-4">
                    {request.purpose}
                  </td>

                  <td className="px-4 py-4">
                    {request.academic_year}
                  </td>

                  <td className="px-4 py-4">
                    {new Date(
                      request.date_requested
                    ).toLocaleDateString()}
                  </td>

                  <td
                    className="px-4 py-4"
                    onClick={(e) => e.stopPropagation()}
                  >

                    <select
                      value={request.status}
                      onChange={(e) =>
                        handleStatusChange(
                          request.id,
                          e.target.value
                        )
                      }
                      className="rounded-md border border-gray-300 px-2 py-1 text-sm outline-none focus:border-[#2f9f63]"
                    >
                      {STATUS_OPTIONS.map((status) => (

                        <option
                          key={status}
                          value={status}
                        >
                          {status}
                        </option>

                      ))}
                    </select>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

      {/* DETAILS MODAL */}
            {selectedRequest && (

        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onClick={() => setSelectedRequest(null)}
        >

          <div
            className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >

            {/* Header */}

            <div className="mb-6 flex items-center justify-between">

              <h2 className="text-xl font-semibold">
                Request Details
              </h2>

              <button
                onClick={() => setSelectedRequest(null)}
                className="rounded-md p-1 hover:bg-gray-100"
              >
                <X size={20} />
              </button>

            </div>


            {/* Details */}

            <div className="grid gap-4">

              <DetailItem
                label="Name"
                value={selectedRequest.name}
              />

              <DetailItem
                label="LRN"
                value={selectedRequest.lrn}
              />

              <DetailItem
                label="Academic Year"
                value={selectedRequest.academic_year}
              />

              <DetailItem
                label="Purpose"
                value={selectedRequest.purpose}
              />

              <DetailItem
                label="Status"
                value={selectedRequest.status}
              />

              <DetailItem
                label="Date Requested"
                value={
                  new Date(
                    selectedRequest.date_requested
                  ).toLocaleString()
                }
              />

              <DetailItem
                label="Comments"
                value={
                  selectedRequest.comments ||
                  "No comments"
                }
              />

              <DetailItem
                label="Request ID"
                value={selectedRequest.id}
              />

            </div>


            {/* Footer */}

            <div className="mt-6 flex justify-end">

              <button
                onClick={() => setSelectedRequest(null)}
                className="rounded-lg bg-[#2f9f63] px-4 py-2 text-sm text-white hover:bg-[#278653]"
              >
                Close
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}


function DetailItem({
  label,
  value,
}) {
  return (

    <div>

      <p className="text-xs text-gray-500">
        {label}
      </p>

      <p className="font-medium text-gray-900">
        {value}
      </p>

    </div>

  );
}


export default Requests2;