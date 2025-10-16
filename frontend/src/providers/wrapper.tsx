import { ReactNode } from "react";
import { ApolloProvider } from "./apollo-provider";
import { ThemeProvider } from "./theme-provider";
import { UserProvider } from "./user-provider";

export function WrapperProvider({ children }: { children: ReactNode }) {
  return (
    <ApolloProvider>
      <UserProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </UserProvider>
    </ApolloProvider>
  );
}
