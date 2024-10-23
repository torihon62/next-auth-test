import { auth } from "@/auth";

const ServerComponent = async () => {
  const session = await auth();
  const user = session?.user;

  return <p>{JSON.stringify(user)}</p>;
};

export default ServerComponent;
