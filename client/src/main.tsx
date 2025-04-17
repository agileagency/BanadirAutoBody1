import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { Helmet } from "react-helmet";

createRoot(document.getElementById("root")!).render(
  <>
    <Helmet>
      <title>Banadir Auto Body Shop - Premier Auto Repair in Minneapolis, MN</title>
      <meta name="description" content="Minneapolis' trusted auto body repair shop working with all vehicle types and insurance providers. Quality repairs, expert service, and customer satisfaction guaranteed." />
      <meta name="keywords" content="auto repair, Minneapolis, auto body shop, car repair, collision repair, insurance claims, Banadir Auto" />
    </Helmet>
    <App />
  </>
);
