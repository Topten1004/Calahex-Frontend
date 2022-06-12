<?php

// bitcoin/altcoin payment box; open source

// Change path to your files
// --------------------------------------
DEFINE("CRYPTOBOX_PHP_FILES_PATH", "lib/");        	// path to directory with files: cryptobox.class.php / cryptobox.callback.php / cryptobox.newpayment.php;
// cryptobox.newpayment.php will be automatically call through ajax/php two times - payment received/confirmed
DEFINE("CRYPTOBOX_IMG_FILES_PATH", "images/");	// path to directory with coin image files (directory 'images' by default)
DEFINE("CRYPTOBOX_JS_FILES_PATH", "js/");			// path to directory with files: ajax.min.js/support.min.js


// Change values below
// --------------------------------------
DEFINE("CRYPTOBOX_LANGUAGE_HTMLID", "alang");	// any value; customize - language selection list html id; change it to any other - for example 'aa';	default 'alang'
DEFINE("CRYPTOBOX_COINS_HTMLID", "acoin");		// any value;  customize - coins selection list html id; change it to any other - for example 'bb';	default 'acoin'
DEFINE("CRYPTOBOX_PREFIX_HTMLID", "acrypto_");	// any value; prefix for all html elements; change it to any other - for example 'cc';	default 'acrypto_'


// Open Source Bitcoin Payment Library
// ---------------------------------------------------------------
require_once(CRYPTOBOX_PHP_FILES_PATH . "cryptobox.class.php" );



/*********************************************************/
/****  PAYMENT BOX CONFIGURATION VARIABLES  ****/
/*********************************************************/

// IMPORTANT: Please read description of options here - https://gourl.io/api-php.html#options

$userID 				= $_GET["user_id"];
// $userID 				= $_SESSION["user_id"];			 // place your registered userID or md5(userID) here (user1, user7, uo43DC, etc).
// You can use php $_SESSION["userABC"] for store userID, amount, etc
// You don't need to use userID for unregistered website visitors - $userID = "";
// if userID is empty, system will autogenerate userID and save it in cookies
$userFormat		= "COOKIE";		// save userID in cookies (or you can use IPADDRESS, SESSION, MANUAL)
$orderID			= $_GET['order_id'];	    	// invoice number - 000383
$amountUSD		= isset($_GET['amount_usd'])?$_GET['amount_usd']:0;			// invoice amount - 2.21 USD; or you can use - $amountUSD = convert_currency_live("EUR", "USD", 22.37); // convert 22.37EUR to USD
$amount = isset($_GET['amount'])?$_GET['amount']:0;

$period			= "NOEXPIRY";	// one time payment, not expiry
$def_language	= "en";			// default Language in payment box
$def_coin			= "bitcoin";		// default Coin in payment box


// List of coins that you accept for payments
//$coins = array('bitcoin', 'bitcoincash', 'bitcoinsv', 'litecoin', 'dogecoin', 'dash', 'speedcoin', 'reddcoin', 'potcoin', 'feathercoin', 'vertcoin', 'peercoin', 'monetaryunit', 'universalcurrency');
$coins = array('bitcoin');  // for example, accept payments in bitcoin, bitcoincash, litecoin, dash, speedcoin

// Create record for each your coin - https://gourl.io/editrecord/coin_boxes/0 ; and get free gourl keys
// It is not bitcoin wallet private keys! Place GoUrl Public/Private keys below for all coins which you accept


$all_keys = array(	"bitcoin"  => 		array("public_key" => "56282AAy9XbRBitcoin77BTCPUBS1cw1xmMCndcPWARiuGzAJV",  "private_key" => "56282AAy9XbRBitcoin77BTCPRVyf8O8yUZqQFygpE8ZCOsGDh")); // etc.

// Demo Keys; for tests	(example - 5 coins)
// $all_keys = array("bitcoin" => array(	"public_key" => "50847AAxMq81Bitcoin77BTCPUBFn9nMCnWTGrmnz6HU31Flka
// ",
//     "private_key" => "50847AAxMq81Bitcoin77BTCPRVNESfjomGq2yD0X6lNDa0lAK")); // Demo keys!

//  IMPORTANT: Add in file /lib/cryptobox.config.php your database settings and your gourl.io coin private keys (need for Instant Payment Notifications) -
/* if you use demo keys above, please add to /lib/cryptobox.config.php -
    $cryptobox_private_keys = array("25654AAo79c3Bitcoin77BTCPRV0JG7w3jg0Tc5Pfi34U8o5JE", "25678AACxnGODogecoin77DOGEPRVFvl6IDdisuWHVJLo5m4eq",
                "25656AAeOGaPBitcoincash77BCHPRV8quZcxPwfEc93ArGB6D", "25657AAOwwzoLitecoin77LTCPRV7hmp8s3ew6pwgOMgxMq81F",
                "25678AACxnGODogecoin77DOGEPRVFvl6IDdisuWHVJLo5m4eq", "25658AAo79c3Dash77DASHPRVG7w3jg0Tc5Pfi34U8o5JEiTss",
                "20116AA36hi8Speedcoin77SPDPRVNOwjzYNqVn4Sn5XOwMI2c");
     Also create table "crypto_payments" in your database, sql code - https://github.com/cryptoapi/Payment-Gateway#mysql-table
     Instruction - https://gourl.io/api-php.html
 */

// Re-test - all gourl public/private keys
$def_coin = strtolower($def_coin);
if (!in_array($def_coin, $coins)) $coins[] = $def_coin;
foreach($coins as $v)
{
    if (!isset($all_keys[$v]["public_key"]) || !isset($all_keys[$v]["private_key"])) die("Please add your public/private keys for '$v' in \$all_keys variable");
    elseif (!strpos($all_keys[$v]["public_key"], "PUB"))  die("Invalid public key for '$v' in \$all_keys variable");
    elseif (!strpos($all_keys[$v]["private_key"], "PRV")) die("Invalid private key for '$v' in \$all_keys variable");
    elseif (strpos(CRYPTOBOX_PRIVATE_KEYS, $all_keys[$v]["private_key"]) === false)
        die("Please add your private key for '$v' in variable \$cryptobox_private_keys, file /lib/cryptobox.config.php.");
}


// Current selected coin by user
$coinName = cryptobox_selcoin($coins, $def_coin);


// Current Coin public/private keys
$public_key  = $all_keys[$coinName]["public_key"];
$private_key = $all_keys[$coinName]["private_key"];

/** PAYMENT BOX **/
$options = array(
    "public_key"  	=> $public_key,	// your public key from gourl.io
    "private_key" 	=> $private_key,	// your private key from gourl.io
    "webdev_key"  	=> "", 			// optional, gourl affiliate key
    "orderID"     	=> $orderID, 		// order id or product name
    "userID"      		=> $userID, 		// unique identifier for every user
    "userFormat"  	=> $userFormat, 	// save userID in COOKIE, IPADDRESS, SESSION  or MANUAL
    "amount"   	  	=> $amount,			// product price in btc/bch/bsv/ltc/doge/etc OR setup price in USD below
    "amountUSD"   	=> $amountUSD,	// we use product price in USD
    "period"      		=> $period, 		// payment valid period
    "language"	  	=> $def_language,  // text on EN - english, FR - french, etc
);

// Initialise Payment Class
$box = new Cryptobox ($options);

// coin name
$coinName = $box->coin_name();

// php code end :)
// ---------------------

// NOW PLACE IN FILE "lib/cryptobox.newpayment.php", function cryptobox_new_payment(..) YOUR ACTIONS -
// WHEN PAYMENT RECEIVED (update database, send confirmation email, update user membership, etc)
// IPN function cryptobox_new_payment(..) will automatically appear for each new payment two times - payment received and payment confirmed
// Read more - https://gourl.io/api-php.html#ipn
?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="description" content="">
    <title>Payment Box</title>

    <!-- Bootstrap4 CSS - -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" crossorigin="anonymous">

    <!-- Note - If your website not use Bootstrap4 CSS as main style, please use custom css style below and delete css line above.
    It isolate Bootstrap CSS to a particular class 'bootstrapiso' to avoid css conflicts with your site main css style -->
    <!-- <link rel="stylesheet" href="css/bootstrapcustom.min.css" crossorigin="anonymous"> -->


    <!-- JS -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js" crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" crossorigin="anonymous"></script>
    <script defer src="https://use.fontawesome.com/releases/v5.12.0/js/all.js" crossorigin="anonymous"></script>
    <script src="<?php echo CRYPTOBOX_JS_FILES_PATH; ?>support.min.js" crossorigin="anonymous"></script>

    <!-- CSS for Payment Box -->
    <style>
        html { font-size: 14px; }
        @media (min-width: 768px) { html { font-size: 16px; } .tooltip-inner { max-width: 350px; } }
        .mncrpt .container { max-width: 980px; }
        .mncrpt .box-shadow { box-shadow: 0 .25rem .75rem rgba(0, 0, 0, .05); }
        img.radioimage-select { padding: 7px; border: solid 2px #ffffff; margin: 7px 1px; cursor: pointer; box-shadow: none; }
        img.radioimage-select:hover { border: solid 2px #a5c1e5; }
        img.radioimage-select.radioimage-checked { border: solid 2px #7db8d9; background-color: #f4f8fb; }
    </style>
</head>

<body>

<?php

// Text above payment box
// $custom_text  = "<p class='lead'>Demo Text - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>";
// $custom_text .= "<p class='lead'>Please contact us for any questions on aaa@example.com</p>";

// if(strpos($_GET['order_id'], 'activate') !== false) $redirect = "https://calahex.com/wallet/account-overview";
// else  $redirect = "https://calahex.com/wallet/exchange-account/wallet";

// Display payment box
echo $box->display_cryptobox_bootstrap($coins, $def_coin, $def_language, $custom_text, 70, 200, true, "images/your_logo.png", "default", 250, $redirect, "curl", true);


// You can setup method='curl' in function above and use code below on this webpage -
// if successful bitcoin payment received .... allow user to access your premium data/files/products, etc.
// if ($box->is_paid()) { ... your code here ... }


?>

</body>
</html>
