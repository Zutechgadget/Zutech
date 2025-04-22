
import { UserProvider } from "@/context/UserContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/App.css";

export default function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
}
