import "./Advice.css";
import AdviceObject from "../../utils/advice.json"
import { useEffect, useState } from "react";
import { useCurrency } from "../../contexts/context";



interface currencyData  {
  country: string;
  gestes: string;
  phrase: string;
  conseil: string;
}

  export default function Advice() {

    
  const   [currencyData, setCurrencyData] = useState<currencyData | null>(null);
  const   [selectedCurrency, setSelectedCurrency] = useState("");
  const   {toList} = useCurrency();
  const   {isSubmitted} = useCurrency();
  const   [error, setError] = useState(null);


  function findRightCurrencyInJsonList()
  {
    let index = 0;

    while(Object.keys(AdviceObject.data)[index])
    {
      const   newObj = Object.entries(AdviceObject.data)[index]; 
      //console.log(newObj[0])
      //console.log(index);
      //console.log(Object.values(AdviceObject.data)[index])
      //console.log(Object.entries(AdviceObject.data)[index])

      if(newObj[0] == toList)
      {
        console.log(Object.values(AdviceObject.data)[index]);
        setCurrencyData(Object.values(AdviceObject.data)[index]);
      }
      index++;
    }

    return;
  }


  useEffect(() => {

    const url = `http://localhost:3000/Currency?curr=${toList}`; 
    setSelectedCurrency(toList);
    //console.log(url);
    //console.log(toList);
    //console.log(isSubmitted);

    if(isSubmitted == false)
    {
      console.log("cannot launch fetch to get curr")
    }
    else
    { 

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
          console.log( "this data from fetch ",data);
          console.log("this data from Json in util", AdviceObject);

          findRightCurrencyInJsonList();

       })
        .catch((error) => {
          console.error("Erreur:", error);
          setError(error.message);
        });
    }
    
  }, [toList, isSubmitted]);


/*
  const handleCurrencyChange = (event) => {
    setSelectedCurrency(event.target.value);
  };*/

  if (error) {
    return <div>Erreur de chargement : {error}</div>;
  }

  if (!currencyData) {
    return <div>Chargement...</div>;
  }

  //const selectedCountryInfo = currencyData[selectedCurrency];


  return (
    <div className="advice-container">
      <h1>Conseils de Voyage</h1>

          <div className="country-details">

              <h2>{currencyData.country}</h2>

              <div className="detail-section">
                <h3>Gestes culturels :</h3>
                <p>{currencyData.gestes}</p>
              </div>

              <div className="detail-section">
                <h3>Phrase utile :</h3>
                <p>{currencyData.phrase}</p>
              </div>

              <div className="detail-section">
                <h3>Conseil de voyage :</h3>
                <p>{currencyData.conseil}</p>
              </div>

          </div>

    </div>
  )
/*
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
  */
}
