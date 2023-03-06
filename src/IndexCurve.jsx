import React from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import CurvRef from "./CurvRef";

function IndexCurve() {
  const [data, setData] = useState(undefined);
  const [error, setError] = useState(null);
  const [isLoading, setIsloading] = useState(true);
  useEffect(() => {
    axios
      .get("http://localhost:8080/curva")
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
  return (
    <div style={{ maxWidth: "100%", overflow: "hidden" }}>
      <CurvRef allBest={data} />
    </div>
  );
}

export default IndexCurve;
