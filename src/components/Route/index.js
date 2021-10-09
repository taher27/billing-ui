import React, { useEffect } from "react";
import { Router } from "@reach/router";
import { listenKeyDownEvents } from "../../utils/keyDown";
import Customer from "../../containers/customer";
import Charge from "../../containers/charge";
import Navbar from "../../containers/navbar";

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
        <div>
          <Navbar default={component === "navbar"} path="/" />
        </div>
        <div>
          <Customer default={component === "customer"} path="/customer" />
          <Charge default={component === "charge"} path="/charge" />
        </div>
      </>
    </Router>
  );
};
