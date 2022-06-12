import React, { useEffect, useState } from 'react';
import axios from "axios";
import * as config from "../../static/constants";
import HelpDiv from './Help.style';
const ListedAssets = (props) => {
  const [lists, setLists] = useState([]);
  useEffect(() => {
    (async function getList() {
      let res = await axios.post(`${config.BACKEND_URL}main/tokenList`);
      console.log(res.data)
      setLists(res.data)
    })();
  },[])
  
  return (
    <HelpDiv>
      <h2 style={{textAlign:'center'}} className="text-center text-header">Calahex Digital Assets</h2>      
      
      <table>
        <tbody>
          {
            lists.map((row, index)=>{
              return (
                <tr key={index}>
                  <td className="text-center">
                    <img src={row['token_logo']} height="30px" width="30px"></img>
                  </td>
                  <td className="text-center">{row['token_name']}({row['token_symbol']})</td>
                </tr>  
              )
            })
          }                   
        </tbody>
      </table>

    </HelpDiv>
  )
}

export default ListedAssets;