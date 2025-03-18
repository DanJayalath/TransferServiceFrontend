// src/components/Chart/index.jsx
import { Line } from "react-chartjs-2";

const data = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Users",
      data: [12, 19, 3, 5, 2, 3],
      borderColor: "rgba(75, 192, 192, 1)",
      borderWidth: 2,
      fill: false,
    },
  ],
};

export default function ChartComponent() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">User Growth</h3>
      <Line data={data} />
    </div>
  );
}