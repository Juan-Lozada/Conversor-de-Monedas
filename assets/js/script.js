const inputClp = document.querySelector('#inputClp');
const inputCurrency = document.querySelector('#inputCurrency');
const currencyConverter = document.querySelector('#currencyConverter');


var currencyDolar = 0;
var currencyEuro = 0;
var precioClp = 0;
var canvaOn = false;
var currencyChangeIndex = 0;

const calcularBtn = document.querySelector('#calcularBtn');
var currencyTypeH1 = document.getElementById("currencyTypeH1");
const dateNow = dateFunction();
var result = document.getElementById("result");

// -- ** Fecha ** -- \\
function dateFunction() {
  let date = new Date();

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  var dateNow = day + "/" + month + "/" + year;
  
  return dateNow;
}

function dateFunctionMenos(menos) {
  let date = new Date();

  let day = date.getDate() - menos;
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  var dateNow = day + "-" + month + "-" + year;
  return dateNow;
}


const currencyApiURL = "https://mindicador.cl/api/";

  try {
  } catch (error) {
    swal("Oooopss!", "Wait a momento, error for conection!", "Error");
  }
  
  async function getCurrency() {
    const res = await fetch(currencyApiURL);
    const currencyD = await res.json();
    return currencyD;
  }
  

  // -- ** Render Moneda ** -- \\
  async function renderCurrency() {
    const currencyD = await getCurrency();
    currencyDolar = currencyD.dolar.valor;
    currencyEuro = currencyD.euro.valor;
    console.log(currencyD.dolar.serie)
    let template ="";
    template += `
    <option class="option text-center" id="currencyC" value="${currencyD.dolar.codigo}">${currencyD.dolar.nombre}</option>
    `;
    template += `
    <option class="option text-center" id="currencyC" value="${currencyD.euro.codigo}">${currencyD.euro.nombre}</option>
    `;
    template += `
    <option class="option text-center" id="currencyC" selected> -- Seleccione una moneda -- </option>`;
    
    inputCurrency.innerHTML = template;
}
renderCurrency();



// -- ** cambio de tipo de moneda CLP ** -- \\

  inputClp.addEventListener("change", function () {
    var clpValue = inputClp.value;
    precioClp = Number(inputClp.value);
    const option_two = { style: "currency", currency: "CLP" };
    const numberFormat2 = new Intl.NumberFormat("es-cl", option_two);
    inputClp.value = numberFormat2.format(clpValue);

  });



function totalPrice(precioCurrency) {
  var price = inputClp / precioCurrency;
  return price;
}
console.log(totalPrice())


calcularBtn.addEventListener("click", function () {
  refreshCanva();
  if (validator() == true) {
    switch (inputCurrency.selectedIndex) {
      case 0:
        const option_4 = { style: "currency", currency: "USD", decimal: ',', separator: '.'};
        const numberFormat4 = new Intl.NumberFormat("en-us", option_4);
        result.innerHTML =
          numberFormat4.format(totalPrice(currencyDolar)) + " Dollars";
        break;
      case 1:
        const option_3 = { style: "currency", currency: "EUR", decimal: ','};
        const numberFormat3 = new Intl.NumberFormat("de-DE", option_3);
        result.innerHTML =
          numberFormat3.format(totalPrice(currencyEuro)) + " Euros";
        break;
    }
    renderGrafica();
  }
});

// -- ** Evento Button ** -- \\



 // -- ** validator converter ** -- \\

function validator() {
    let validate = false;
    if (Number.isNaN(inputClp) || Math.sign(inputClp) === -1 || inputClp === 0) {
      alert("datos incorrectos, por favor seleccione un numero valido.");
    } else {
      validate = true;
    }
    return validate;
  }


  // -- ** Chart Data ** -- \\

//Canvas Graphic
async function chartData() {
  const data = [];
  const datePrice = [];
  
  var x = 0;
  var contador = 0;
  var currencyType;

  while (x < 10) {
    contador++;
    var dateNowCount = dateFunctionMenos(contador);
    if (currencyChangeIndex === 0) {
      var URL =
        "https://mindicador.cl/api/" + "dolar" + "/" + dateNowCount + "";
    } else {
      var URL =
        "https://mindicador.cl/api/" + "euro" + "/" + dateNowCount + "";
    }
console.log(currencyChangeIndex)
    try {
      const res = await fetch(URL);
      const currencyDate = await res.json();
      console.log(currencyDate.name)
      if (currencyDate.serie.length != 0) {
        currencyType = currencyDate.nombre;
        var date = currencyDate.serie[0].date;
        console.log(date)
        data.push(currencyDate.serie[0].valor);
        date = date.substring(0, 10);
        datePrice.push(date);
        x++;
      }
    } catch (error) {
      console.log(error);
    }
  }
  currencyTypeH1.innerHTML = currencyType;

  const datasets = {
    labels: datePrice,
    datasets: [
      {
        label: currencyType,
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        data: data,
      },
    ],
  };

  return datasets;
}

// -- ** render Grafica ** -- \\

  async function renderGrafica() {
    const data = await chartData();
    const config = {
      type: "line",
      data: data,
    };
    const myChart = document.getElementById("myChart");
    myChart.innerHTML = "";
    myChart.style.backgroundColor = "white";
    window.myChart = new Chart(myChart, config);
    canvaOn = true;
  }


// -- ** refresh Canva ** -- \\

  function refreshCanva() {
    if (canvaOn === true) {
      
      window.myChart.clear();
      window.myChart.destroy();
    }
    canvaOn = false;
  }
