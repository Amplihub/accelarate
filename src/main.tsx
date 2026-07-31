
  import { createRoot } from "react-dom/client";
  import App from "./app/App.tsx";
  import PrivacyPolicy from "./app/PrivacyPolicy.tsx";
  import TermsConditions from "./app/TermsConditions.tsx";
  import "./styles/index.css";

  function resolvePage() {
    switch (window.location.pathname) {
      case "/privacy-policy":
        return <PrivacyPolicy />;
      case "/terms-conditions":
        return <TermsConditions />;
      default:
        return <App />;
    }
  }

  createRoot(document.getElementById("root")!).render(resolvePage());
