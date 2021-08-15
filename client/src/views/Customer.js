import React, { useState, useEffect, useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import {
  Grid,
  Stepper,
  Step,
  Paper,
  makeStyles,
  StepLabel,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup as MuiRadioGroup,
  FormControlLabel,
  InputLabel,
  Radio,
  MenuItem,
  Select as MuiSelect,
  Button,
} from "@material-ui/core";
import "./Customer.css";
import InputAdornment from "@material-ui/core/InputAdornment";
import { multiStepContext } from "../Context/StepContext";

export default function Customer() {
  const { id } = useParams();
  const [id2, setId2] = useState("");
  const [amount, setAmount] = useState();
  const [data, setData] = useState("");
  const [user, setUser] = useState([]);
  // const { transferData ,setTransferData, sendMoney } = useContext(multiStepContext);
  const history = useHistory();
  useEffect(async () => {
    getData(id);
    await axios.get("/customers").then((res) => {
      setUser(res.data);
    });
  }, [id]);

  console.log(data);

  const getData = async (id) => {
    console.log(id);
    const response = await axios.get(`/customers/${id}`);
    if (response) {
      setData(response.data);
    }
  };

async  function sendMoney () {
    await axios.post("/customer/money",transferData);
    console.log(transferData);
    history.push("/customers");
  }
// const {amount , person , amount2 , person2 } = transferData;
const transferData = {
  amount,
  id,
  id2
}

  return (
    <div>
      <div className="app">
        <div className="details">
          <div className="big-img">
            <img src={data.DOB} alt={data.DOB} />
          </div>
          <div className="box">
            <div className="row">
              <h4>
                {data.name}
                <h6>
                  <i class="fas fa-star" style={{ color: "yellow" }}></i>
                  {data.amount}/10
                </h6>
              </h4>

              <span>
                {data.accountType}
                <i></i> {data.gender}
              </span>
            </div>
            <div className="row">
              <FormControl>
                <InputLabel>Label</InputLabel>
                <MuiSelect
                // onChange={(e) => setTransferData({ ...transferData, person2: e.target.value })}
                // value={transferData["person2"]}
                  onChange={(e) => setId2(e.target.value)}
                  value={id2}
                >
                  {user.map((item) => {
                    return (
                      <>
                        {data.name !== item.name ? (
                          <>
                            <MenuItem value={item._id}>{item.name}</MenuItem>
                          </>
                        ) : null}
                      </>
                    );
                  })}
                </MuiSelect>
              </FormControl>

              {/* <FormControl>
                <InputLabel>Account-Type</InputLabel>
                <MuiSelect
                // onChange={(e) =>
                //   setUserData({ ...userData, accountType: e.target.value })
                // }
                // value={userData["accountType"]}
                >
                  <MenuItem value="Current Account">Current Account</MenuItem>
                  <MenuItem value="Savings Account">Savings Account</MenuItem>
                </MuiSelect>
              </FormControl> */}
              <div>
                <TextField
                  label="Deposit Amount"
                  id="standard-start-adornment"
                  // onChange={(e) => setTransferData({ ...transferData, amount2: e.target.value })}
                  // value={transferData["amount2"]}
                  value={amount}
                  onChange={(event) => setAmount(event.target.value)}
                  error={amount > data.amount}
                  helperText={
                    (console.log(amount),
                    console.log(data.amount),
                    amount > data.amount
                      ? "The amount is greater than your balance"
                      : " ")
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">₹</InputAdornment>
                    ),
                  }}
                />
              </div>
            </div>
            <div>
              {amount > data.amount ? (
                <Button variant="contained" disabled>
                  Send
                </Button>
              ) : (
                <Button variant="contained" color="primary" onClick={sendMoney}>
                  Send
                </Button>
              )}
            </div>
            {/* <p>
              <button className="cart">{data.Phone}</button>
              <Button variant="outline-primary">{Movie.Genre}</Button>
            </p>
            <p>{Movie.Plot}</p>
            <hr></hr>
            <p>
              <strong style={{ color: "#38b000" }}>
                Director&nbsp;&nbsp;{" "}
              </strong>{" "}
              {"       "}
              {Movie.Director}
            </p>
            <hr></hr>
            <p>
              <strong style={{ color: "#38b000" }}>Actors &nbsp;&nbsp; </strong>{" "}
              {"       "}
              {Movie.Actors}
            </p>
            <hr></hr>
            <p>
              <strong style={{ color: "#38b000" }}>
                Languages&nbsp;&nbsp;{" "}
              </strong>{" "}
              {"       "}
              {Movie.Language}
            </p> */}
          </div>
        </div>
      </div>
    </div>
  );
}
