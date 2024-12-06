import CurrencyReferences from "../utils/CurrencyList.json";
import { useEffect, useState } from "react";
import "../Components/ChooseCurrency.css";

interface CurrencyData {
	currencies: string[];
}

function computeBalance(result: number, resultInput: number): number {
	const product = result * resultInput;
	return Math.round(product * 100) / 100; // Arrondir à deux décimales
}

function ChooseCurrency() {
	const CurrencyRefs: CurrencyData = CurrencyReferences;
	const [fromList, setFromList] = useState("");
	const [toList, setToList] = useState("");
	const [balance, setBalance] = useState("");
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [resultInput, setResultInput] = useState(0);
	const [conversionResult, setConversionResult] = useState("");

	const apiKey = import.meta.env.VITE_CLIENT_API_KEY;

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
			(char) => char.charCodeAt(0) >= 48 && char.charCodeAt(0) <= 57,
		);

		if (isValid || input === "") {
			setBalance(input);
			const resultInput = parseFloat(parseFloat(input).toFixed(2)) || 0;
			setResultInput(resultInput);
			console.log("ResultInput:", resultInput);
		}
	};

	const handleProcessInput = () => {
		setIsSubmitted(true);
	};

	useEffect(() => {
		const url = `https://api.freecurrencyapi.com/v1/latest?apikey=${apiKey}&currencies=${toList}&base_currency=${fromList}`;

		if (fromList === "" || toList === "" || balance === "") {
			console.log("Veuillez sélectionner des devises et saisir un montant.");
			return;
		}

		fetch(url)
			.then((response) => {
				if (!response.ok) {
					throw new Error("Error fetching data from API");
				}
				return response.json();
			})
			.then((responseJson) => {
				const result = Object.values(responseJson.data)[0] as number;
				setConversionResult(computeBalance(result, resultInput).toString());
			})
			.catch((error) => {
				console.error(error);
			});
	}, [fromList, toList, isSubmitted]);

	return (
		<div>
			<div className="currency-selectors">
				<select
					name="From"
					id="FromCurrency"
					className="currency-container"
					onChange={(selection) => HandleChoiceFrom(selection.target.value)}
				>
					<option value="">From </option>
					{CurrencyRefs.currencies.map((currency: string, index: number) => (
						<option key={index} value={currency}>
							{currency}
						</option>
					))}
				</select>

				<select
					name="To"
					id="ToCurrency"
					className="currency-container"
					onChange={(selection) => HandleChoiceTo(selection.target.value)}
				>
					<option value="">To</option>
					{CurrencyRefs.currencies.map((currency: string, index: number) => (
						<option key={index} value={currency}>
							{currency}
						</option>
					))}
				</select>
			</div>

			<div>
				<input
					type="text"
					className="valeur-result"
					value={balance}
					onChange={(event) => handleBalanceInput(event.target.value)}
					placeholder="Enter amount"
				/>
			</div>
			<button onClick={handleProcessInput}>Submit</button>

			<label>
				<input
					type="text"
					className="valeur-result"
					value={conversionResult}
					placeholder="Conversion result"
					readOnly
				/>
			</label>
		</div>
	);
}

export default ChooseCurrency;
