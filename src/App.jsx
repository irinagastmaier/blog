//query
import { QueryClient, QueryClientProvider } from "react-query";
//styles
import "./assets/styles/scss/style.scss";
//components
import { Posts } from "./container/Posts";
import Navbar from "./components/Navbar";

const queryClient = new QueryClient();

function App() {
  return (
    // provide React Query client to App
    <QueryClientProvider client={queryClient}>
      <div className='App'>
        <Navbar />
        <Posts />
      </div>
    </QueryClientProvider>
  );
}

export default App;
