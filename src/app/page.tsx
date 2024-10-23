import ClientComponent from "@/components/ClientComponent";
import ServerComponent from "@/components/ServerComponent";

const Home = async () => {
  return (
    <main>
      <ClientComponent />
      <ServerComponent />
    </main>
  );
};

export default Home;
