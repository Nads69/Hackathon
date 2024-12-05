import CurrencyReferences from "../utils/CurrencyList.json";
import { useState } from "react";

interface CurrencyData {
    currencies: string[];
}

function ChooseCurrency()
{

const   CurrencyRefs : CurrencyData = CurrencyReferences;
const   [fromList, setFromLis] = ("");
const   [ToList, setToLis] = ("");


return(

    <div>

        <div>
            <select name="From" id="FromCurrency">
                {CurrencyRefs.currencies.map( (currency: string, index: number) => (
                    <option  key={index} value={currency}>{currency}</option>
                ))}
            </select>
        </div>


        <div>
            <select name="To" id="ToCurrency">
                {CurrencyRefs.currencies.map( (currency: string, index: number) => (
                    <option  key={index} value={currency}>{currency}</option>
                ))}
            </select>
        </div>

    </div>

);

}

export default ChooseCurrency;