import React, { useState, useEffect } from "react";
import {Container,Col,Row,Card,CardBody,CardTitle,CardSubtitle,CardText} from "reactstrap";
import "./App.css";

function App() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd")
      const data = await response.json();
      setCoins(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  });

  const filteredCryptoData = coins.filter((crypto) =>
  crypto.name.toLowerCase().includes(search.toLowerCase())
);
  

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="app">
      <h1 id="title" >COIN MARKET</h1>
      <div>
        <Container>
          <Row>
            <Col>
              <input
                className="search-box"
                type="text"
                placeholder="Search Coin..."
                value={search}
                onChange={handleChange}
              />
            </Col>
          </Row>
        </Container>
      </div>
      <div className="card-container">
        {filteredCryptoData.map((crypto) => (
          <Card
            key={crypto.id}
            style={{
              width: "18rem",
            }}
          >
            <CardBody>
              <CardTitle tag="h5">{crypto.name}</CardTitle>
              <CardSubtitle className="mb-2 text-muted" tag="h6">
                {crypto.symbol.toUpperCase()}
              </CardSubtitle>
            </CardBody>
            <img alt={crypto.name} src={crypto.image} width="50%" />
            <CardBody>
              <CardText>
                <b>CURRENT PRICE :</b> ${crypto.current_price.toLocaleString()}<br/>
                <b>CHANGE PERCENTAGE :</b> %
                {crypto.price_change_percentage_24h < 0 ? (
                  <span className="text-red-500">
                    {crypto.price_change_percentage_24h}
                  </span>
                ) : (
                  <span className="text-green-400">
                    {crypto.price_change_percentage_24h}
                  </span>
                )}
              </CardText>
            </CardBody>
          </Card>
        ))}
      </div>
   

    </div>
  );
}

export default App;


