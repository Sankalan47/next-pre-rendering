import useSWR from "swr";

const fetcher = async () => {
  const res = await fetch("http://localhost:4000/dashboard");
  const data = await res.json();
  return data;
};

const DashboardSWR = () => {
  const { data, error } = useSWR("dashboard", useSWR);

  if (error) return "error occured";
  if (!data) return "no data";

  return <div>DashboardSWR</div>;
};

export default DashboardSWR;
