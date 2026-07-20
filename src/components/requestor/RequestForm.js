import { FileTextIcon, SendHorizonalIcon, UserCircle } from "lucide-react";

const RequestForm = () => {
  return (
    <div className="border rounded-xl shadow-md overflow-hidden">
      <div className="bg-green-700 px-10 py-4">
        <span className="text-2xl text-white font-bold">
          Request Application Form
        </span>
      </div>
      <div className="p-10 space-y-8">
        <div className="space-y-4 border-b pb-8">
          <div className="flex gap-2 items-center text-green-700 text-lg">
            <UserCircle />
            <span>Student Infromation</span>
          </div>
          <div className="grid grid-cols-2 gap-5">
            <div className="flex flex-col gap-2">
              <span className="text-sm text-slate-600">
                Full Name (Last, First, Middle)
              </span>
              <input
                placeholder="e.g. Dela Cruz, Juan Santos"
                className="border rounded-lg px-3 py-2"
              />
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-sm text-slate-600">
                Learner Reference Number (LRN)
              </span>
              <input
                placeholder="12-digit number"
                className="border rounded-lg px-3 py-2"
              />
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-sm text-slate-600">
                Full Name (Last, First, Middle)
              </span>
              <input type="date" className="border rounded-lg px-3 py-2" />
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-sm text-slate-600">
                Last School Year Attended
              </span>
              <div className="flex gap-2 items-center">
                <input
                  type="number"
                  className="border rounded-lg px-3 py-2 flex-1"
                  placeholder="Start Year"
                />
                <span>-</span>
                <input
                  type="number"
                  className="border rounded-lg px-3 py-2 flex-1"
                  placeholder="End Year"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-4 border-b pb-8">
          <div className="flex gap-2 items-center text-green-700 text-lg">
            <FileTextIcon />
            <span>Request Details</span>
          </div>
          <div>
            <div className="flex flex-col gap-2">
              <span className="text-sm text-slate-600">Purpose of Request</span>
              <input
                placeholder="e.g. Enrollment"
                className="border rounded-lg px-3 py-2"
              />
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex gap-2 items-start">
            <div className="p-0.5">
              <input type="checkbox" />
            </div>
            <p className="text-sm">
              I hereby certify that the information provided is true and
              correct. I authorize the Institution to verify my records for the
              purpose of this request in accordance with the{" "}
              <span className="text-green-700 underline">Data Privacy Act</span>
              .
            </p>
          </div>
          <button className="bg-green-700 text-white w-full flex justify-center items-center rounded-md py-3">
            <div className="flex gap-2 items-center font-bold">
              <span>Submit Request</span>
              <SendHorizonalIcon size={15} strokeWidth={2.5} />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RequestForm;
