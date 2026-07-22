import { FileTextIcon, SendHorizonalIcon, UserCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateRequest } from "../../hooks/useRequests";
import { toast } from "sonner";

const currentYear = new Date().getFullYear();

const formSchema = z
  .object({
    name: z.string().min(1, "Full name is required"),

    lrn: z.string().regex(/^\d{12}$/, "LRN must be exactly 12 digits"),

    academic_year_start: z.coerce
      .number()
      .min(1900, "Invalid year")
      .max(currentYear + 1, "Invalid year"),

    academic_year_end: z.coerce
      .number()
      .min(1900, "Invalid year")
      .max(currentYear + 1, "Invalid year"),

    purpose: z.string().min(1, "Purpose is required"),

    agreement: z.boolean().refine((value) => value === true, {
      message: "You must agree before submitting.",
    }),
  })
  .refine((data) => data.academic_year_end >= data.academic_year_start, {
    path: ["academic_year_end"],
    message: "End year must be greater than or equal to start year.",
  });

const RequestForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      lrn: "",
      academic_year_start: "",
      academic_year_end: "",
      purpose: "",
      agreement: false,
    },
  });

  const createRequest = useCreateRequest();
  const isSubmitting = createRequest.isPending;

  const onSubmit = async ({ agreement, ...data }) => {
    try {
      await createRequest.mutateAsync(data);
      toast.success("Request submitted successfully");
      reset();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="border rounded-xl shadow-md overflow-hidden">
      <div className="bg-green-700 px-10 py-4">
        <span className="text-2xl text-white font-bold">
          Request Application Form
        </span>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="p-10 space-y-8">
          <div className="space-y-4 border-b pb-8">
            <div className="flex gap-2 items-center text-green-700 text-lg">
              <UserCircle />
              <span>Student Information</span>
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <span className="text-sm text-slate-600">
                  Full Name (Last, First, Middle)
                </span>

                <input
                  {...register("name")}
                  placeholder="e.g. Dela Cruz, Juan Santos"
                  className="border rounded-lg px-3 py-2"
                />

                {errors.name && (
                  <p className="text-xs text-red-500">{errors.name.message}</p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <span className="text-sm text-slate-600">
                  Learner Reference Number (LRN)
                </span>

                <input
                  {...register("lrn")}
                  placeholder="12-digit number"
                  className="border rounded-lg px-3 py-2"
                />

                {errors.lrn && (
                  <p className="text-xs text-red-500">{errors.lrn.message}</p>
                )}
              </div>

              <div className="flex flex-col gap-2 col-span-2">
                <span className="text-sm text-slate-600">
                  Last School Year Attended
                </span>

                <div className="flex gap-2 items-center">
                  <input
                    type="number"
                    {...register("academic_year_start")}
                    placeholder="Start Year"
                    className="border rounded-lg px-3 py-2 flex-1"
                  />

                  <span>-</span>

                  <input
                    type="number"
                    {...register("academic_year_end")}
                    placeholder="End Year"
                    className="border rounded-lg px-3 py-2 flex-1"
                  />
                </div>

                {(errors.academic_year_start || errors.academic_year_end) && (
                  <p className="text-xs text-red-500">
                    {errors.academic_year_start?.message ||
                      errors.academic_year_end?.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-4 border-b pb-8">
            <div className="flex gap-2 items-center text-green-700 text-lg">
              <FileTextIcon />
              <span>Request Details</span>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-sm text-slate-600">Purpose of Request</span>

              <input
                {...register("purpose")}
                placeholder="e.g. Enrollment"
                className="border rounded-lg px-3 py-2"
              />

              {errors.purpose && (
                <p className="text-xs text-red-500">{errors.purpose.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex gap-2 items-start">
              <div className="p-0.5">
                <input type="checkbox" {...register("agreement")} />
              </div>

              <p className="text-sm">
                I hereby certify that the information provided is true and
                correct. I authorize the Institution to verify my records for
                the purpose of this request in accordance with the{" "}
                <span className="text-green-700 underline">
                  Data Privacy Act
                </span>
                .
              </p>
            </div>

            {errors.agreement && (
              <p className="text-xs text-red-500">{errors.agreement.message}</p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className={`bg-green-700 text-white w-full flex justify-center items-center rounded-md py-3 transition ${
                isSubmitting
                  ? "opacity-70 cursor-not-allowed"
                  : "hover:bg-green-800"
              }`}
            >
              <div className="flex gap-2 items-center font-bold">
                {isSubmitting ? (
                  <>
                    <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Request</span>
                    <SendHorizonalIcon size={15} strokeWidth={2.5} />
                  </>
                )}
              </div>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RequestForm;
