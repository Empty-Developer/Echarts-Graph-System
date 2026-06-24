import Header from "@/app/_components/Header";
import CustomChart from "./_components/Graph";

export default function Home() {
  return (
    <main className="bg-[#FFEAEC] min-h-screen cursor-pointer flex flex-col">
      <Header />
      <div className="w-full flex-1 flex items-center justify-center px-4 py-8 hover:bg-[#FFDFE3] transition-colors duration-200">
        <div className="w-full max-w-4xl mx-auto"> 
          <CustomChart />
        </div>
      </div>
    </main>
  );
}