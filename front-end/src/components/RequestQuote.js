import '../styling/RequestQuote.css';
import { useState, useEffect } from 'react';
import { apiService } from '../services/api.service';
import FinalQuote from './FinalQuote';

export default function RequestQuote() {

    const [cars, setCars] = useState([]);
    const [driverAge, setDriverAge] = useState(0);
    const [selectedCar, setSelectedCar] = useState('');
    const [purchasePrice, setPurchasePrice] = useState(0);
    const [statusLabel, setStatusLabel] = useState('');

    const [driverAgeLabelColor, setDriverAgeLabelColor] = useState('');
    const [carLabelColor, setCarLabelColor] = useState('');
    const [priceLabelColor, setPriceLabelColor] = useState('');

    const [requestQuoteDisplay, setRequestQuoteDisplay] = useState('');
    const [finalQuoteDisplay, setFinalQuoteDisplay] = useState(false);

    const [globalPrice, setGlobalPrice] = useState(0);
    const [universePrice, setUniversePrice] = useState(0);

    const [globalPriceYear, setGlobalPriceYear] = useState(0);
    const [universePriceYear, setUniversePriceYear] = useState(0);

    useEffect(() => {
        async function fetchData() {
            try {
                let carsArray = await apiService.getCars();
                setCars(carsArray);
            } catch (err) {
                console.log(err);
                alert('No cars available at this moment to request for quote.');
                localStorage.clear();
                window.location = '/login';
            }
        }
        fetchData();
    }, []);

    const handleDriverAgeChange = (e) => {
        setDriverAge(e.target.value);
    }
    const handleCarSelectionChange = (e) => {
        setSelectedCar(e.target.value);
    }
    const handlePurchasePriceChange = (e) => {
        setPurchasePrice(e.target.value);
    }

    const formValidation = (event) => {
        event.preventDefault();
        if (!isNaN(driverAge) && driverAge > 0
            && selectedCar.length > 0
            && !isNaN(purchasePrice) && purchasePrice > 0) {
            priceValidate();
        }
        else {
            if (driverAge <= 0) alert('Please enter age of the driver');
            else if (isNaN(driverAge)) alert('Please enter a valid age of the driver');
            else if (selectedCar.length <= 0) alert('Please select the car');
            else if (purchasePrice <= 0) alert('Please enter the purchase price');
            else if (isNaN(purchasePrice)) alert('Please enter a valid purchase price');
        }
    }

    const priceValidate = () => {
        setDriverAgeLabelColor();
        setCarLabelColor();
        setPriceLabelColor();
        let labelErrorColor = 'red';

        if (purchasePrice < 5000) {
            setStatusLabel('Sorry! The price of the car is too low');
            setPriceLabelColor(labelErrorColor);
        }
        else if (driverAge < 18) {
            setStatusLabel('Sorry! The driver is too young');
            setDriverAgeLabelColor(labelErrorColor);
        }
        else if (driverAge >= 18 && driverAge < 25 && selectedCar === 'PORSCHE') {
            setStatusLabel('Sorry! We can not accept this particular risk');
            setDriverAgeLabelColor(labelErrorColor);
            setCarLabelColor(labelErrorColor);
        }
        else {
            let carArray = cars.filter(
                car => car.model_name === selectedCar
            );
            if (carArray.length > 0) {
                let carBasePrice = carArray[0].price_in_eur;
                let extraPercentage = carArray[0].percentage;


                setGlobalPrice((carBasePrice / 12).toFixed(2));
                setUniversePrice(((carBasePrice + extraPercentage / 100 * purchasePrice).toFixed(2) / 12).toFixed(2));

                setGlobalPriceYear(carBasePrice);
                setUniversePriceYear(((carBasePrice + extraPercentage / 100 * purchasePrice).toFixed(2)));
            }

            setFinalQuoteDisplay(true);
            setRequestQuoteDisplay("none");
        }
    }
    return (
        <div>
            <div className="Mask" style={{ display: requestQuoteDisplay }}>
                <form className="login-form" onSubmit={formValidation}>
                    <div className="Rectangle-6">
                        <center>
                            <table className="quote-table">
                                <tbody>
                                    <tr>
                                        <td>
                                            Age of the driver
                                        </td>
                                        <td>
                                            <input type="text" className="age-driver" onChange={handleDriverAgeChange} style={{ borderColor: driverAgeLabelColor, color: driverAgeLabelColor }} required />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Car
                                        </td>
                                        <td>
                                            <select className="car-select" name='selectedCar' onChange={handleCarSelectionChange} style={{ borderColor: carLabelColor, color: carLabelColor }} required>
                                                <option value=""></option>
                                                {
                                                    cars.map((car) =>
                                                        <option key={car._id}
                                                            value={car.model_name}>
                                                            {car.model_name}
                                                        </option>
                                                    )
                                                }
                                            </select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Purchase Price
                                        </td>
                                        <td>
                                            <input type="text" className="purchase-price" onChange={handlePurchasePriceChange} style={{ borderColor: priceLabelColor, color: priceLabelColor }} required />
                                            <span className="purchase-currency" style={{ color: priceLabelColor }}>€</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <br />
                            <div className="status-label">{statusLabel}</div>
                            <div className="get-price">
                                <input type="submit" name="submit" value="Get a price" className="get-price get-price-label" />
                            </div>
                        </center>
                    </div>
                </form>
            </div>
            <FinalQuote show={finalQuoteDisplay} globalPrice={globalPrice} universePrice={universePrice} globalPriceYear={globalPriceYear} universePriceYear={universePriceYear} />
        </div>
    )
}