import { ReactNode } from "react";
import { ApolloProvider } from "./apollo-provider";
import { ThemeProvider } from "./theme-provider";

export function WrapperProvider({ children }: { children: ReactNode }) {
  return (
    <ApolloProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </ApolloProvider>
  );
}
