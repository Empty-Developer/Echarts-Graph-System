import Header from "@/app/_components/Header";
import CustomChart from "./_components/Graph";

export default function Home() {
  return (
    <main className="bg-[#F9EBEA] min-h-screen cursor-pointer">
      <div className="relative z-10 flex h-full flex-col">
        <Header />
        <div className="w-full flex-1 flex items-center justify-center px-4 py-8 bg-[#F9EBEA] ">
          <div className="w-full max-w-4xl mx-auto"> 
            <CustomChart />
          </div>
        </div>

      </div>
    </main>
  );
}