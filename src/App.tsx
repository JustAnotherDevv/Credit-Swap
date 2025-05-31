import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./dashboard/explore";
import RequestNew from "./dashboard/requests/new";
import Proposals from "./dashboard/proposals";
import ProofTimeline from "./dashboard/proofs/proof-timeline";
import RequestDetail from "./dashboard/requests/request-detail";
import CreditSwapManagement from "./dashboard/credit-swap-management";
import ManagementConsole from "./dashboard/manage";

function App() {
  return (
    <Router>
      {/* GENERAL */}
      <Routes>
        <Route path="/" element={<ManagementConsole />} />
      </Routes>

      {/* PROXY BUYER */}
      <Routes>
        <Route path="/dashboard/explore" element={<Dashboard />} />
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
