import { Outlet } from "react-router";
import { Modal } from "./Modal.tsx";

export const Layout = () => {
  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--background-dark)" }}
    >
      <Modal>
        <Outlet />
      </Modal>
    </div>
  );
};
