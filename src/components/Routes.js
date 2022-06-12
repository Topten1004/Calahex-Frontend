import React, { memo } from "react";
import PropTypes from "prop-types";
import { Switch } from "react-router-dom";
import PropsRoute from "../utils/PropsRoute";
import Landing from "../pages/Home/Landing";
import SignUp from "../pages/Auth/SignUp";
import Confirm from "../pages/Auth/Confirm";
import Profile from "../pages/Auth/Profile";
import ProfileChange from "../pages/Auth/ProfileChange";
import Phone from "../pages/Auth/Phone"
import Two from "../pages/Auth/Two"
import Login from "../pages/Auth/LogIn";
import Forget from "../pages/Auth/Forget";
import ChangePassword from "../pages/Auth/ChangePassword";
import TokenInfoBase from "../pages/Tokens/TokenBaseInfo";
import TokenExchange from "../pages/Tokens/TokenExchange";
import CryptoExchange from "../pages/Crypto/CryptoExchange";
import Terms from "../pages/Help/Terms";
import ESign from "../pages/Help/ESign";
import CookiePolicy from "../pages/Help/CookiePolicy";
import PrivatePolicy from "../pages/Help/PrivatePolicy";
import Future from "../pages/Future/Future";
import CommingSoon from "../pages/CommingSoon/CommingSoon";
import Margin from "../pages/Market/Margin";
import AboutUs from "../pages/Help/AboutUs";
import BuyCrypto from "../pages/BuyCrypto/BuyCrypto";
import FeeInfo from "../pages/Help/FeeInfo";
import ListedAssets from "../pages/Help/ListedAssets";

import Wallet from "../pages/Wallets/ExchangeAccount/Wallet";
import Withdraw from "../pages/Wallets/ExchangeAccount/Withdraw";
import Deposit from "../pages/Wallets/ExchangeAccount/Deposit";
import WalletFuture from "../pages/Wallets/FutureAccount/WalletFuture";
import PoolAccount from '../pages/Wallets/PoolAccount/PoolAccount';
import SavingAccount from "../pages/Wallets/SavingAccount/SavingAccount";
import TransferBalance from "../pages/Wallets/TransferBalance";
import AccountOverview from "../pages/Wallets/AccountOverview";

function Routes(props) {
    const { selectLanding } = props;

    return (
        <Switch>
            <PropsRoute path="/" exact component={Landing} selectLanding={selectLanding} />
            <PropsRoute path="/login" exact component={Login} selectLanding={selectLanding} />
            <PropsRoute path="/sign-up" exact component={SignUp} selectLanding={selectLanding} />
            <PropsRoute path="/forget" exact component={Forget} selectLanding={selectLanding} />
            <PropsRoute path="/change-password" exact component={ChangePassword} selectLanding={selectLanding} />
            <PropsRoute path="/confirm" exact component={Confirm} selectLanding={selectLanding} />
            <PropsRoute path="/profile" exact component={Profile} selectLanding={selectLanding} />
            <PropsRoute path="/profilechange" exact component={ProfileChange} selectLanding={selectLanding} />
            <PropsRoute path="/phone" exact component={Phone} selectLanding={selectLanding} />
            <PropsRoute path="/twofa" exact component={Two} selectLanding={selectLanding} />
            <PropsRoute path="/token-info-base" exact component={TokenInfoBase} selectLanding={selectLanding} />
            <PropsRoute path="/token-exchange" exact component={TokenExchange} selectLanding={selectLanding} />
            <PropsRoute path="/crypto-exchange" exact component={CryptoExchange} selectLanding={selectLanding} />
            <PropsRoute path="/margin-trading" exact component={Margin} selectLanding={selectLanding} />
            <PropsRoute path="/future-trading" exact component={Future} selectLanding={selectLanding} />
            <PropsRoute path="/buy-crypto" exact component={BuyCrypto} selectLanding={selectLanding} />
            <PropsRoute path="/terms" exact component={Terms} selectLanding={selectLanding} />
            <PropsRoute path="/esign" exact component={ESign} selectLanding={selectLanding} />
            <PropsRoute path="/cookie-policy" exact component={CookiePolicy} selectLanding={selectLanding} />
            <PropsRoute path="/private-policy" exact component={PrivatePolicy} selectLanding={selectLanding} />
            <PropsRoute path="/comming-soon" exact component={CommingSoon} selectLanding={selectLanding} />
            <PropsRoute path="/about-us" exact component={AboutUs} selectLanding={selectLanding} />
            <PropsRoute path="/fee-info" exact component={FeeInfo} selectLanding={selectLanding} />
            <PropsRoute path="/listed-assets" exact component={ListedAssets} selectLanding={selectLanding} />

            <PropsRoute path="/wallet/account-overview" exact component={AccountOverview} selectLanding={selectLanding} />
            <PropsRoute path="/wallet/exchange-account/wallet" exact component={Wallet} selectLanding={selectLanding} />
            <PropsRoute path="/wallet/exchange-account/withdraw" exact component={Withdraw} selectLanding={selectLanding} />
            <PropsRoute path="/wallet/exchange-account/deposit" exact component={Deposit} selectLanding={selectLanding} />
            <PropsRoute path="/wallet/future-account/wallet-future" exact component={WalletFuture} selectLanding={selectLanding} />
            <PropsRoute path="/wallet/margin-account" exact component={CommingSoon} selectLanding={selectLanding} />
            <PropsRoute path="/wallet/pool-account" exact component={PoolAccount} selectLanding={selectLanding} />
            <PropsRoute path="/wallet/saving-account" exact component={SavingAccount} selectLanding={selectLanding} />
            <PropsRoute path="/wallet/transfer-balances" exact component={TransferBalance} selectLanding={selectLanding} />
        </Switch>
    );
}

Routes.propTypes = {
    selectLanding: PropTypes.func.isRequired,
};

export default memo(Routes);
