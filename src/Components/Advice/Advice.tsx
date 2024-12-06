import "./Advice.css";
import { useEffect, useState } from "react";
import { useCurrency } from "../../contexts/context";


  export default function Advice() {


  const   [currencyData, setCurrencyData] = useState(null);
  const   [selectedCurrency, setSelectedCurrency] = useState(null);
  const   {toList} = useCurrency();
  const   {isSubmitted} = useCurrency();
  const   [error, setError] = useState(null);


  useEffect(() => {

    const url = `http://localhost:3000/Currency?curr=${toList}`; 
    console.log(url);
    //console.log(toList);
    //console.log(isSubmitted);

    fetch("http://localhost:3000/Currency?curr=USD", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },}
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("Erreur de récupération des données");
        }
        return res.json();
      })
      .then((data) => {
        setCurrencyData(data);
        // Sélectionner une devise par défaut (par exemple, la première)
        const firstCurrency = Object.keys(data)[0];
        setSelectedCurrency(firstCurrency);
      })
      .catch((error) => {
        console.error("Erreur:", error);
        setError(error.message);
      });
  }, [toList, isSubmitted]);



  const handleCurrencyChange = (event) => {
    setSelectedCurrency(event.target.value);
  };

  if (error) {
    return <div>Erreur de chargement : {error}</div>;
  }

  if (!currencyData) {
    return <div>Chargement...</div>;
  }

  const selectedCountryInfo = currencyData[selectedCurrency];



  return (
    <div className="advice-container">
      <h1>Conseils de Voyage par Devise</h1>

      <select
        value={selectedCurrency}
        onChange={handleCurrencyChange}
        className="currency-selector"
      >
        {Object.keys(currencyData).map((currency) => (
          <option key={currency} value={currency}>
            {currency} - {currencyData[currency].country}
          </option>
        ))}
      </select>

      {selectedCountryInfo && (
        <div className="country-details">
          <h2>
            {selectedCurrency} - {selectedCountryInfo.country}
          </h2>

          <div className="detail-section">
            <h3>Gestes culturels :</h3>
            <p>{selectedCountryInfo.gestes}</p>
          </div>

          <div className="detail-section">
            <h3>Phrase utile :</h3>
            <p>{selectedCountryInfo.phrase}</p>
          </div>

          <div className="detail-section">
            <h3>Conseil de voyage :</h3>
            <p>{selectedCountryInfo.conseil}</p>
          </div>
        </div>
      )}
    </div>
  );
}
