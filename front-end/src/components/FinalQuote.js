import '../styling/FinalQuote.css';
import "react-toggle/style.css";
import { useState } from "react";
import { IntlProvider, FormattedNumber } from 'react-intl';
import Toggle from "react-toggle";
import valid from '../assets/valid.svg';
import list from '../assets/icon-comparison.svg'

export default function FinalQuote(props) {

    const monthLabel = "month";
    const yearLabel = "year";
    const [offerContext, setOfferContext] = useState(monthLabel);
    const [isYear, setIsYear] = useState(false);

    const updateForYear = () => {
        setOfferContext(yearLabel);
    }

    const updateForMonth = () => {
        setOfferContext(monthLabel);
    }

    const handleChange = (e) => {
        if (offerContext === yearLabel) {
            setIsYear(e.target.checked);
            updateForMonth();
        }
        else {
            setIsYear(e.target.checked);
            updateForYear();
        }
    }


    if (!props.show) {
        return (
            <div></div>
        )
    }
    else {
        return (
            <div className="final-quote">
                <div className="Mask-Quote">
                    <div className="plan">
                        <h2>Select a plan</h2>
                        <div>
                            <span className="pay" style={{ fontWeight: offerContext === monthLabel ? 'bold' : '' }}>PAY MONTHLY</span>
                            <span>
                                <Toggle
                                    className="PriceToggle"
                                    checked={isYear}
                                    onChange={toggleEvent => handleChange(toggleEvent)}
                                    icons={{ checked: "", unchecked: "" }}
                                />
                            </span>
                            <span className="pay" style={{ fontWeight: offerContext === yearLabel ? 'bold' : '' }}>PAY YEARLY</span>
                        </div>
                        <div className="float-container">

                            <div className="float-child">
                                <div className="global">
                                    <h3>Global
                                    </h3>
                                    <div className="offer-price">
                                        <IntlProvider locale="be" defaultLocale="en">
                                            <FormattedNumber
                                                value={offerContext === monthLabel ? props.globalPrice : props.globalPriceYear}
                                                style="currency"
                                                currency="EUR" />
                                        </IntlProvider>
                                        <div className="offer-context">
                                            {offerContext === monthLabel ? "MONTHLY" : "YEARLY"} INCL. TAXES
                                        </div>
                                    </div>
                                    <div className="offer-info-section">
                                        <div className="offer-info">
                                            Maximum duration travel <span className="offer-info-normal">of</span> 90 days
                                        </div>
                                        <div className="offer-info">
                                            Medical expenses reimbursement <span className="offer-info-normal">up to</span> 1.000.000 €
                                        </div>
                                        <div className="offer-info">
                                            Personal assistance abroad <span className="offer-info-normal">up to</span> 5.000 €
                                        </div>
                                        <div className="offer-info">
                                            Travel assistance abroad <span className="offer-info-normal">up to</span> 1.000 € <span className="offer-info-normal">per insured per travel</span>
                                        </div>
                                        <div className="offer-info">
                                            Coverage duration: 1 year
                                        </div>
                                        <div className="offer-button">
                                            <span className="offer-btn-valid"><img src={valid} alt="select" /></span>
                                            <span className="offer-btn-text">Plan selected</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="float-child">
                                <div className="universe">
                                    <h3>Universe</h3>
                                    <div className="offer-price-universe">
                                        <IntlProvider locale="nl" defaultLocale="en">
                                            <FormattedNumber
                                                value={offerContext === monthLabel ? props.universePrice : props.universePriceYear}
                                                style="currency"
                                                currency="EUR" />
                                        </IntlProvider>
                                        <div className="offer-context">
                                            {offerContext === monthLabel ? "MONTHLY" : "YEARLY"} INCL. TAXES
                                        </div>
                                    </div>
                                    <div className="offer-info-section">
                                        <div className="offer-info">
                                            Maximum duration travel <span className="offer-info-normal">of</span> 180 days
                                        </div>
                                        <div className="offer-info">
                                            Medical expenses reimbursement <span className="offer-info-normal">up to</span> 3.000.000 €
                                        </div>
                                        <div className="offer-info">
                                            Personal assistance abroad <span className="offer-info-normal">up to</span> 10.000 €
                                        </div>
                                        <div className="offer-info">
                                            Travel assistance abroad <span className="offer-info-normal">up to</span> 2.500 € <span className="offer-info-normal">per insured per travel</span>
                                        </div>
                                        <div className="offer-info">
                                            Coverage duration: 1 year
                                        </div>
                                        <div className="offer-button offer-not-selected">
                                            <span className="offer-btn-text">Choose this Plan</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>

                </div>
                <div className="list">
                    <span className="list-txt">Show me the full comparison table</span>
                    <img src={list} alt="comparision" />
                </div>
            </div>
        )
    }

}