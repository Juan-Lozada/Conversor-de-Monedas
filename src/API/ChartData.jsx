export default async function ChartData({ inputCurrency }) {
    let currencyType;
    let etiqueta = "";

    if (inputCurrency.selectedIndex === 0) {
        const URL = "https://mindicador.cl/api/uf";
        etiqueta = "uf";
        console.log(URL);

        try {
            const res = await fetch(URL);
            const currencyDate = await res.json();
            currencyType = currencyDate.serie.map((val) => val.valor);
            const date = currencyDate.serie.map((elemento) =>
                elemento.fecha.split("T")[0]
            );

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

            return datasets;
        } catch (error) {
            console.log(error);
        }
    }

    return {};
}
