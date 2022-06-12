import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import {
    withStyles,
    withWidth,
    TextField,
    Button,
    InputAdornment,
} from "@material-ui/core";
import { LanguageContext } from '../../../../utils/Language';
import Grid from "@material-ui/core/Grid";
import HistoryTable from "../HistoryTable.js";
import jsonData from "../../../../resources/depositfiat.json";
import FiatCurrency from "./FiatCurrency";

import FiatCurrencySelect from './FiatCurrencySelect'
import Bank from '../../../../assets/bank.png';
import newCard from "../../../../assets/newcard.png";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Box from "@material-ui/core/Box";
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';

import { ExchangeFiatDeposit, ExchangeDepositHistory, ExchangeDepositCancelHistory, DepositFiatConfirm } from '../../../../redux/actions/wallet';
import { useLocation } from "react-router-dom";

const styles = theme => ({

    root: {
        margin: 0,
    },

    fiatBox: {
        border: "solid 0px gray",
        boxShadow: "0px 0px 16px 0px #888888",
        padding: "1px 20px",
        borderRadius: "8px",
        marginTop: "20px"
    },

    recommended: {
        border: "solid #337ab7",
        width: "104px",
        height: "25px",
        borderRadius: "10px",
        backgroundColor: "#337ab7",
        padding: "0px 4px",
        color: "white",
        margin: "21px"
    },

    recommendedLetter: {
        margin: "0px",
        fontSize: "13px"
    },

    fiatBoxTop: {
        display: "flex"
    },

    fiatBoxTopContent: {
        border: "solid #055da6",
        display: "flex",
        alignItems: "center",
        borderRadius: "14px",
        padding: "4px 0 0 10px",
        width: "100%",
        marginBottom: '30px'
    },

    bankImg: {
        width: "50px",
        margin: "10px"
    },

    fiatBoxTopContentFirstLetter: {
        fontSize: "15px",
        margin: "0px 0 0 10px",
    },
    fiatBoxTopContentSecondLetter: {
        fontSize: "12px",
        margin: "0 0 10px 10px",
        color: "#055da6"
    },
    fiatBoxBottomContent: {
        border: "solid #c6c6c6",
        display: "flex",
        borderRadius: "14px",
        padding: "10px 0 0 10px",
        margin: "0 2px 0 2px",
    },
    fiatBoxBottom: {
        border: "solid #ebebeb",
        display: "flex",
        alignItems: "center",
        borderRadius: "14px",
        padding: "4px 0 0 10px",
        width: "100%",
        marginBottom: '30px'
    },
    fiatBoxBottomImg: {
        padding: "10px 0 10px 5px"
    },
    fiatBoxBottomImgSec: {
        width: "40px"
    },

    fiatSecondHeader: {
        border: "solid #cbcbcb",
        backgroundColor: "#cbcbcb",
        borderTopLeftRadius: "14px",
        borderTopRightRadius: "14px",
        height: "50px",
        padding: "10px 0px 13px 15px"
    },
    fiatSecondHeaderLetter: {
        margin: "0",
    },
    fiatSecondBody: {
        border: "solid #cbcbcb",
        backgroundColor: "white",
        borderBottomLeftRadius: "14px",
        borderBottomRightRadius: "14px",
        padding: "10px 35px 13px 35px"
    },
    fiatSecondBodyInput: {
        marginTop: '5px',
        display: 'flex',
        justifyContent: 'center',
    },
    fiatSecondBodyInputEur: {
        margin: "0",
        float: "right"
    },
    fiatSecondBodyFee: {
        display: 'flex',
    },
    fiatSecondBodyFeeMargin: {
        marginRight: '90px'
    },
    fiatSecondBodyGetMargin: {
        marginRight: '40px'
    },
    fiatSecondBodyButton: {
        justifyContent: 'center',
        display: 'flex',
        alignItems: 'center',
        borderRadius: '4px',
        width: '146px',
        height: '36px',
        padding: '5px 41px',
        backgroundColor: '#337ab7',
        color: 'white'
    },
    fiatSecondBodyCheck: {
        padding: '18px 0'
    },
    fiatSecondPart: {
        padding: '1%'
    },
    BtcAddressHeaderTitleSecond: {
        margin: "10% 0 3% 0",
        fontSize: '13px',
        textAlign: 'center'
    },
    unit: {
        fontSize: 13,
        // padding: '0 6',
        color: 'white',
        borderRadius: '50%',
        backgroundColor: '#235580',
        width: 19,
        textAlign: 'center'
    },
    warnBox: {
        padding: '0px 20px 0px 20px',
        border: 'solid',
        borderRadius: 10,
        margin: '20px 30px 20px 0',
        borderWidth: "thin",
        borderColor: "#337ab7",
    },
    bankInfoType: {
        float: 'left',
        width: '45%'
    },
    bankInfoDetail: {
        display: 'flex',
        width: '55%',
        justifyContent: 'flex-end',
        textAlign: 'right'
    }
});

const currencies = [
    {
        value: 'USD',
        label: 'USD',
    },
    {
        value: 'EUR',
        label: 'EUR',
    },
    {
        value: 'BTC',
        label: 'BTC',
    },
    {
        value: 'JPY',
        label: 'JPY',
    },
];

var myInterval1;

function DepositFiat(props) {
    const {
        classes, user_id, userName, exchangeDepositHistory
    } = props;

    const [currency1, setCurrency1] = React.useState('BTC');
    const [currency, setCurrency] = React.useState('USD');
    const [amount, setAmount] = React.useState(0);
    const [method, setMethod] = React.useState(0);

    const historyCancel = async (payment_id) => {
        await props.ExchangeDepositCancelHistory(user_id, payment_id);
    }

    const handleCurrency = (value) => {
        setCurrency(value);
        if (method == 2)
            setMethod(0)
        if (value == 'AWG')
            setMethod(0)
        setAmount(0);
    }

    const handleChange1 = (event) => {
        setCurrency1(event.target.value);
    };

    const search = useLocation().search;

    useEffect(() => {
        var method1 = new URLSearchParams(search).get('method');
        if (method1 != null)
            setMethod(parseInt(method1))
        var currency2 = new URLSearchParams(search).get('currency');
        if (currency2 != null)
            setCurrency(currency2)
        var amount1 = new URLSearchParams(search).get('amount');
        if (amount1 != null)
            setAmount(parseFloat(amount1))
    })

    const { dictionary } = useContext(LanguageContext);

    const handleBuy = () => {
        if (amount < 50 || amount > 5000) {
            alert("Please input correct amount!");
            document.getElementById('amount_fiat').focus();
            return;
        }
        props.ExchangeFiatDeposit(user_id, currency, amount)
    }

    useEffect(() => {
        getResult1();
    }, [])

    function getResult1() {
        myInterval1 = setTimeout(() => {
            props.ExchangeDepositHistory(user_id, 'fiat');
            getResult1();
        }, 5000);
    }

    const copy = (data) => {
        const el = document.createElement('textarea');
        el.value = data;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
    }

    const bankDeposit = () => {
        if (amount <= 0) {
            alert("Please input correct amount!");
            document.getElementById('outlined-basic-amount').focus();
            return;
        }
        if (!window.confirm("We ONLY accept funding from a bank account under your own name: " + userName + ".")) return;
        setMethod(2)
    }

    return (
        <Box>
            <Grid container>
                <Grid item xs={12} sm={6} className={classes.fiatSecondPart}>
                    <div>
                        <h3>1.Select currency and payment method</h3>
                    </div>

                    <div>
                        <FiatCurrencySelect currency={currency} handleCurrency={handleCurrency} />
                    </div>
                    <div className={classes.fiatBox}>
                        <div className={classes.fiatBoxTop}>
                            <div>
                                <h4>Bank Deposit</h4>
                            </div>
                        </div>
                        <div className={(method == 0 || method == 2) ? classes.fiatBoxTopContent : classes.fiatBoxBottom} onClick={() => { setMethod(0) }}>
                            <div>
                                <img className={classes.bankImg} src={Bank} />
                            </div>
                            <div>
                                <p className={classes.fiatBoxTopContentFirstLetter}>{currency != 'AWG' ? 'International Bank Transfer (Swift)' : 'Local Transfer'}</p>
                            </div>
                        </div>
                        {currency != 'AWG' &&
                            <div className={classes.fiatBoxTop}>
                                <div>
                                    <h4>Card Deposit</h4>
                                </div>
                            </div>
                        }
                        {currency != 'AWG' &&
                            <div className={method == 1 ? classes.fiatBoxTopContent : classes.fiatBoxBottom} onClick={() => { setMethod(1) }}>
                                <div>
                                    <img className={classes.bankImg} src={newCard} />
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', fontSize: 20 }}>
                                    <p className={classes.fiatBoxTopContentFirstLetter}>Visa/Master Card</p>
                                </div>
                            </div>
                        }
                    </div>
                </Grid>
                <Grid item xs={12} sm={6} className={classes.fiatSecondPart}>
                    <div>
                        <h3>2.Payment details</h3>
                    </div>

                    <div>
                        <div className={classes.fiatSecondHeader}>
                            {method != 2 && <h3 className={classes.fiatSecondHeaderLetter}>Enter Amount</h3>}
                            {method == 2 && <h3 className={classes.fiatSecondHeaderLetter}>Bank Detail</h3>}
                        </div>
                        {method == 0 && <div className={classes.fiatSecondBody}>
                            <div className={classes.warnBox}>
                                <h4>
                                    For this payment method, {currency}  is automatically stored as USDT in a {currency == 'USD' ? '1:0.93' : (currency == 'EUR' ? '1:1.14' : '1:0.51')} ratio.
                                </h4>
                            </div>
                            <span>Amount</span>
                            <div className={classes.fiatSecondBodyInput}>

                                <TextField id="outlined-basic-amount" className="inputPrice" size="small" label="" fullWidth value={amount} onChange={(e) => { setAmount(e.target.value) }} InputProps={{
                                    endAdornment:
                                        <InputAdornment position="end">
                                            <span className={classes.unit}>{currency == 'USD' ? '$' : (currency == 'EUR' ? '€' : (currency == 'AWG' ? 'ƒ' : ''))}</span>
                                        </InputAdornment>,
                                }} />
                                {/* <h3 className={classes.fiatSecondBodyInputEur}>EUR</h3> */}
                            </div>
                            <div>
                                {/* <div className={classes.fiatSecondBodyFee}>
                                    <p className={classes.fiatSecondBodyFeeMargin} style={{marginRight:10}}>Transaction Fee:</p>
                                    <p><strong>
                                        {Number(parseFloat(amount)*(currency=='USD'?0.05:0.03)).toFixed(2)} {currency}</strong></p>
                                </div> */}
                                <div className={classes.fiatSecondBodyFee}>
                                    <div className={classes.fiatSecondBodyGetMargin}>You will get:</div>
                                    <div><strong>
                                        {Number(parseFloat(amount) * (currency == 'USD' ? 0.93 : (currency == 'EUR' ? 1.14 : (currency == 'AWG' ? 0.51 : 0)))).toFixed(3)} USDT</strong></div>
                                </div>
                            </div>
                            <div className={classes.fiatSecondBodyCheck}>
                                <h3>
                                    Important notes
                                </h3>
                                <ul>
                                    <li>You can find your deposited amount in your Wallet Exchange Crypto Balance.</li>
                                    <li>Bank transfer fee depend on the bank you use.</li>
                                    <li>The arrival time of your deposit depends on the region of your sending bank</li>
                                    <li>{currency == 'AWG' ? 'Usually it takes a couple of minutes' : 'Usually it takes 2~4 business days'}.</li>
                                </ul>
                            </div>
                            <div style={{ display: "flex", justifyContent: 'center' }} onClick={bankDeposit}>
                                <Button className={classes.fiatSecondBodyButton}>Continue</Button>
                            </div>
                        </div>}
                        {method == 2 && <div className={classes.fiatSecondBody}>
                            <div className={classes.warnBox}>
                                {currency != 'AWG' && <h4>
                                    Transfer in {currency} to RBC Royal Bank (Aruba) N.V. and complete payment using only your own bank account.
                                </h4>}
                                {currency == 'AWG' && <h4>
                                    Transfer in AWG Aruban Florin to RBC Royal Bank (Aruba) N.V. and complete payment using only your own bank account
                                </h4>}
                            </div>
                            <h4>Bank Account Info</h4>
                            {currency != 'AWG' &&
                                <div style={{ display: 'flex' }}>
                                    <div style={{ width: '90%' }}>
                                        <div className={classes.bankInfoType}>
                                            Correspondent bank:
                                        </div>
                                        <div className={classes.bankInfoDetail}>{currency == 'USD' ? 'Wells Fargo Bank N.A.' : 'ING Bank N.V. Brussels, Belgium'}</div>
                                    </div>
                                    <div style={{ width: '10%', marginLeft: 2 }}>
                                        <FileCopyOutlinedIcon onClick={copy(currency == 'USD' ? 'Wells Fargo Bank N.A.' : 'ING Bank N.V. Brussels, Belgium')} style={{ width: '0.75em' }} />
                                    </div>
                                </div>
                            }
                            <br />
                            {currency != 'AWG' &&
                                <div style={{ display: 'flex' }}>
                                    <div style={{ width: '90%' }}>
                                        <div className={classes.bankInfoType}>
                                            Correspondent Swift Code:
                                        </div>
                                        <div className={classes.bankInfoDetail}>{currency == 'USD' ? 'PNBPUS3NNYC' : 'BBRUBEBB'}</div>
                                    </div>
                                    <div style={{ width: '10%', marginLeft: 2 }}>
                                        <FileCopyOutlinedIcon onClick={copy(currency == 'USD' ? 'PNBPUS3NNYC' : 'BBRUBEBB')} style={{ width: '0.75em' }} />
                                    </div>
                                </div>
                            }
                            <br />
                            {currency != 'AWG' &&
                                <div style={{ display: 'flex' }}>
                                    <div style={{ width: '90%' }}>
                                        <div className={classes.bankInfoType}>
                                            Swift code of RBC Royal Bank (Aruba) N.V.:
                                        </div>
                                        <div className={classes.bankInfoDetail}>RBTTAWAW</div>
                                    </div>
                                    <div style={{ width: '10%', marginLeft: 2 }}>
                                        <FileCopyOutlinedIcon onClick={copy("RBTTAWAW")} style={{ width: '0.75em' }} />
                                    </div>
                                </div>
                            }
                            <br />
                            {currency != 'AWG' &&
                                <div style={{ display: 'flex' }}>
                                    <div style={{ width: '90%' }}>
                                        <div className={classes.bankInfoType}>
                                            Address of RBC Royal Bank(Aruba) N.V.:
                                        </div>
                                        <div className={classes.bankInfoDetail}>
                                            Italiëstraat 36, Oranjestad, Aruba
                                        </div>
                                    </div>
                                    <div style={{ width: '10%', marginLeft: 2 }}>
                                        <FileCopyOutlinedIcon onClick={copy("Italiëstraat 36, Oranjestad, Aruba")} style={{ width: '0.75em' }} />
                                    </div>
                                </div>
                            }
                            <br />
                            <div style={{ display: 'flex' }}>
                                <div style={{ width: '90%' }}>
                                    <div className={classes.bankInfoType}>
                                        Beneficiary Account Name
                                    </div>
                                    <div className={classes.bankInfoDetail}>
                                        PH Kamermans Holding
                                    </div>
                                </div>
                                <div style={{ width: '10%', marginLeft: 2 }}>
                                    <FileCopyOutlinedIcon onClick={copy("PH Kamermans Holding")} style={{ width: '0.75em' }} />
                                </div>
                            </div>
                            <br />
                            <div style={{ display: 'flex' }}>
                                <div style={{ width: '90%' }}>
                                    <div className={classes.bankInfoType}>
                                        Beneficiary Account Number
                                    </div>
                                    <div className={classes.bankInfoDetail}>
                                        7700000100284672
                                    </div>
                                </div>
                                <div style={{ width: '10%', marginLeft: 2 }}>
                                    <FileCopyOutlinedIcon onClick={copy("7700000100284672")} style={{ width: '0.75em' }} />
                                </div>
                            </div>
                            <br />
                            <div style={{ display: 'flex' }}>
                                <div style={{ width: '90%' }}>
                                    <div className={classes.bankInfoType}>
                                        Beneficiary Address
                                    </div>
                                    <div className={classes.bankInfoDetail}>
                                        Sabana Blanco 16A, Oranjestad, ARUBA
                                    </div>
                                </div>
                                <div style={{ width: '10%', marginLeft: 2 }}>
                                    <FileCopyOutlinedIcon onClick={copy("Sabana Blanco 16A, Oranjestad, ARUBA")} style={{ width: '0.75em' }} />
                                </div>
                            </div>
                            <br />
                            <div style={{ display: 'flex' }}>
                                <div style={{ width: '90%' }}>
                                    <div className={classes.bankInfoType}>
                                        Details of Payment
                                    </div>
                                    <div className={classes.bankInfoDetail}>
                                        Calahex Deposit
                                    </div>
                                </div>
                                <div style={{ width: '10%', marginLeft: 2 }}>
                                    <FileCopyOutlinedIcon onClick={copy("Calahex Deposit")} style={{ width: '0.75em' }} />
                                </div>
                            </div>
                            <div style={{ display: "flex", justifyContent: 'center', marginTop: 20 }} onClick={() => {
                                let corres_bank = currency != 'AWG' ? (currency == 'USD' ? 'Wells Fargo Bank N.A.' : 'ING Bank N.V. Brussels, Belgium') : 0;
                                let swift_code = currency != 'AWG' ? (currency == 'USD' ? 'PNBPUS3NNYC' : 'BBRUBEBB') : 0;
                                let swift_rbcroyal = currency != 'AWG' ? 'RBTTAWAW' : 0;
                                let address_rbcroyal = currency != 'AWG' ? 'Italiëstraat 36, Oranjestad, Aruba' : 0;
                                let benefit_accountname = 'PH Kamermans Holding';
                                let benefit_accountnumber = '7700000100284672';
                                let benefi_address = 'Sabana Blanco 16A, Oranjestad, ARUBA';
                                let detail_payment = 'Calahex Deposit';
                                props.DepositFiatConfirm(user_id, amount, currency, corres_bank, swift_code, swift_rbcroyal, address_rbcroyal, benefit_accountname, benefit_accountnumber, benefi_address, detail_payment);
                                alert("Your confirmation is sent to customerservice@calahex.com. Your USDT balance will be updated as soon as possible.")
                            }}>
                                <Button className={classes.fiatSecondBodyButton}>CONFIRM</Button>
                            </div>
                        </div>}
                        {method == 1 &&
                            <div className={classes.fiatSecondBody}>
                                {/* <div className={classes.warnBox}>
                                <h4>
                                    For this payment method, {currency}  is automatically stored as USDT in a {currency=='USDT'?'1:0.95':(currency=='EUR'?'1:1.14':'1:0.55')} ratio.
                                </h4>
                            </div> */}
                                <div style={{ marginTop: 30 }}>Amount</div>
                                <div className={classes.fiatSecondBodyInput}>
                                    <TextField id="amount_fiat" className="inputPrice" size="small" label="" fullWidth value={amount} onChange={(e) => { setAmount(e.target.value) }} InputProps={{
                                        endAdornment:
                                            <InputAdornment position="end">
                                                <span className={classes.unit}>{currency == 'USD' ? '$' : (currency == 'EUR' ? '€' : (currency == 'GBP' ? '£' : ''))}</span>
                                            </InputAdornment>,
                                    }} />
                                </div>
                                <div className={classes.fiatSecondBodyFee}>
                                    <div className={classes.fiatSecondBodyFeeMargin}>Amount should be between 50 and 5,000</div>
                                </div>
                                <a style={{ display: 'flex', justifyContent: 'center', marginTop: 30 }}>
                                    <Button className={classes.fiatSecondBodyButton} onClick={handleBuy}>DEPOSIT</Button>
                                </a>
                            </div>}
                    </div>
                </Grid>
            </Grid>
            <div>
                <HistoryTable rows={exchangeDepositHistory} name='Recent Deposit Fiat History' historyCancel={historyCancel} />
            </div>
        </Box>



    );
}
DepositFiat.propTypes = {
    classes: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
    user_id: state.auth.user_id,
    userName: state.auth.userName,
    exchangeDepositHistory: state.wallet.exchangeDepositHistory,
});

const mapDispatchToProps = {
    ExchangeFiatDeposit,
    ExchangeDepositHistory,
    ExchangeDepositCancelHistory,
    DepositFiatConfirm
};

export default connect(mapStateToProps, mapDispatchToProps)(withWidth()(
    withStyles(styles, { withTheme: true })(DepositFiat)
));

