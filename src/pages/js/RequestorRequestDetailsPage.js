import { Check } from "lucide-react";
import { useLocation } from "react-router-dom";

const RequestorRequestDetailsPage = () => {
  const location = useLocation();
  const { id } = location.state || {};
  console.log(location);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <span className="text-3xl font-semibold">Request Details</span>
        <div className="text-slate-600 text-sm flex flex-col">
          <span>Request ID: {id}</span>
          <span>Submitted: January 1, 2026</span>
        </div>
      </div>
      <div className="rounded-2xl border p-8 space-y-5">
        <span className="text-xl font-semibold">Request Journey</span>
        <div>
          <div className="container flex min-h-24 gap-2">
            <div className="flex flex-col gap-1">
              <div className="bg-green-800 w-fit h-fit p-1 rounded-full">
                <Check size={11} className="text-white" />
              </div>
              <div className="flex justify-center items-center h-full pb-1">
                <div className="h-full w-0.5 bg-green-800 rounded-full" />
              </div>
            </div>
            <div>
              <span className="font-bold">Requested</span>
              <p className="text-slate-600 text-sm">
                Request submitted via portal
              </p>
              <p className="text-slate-600 text-sm">January 1, 2026</p>
            </div>
          </div>
          <div className="container flex min-h-24 gap-2">
            <div className="flex flex-col gap-1">
              <div className="bg-green-800 w-fit h-fit p-1 rounded-full">
                <Check size={11} className="text-white" />
              </div>
              <div className="flex justify-center items-center h-full pb-1">
                <div className="h-full w-0.5 bg-green-800 rounded-full" />
              </div>
            </div>
            <div>
              <span className="font-bold">OCR Processing</span>
              <p className="text-slate-600 text-sm">
                AI digitization of physical records completed
              </p>
              <p className="text-slate-600 text-sm">January 2, 2026</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestorRequestDetailsPage;
