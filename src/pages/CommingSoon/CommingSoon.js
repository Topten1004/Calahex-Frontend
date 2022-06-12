import React from "react";
import CommingSoonDiv from "./CommingSoon.style";
import logoSrc from "../../assets/logo_footer.png";

const CommingSoon = () => {

  return(
    <CommingSoonDiv>
      <div>
        <h1>Coming Soon</h1>
        <img src={logoSrc} alt="Calahex"/>
        <h3>We're launching soon, follow us for update...</h3>
      </div>
    </CommingSoonDiv>
  );
}

export default CommingSoon;