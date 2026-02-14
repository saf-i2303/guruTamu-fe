import { GalleryVerticalEnd } from "lucide-react"

import { LoginForm } from "@/components/login-form"
import { useAuthStore } from "@/stores/auth-store"
import { useNavigate } from "react-router"
import { login } from "@/services/user";
import { type LoginRequest } from "@/types/user";
import cookie from "react-cookies";

export default function Login() {
  const navigate = useNavigate();
  const authLogin = useAuthStore((state) => state.login);

  const handleSubmit = (values : LoginRequest) => {
    login(values).then((res) => { 
      const apiKey = res?.data?.apiKey ?? "";
      const id = res?.data?.user?.id ?? "";
      const name = res?.data?.user?.name ?? "";
      const email = res?.data?.user?.email ?? "";

      cookie.save("apiKey", apiKey, { 
        path: "/",
        maxAge: 60 * 60 * 24 * 7, })

      authLogin({ apiKey, user: { id, name, email }
       });
      navigate("/dashboard" ,{replace: true});
    });
  };
    


  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
            <GalleryVerticalEnd className="size-4" />
          </div>
          Taskly Inc.
        </a>
        <LoginForm onLogin={handleSubmit} />
      </div>
    </div>
  )
}
