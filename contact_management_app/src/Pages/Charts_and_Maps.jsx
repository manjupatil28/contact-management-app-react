// Import necessary dependencies
import axios from "axios";
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';

import { MapContainer, TileLayer } from "react-leaflet";
import WorldMap from "../Components/WorldMap";

const Dashboard = () => {
  // Define state variables
  const [countriesData, setCountriesData] = useState([]);
  const [chartData, setChartData] = useState({});

  // Fetch countries data and update state
  useEffect(() => {
    axios(
      "https://disease.sh/v3/covid-19/countries"
    ).then((res) => {
      const data = res.data
      setCountriesData(data);
    })
  }, []);

  // Fetch chart data and update state, and register chart elements
  useEffect(() => {
    axios.get(
      "https://disease.sh/v3/covid-19/historical/all?lastdays=all"
    ).then((res) => {
      const data = res.data

      const newChartData = {
        labels: Object.keys(data.cases),
        datasets: [
          {
            label: "Cases",
            data: Object.values(data.cases),
            fill: false,
            borderColor: "#4A148C",
            tension: 0.2,
          },
        ],
      };

      setChartData(newChartData);
    })

    ChartJS.register(
      CategoryScale,
      LinearScale,
      PointElement,
      LineElement,
      Title,
      Tooltip,
      Legend
    );
  }, []);

  // Render the dashboard
  return (
    <div className="w-full pt-20 px-4 pb-8">
      <h1 className="max-w-full text-3xl mb-4 text-purple-900">Corona Cases Chart</h1>
      <div className="max-w-full border-2 border-purple-900 w-11/12 m-auto 10 auto 10">
        {chartData.datasets ?
          <Line data={chartData} /> :
          <h1 className="text-purple-900 mb-4 text-2xl">Loading...</h1>
        }
      </div>
      <h1 className="text-3xl mb-4 mt-4 text-purple-900">Corona Cases World Map</h1>
      <div className="border-2 border-purple-900 w-11/12 m-auto 5 auto 5">
        <MapContainer
          className="m-auto w-full  border-blue-700"
          bounds={[[-60, -180], [85, 180]]} zoom={2}
          center={[20, 40]}
          scrollWheelZoom={true}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <WorldMap countriesData={countriesData} />
        </MapContainer>
      </div>
    </div>
  );
};

export default Dashboard;
