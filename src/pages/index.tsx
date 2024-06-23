// Shadcn
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Inter } from "next/font/google";
// Next
import { useRouter } from "next/navigation";
// Forms
import {SubmitHandler, set, useForm} from "react-hook-form";
// Api Services
import { MongoApi } from "@/modules/mongodb/mongodb.api";
interface IFormInput {
  username: string;
  password: string;
}
const mongoApi = MongoApi;
const inter = Inter({ subsets: ["latin"] });
export default function Home() {
  const router = useRouter();
  const { register, handleSubmit, getValues, resetField, reset, setError,formState: { errors }, } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const userFromDb = await mongoApi.getUserFromDb("demo_user") as IFormInput;
    console.log('fromdb', userFromDb);
     if (data.username === userFromDb.username && data.password === userFromDb.password) {
      router.push("/homepage");
     } else {
      setError("username", {
        type: "manual",
        message: "Invalid credentials",
      });
     }

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
          {errors.username && (
          <p className="text-red-500 text-sm italic pb-6">
            {errors.username.message}
          </p>
        )}
          <Button className="w-full italic bg-light-green" type="submit" >Login</Button>
          <p className="flex w-full justify-center py-2">Or</p>
          <Button className="w-full italic bg-light-green" onClick={() => console.log('will create an account')}>Create an account</Button>
        </section>
        </form>
       
      </div>
    </main>
  );
}
