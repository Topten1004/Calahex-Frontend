import styled from 'styled-components';

const HelpDiv = styled.div`
  padding: 30px 40px;
  margin: 30px 500px;
  min-height: calc(100vh - 60px);

  h3 {
    text-align: center;
  }

  .tab1{
    margin-left: 20px;
  }

  .tab2{
    margin-left: 40px;
  }

  .tab3{
    margin-left: 60px;
  }

  .description{
    color: #448644;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    tr, td, th {
      border: 1px solid #aaa;
      padding: 3px;
    }
    .text-center {
      text-align: center;
    }
  }

  @media (min-width: 200px) {
    padding: 30px 10px;
    margin: 30px 20px;
  }

  @media (min-width: 600px) {
    padding: 30px 20px;
    margin: 30px 100px;
  }

  @media (min-width: 1024px) {
    padding: 30px 30px;
    margin: 30px 200px;
  }

   @media (min-width: 1400px) {
    padding: 30px 40px;
    margin: 30px 400px;
  }
`;

export default HelpDiv;