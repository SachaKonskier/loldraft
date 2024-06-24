// Shadcn
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// Icons
import CloseIcon from "@mui/icons-material/Close";
// Api Services
import { MongoApi } from "@/modules/mongodb/mongodb.api";
// Forms
import { SubmitHandler, useForm } from "react-hook-form";
interface IFormInput {
  username: string;
  password: string;
}
const mongoApi = MongoApi;
export default function CreateUserModal({
  setOpenModal,
}: {
  setOpenModal: any;
}) {
  // username and password field
  const {
    register,
    handleSubmit,
    getValues,
    setError,
    formState: { errors, isDirty, isValid },
  } = useForm<IFormInput>({ mode: "onChange" });
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const user = getValues();
    console.log(user);
    const userFromDb = (await mongoApi.getUserFromDb(
      user.username
    )) as any;
    console.log(userFromDb.message)
    if (userFromDb.message === "User already exists") {
      setError("username", {
        type: "manual",
        message: "username is already taken",
      });

    } 
    if (userFromDb.message === "User not found") {
      const result = await mongoApi.insertUserToDb(user);
      console.log(result);
      setOpenModal(false);
    }

  };
  return (
    <div className="fixed rounded-lg left-0 top-0 w-full h-full bg-black bg-opacity-50 z-50 overflow-auto backdrop-blur flex justify-center items-center">
      <div className="w-[340px] h-fit ">
        <Card className="p-6 bg-gradient-to-r from-light-green to-darkGray text-white">
          <CardHeader className="font-barlow uppercase italic font-black pb-6">
            <section className="flex justify-between items-center">
              <CardTitle>Create your account</CardTitle>
              <Button
                className="bg-transparent hover:bg-current/60 ml-auto"
                onClick={() => setOpenModal(false)}
              >
                <CloseIcon />
              </Button>
            </section>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Label>Username</Label>
              <Input
                {...register("username")}
                className="text-black focus-visible:ring-0 focus-visible:ring-offset-0"
                type="text"
              />
              <Label>Password</Label>
              <Input
                {...register("password")}
                className="text-black focus-visible:ring-0 focus-visible:ring-offset-0 "
                type="password"
              />

              <p className=" pt-6">
                <Button
                  className="w-full italic  bg-light-green"
                  type="submit"
                  disabled={!isDirty || !isValid}
                >
                  Create
                </Button>
              </p>
            </form>
          </CardContent>
          {errors.username && (
            <p className="text-red-500 text-sm italic px-6">
              {errors.username.message}
            </p>
          )}
        </Card>
      </div>
    </div>
  );
}
