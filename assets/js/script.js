
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



window.addEventListener('load', () => {
  inputClp.value = ''
})


// -- ** validator converter ** -- \\
inputClp.addEventListener('input', function validator() { })



function validator() {
  let validate = false;
  const currencyC = inputCurrency.options[inputCurrency.selectedIndex].value;
  console.log(currencyC)
  if (isNaN(inputClp.value) || inputClp.value <= 0) {
    inputClp.value = ''
    inputClp.value.replace(/ /g, "")
    alert("datos incorrectos, por favor seleccione un numero valido.");
  } else if (currencyC == 'predeterminado') {
    alert("Por favor, seleccione una moneda a convertir.")
  } else {
    validate = true;
  }
  return validate;
}


// -- ** Fecha ** -- \\
function dateFunction() {
  let date = new Date();

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  var dateNow = day + "/" + month + "/" + year;

  return dateNow;
}


// -- ** Fecha menos ** -- \\
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
  let template = "";
  template += `
    <option class="option text-center" id="currencyC" value="${currencyD.dolar.codigo}">${currencyD.dolar.nombre}</option>
    `;
  template += `
    <option class="option text-center" id="currencyC2" value="${currencyD.euro.codigo}">${currencyD.euro.nombre}</option>
    `;
  template += `
    <option class="option text-center" id="currencyC3" selected value="predeterminado"> -- Seleccione una moneda -- </option>`;

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
  var price = precioClp / precioCurrency;
  return price;
}

// -- ** Evento Button ** -- \\

calcularBtn.addEventListener("click", function () {
  refreshCanva();
  if (validator() == true) {
    switch (inputCurrency.selectedIndex) {
      case 0:
        const option_4 = { style: "currency", currency: "USD", decimal: ',', separator: '.' };
        const numberFormat4 = new Intl.NumberFormat("en-us", option_4);
        result.innerHTML =
          numberFormat4.format(totalPrice(currencyDolar)) + " Dollars";
        break;
      case 1:
        const option_3 = { style: "currency", currency: "EUR", decimal: ',' };
        const numberFormat3 = new Intl.NumberFormat("de-DE", option_3);
        result.innerHTML =
          numberFormat3.format(totalPrice(currencyEuro)) + " Euros";
        break;
    }
    renderGrafica();
  }
});

// -- ** Chart Data ** -- \\

async function chartData() {
  var currencyType;
  let etiqueta = "";
  if (inputCurrency.selectedIndex == 0) {
    var URL = "https://mindicador.cl/api/" + "dolar";
    etiqueta = "Dolar";
  } else {
    var URL = "https://mindicador.cl/api/" + "euro";
    etiqueta = "Euro";
  }

  try {
    const res = await fetch(URL);
    const currencyDate = await res.json();
    currencyType = currencyDate.serie.map((val) => { return val.valor });
    var date = currencyDate.serie.map((elemento) => { return elemento.fecha.split("T")[0] });
  } catch (error) {
    console.log(error);
  }



  const datasets = {
    labels: date,
    datasets: [
      {
        label: etiqueta,
        backgroundColor: "#2B7A0B",
        borderColor: "#5BB318",
        data: currencyType,
      },
    ],
  };
  currencyTypeH1.innerHTML = 'Ultimo valor de:' + etiqueta;
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
