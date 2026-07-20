import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { getUserFromToken } from "../../auth";
import { useCreateRequest, useRequests } from "../../hooks/useRequests";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useMe } from "../../hooks/useAuth";
import {
  BellIcon,
  CheckLineIcon,
  ClipboardClockIcon,
  FileTextIcon,
} from "lucide-react";

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
  // const user = getUserFromToken();
  const [showForm, setShowForm] = useState(false);

  const { data: user, isPending } = useMe();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/requestor");
  };

  const { data: requests, isLoading } = useRequests();

  // const requests = [
  //   {
  //     name: "Juan Dela Cruz",
  //     lrn: "123456789012",
  //     academic_year: "2025-2026",
  //     purpose: "Good Moral Certificate",
  //     status: "Approved",
  //   },
  //   {
  //     name: "Maria Santos",
  //     lrn: "987654321098",
  //     academic_year: "2025-2026",
  //     purpose: "Certificate of Enrollment",
  //     status: "Pending",
  //   },
  //   {
  //     name: "John Reyes",
  //     lrn: "456789123456",
  //     academic_year: "2024-2025",
  //     purpose: "Transcript of Records",
  //     status: "Released",
  //   },
  //   {
  //     name: "Angela Garcia",
  //     lrn: "741852963147",
  //     academic_year: "2025-2026",
  //     purpose: "Form 137",
  //     status: "Processing",
  //   },
  //   {
  //     name: "Mark Lopez",
  //     lrn: "852963741258",
  //     academic_year: "2023-2024",
  //     purpose: "Diploma Request",
  //     status: "Rejected",
  //   },
  // ];

  const statusColors = {
    Approved: "bg-green-100 text-green-700",
    Pending: "bg-yellow-100 text-yellow-700",
    Released: "bg-emerald-100 text-emerald-700",
    Processing: "bg-blue-100 text-blue-700",
    Rejected: "bg-red-100 text-red-700",
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-1">
          <span className="text-4xl font-semibold">Welcome!</span>
          <span className="text-slate-600">
            Here is the latest update on your academic document requests.
          </span>
        </div>
        <button
          className="bg-green-700 h-fit w-fit px-10 py-3 text-white font-bold rounded-lg"
          onClick={() => {
            navigate("/requestor/new-request");
          }}
        >
          + New Document Request
        </button>
      </div>
      <div className="grid grid-cols-3 gap-6">
        <div className="p-8 border w-full rounded-2xl">
          <div className="flex gap-5">
            <div>
              <FileTextIcon className="size-14 p-3  bg-green-700/10 rounded-xl text-green-700" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold">Total Requests</span>
              <span className="font-bold text-3xl">
                {requests && (requests?.length ?? 0)}
              </span>
            </div>
          </div>
        </div>
        <div className="p-8 border w-full rounded-2xl">
          <div className="flex gap-5">
            <div>
              <ClipboardClockIcon className="size-14 p-3  bg-blue-700/10 rounded-xl text-blue-700" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold">Pending Approval</span>
              <span className="font-bold text-3xl">0</span>
            </div>
          </div>
        </div>
        <div className="p-8 border w-full rounded-2xl">
          <div className="flex gap-5">
            <div>
              <CheckLineIcon className="size-14 p-3  bg-green-400/50 rounded-xl text-green-700" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold">Ready for Download</span>
              <span className="font-bold text-3xl">0</span>
            </div>
          </div>
        </div>
      </div>
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
              <tr key={index} className="hover:bg-green-50 transition-colors">
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
                    You haven't submitted any requests yet. Once you do, they'll
                    appear here.
                  </p>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default RequestorDashboard;
