// //variables
// var divLeft = document.getElementById("divLeft");
// var buttonTransform = document.getElementById("buttonTransform");
// var inputMoney = document.getElementById("inputMoney");
// var imgMoneyChange = document.getElementById("imgMoneyChange");
// var valueInputClp = 0;
// let variableNaN = NaN;
// var result = document.getElementById("result");
// var priceDolar = 0;
// var priceEuro = 0;
// const fechaActual = fechaActualFunction();
// var moneyChangeIndex = 0;
// var typeMoneyH1 = document.getElementById("typeMoneyH1");
// var existCanva = false;

// //FUNCIONES EXTRAS para la fecha actual
// function fechaActualFunction() {
//   let date = new Date();

//   let day = date.getDate();
//   let month = date.getMonth() + 1;
//   let year = date.getFullYear();
//   var fechaActual = day + "/" + month + "/" + year;
//   return fechaActual;
// }

// function fechaActualMenos(menos) {
//   let date = new Date();

//   let day = date.getDate() - menos;
//   let month = date.getMonth() + 1;
//   let year = date.getFullYear();
//   var fechaActual = day + "-" + month + "-" + year;
//   return fechaActual;
// }

// function changeImage() {
//   divLeft.style.backgroundColor = "#9018F5";
//   divLeft.style.backgroundImage =
//     "url('https://img.freepik.com/foto-gratis/monedas-billetes-dinero-rublos-rusos-esparcidos-monton-vista-superior-mesa-idea-fondo-o-banner-noticias-mercado_166373-2643.jpg?t=st=1658170846~exp=1658171446~hmac=64eb3c312e14af98d40496d2f9a33c360520ef660a2e463853ffe18dcabbaf21&w=1380')";
// }

// changeImage();
// const converterMoneys = document.querySelector("#moneyChange");
// const apiURL = "https://mindicador.cl/api/";
// //Converter money
// try {
// } catch (error) {
//   swal("Oooopss!", "Wait a momento, error for conection!", "Error");
// }

// async function getMoneys() {
//   const res = await fetch(apiURL);
//   const moneys = await res.json();
//   return moneys;
// }

// async function renderMoneys() {
//   const moneys = await getMoneys();
//   priceDolar = moneys.dolar.valor;
//   priceEuro = moneys.euro.valor;
//   let template = "";
//   template += `
//             <option class="selectedItem" value="${moneys.dolar.codigo}">${moneys.dolar.nombre}&emsp;💵</option>
//             `;
//   template += `
//             <option class="selectedItem" value="${moneys.euro.codigo}">€&emsp;${moneys.euro.nombre}&emsp;💶</option>
//             `;
//   converterMoneys.innerHTML = template;
// }
// renderMoneys();

// //change input CLP
// inputMoney.addEventListener("change", function () {
//   var valueInput = inputMoney.value;
//   valueInputClp = Number(inputMoney.value);
//   const options2 = { style: "currency", currency: "CLP" };
//   const numberFormat2 = new Intl.NumberFormat("es-cl", options2);
//   inputMoney.value = numberFormat2.format(valueInput);
//   // expected output: "$654.321"
// });

// //Change input Money different
// moneyChange.addEventListener("change", function () {
//   moneyChangeIndex = converterMoneys.selectedIndex;
//   switch (converterMoneys.selectedIndex) {
//     case 0:
//       imgMoneyChange.src =
//         "http://purecatamphetamine.github.io/country-flag-icons/1x1/US.svg";
//       break;
//     case 1:
//       imgMoneyChange.src =
//         "https://catamphetamine.gitlab.io/country-flag-icons/3x2/EU.svg";
//       break;
//   }
// });

// function precioMoney(priceMoney) {
//   var price = valueInputClp / priceMoney;
//   return price;
// }

// //button and label result
// buttonChange.addEventListener("click", function () {
//   refreshCanva();
//   if (validator() == true) {
//     switch (converterMoneys.selectedIndex) {
//       case 0:
//         const options4 = { style: "currency", currency: "USD" };
//         const numberFormat4 = new Intl.NumberFormat("en-us", options4);
//         result.innerHTML =
//           numberFormat4.format(precioMoney(priceDolar)) + " Dollars";
//         break;
//       case 1:
//         const options3 = { style: "currency", currency: "EUR" };
//         const numberFormat3 = new Intl.NumberFormat("de-DE", options3);
//         result.innerHTML =
//           numberFormat3.format(precioMoney(priceEuro)) + " Euros";
//         break;
//     }
//     renderGrafica();
//   }
// });

// //validator converter
// function validator() {
//   var validate = false;
//   if (Number.isNaN(valueInputClp) || valueInputClp === 0) {
//     swal("Oooopss!", "Some element is empty or added wrong!", "Error");
//   } else {
//     validate = true;
//   }
//   return validate;
// }

// //Canvas Graphic
// async function getAndCreateDataToChart() {
//   const data = [];
//   const datePrice = [];
//   var x = 0;
//   var contador = 0;
//   var typeMoney;
//   while (x < 10) {
//     contador++;
//     var contFechaActual = fechaActualMenos(contador);
//     if (moneyChangeIndex === 0) {
//       var URL =
//         "https://mindicador.cl/api/" + "dolar" + "/" + contFechaActual + "";
//     } else {
//       var URL =
//         "https://mindicador.cl/api/" + "euro" + "/" + contFechaActual + "";
//     }

//     try {
//       const res = await fetch(URL);
//       const moneysDate = await res.json();
//       if (moneysDate.serie.length != 0) {
//         typeMoney = moneysDate.nombre;
//         var fecha = moneysDate.serie[0].fecha;
//         data.push(moneysDate.serie[0].valor);
//         fecha = fecha.substr(0, 10);
//         datePrice.push(fecha);
//         x++;
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   }
//   typeMoneyH1.innerHTML = typeMoney;

//   const datasets = {
//     labels: datePrice,
//     datasets: [
//       {
//         label: typeMoney,
//         backgroundColor: "rgb(255, 99, 132)",
//         borderColor: "rgb(255, 99, 132)",
//         data: data,
//       },
//     ],
//   };

//   return datasets;
// }

// async function renderGrafica() {
//   const data = await getAndCreateDataToChart();
//   const config = {
//     type: "line",
//     data: data,
//   };
//   const myChart = document.getElementById("myChart");
//   myChart.innerHTML = "";
//   myChart.style.backgroundColor = "white";
//   window.myChart = new Chart(myChart, config);
//   existCanva = true;
// }

// function refreshCanva() {
//   var myChart = document.getElementById("myChart");
//   if (existCanva === true) {
//     window.myChart.clear();
//     window.myChart.destroy();
//   }
//   existCanva = false;
// }