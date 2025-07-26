"use client";
import authService from "@/appwrite/auth/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type LoginFormInputs = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const router = useRouter();
  const {
    register,
    reset,

    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInputs>();

  const onSubmit = async (formData: LoginFormInputs) => {
    const { email, password } = formData;
    const response = await authService.login({ email, password });
    if (response) {
      toast.success("Logged in sucessfully!");
      router.push("/dashboard");
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col  max-w-sm  p-6  rounded-xl border border-gray-300 space-y-4"
      >
        <h2 className="text-xl font-semibold text-center mb-8">Sign In </h2>

        <div>
          <label className="block mb-1 font-medium">Email</label>
          <Input
            className="py-5"
            placeholder="Enter your email"
            {...register("email", {
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter valid email address",
              },
            })}
          />
          {errors.email && (
            <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium">Password</label>
          <Input
            className="py-5"
            placeholder="Enter your password"
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          {errors.password && (
            <p className="text-sm text-red-500 mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <Button
          disabled={isSubmitting}
          type="submit"
          className="w-32 py-5 self-center text-md"
        >
          {isSubmitting ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            "Sign In"
          )}
        </Button>
      </form>
    </div>
  );
}
