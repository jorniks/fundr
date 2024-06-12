import NavBar from "@/components/navbar";

export default function Home() {
  return (
    <main className="h-screen overflow-hidden">
      <NavBar />

      <section className="h-full flex items-center justify-center text-2xl font-semibold px-4">
        This app serves to demonstrate the usage of web3-react for wallet connection in dApps.
      </section>
    </main>
  );
}
