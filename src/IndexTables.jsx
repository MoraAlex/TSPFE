import React from "react";
import axios from "axios";
import TableAptitude from "./TableAptitude";
import TableCities from "./TableCities";
import { useState } from "react";
import { useEffect } from "react";
import IndexCurve from "./IndexCurve";

function ConnectedTableCities() {
  const [data, setData] = useState(undefined);
  const [error, setError] = useState(null);
  const [isLoading, setIsloading] = useState(true);
  useEffect(() => {
    axios
      .get("http://localhost:8080/")
      .then((r) => {
        setData(r.data);
        setIsloading(false);
      })
      .catch((e) => setError(e));
  }, []);
  if (isLoading) {
    return <div>loading</div>;
  }
  if (error) {
    return <div>Error: {error.toString()}</div>;
  }
  // const distances = data.Paths.map((p, i) => ({ y: p[p.length - 1], x: i }));
  const cities = Object.keys(data.Cities).map((key) => ({
    id: key,
    x: data.Cities[key].Posx,
    y: data.Cities[key].Posy,
  }));
  const paths = data.Paths.map((p) => {
    if (p.length === 21) {
      p.pop();
    }
    return p.map((e) => cities[e - 1]);
  });
  return (
    <div style={{ maxWidth: "100%", overflow: "hidden" }}>
      <TableCities paths={paths} />
      <TableAptitude distances={data.Distances} />
      <IndexCurve />
    </div>
  );
}

export default ConnectedTableCities;
