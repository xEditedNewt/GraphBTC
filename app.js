async function Graph(){
    await prix("BTC")
    await prix("ETH")
    await prix("BNB")
    await prix("SOL")
    data = await getData()
    console.log()
    const prixBTC = document.getElementById("prixBTC");
  const prixBTCChart = new Chart(prixBTC,{
    type:"line",
    data:{
      labels: data.map(row => new Date(row.time * 1000).toLocaleString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })),
      datasets:[{
        data:data.map(row => row.open),
        label: "Bitcoin",
        borderColor: '#3e95cd',
        borderJoinStyle: 'round',
        borderCapStyle: 'round',
        borderWidth: 3,
        pointRadius: 0,
        pointHitRadius: 10,
        lineTension: .2
      }]
    },
    options: {
      plugins: {
          legend: {
              display: false,
          }
      }
  }
  })
}
async function getData() {
    try {
      const response = await fetch(
        `https://min-api.cryptocompare.com/data/v2/histominute?fsym=BTC&tsym=USD&limit=50&api_key=5d8daf017d0c5d2feb42a706987d1ab05233dc0effabaab6d4418ceed53ac14e`
      );
      const data = await response.json();
      console.log(data.Data.Data)
      return data.Data.Data
  
    } catch (error) {
      console.error(error);
    }
  }


async function prix(CRY){
    try {
        const response = await fetch(
          `https://api.binance.com/api/v3/ticker/price?symbol=${CRY}USDT`
        );
        const data = await response.json();
        document.getElementById(CRY).style.display = "block";
        document.getElementById(CRY).innerHTML = "$ " + data.price;
      } catch (error) {
        console.error(error);
      }
}
