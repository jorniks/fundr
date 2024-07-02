import NavBar from "@/components/navbar";

export default function Home() {
  return (
    <main className="flex flex-col h-screen overflow-hidden text-lg">
      <NavBar />

      <section className="container flex-1 h-full overflow-y-auto">
        <div className="flex items-center justify-center py-8">
          This app serves to demonstrate the usage of web3-react for wallet connection in dApps.
        </div>
      </section>
    </main>
  );
}
