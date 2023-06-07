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
    const [chartInfo, setChartInfo] = useState({});
    const [currencyUF, setCurrencyUF] = useState(0);
    const [precioClp, setPrecioClp] = useState(0);
    const [canvaOn, setCanvaOn] = useState(false);
    const [currencyChangeIndex, setCurrencyChangeIndex] = useState(1);
    const [dateNow, setDateNow] = useState("");
    const [result, setResult] = useState("");
    const [canvasReady, setCanvasReady] = useState(false);
    const [priceHistory, setPriceHistory] = useState([]);
    const [chartInstance, setChartInstance] = useState(null);

    const inputClp = useRef(null);

    useEffect(() => {
        const canvasElement = document.getElementById("myChart");
        if (canvasElement) {
            setCanvasReady(true);
            renderGrafica();
        }
    }, []);

    useEffect(() => {
        async function ChartDataAPI({ inputCurrency }) {
            const data = await ChartData({ inputCurrency });
            setChartInfo(data);
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
        const clpValue = inputClp.current.value.trim(); // Eliminar espacios en blanco al inicio y al final

        if (clpValue === "") {
            alert("Datos incorrectos, por favor seleccione un número válido.");
        } else if (isNaN(clpValue) || clpValue <= 0) {
            inputClp.current.value = "";
            alert("Datos incorrectos, por favor seleccione un número válido.");
        } else if (currencyChangeIndex === 0) {
            alert("Por favor, seleccione una moneda a convertir.");
        } else {
            validate = true;
        }

        return validate;
    }

    function totalPrice(precioCurrency) {
        if (currencyChangeIndex === 1) {
            const price = precioClp * precioCurrency;
            return price;
        } else {
            const price = precioClp / precioCurrency;
            return price;
        }
    }

    function refreshCanva() {
        if (chartInstance) {
            chartInstance.destroy();
        }
        setCanvaOn(false);
    }

    function handleInputChange(event) {
        let clpValue = event.target.value;
        clpValue = clpValue.replace(/[^0-9.]/g, "");
        setPrecioClp(Number(clpValue));
    }

    function handleCalcularBtnClick() {
        refreshCanva();
        if (validator()) {
            const ufValue = currencyUF;
            const convertedPriceUF = totalPrice(ufValue);
            setResult(convertedPriceUF.toLocaleString("es-CL") + " CLP");
            setPriceHistory(prevPriceHistory => prevPriceHistory.concat(convertedPriceUF));
            renderGrafica();
        }
    }


    function renderGrafica() {
        if (!canvasReady) {
            return;
        }
        const ctx = document.getElementById("myChart").getContext("2d");

        if (chartInstance) {
            chartInstance.destroy();
        }

        const sortedPriceHistory = priceHistory.slice().sort((a, b) => a - b);

        const newChartInstance = new Chart(ctx, {
            type: "bar",
            data: {
                labels: sortedPriceHistory.map((_, index) => `Día ${index + 1}`),
                datasets: [
                    {
                        label: "Historial de precios",
                        data: sortedPriceHistory,
                        backgroundColor: "rgba(54, 162, 235, 0.6)",
                    },
                ],
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                    },
                },
            },
        });

        setChartInstance(newChartInstance);
        setCanvaOn(true);
    }

    return (
        <MDBCard>
            <MDBRow>
                <MDBCol>
                    <div className="input-group mb-3 mt-3" id="inputBg">
                        <h2 className="text-center col-12 p-2">UF</h2>
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
                options={[
                    { value: "CLP", label: "CLP" }
                ]}
                defaultValue={{ value: "CLP", label: "CLP" }}
                onChange={(selectedOption) =>
                    setCurrencyChangeIndex(selectedOption.selectedIndex)
                }
            />
            <MDBBtn
                type="button"
                className="btn btn-outline-info text-dark mx-auto col-5 rounded p-2 m-4"
                id="calcularBtn"
                onClick={handleCalcularBtnClick}
            >
                Calcular
            </MDBBtn>
            <h4 className="text-center col-12 p-2">Monto total: {result}</h4>

            
        </MDBCard>
    );
}
