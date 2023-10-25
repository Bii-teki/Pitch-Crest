import React from "react";
import { GooeyCircleLoader } from "react-loaders-kit";
import Typed from "react-typed";

function Loader() {

  const loaderProps = {
    loading: true,
    display: "flex",
    size: 275,
    justifyItems:  "center",
    duration: 2,
    colors: ["#99fffe", "#f42e00", "#042549"],
    justifyContent:  "center",
    marginTop: "600px",
  };

  return (
  
    <div className="loader ">

        <GooeyCircleLoader {...loaderProps} />
        <Typed
          className="loader-text"
          strings={["Loading..."]}
          typeSpeed={60}
          backSpeed={0}
        />
        </div>
  
  );
}

export default Loader;