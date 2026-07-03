import "../css/Login.css";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLogin } from "../../hooks/useAuth";
import { toast } from "sonner";

const loginSchema = z.object({
  email: z.string().trim().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const login = useLogin();

  const onSubmit = async (data) => {
    try {
      await login.mutateAsync(data);
      toast.success("Logged in successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div
      className="login-page h-full"
      style={{ backgroundImage: "url(/gulodBG.jpg)" }}
    >
      <div className="login-container">
        {/* Logo sits above the card (as in the mockup) */}
        <img
          className="login-logo"
          src="/gulodLogo.png"
          alt="Gulod National Highschool logo"
        />

        <div className="login-card">
          <h1 className="login-title">Sign in</h1>

          <form onSubmit={handleSubmit(onSubmit)} className="login-form">
            <div className="form-group">
              <input placeholder="Email" {...register("email")} />
              <p className="py-2 px-3 text-red-500 text-xs font-semibold tracking-wide">
                {errors.email?.message}
              </p>
            </div>

            <div className="form-group">
              <input
                type="password"
                placeholder="Password"
                {...register("password")}
              />
              <p className="py-2 px-3 text-red-500 text-xs font-semibold tracking-wide">
                {errors.password?.message}
              </p>
            </div>

            <button
              type="submit"
              className="login-button"
              disabled={login.isPending}
            >
              {login.isPending ? "Logging in..." : "Login"}
            </button>

            <a href="/" className="forgot-password">
              Forgot Password?
            </a>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
