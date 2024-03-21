import { ApolloClient, InMemoryCache } from "@apollo/client";
import { createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import * as SecureStore from "expo-secure-store";

const httpLink = createHttpLink({
  uri: "https://server.esyaahmad.tech/",
});

const authLink = setContext(async (_, { headers }) => {
    const token = await SecureStore.getItemAsync("token");
  
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  });
  
  const client = new ApolloClient({
    // uri: "http://localhost:4000",
    // uri: "https://sh506249-4000.asse.devtunnels.ms/",
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
  
  export default client;