import { useEffect, useState, useRef } from "react";
import {
    MDBBtn,
    MDBContainer,
    MDBCard,
    MDBCol,
    MDBRow,
    MDBInput,
} from "mdb-react-ui-kit";
import Select from "react-select";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import ChartData from "../API/ChartData.jsx";

Chart.register(CategoryScale);

const currencyApiURL = "https://mindicador.cl/api/";

export default function Conversor() {
    const [chartInfo, setChartInfo] = useState(null);
    const [currencyUF, setCurrencyUF] = useState(0);
    const [precioClp, setPrecioClp] = useState(0);
    const [canvaOn, setCanvaOn] = useState(false);
    const [currencyChangeIndex, setCurrencyChangeIndex] = useState(0);
    const [dateNow, setDateNow] = useState("");
    const [result, setResult] = useState("");

    const inputClp = useRef(null);
    const inputCurrency = useRef(null);

    useEffect(() => {
        async function ChartDataAPI() {
            const data = await ChartData(inputCurrency.current);
            setChartInfo(data);;
        }

        ChartDataAPI();
        inputClp.current.value = "";
        renderCurrency();
        setDateNow(dateFunction());
    }, []);

    function dateFunction() {
        const date = new Date();
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const formattedDate = `${day}/${month}/${year}`;
        return formattedDate;
    }

    async function getCurrency() {
        const res = await fetch(currencyApiURL);
        const currencyData = await res.json();
        return currencyData;
    }

    async function renderCurrency() {
        const currencyData = await getCurrency();
        setCurrencyUF(currencyData.uf.valor);
        console.log(currencyData.uf.valor);
    }

    function validator() {
        let validate = false;
        const currencyC = inputCurrency.current.state.value;
        if (isNaN(inputClp.current.value) || inputClp.current.value <= 0) {
            inputClp.current.value = "";
            inputClp.current.value.replace(/ /g, "");
            alert("Datos incorrectos, por favor seleccione un número válido.");
        } else if (currencyC === "predeterminado") {
            alert("Por favor, seleccione una moneda a convertir.");
        } else {
            validate = true;
        }
        return validate;
    }

    function totalPrice(precioCurrency) {
        const price = precioClp / precioCurrency;

        const numberFormat = new Intl.NumberFormat("es-CL", {
            style: "currency",
            currency: "CLP",
        });

        return numberFormat.format(price);
    }


    function refreshCanva() {
        if (canvaOn === true) {
            window.myChart.clear();
            window.myChart.destroy();
        }
        setCanvaOn(false);
    }

    function handleInputChange(event) {
        const clpValue = event.target.value;
        setPrecioClp(Number(clpValue));

        const option_two = {
            style: "currency",
            currency: "CLP",
        };
        const numberFormat2 = new Intl.NumberFormat("es-cl", option_two);
        event.target.value = numberFormat2.format(clpValue);
    }

    function handleCurrencyChange(selectedOption) {
        setCurrencyChangeIndex(selectedOption.selectedIndex);
    }

    function handleCalcularBtnClick() {
        refreshCanva();
        if (validator()) {
            const ufValue = currencyUF;
            const convertedPriceUF = totalPrice(ufValue);
            setResult(convertedPriceUF + " UF");

            renderGrafica();
        }
    }
    function renderGrafica() {
        // Lógica para renderizar la gráfica utilizando Chart.js
        const ctx = document.getElementById("myChart").getContext("2d");
        window.myChart = new Chart(ctx, {
            type: "line",
            data: chartInfo,
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                    },
                },
            },
        });
        setCanvaOn(true);
    }

    return (
        <MDBCard>
            <MDBRow>
                <MDBCol>
                    <div className="input-group mb-3 mt-3" id="inputBg">
                        <h2 className="text-center col-12 p-2">Pesos CLP</h2>

                    </div>
                    <div>
                        <MDBInput
                            type="text"
                            className="form-control-lg col-8 mx-auto rounded"
                            id="inputClp"
                            ref={inputClp}
                            onChange={handleInputChange}
                        />
                    </div>
                </MDBCol>
            </MDBRow>
            <h3 className="text-center col-12 p-2">Moneda a convertir</h3>
            <Select
                className="form-select-lg col-8 mx-auto rounded"
                id="inputCurrency"
                ref={inputCurrency}
                options={[
                    { value: "UF", label: "UF" },
                ]}
                onChange={handleCurrencyChange}
            />
            <MDBBtn
                type="button"
                className="btn btn-outline-info text-dark mx-auto col-5 rounded p-2 m-4"
                id="calcularBtn"
                onClick={handleCalcularBtnClick}
            >
                Calcular
            </MDBBtn>
        </MDBCard>
    );
}
