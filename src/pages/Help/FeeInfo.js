import React from 'react';
import HelpDiv from './Help.style';

const FeeInfo = () => {
  return (
    <HelpDiv>
      <h2 className="text-center text-header">CALAHEX: Fee Info</h2>
      <p>Calahex has different fee structures for spot trading and futures trading. This section gives 
        a detailed description of the spot trading and general fees we charge as well as the trading
        volumes and verification levels we have established for all users of our platform.
        When an order executes the buyer and the seller are each charged a fee based on the total
        price of the executed order. The fee charged by Calahex on each executed trade is 
        calculated by taking the <b>(amount * purchase price * rate)</b> for the given trade. There are 
        no fees for placing an order which does not execute.<br />
        Fees vary by the currency pair being traded, your verification level, your 30-Day volume as 
        a trader and whether the order filled is a maker or taker.</p>
      <h4>Verification Levels</h4>

      <table>
        <tbody>
          <tr>
            <td className="text-center">Level 1</td>
            <td>Email verification</td>
          </tr>
          <tr>
            <td className="text-center">Level 2</td>
            <td>ID verification (Region, Name, Birthday, Address, City, Postal Code, Phone
              Number)</td>
          </tr>
          <tr>
            <td className="text-center">Level 3</td>
            <td>2FA Authentication (16-digit key Code)</td>
          </tr>
          <tr>
            <td className="text-center">Level 4</td>
            <td>Video verification (Video call with platform supporter with ID card or Passport</td>
          </tr>
        </tbody>
      </table>

      <h4>30-Day Volume</h4>
      <p>Your trading volume impacts the price you pay for each trade. Our fees are built to reward
        users who drive liquidity to Calahex markets to ensure a healthy ecosystem. Cumulative 
        30-day trading volume and average 24-hour holdings are automatically calculated daily at 
        00:00(UTC). 
        User level and fee rates are updated daily at 02:00 (UTC) to correspond with the fee
        schedule in the table below. </p>
      <h4>Maker Orders</h4>
      <p>Maker orders create (make) liquidity on a market by being entered onto the order book. In
        other words, maker orders are not filled when they are placed but instead wait until a 
        future order is placed that matches them. A maker order can be on either the sell side or a 
        buy side of the order. When an existing order on the order book is matched with a newly 
        placed order (the taker), the maker order in the transaction is charged the maker fee.</p>
      <h4>Taker Orders</h4>
      <p>Taker orders reduce (take away) liquidity on a market. Orders which execute immediately 
        and take volume off the order book are takers. A taker order can be on either the sell side 
        or buy side of the order. When a new order is placed and it matches against another order 
        already on the order book (the maker), the taker in the transaction is charged the taker fee.</p>
      <h4>Spot Trading Fee Schedule – April 23, 2021</h4>
      
      <table>
        <thead>
          <tr>
            <th>Level</th>
            <th>30-Day Volume (USD)</th>
            <th>General Fee</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>$0K-$50K</td>
            <td>0.25%</td>
          </tr>
          <tr>
            <td>2</td>
            <td>$50K-$1M</td>
            <td>0.24%</td>
          </tr>
          <tr>
            <td>3</td>
            <td>$1M-10M</td>
            <td>0.15%</td>
          </tr>
          <tr>
            <td>4</td>
            <td>$10M+</td>
            <td>0.10%</td>
          </tr>
        </tbody>
      </table>

      <h4>Minimal order requirements</h4>
      <p>The minimum order size is 25 USD/EUR for <b>USDT</b> denominated trading pairs and <b>0.02 ETH</b> for ETH denominated trading pairs and <b>0.00010 BTC</b> for BTC denominated trading pairs.<br/><br/>
        Below you will find the General Fee Schedule effective from January 1, 2021 until further notice.<br/>
        Calahex offers her users the possibility to directly deposit the following Digital Assets; <strong>BTC, ETH, USDT, SXP, REPV2, YFI, UNI and LINK</strong>. <br/>
        If you wish to withdraw any of the other coins we offer for trading to an external wallet, you can easily do so by converting them to one of these 3 coins through the quick conversion button.
      </p>
      <h4>General Fee Schedule – April 23, 2021</h4>

      <table>
        <thead>
          <tr>
            <th> Name and Symbol</th>
            <th>Deposit fee</th>
            <th>Withdrawal fee</th>
            <th>Transfer fee</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Bitcoin BTC</td>
            <td>No fee</td>
            <td>2%</td>
            <td>No fee</td>
          </tr>          
          <tr>
            <td>Ethereum ETH</td>
            <td>No fee</td>
            <td>2%</td>
            <td>No fee</td>
          </tr>          
          <tr>
            <td>Tether USDT</td>
            <td>No fee</td>
            <td>2%</td>
            <td>No fee</td>
          </tr>          
        </tbody>
      </table>
      <br/>
      <table>
        <thead>
          <tr>
            <th>Name and Symbol</th>
            <th>Conversion fee</th>
            <th>Transfer fee</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>All listed Digital Assets</td>
            <td>0.25%</td>
            <td>No fee</td>
          </tr>
        </tbody>
      </table>
      
      <h4>User accounts – April 23, 2021</h4>
      <p>At Calahex we have set certain rules and pricing for the user accounts that we offer on our platform. Some accounts are free for all users and others are optional depending on level
verification. A one time fee will be charged to activate certain accounts</p>      
        <table>
        <thead>
          <tr>
            <td>User Account</td>
            <td>Type</td>
            <td>Price</td>
            <td>Level of Verification</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Exchange Account</td>
            <td>Account for spot trading</td>
            <td>Free</td>
            <td>1</td>
          </tr>
          <tr>
            <td>Futures Account</td>
            <td>Account for futures trading</td>
            <td>Free</td>
            <td>2</td>
          </tr>
          <tr>
            <td>Savings Account</td>
            <td>Account for savings</td>
            <td>$20</td>
            <td>2</td>
          </tr>
          <tr>
            <td>Pool Account</td>
            <td>Account for token mining or staking</td>
            <td>$20</td>
            <td>3</td>
          </tr>
          <tr>
            <td>Margin Account</td>
            <td>Account for margin trading</td>
            <td>$100</td>
            <td>4</td>
          </tr>
          </tbody>
      </table>
      <p>Note: user accounts are not depended on 30-day volume, <u><b>only</b></u> on level verification.</p>
      <p>Calahex is an upcoming cool platform and suport from our community is a key ingredient 
        for our success.</p>

    </HelpDiv>
  )
}

export default FeeInfo;