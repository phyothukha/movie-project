import ReactDOM from "react-dom/client";
import App from "./App.tsx";
// import { QueryClient, QueryClientProvider } from "react-query";
import { MantineProvider } from "@mantine/core";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./styles/globalStyle.css";
import "@mantine/core/styles.css";
// import { theme } from "./styles/theme.ts";
// import { ReactQueryDevtools } from "react-query/devtools";
// import MyGlobalStyle from "./styles/MyGlobalStyle.tsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // @mantine/carousel @mantine/core @mantine/form @mantine/hooks @tanstack/react-query zustand

  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <MantineProvider defaultColorScheme="light">
        <App />
      </MantineProvider>
    </QueryClientProvider>
  </BrowserRouter>
);
