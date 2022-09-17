import { React, useState } from "react";
import "./App.css";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import { FcSpeaker } from "react-icons/fc";
import {
  Card,
  Typography,
  CardContent,
  CardActions,
  Button,
  TextField,
  Divider,
  Grid
} from "@mui/material";

function App() {
  const [data, setData] = useState("");
  const [words, setWords] = useState("");

  function getWords() {
    axios
      .get(`https://api.dictionaryapi.dev/api/v2/entries/en_US/${words}`)
      .then((response) => {
        setData(response.data[0]);
      });
  }

  function getAudio() {
    let audio = new Audio(data.phonetics[0].audio);
    audio.play();
  }

  return (
    <div className="App">
      <img src="https://cdn.iconscout.com/icon/premium/png-256-thumb/text-reading-bot-4253413-3529788.png" style={{height:"100px"}} alt="logo"></img>
      <h1>Dictionaryapi</h1>

      <div className="input">
        <TextField
          type="text"
          placeholder="Enter Word..."
          onChange={(e) => {
            setWords(e.target.value);
          }}
        />

        <Button
          onClick={() => {
            getWords();
          }}
          variant="outlined"
          color="primary"
          size="large"
          sx={{ height: 55, ml: 1 }}
        >
          <FaSearch size="10px" />
        </Button>
        <Divider sx={{ m: 2 }}></Divider>
      </div>

      {data && (
        <div className="result">
          <Card
            sx={{
              width: "auto",
              boxShadow: 5,
              color: "primary.main",
              m: 5,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <CardContent>
              <CardActions
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <Typography variant="h4" sx={{ fontWeight:600, fontStyle: "italic" , mb:0}}>
                  {data.word}{" :"}

                  <Button
                    onClick={() => {
                      getAudio();
                    }}
                    variant="outlined"
                  >
                    <FcSpeaker />

                  </Button>
                </Typography>
                </CardActions>

                <Grid container  sx={{display: "flex", justifyContent: "center",mb:3 }}>
                  <Grid item>
                <Typography variant="subtitle1">{data.phonetic}</Typography>
                </Grid>
                </Grid>
              

              <Grid container className="left">
                <Grid item md={6}>
                  <Typography variant="subtitle" fontWeight="700" sx={{ m: 2 }}>
                    Part of Speech:
                  </Typography>

                  <Typography variant="body1" sx={{ m: 2 }}>
                    {data.meanings[0].partOfSpeech}
                  </Typography>

                  <Typography variant="subtitle" fontWeight="700">Definition:</Typography>

                  <Typography variant="body1" sx={{ m: 2 }}>
                    {data.meanings[0].definitions[0].definition}
                  </Typography>
                </Grid>

                <Grid item className="right" md={6}>
                  <Typography variant="subtitle" sx={{fontWeight:"700"}}>
                    Part of Speech:{" "}
                  </Typography>

                  <Typography variant="body1" sx={{ m: 2 }}>
                    {data.meanings[1].partOfSpeech}
                  </Typography>

                  <Typography variant="subtitle" fontWeight="700">
                    Definition
                  </Typography>

                  <Typography variant="body1" sx={{ m: 2 }}>
                    {data.meanings[1].definitions[0].definition}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

export default App;
