import { Inter } from "next/font/google";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();
  function redirect() {
    router.push("/homepage");
  }
  redirect();
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <div className="bg-light-green w-32 h-32"></div>
    </main>
  );
}
