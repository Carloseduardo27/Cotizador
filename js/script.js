const form = document.querySelector('#coin-form');
const coin = document.querySelector('#coin');
const crypto = document.querySelector('#crypto');
const amount = document.querySelector('#amount');
const coinInfo = document.querySelector('#coin-info');
const container = document.querySelector('#container');
const spinner = document.querySelector('.spinner');

window.addEventListener('load', () => {
  setTimeout(() => {
    spinner.classList.add('spinner-hidden');
    container.classList.remove('spinner-hidden');
  }, 1000);
});

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const coinSelected = [...coin.children].find(
    (option) => option.selected
  ).value;
  const cryptoSelected = [...crypto.children].find(
    (option) => option.selected
  ).value;
  const amountValue = amount.value;


  spinner.classList.remove('spinner-hidden');
  container.classList.add('spinner-hidden');
  coinInfo.innerHTML = ''; 

  try {
    const response = await (
      await fetch(
        `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cryptoSelected}&tsyms=${coinSelected}`
      )
    ).json();
    const price = response.DISPLAY[cryptoSelected][coinSelected].PRICE;
    const priceHigh = response.DISPLAY[cryptoSelected][coinSelected].HIGH24HOUR;
    const priceLow = response.DISPLAY[cryptoSelected][coinSelected].LOW24HOUR;
    const variation =
      response.DISPLAY[cryptoSelected][coinSelected].CHANGEPCT24HOUR;
    console.log(response.RAW[cryptoSelected][coinSelected].PRICE);

    if (amountValue != '') {
      const result =
        Number(amountValue) / response.RAW[cryptoSelected][coinSelected].PRICE;
      coinInfo.innerHTML = `
<p class="info">El precio es: <span class="price">${price}</span> </p>
<p class="info">El precio mas alto es: <span class="price">${priceHigh}</span> </p>
<p class="info">El precio mas bajo es: <span class="price">${priceLow}</span> </p>
<p class="info">Variacion 24H: <span class="price">${variation}%</span> </p>
<p class="info">Puede comprar: <span class="price">${result.toFixed(
        4
      )} ${cryptoSelected}</span> </p>`;
    } else {
      coinInfo.innerHTML = `
<p class="info">El precio es: <span class="price">${price}</span> </p>
<p class="info">El precio mas alto es: <span class="price">${priceHigh}</span> </p>
<p class="info">El precio mas bajo es: <span class="price">${priceLow}</span> </p>
<p class="info">variación 24H: <span class="price">${variation}%</span> </p>`;
    }
  } catch (error) {
    console.log(error);
    coinInfo.innerHTML = `<p class="error">Hubo un error al obtener la información de la moneda.</p>`;
  } finally {
    spinner.classList.add('spinner-hidden');
    container.classList.remove('spinner-hidden');
  }
});
