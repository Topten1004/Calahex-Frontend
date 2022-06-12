import styled from "styled-components";

const BuyCryptoDiv = styled.div`

  min-height: calc(100vh - 60px);
  .price {
    color: #05599f;
    font-weight: 400;
    .percent {
      font-weight: 400;
      font-size: 16px;
    }
  }

  .small {
    font-size: 18px;
    font-weight: 500;
    color: #555;
  }

  .payment-title {
    font-weight: 400;
    margin: 0 0 0 5vw;
  }

  .payment-step {
    padding-left: 0;
  }

  .buyCryptoCard {
    min-height: 500px
  }

  .MuiStepper-root {
    overflow-x: auto;
  }

  .buyCryptoCard {

    padding: 10px 10px 0;
    .cardHeader {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .cardAction {
        font-size: 12px;
        text-transform: initial;
        color: #aaa;

        .MuiSvgIcon-root {
          font-size: 14px;
        }
      }
    }

    .cardBody {
        .inputPrice {
          margin-top: 40px;
          .MuiInputAdornment-root {
            span.unit {
              font-size: 13px;
              padding: 0 6px;
              color: white;
              border-radius: 50%;
              background-color: #235580;
            }
            .MuiInput-underline {
              .MuiSelect-root {
                font-size: 13px;
                width: 55px;
                text-align: center;
              }
              &:before {
                border: none;
              }

              &.Mui-focused {
                
              }
            }
          }
        }

        .selectPayUnit {
          margin: 50px 0 15px;
          display: flex;
          align-items: center;
          border: 1px solid #aaa;
          border-radius: 5px;
          padding: 5px 10px 7px 15px;
          .pre-text {
            width: 70px;
            padding-top: 5px;
            font-size: 12px;
            color: #aaa;
            /* text-align: center; */
          }
          .MuiFormControl-root {
            flex: 1;
            .MuiInput-underline {

              &:before {
                border: none;
              }

              &.Mui-focused {
                
              }
            }
          }
        }

        .selectPayMethod {
          cursor: pointer;
          display: flex;
          align-items: center;          
          margin: 20px 0;
          border: 1px solid #aaa;
          border-radius: 5px;
          padding: 8px 8px 7px 15px;
          .pre-text {
            width: 70px;
            font-size: 12px;
            color: #aaa;
          }
          .after-text {

          }

          .paymentLogo {
            &.newcard {
              margin: 5px 5px 5px 0;
            }
            &.payoneer {
              margin: 1px 0;
            }
          }

          &.active {
            border: 2px solid #aaa;
            background-color: #eee;
          }
        }
      }
  }

  @media (max-width: 400px) {
    & {
      padding: 10px 5px !important;

      h1 {
        margin: 0;
      }

      .cardTitle {
        font-size: 13px;
      }

      .cardPrice {
        font-size: 12px;
      }

      .cardChange {
        font-size: 11px;
      }

      .payment-title {
        font-size: 16px;
      }

      .MuiStepLabel-label.MuiStepLabel-alternativeLabel {
        font-size: 11.7px;
      }
    }
  }
`;

export default BuyCryptoDiv;