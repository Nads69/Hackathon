import CurrencyReferences from "../utils/CurrencyList.json";
import { useEffect, useState } from "react";

interface CurrencyData {
    currencies: string[];
}

function computeBalance(result : number, resultInput :number )
{
    var product =  result * resultInput
    // return parseFloat(product).toFixed(2)
    return Math.round(product * 100) / 100;
}

function ChooseCurrency()
{

    const   CurrencyRefs : CurrencyData = CurrencyReferences;
    const   [fromList, setFromList] = useState("");
    const   [toList, setToList] = useState("");
    const   [balance, setBalance] = useState("");
    const   [isSubmitted, setIsSubmitted] = useState(false);
    const   [resultInput, setResultInput] = useState(0);
    const   [conversionResult, setConversionResult] = useState("");

    const   apiKey = import.meta.env.VITE_CLIENT_API_KEY;
    

    const HandleChoiceFrom = (name: string) => {
        setFromList(name);
        console.log(name);
    };

    const HandleChoiceTo = (name: string) => {
        setToList(name);
        console.log(name);
    };

    const handleBalanceInput = (input: string) => {

        const isValid = [...input].every(
            (char) => char.charCodeAt(0) >= 48 && char.charCodeAt(0) <= 57
          );
      
          if(isValid) {
            setBalance(input);
        }
        const   resultInput = parseFloat(parseFloat(balance).toFixed(2)); 
        setResultInput(resultInput);
        console.log( " ResultInput",resultInput);        
    }

    const handleProcessInput = () => {
        setIsSubmitted(true);
    }


  useEffect(() => {
    
    const url = `https://api.freecurrencyapi.com/v1/latest?apikey=${apiKey}&currencies=${toList}&base_currency=${fromList}`;

    console.log(url);

    if(fromList === "" || toList === "" )
    {
        console.log("working");
    }
    else{
        console.log("test");

        fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error fetching data from API");
          }
          return response.json();
        })
        .then((responseJson) => {
            console.log(responseJson);

            const result = Object.values(responseJson.data)[0];
            //console.log( " ComputeBlance",computeBalance(result, resultInput));
            setConversionResult(computeBalance(result, resultInput));
            //console.log(" result API",result);
           
        })
        .catch((error) => {
          console.error(error);
        });

    }

}, [fromList, toList, isSubmitted]);


return(

    <div>

      

        <div>
            <select name="From" id="FromCurrency"
             onChange={(selection) => HandleChoiceFrom(selection.target.value)}>
            
                {CurrencyRefs.currencies.map( (currency: string, index: number) => (
                    <option  key={index} value={currency}>{currency} </option>
                ))}

            </select>
        </div>


        <div>
            <select name="To" id="ToCurrency"
                onChange={(selection) => HandleChoiceTo(selection.target.value)}>

                {CurrencyRefs.currencies.map( (currency: string, index: number) => (
                    <option  key={index} value={currency}>{currency}</option>
                ))}

            </select>
        </div>

        <div>
            <input type="text"
            value={balance}
            onChange={(event)=>{handleBalanceInput(event.target.value)}}
            placeholder="Only numbers"/> 
        </div>
        <button onClick={handleProcessInput} >Submit</button>

        <label>
       
        <input
          type="text"
          value={conversionResult}
          placeholder="Conversion result" 
          readOnly 
        />
      </label>

    </div>

);
}
export default ChooseCurrency;