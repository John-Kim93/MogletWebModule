import { AppProps } from 'next/app'
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'
// import { ReactQueryDevtools } from "react-query/devtools";
import './globals.css'
import React from "react"
import { ThemeProvider, ColorModeProvider } from "@chakra-ui/react"

export default function App({ Component, pageProps} :AppProps ) {
  // Create a react query client
  const [queryClient] = React.useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        // staleTime: 30 * 60 * 1000,
        cacheTime: 2 * 60 * 60 * 1000,
      },
    }
  }))

  return (
    <ColorModeProvider>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </ColorModeProvider>
  );
}