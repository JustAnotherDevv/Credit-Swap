import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RequestNew from "./dashboard/requests/new-request";
import ProposalNew from "./dashboard/requests/new-proposal";
import Proposals from "./dashboard/proposals";
import ProofTimeline from "./dashboard/proofs/proof-timeline";
import RequestDetail from "./dashboard/requests/deal-info";
import CreditSwapManagement from "./dashboard/credit-swap-management";
import ManagementConsole from "./dashboard/manage";
import ManagementConsoleProxy from "./dashboard/manage-proxy";
import SwapOpportunities from "./dashboard/swap-opportunities";

import Home from "./dashboard/home";
import MyDeals from "./dashboard/my-deals";

function App() {
  return (
    <Router>
      {/* LANDING */}
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>

      {/* PROXY BUYER */}
      <Routes>
        <Route path="/dashboard/my-deals" element={<MyDeals />} />
      </Routes>
      <Routes>
        <Route
          path="/dashboard/swap-opportunities"
          element={<SwapOpportunities />}
        />
      </Routes>
      <Routes>
        <Route
          path="/dashboard/manage-proxy/:id"
          element={<ManagementConsoleProxy />}
        />
      </Routes>
      <Routes>
        <Route path="/dashboard/new-proposal" element={<ProposalNew />} />
      </Routes>

      {/* ASSET MANAGER*/}
      <Routes>
        <Route path="/dashboard/requests/new" element={<RequestNew />} />
      </Routes>
      <Routes>
        <Route
          path="/dashboard/requests/request-detail/:id"
          element={<RequestDetail />}
        />
      </Routes>
      <Routes>
        <Route path="/dashboard/requests/:id" element={<RequestDetail />} />
      </Routes>
      <Routes>
        <Route path="/dashboard/proofs/:id" element={<ProofTimeline />} />
      </Routes>

      <Routes>
        <Route path="/dashboard/proposals" element={<Proposals />} />
      </Routes>
      <Routes>
        <Route path="/dashboard/manage/:id" element={<ManagementConsole />} />
      </Routes>
      <Routes>
        <Route
          path="/dashboard/proofs/prooftimeline/:id"
          element={<ProofTimeline />}
        />
      </Routes>
      <Routes>
        <Route
          path="/dashboard/creditswapmanagement"
          element={<CreditSwapManagement />}
        />
      </Routes>
    </Router>
  );
}

export default App;
