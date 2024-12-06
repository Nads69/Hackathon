import { CurrencyProvider } from "./contexts/context";
import NavBar from "./Components/NavBar/NavBar";
import Header from "./Components/Header/Header";
import ChooseCurrency from "./Components/ChooseCurrency";
import Advice from "./Components/Advice/Advice";
import Footer from "./Components/Footer/Footer";
import "./App.css";


export default function App() {

  return (
    <>
      <NavBar />
      <Header />

      <CurrencyProvider>
          <ChooseCurrency />
          <Advice />
      </CurrencyProvider>

      <Footer />
    </>
  );
}
