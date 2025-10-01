import { ReactNode } from "react";
import { ApolloProvider } from "./apollo-provider";

export function WrapperProvider({ children }: { children: ReactNode }) {
  return <ApolloProvider>{children}</ApolloProvider>;
}
