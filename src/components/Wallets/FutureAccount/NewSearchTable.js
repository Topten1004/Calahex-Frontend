import React, { useState } from "react";
import MaterialTable from "material-table";
import DeleteIcon from "@material-ui/icons/Delete";
import SearchIcon from "@material-ui/icons/Search";
import SaveIcon from "@material-ui/icons/Save";
import { Button } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import LastPageIcon from '@material-ui/icons/LastPage';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
export default function App() {
    const [dataStore, setDataStore] = useState([
        { coin: "BTC", total: "0.00000", available: "0.00000000", in_order: "0.00000000" },
        { coin: "ETH", total: "0.00000", available: "0.00000000", in_order: "0.00000000" },
        { coin: "USDT", total: "0.00000", available: "0.00000000", in_order: "0.00000000" },
        { coin: "EOS", total: "0.00000", available: "0.00000000", in_order: "0.00000000" },
        { coin: "BTC", total: "0.00000", available: "0.00000000", in_order: "0.00000000" },


    ]);

    return (
        <div className="App">
            <div style={{padding:'0px 10px', position: 'fixed'}}>
                <div >
                    <FormControlLabel
                        control={
                            <Checkbox
                                name="checkedB"
                                color="primary"
                            />
                        }
                    />
                    <p >Hide small balances</p>
                </div>
                {/* <div>
                    <a href={""}><p >Convert to CAX</p></a>
                </div> */}
            </div>
            <div style={{ maxWidth: "100%", paddingTop: "12px" }}>
                <MaterialTable
                    columns={[
                        {
                            title: "Coin",
                            field: "coin",
                            headerStyle: {
                                backgroundColor: "#e8e8e8",
                                color: "black"
                            }
                        },
                        {
                            title: "Total",
                            field: "total",
                            headerStyle: {
                                backgroundColor: "#e8e8e8",
                                color: "black"
                            }
                        },
                        {
                            title: "Available",
                            field: "available",
                            type: "numeric",
                            headerStyle: {
                                backgroundColor: "#e8e8e8",
                                color: "black"
                            }
                        },
                        {
                            title: "In order",
                            field: "in_order",
                            type: "numeric",
                            headerStyle: {
                                backgroundColor: "#e8e8e8",
                                color: "black"
                            }
                        }
                    ]}
                    data={dataStore}
                    title="Material-Table Demo"
                    icons={{
                        Clear: (props) => <CloseIcon />,
                        Search: (props) => <SearchIcon />,
                        ResetSearch: (props) => <CloseIcon />,
                        FirstPage: (props) => <FirstPageIcon />,
                        LastPage: (props) => <LastPageIcon />,
                        NextPage: (props) => <NavigateNextIcon />,
                        PreviousPage: (props) => <NavigateBeforeIcon />,
                        SortArrow: (props) => <ArrowDownwardIcon />,
                    }}
                    actions={[
                        {
                            icon: () => <SaveIcon />,
                            tooltip: "Save User",
                            onClick: (event, rowData) => alert("You saved " + rowData.name)
                        },
                        {
                            icon: () => <SaveIcon />,
                            tooltip: "Save User",
                            onClick: (event, rowData) => alert("You saved " + rowData.name)
                        }
                    ]}
                    components={{
                        Action: (props) => (
                            <Button
                                onClick={(event) => props.action.onClick(event, props.data)}
                                color="primary"
                                variant="text"
                                style={{ textTransform: "none" }}
                                size="small"
                            >
                                Save
                            </Button>
                        )
                    }}
                    options={{
                        headerStyle: {
                            backgroundColor: "#e8e8e8",
                            color: "black"
                        }
                    }}
                />
            </div>
        </div>
    );
}
