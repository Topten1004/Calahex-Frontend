import styled from 'styled-components';
import { TableRow } from "@material-ui/core";
import sellImg from '../../assets/bg_sell.png';
import buyImg from '../../assets/bg_buy.png';


const FutureDiv = styled.div`

  .leverContent__17945 {
    padding-top: 22px;
  }

  .span-color-black {
    color: black;
    font-size: 12px;
  }

  .span-color-normal {
     color: #337ab7;
     font-size: 12px;
  }

  .span-color-bold {
    color: #337ab7;
    font-weight: bold;
    font-size: 16px;
 }

  .leverageSetAmountTextFieldButton  {
      background-color: rgb(49, 194, 169);
      width: 37px !important;
      height: 37px !important;
      margin-left: 10px !important;
   }

  .leverageEdit {
    width: 100% ;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .leverContent__17945 .slider-range {
    width: 100%;
    margin-right:5px; 
  }
 
  .leverContent__17945 .slider-range .slider-value {
    width: 100% ;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    span {
      width: calc(100%/7);
      text-align: center;
    }
  }
  
 
  .leverContent__17945 .leverMain__17945 {
    display: flex;
    line-height: 20px;
    font-size: 12px;
    margin-top: 6px;
    padding: 0 8px;
    align-items: center;
    justify-content: space-between;
  }

  .leverContent__17945 .leverMain__17945 .value__17945 {
    font-size: 12px;
    vertical-align: middle;
  }
  
  .leverContent__17945 .leverMain__17945 .icon__17945 {
    vertical-align: middle;
    cursor: pointer;
    font-size: 12px;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
    margin-left: 4px;
  }

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

  .sider1 {
    position: absolute;
    background: white;
    z-index: 13;
    top: 0;
    left: 20px;
    /* max-height: calc(100vh - 112px); */
    /* height: calc(100vh - 112px); */
    border: 1px solid #aaa;
    box-shadow: 1px 1px 1px 1px #eee;
    margin-top: 5px;
    margin-bottom: 5px;
    border-right: 1px solid #ddd;
    width: 300px;
    ${props => props.match ? "width: 100%; left: 0;" : ""}
    display: ${props => props.responsive.filter(hid => hid === 'sider1').length ? 'none;' : 'block'};
    .headerTitle {
      font-size: 15px;
      margin-left: 10px;  
    }
    table {
      tr {
        cursor: pointer;

        &:not(.notactve):hover {
          background-color: #D7EAEA;
        }

        td, th {
          font-size: 14px;
          /* letter-spacing: 0.3px; */
          padding: 5px;
          &:not(th):first-child {
            padding-left: 15px;
          }
        }
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
    padding: 15px;
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
      padding: 10px 10px;
      /* margin: 5px 0; */
      border-top: 1px solid #eee;
      &:nth-child(2) {
        border-bottom: 1px solid #eee;
      }
      div:nth-child(2) {
        p {
          text-align: right;
        }
      }
      p {
        margin: 0;

        .label {
          color: #aaa;
          font-size: 11.5px;
        }
      }
    }

    .MuiAccordion-root.Mui-expanded {
      margin: 0;
    }
    .MuiAccordion-root:before {
      background: transparent;
    }
    .MuiPaper-elevation1 {
      box-shadow: none;
    }
    .MuiAccordionSummary-root {
      display: -webkit-box;
    }
    .MuiAccordionSummary-content.Mui-expanded {
      margin: 14px 0;
    }
    .MuiTypography-body1 {
      font-size: 12px;
      font-family: "Roboto", "Helvetica", "Arial", sans-serif;
      letter-spacing: 0.00938em;
    }
    .MuiAccordionSummary-content {
      margin: 16px 0 0 0;
    }
    .MuiAccordionSummary-root.Mui-expanded {
      min-height: auto;
    }
    .MuiAccordionSummary-content.Mui-expanded {
        margin: 16px 0 0 0;
    }

    .sellButton {
      width: 130px;
      ${props => props.isXs ? "width: auto;" : ""}
      height: 30px;
      &:hover {
        background: #e27375;
      }
      &.Mui-selected {
        background: #e27375;
      }
    }

    .percentage {
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      span {
        width: 20%;
        text-align: center;
        color: white;
        padding: 3px 0;
      }
    }
  }

  .advancedTimeSet {
    display: flex;
    align-items: center;
    justify-content: space-between;
    span {
      font-size: 12px;
      &:first-child {
        color: #aaa;
      }

      &:last-child {
        cursor: pointer;
        background-color: #eee;
        padding: 5px 10px;
        display: flex;
        align-items: center;
        p {
          margin: 0;
        }
      }
    }
  }

  .buyButton {
    width: 130px;
    ${props => props.isXs ? "width: auto;" : ""}

    height: 30px;
  }

  .color-primary {
    background-color: #337ab7;
    color: white; 
  }

  .color-secondary {
    background-color: #337ab7b5;
    color: white; 
    border-radius: 25px;
  }

  .color-secondary-percent {
    background-color: #337ab7b5;
    color: black; 
    border-radius: 25px; 
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
    position: relative;
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
    max-height: initial;
    /* min-height: calc(100vh); */
    margin-top: 5px;
    /* margin-bottom: 100px; */
    padding: 0 30px;
    border-right: 1px solid #ddd;
    /* min-width: 350px; */
    width: 100vw !important;

    .percentage {
        margin-bottom: 10px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        span {
          width: 20%;
          text-align: center;
          padding: 3px 0;
        }
      }
    }

    .checkboxview {
      position: absolute;
      top: 10px;
      right: 10px;
      display: flex;
      align-items: center;
      z-index: 100;
      label {
        font-size: 12px;
      }
    }
  }

  .font-15 {
    font-size: 15px;
  }

  .percentView {
    background-color: #D5BCBD;
    padding: 3px 6px;
  }
`;

const BgTableRow = styled(TableRow)`
  background: ${props => ((props.type === 1 ? `url(${sellImg})` : `url(${buyImg})`) + ' no-repeat')};
  /* background-position: left ; */
  background-size: ${props => (`${(props.total * 100 / props.max)}% 100%`)};
`;

export default FutureDiv;
export {
  BgTableRow
};