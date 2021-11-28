import "./styles.css";
import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

export default function App() {
  const [kategorie, setKategorie] = useState("");
  const [kats, setKats] = useState([]);
  //new Date(Math.ceil(new Date().getTime() / 900000) * 900000)

  const [apireply, setApiReply] = useState([]);

  const [status, setStatus] = useState("idle");

  useEffect(() => {
    //if (!query) return;

    const fetchData = async () => {
      setStatus("fetching");
      const requestOptions = {
        method: "POST",
        //headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({
          //kategorie: kategorie
          //dateTo: enddate
        })
      };
      const response = await fetch(
        "https://60min.karlova25.cz/q_rb2.php",
        requestOptions
      );
      const data = await response.json();
      setKats(data);
      setStatus("fetched");
    };
    fetchData();
    //console.log(kats);
  }, []);

  useEffect(() => {
    //if (!query) return;

    const fetchData = async () => {
      setStatus("fetching");
      const requestOptions = {
        method: "POST",
        //headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({
          kategorie: kategorie
          //dateTo: enddate
        })
      };
      const response = await fetch(
        "https://60min.karlova25.cz/q_rb.php",
        requestOptions
      );
      const data = await response.json();
      setApiReply(data);
      setStatus("fetched");
    };
    fetchData();
    //console.log(apireply);
  }, [kategorie]);

  var display = apireply.map((record, index) => {
    //console.log(kats);
    return (
      //{record.Jméno} {record.Příjmení}
      <ListItem key={`${index}${record.Příjmení}`}>
        <ListItemButton>
          {record.Jméno} {record.Příjmení}
        </ListItemButton>
      </ListItem>
    );
  });
  var cat = kats.map((record, index) => {
    //console.log(kats);
    return (
      //{record.Jméno} {record.Příjmení}

      <MenuItem key={`${index}${record.kategorie}`} value={record.kategorie}>
        {record.kategorie}
      </MenuItem>
    );
  });

  return (
    <div className="App">
      <InputLabel id="demo-simple-select-label">Kategorie</InputLabel>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Kategorie</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={kategorie}
          label="Kategorie"
          onChange={(e) => setKategorie(e.target.value)}
        >
          <MenuItem key="sdfs145" value="">
            Všechny
          </MenuItem>
          {cat}
        </Select>
      </FormControl>
      {console.log(kategorie)}

      {display}
      <List
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            <h2>Tabulka</h2>
          </ListSubheader>
        }
      >
        <ListItem>
          <ListItemButton>
            <ListItemText primary="Trash" />
          </ListItemButton>
        </ListItem>
      </List>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}
