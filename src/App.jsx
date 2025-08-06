import "./App.css";
import { CenterScreenLoader } from "./components/CenterScreenLoader";
import { Header } from "./components/layout/Header";
import { ProductListPage } from "./pages/ProudctListPage";
function App() {
   const { user, loading } = useAuth(); // custom hook để load profile và check auth

  if (loading) return <CenterScreenLoader></CenterScreenLoader>;

   return (
      <>
         <Header ></Header>
         <ProductListPage></ProductListPage>
      </>
   );
}

export default App;
