import { LoginProvider } from "./contexts/LoginContext";
import StackHolder from "./stacks/StackHolder";
import { ApolloProvider } from "@apollo/client";
import client from "./configs/apollo";

export default function App() {
  return (
    <ApolloProvider client={client}>
    <LoginProvider>
      <StackHolder />
    </LoginProvider>
  </ApolloProvider>
  );
}


