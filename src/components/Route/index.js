import React, { useEffect } from "react";
import { Router } from "@reach/router";
import { listenKeyDownEvents } from "../../utils/keyDown";
import Customer from "../../containers/Customer";
import Charge from "../../containers/Charge";

export default () => {
  const params = new URLSearchParams(document.location.search);
  const component = params.get("component") || "app";

  useEffect(() => {
    window.addEventListener("keydown", listenKeyDownEvents, true);

    return () => window.removeEventListener("keydown", listenKeyDownEvents);
  }, []);

  return (
    <Router>
      <>
        <Customer default={component === "customer"} path="/" />
        <Customer default={component === "customer"} path="/customer" />
        <Charge default={component === "charge"} path="/charge" />
      </>
    </Router>
  );
};
