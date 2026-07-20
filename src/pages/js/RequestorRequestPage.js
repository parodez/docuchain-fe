import { UserCircle } from "lucide-react";
import RequestForm from "../../components/requestor/RequestForm";

const RequestorRequestPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <span className="text-3xl font-semibold">Create a New request</span>
        <span className="text-slate-600">
          Complete the required information to submit a request. Please ensure
          all details are accurate before sending.
        </span>
      </div>
      <RequestForm />
    </div>
  );
};

export default RequestorRequestPage;
