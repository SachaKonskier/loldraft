import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Inter } from "next/font/google";
import { useRouter } from "next/navigation";
import {SubmitHandler, useForm} from "react-hook-form";
interface IFormInput {
  username: string;
  password: string;
}
const inter = Inter({ subsets: ["latin"] });
export default function Home() {
  const { register, handleSubmit, getValues, resetField, reset, formState: { errors }, } = useForm<IFormInput>();
  const router = useRouter();
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
   if (data.username ==="demo_user" && data.password === "randompassword")
    router.push("/homepage");
    

  }
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className} bg-gradient-to-r from-light-green to-darkGray`}
    >
     
      <div>
        <h1 className="text-5xl  text-white uppercase pb-12 font-barlow font-black italic">Smart Draft</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
        <section className="text-white italic">
          <Label className="">User ID</Label>
          <Input {...register("username")} className="text-black focus-visible:ring-0 focus-visible:ring-offset-0 mt-2 mb-6"/>
          <Label>Password</Label>
          <Input {...register("password")} type="password" className="text-black focus-visible:ring-0 focus-visible:ring-offset-0 mt-2 mb-6"/>
          <Button className="w-full italic bg-light-green" type="submit" >Login</Button>
        </section>
        </form>
      </div>
    </main>
  );
}
