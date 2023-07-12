const express = require("express");
const axios = require("axios");

const app = express();

async function getTokenList(chainNumber) {
  try {
    const response = await axios.get(
      `https://raw.githubusercontent.com/viaprotocol/tokenlists/main/tokenlists/all.json`
    );

    const list = response.data[chainNumber];
    const tokenList = list?.map((token) => ({
      symbol: token.symbol,
      name: token.name,
      address: token.address,
      decimals: token.decimals,
      chainid: token.chainId,
      logourl: token.logoURI,
    }));
    return tokenList;
  } catch (error) {
    console.error("Error retrieving token list:", error);
    throw error;
  }
}

app.get('/tokenlist/:chain', async (req, res) => {
  try {
    const { chain } = req.params;
    const tokenList = await getTokenList(chain);
    res.json(tokenList);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(3002, function () {
  console.log("port 3002!");
});
