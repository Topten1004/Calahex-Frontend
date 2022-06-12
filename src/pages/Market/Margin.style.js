import styled from 'styled-components';
import { TableRow } from "@material-ui/core";
import sellImg from '../../assets/bg_sell.png';
import buyImg from '../../assets/bg_buy.png';

const MarginDiv = styled.div`

  .MuiToolbar-root {
    display: ${props => props.responsive.filter(hid => hid === 'toolbar').length ? 'none;' : 'block'};
    h3 {
      font-weight: 300;
      display: flex;
      align-items:center;
      cursor: pointer;
    }

    h4 {
      font-weight: 300;
    }
  }

  .radioGroup {
    display: flex;
    align-items: center;
    justify-content: center;
    input {
      cursor: pointer;
    }
    label {
      font-size: 11px;
      padding: 5px 0 0 0;
    }
  }
  .plus {
    color: #3C868F;
    font-weight: 550;
  }
  .minus {
    font-weight: 550;
    color: #D16255;
  }
  .fw-800 {
    font-weight: 800;
  }
  table {
    tr {
      cursor: pointer;
      td, th {
        font-size: 10px;
        letter-spacing: 0.3px;
        padding: 3px;
        &:not(th):first-child {
          padding-left: 15px;
        }
      }
    }
  }

  .content-wrapper {
    position: relative;
  }

  .infoview {
    display: flex;
    align-items: center;
    margin-left: 10px;
    div {
      margin-right: 15px;
    }
  }
  .pairHeader {
    padding-left: 5px;
    max-width: 30px !important;
  }
  .priceHeader {
    max-width: 40px !important;
  }
  .fullnameHeader {
    max-width: 70px !important;
  }
  .sider1 {
    position: absolute;
    background: white;
    z-index: 13;
    top: 0;
    left: 0;
    max-height: calc(100vh - 112px);
    height: calc(100vh - 112px);
    margin-top: 5px;
    margin-bottom: 5px;
    border-right: 1px solid #ddd;
    /* min-width: 350px; */
    width: 370px;
    ${props => props.match ? "width: 100%;" : ""}
    display: ${props => props.responsive.filter(hid => hid === 'sider1').length ? 'none;' : 'block'};

    .searchBox {
      display: flex;
      align-items: center;

      input {
        ${props => props.match ? "width: calc(100vw - 180px);" : ""};
      }
    }
  }

  .adminPan {
    max-height: calc(100vh - 100px);
    margin-top: 5px;
    margin-bottom: 5px;
    border-right: 1px solid #ddd;
    min-width: 350px;
    width: 370px !important;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;

    h2 {
      color: #235580;
    }

    a {
      text-decoration: none;
    }

    .signup {
    border-radius: 20px;
    margin: 10px;
    text-transform: intial;
    } 

    .login {
      border-radius: 20px;
      margin: 10px;
      /* border: 1px solid #3C868F; */
      background: white;
      text-transform: 'none';
      color: #3C868F;
    }
  }

  .adminPanLogin {
    min-height: calc(100vh - 45px);

    margin-top: 5px;
    margin-bottom: 5px;
    border-right: 1px solid #ddd;
    /* min-width: 350px; */
    width: 370px !important;
    .MuiTabs-root {
        min-height: 25px;
        ${props => props.match ? "width: 100%;" : ""}
        button.Mui-selected {
          min-height: 25px;
          font-size: 18px;
          text-transform: initial;
        }
        button {
          min-height: 25px;
          font-size: 18px;
          text-transform: initial;
          }
    }
    .MuiTextField-root {
      margin-bottom: 15px;
    }

    .MuiButton-root {
      margin: 10px 0;
    }

    .unitsize {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background-color: #eee;
      padding: 5px 10px;
      margin: 5px 0;
      border-radius: 10px;
      p {
        margin: 0;
      }
    }
  }

  .buyButton {
    width: 90px !important;
    padding: 6px 8px !important;
    margin-bottom: 10px;
    margin-left: 10px !important;
    margin-right: 10px !important;
    ${props => props.isXs ? "width: 80px; margin-left: 20px; margin-bottom:10px;" : ""}

    height: 30px;
    @media (max-width: 400px) {
      width: 66px !important;
      font-size: 12px !important;
      padding: 2px !important;
      margin-right: 7px !important;
      margin-left: 0 !important;
    }
  }

  .color-primary {
    background-color: #337ab7;
    color: white; 
    text-transform: none;
    margin-left: 20px !important;
  }

  .color-secondary {
    background-color: #337ab7b5;
    color: white; 
    border-radius: 25px;
  }

  .pairHeader {
    padding-left: 15px;
  }

  .color-secondary-percent {
    background-color: #337ab7b5;
    color: black; 
    border-radius: 25px; 
  }
  .card-button {
    display: flex;
    justify-content: flex-end;
  }
  .reportIcon {
    font-size: 13px;
    margin: -2px;
  }
  .warning {
    font-size: 11px;
  }
  .tabSection {
    .tabHeader {
      padding-bottom: 10px;
    border-bottom: 1px dashed #aaa;
      .link {
        text-align: right;
        margin-bottom: 9px;
      }
      span {
        font-size: 11px;
      }
      .balance {
        padding: 10px 12px 5px 12px;
      }
      label {
        font-size: 12px;
      }
    }
  .fee {
    span {
      font-size: 11px;
    }
    p {
      font-size: 11px;
      margin-top: 2px;
    }
  }
  .tabCard {
    margin-top: 1px;
    margin-bottom: 1px;
    position: relative;
    label{
      font-size: 12px;
      @media (max-width: 400px) {
        // width: 70px !important;
        font-size: 12px !important;
      }
    }
    .rightLabelInput {
      padding: 4px;
      border-radius: 6px;
      border: 1px solid gray;
      width: 100%;
    }
    .rightLabel {
      position: absolute;
      background: #337AB7;
      color: #fff;
      border-radius: 3px;
      right: 11px;
      width: 40px;
      text-align: center;
      padding: 2px;
      top: 12px;
      bottom: 12px;

    }


    .leftLabel {
      vertical-align: sub;
    }
  }
  }

  .blueCard{
    margin: 5px 22px 10px 22px ;
    border: 1px solid #337ab7;
    .cardHeader{
      background: #337ab7;
      color: white;
      font-size: 17px;
      display: flex;
      justify-content: space-between;
      p{
        margin: 0;
        padding: 10px;  
      }
      .searchBox {
        margin: 10px;
        background: #fff;
        border-radius: 3px;
        width: 40%;
        .searchIcon {
          color: gray;
          font-size: 15px;  
        }
        .searchInput {
          width: 80%;
          border: none;
        }
      }
    }
    .cardContent {
      padding: 10px;
      
    }
  }

  .color-danger {
    background-color: #D28E8F;
    color: white;
  }

  .sider2 {
    margin-top: 5px;
    margin-bottom: 5px;
    border-right: 1px solid #ddd;
    width: 320px;
    ${props => props.match ? "width: calc(100vw);" : ""}
    display: ${props => props.responsive.filter(hid => hid === 'sider2').length ? 'none;' : 'block'};
    .orderBookHeader {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #aaa;
      
      h4 {
       margin: 5px 0;
       font-weight: 300;
       font-size: 16px;
       margin-left: 15px;
       text-align: center;
      }
      .show-type {
        display: flex;
        align-items: center;

        .buy-orders {
          cursor: pointer;
          div {
            border: 1px solid #0D57A0;
            width: 18px;
            margin: 2px;
          }
        }
        .sell-orders {
          cursor: pointer;
          div {
            border: 1px solid #C74A4D;
            width: 18px;
            margin: 2px 10px;
          }
        }
        .order-book {
          cursor: pointer;
          div {
            border: 1px solid #0D57A0;
            width: 18px;
            margin: 2px;

            &:first-child, &:nth-child(2) {
              border-color: #C74A4D;
            }
          }
        } 
        .order-book-grouping {
          select {
            border: none;
            margin-left: 10px;
            cursor: pointer;
          }
        }
      }
    }

    .book-header {
      display: flex;
      align-items: center;
      justify-content: space-around;
      padding: 5px 10px 8px;
      border-bottom: 1px solid #aaa;

      span {
        font-size: 11px;
        color: #135BA2;
        font-weight: 500;  
      }
    }

    .orderSellBook {
      ${props => {
    if (props.show === 2 && !props.match) {
      return "height: calc(100vh - 214px);";
    } else if (props.show === 2 && props.match) {
      return "height: calc(100vh - 245px);";
    } else if (props.show === 1) {
      return "height: 0;";
    } else if (props.show === 3 && !props.match) {
      return "height: calc(50vh - 107px);";
    } else if (props.show === 3 && props.match) {
      return "height: calc(50vh - 147px);";
    }
  }} 
      overflow-x: auto;
    }

    .order-sell-book {

      .order-sell-book-header {
        border-top: 1px solid #aaa;
        border-bottom: 1px solid #aaa;
        text-align: center;
        h4 {
          margin: 5px 0;
          color: #C74A4D;
        }
      }
      .order-sell-table-container {
            ${props => {
    if (props.show === 1 && !props.match) {
      return "height: calc(100vh - 214px);";
    } else if (props.show === 1 && props.match) {
      return "height: calc(100vh - 245px);";
    } else if (props.show === 2) {
      return "height: 0;";
    } else if (props.show === 3 && !props.match) {
      return "height: calc(50vh - 107px);";
    } else if (props.show === 3 && props.match) {
      return "height: calc(50vh - 147px);";
    }
  }}
      }
    }
  }
.trad-content {
  /* display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: row; */
    flex: 1;

    .openPosition {
      margin: 0 5px;
      h2 {
        margin: 0
      }
      p {
        margin-top: 5px;
        margin-bottom: 5px;
        border: 1px solid #6F504D;
        font-size: 11px;
        padding: 3px 5px;
        border-left: 5px solid #6F504D;
        background-color: #F3EEEE;
      }
    }
}
  .tradingViews {
    display: ${props => props.responsive.filter(hid => hid === 'trading').length ? 'none;' : 'block'};
    flex: 1;
    width: 100%;
    height: calc(50vh + 25px);
    ${props => props.match ? "height: calc(100vh - 110px);" : ""}

    .MuiAppBar-root {
      /* box-shadow: none;
      border-bottom: 1px solid #ddd;
      z-index: 0; */
    }

    .trade-market-table-container {
      height: calc(100vh - 145px);
      ${props => props.match1 ? "height: calc(50vh - 20px);" : ""}
    }
    
    .MuiTabs-root {
        min-height: 25px;
        ${props => props.match ? "width: 100vw;" : ""}
        button.Mui-selected {
          min-height: 25px;
          font-size: 14px;
          text-transform: initial;
        }
        button {
          min-height: 25px;
          font-size: 15px;
          text-transform: initial;
          }
    }

    .MuiBox-root {
      padding: 5px 0;
      min-height: calc(50vh - 20px);
      ${props => props.match ? "height: calc(100vh - 148px);" : ""}
      &>div {
        height: calc(50vh - 20px);
        ${props => props.match ? "height: calc(100vh - 148px);" : ""}
      }
    }
  }

  .sider3 {
    display: ${props => props.responsive.filter(hid => hid === 'sider3').length ? 'none;' : 'block'};
    width: 350px;
    .MuiTabs-root {
      min-height: 30px;
      button.Mui-selected {
        min-height: 30px;
        font-size: 14px;
        text-transform: initial;
      }
    }

    .MuiBox-root {
      padding: 5px 0;
    }

    .trade-market-table-container {
      height: calc(50vh - 20px);
    }

  }

  .bottom1 {

    border-top: 1px solid #aaa;
    display: ${props => props.responsive.filter(hid => hid === 'bottom').length ? 'none;' : 'block'};
    .MuiTabs-root {
        min-height: 25px;
        button.Mui-selected {
          min-height: 25px;
          font-size: 14px;
          text-transform: initial;
        }
        button {
          min-height: 25px;
          font-size: 15px;
          text-transform: initial;
          }
    }

    .MuiBox-root {
      padding: 5px 0;
    }

    .tables {
      height: calc(50vh - 180px);
      ${props => props.match ? "height: calc(100vh - 180px);" : ""}
    }

    .adminPanLogin {
    /* max-height: calc(100vh - 30px); */
    min-height: calc(100vh);
    margin-top: 5px;
    margin-bottom: 5px;
    padding: 0 30px;
    border-right: 1px solid #ddd;
    /* min-width: 350px; */
    width: 100vw !important;
      .blueCard{
        border: 1px solid #337ab7;
        margin: 10px 0 !important;
      }
    }
  }

  /* .depthChartView {
    height: 100%;
    display: flex;
    align-items: center;
  } */
`;

const BgTableRow = styled(TableRow)`
  background: ${props => ((props.type === 1 ? `url(${sellImg})` : `url(${buyImg})`) + ' no-repeat')};
  /* background-position: left ; */
  background-size: ${props => (`${(props.total * 100 / props.max)}% 100%`)};
`;

export default MarginDiv;
export {
  BgTableRow
};