import React from "react";
import { createRoot } from "react-dom/client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import { Button } from "../ui/button";

const removeSecureItem = (key: string) => {
  localStorage.removeItem(key);
};

export const showSessionExpiredModal = () => {
  if (document.getElementById("session-expired-modal")) return;

  const modalContainer = document.createElement("div");
  modalContainer.setAttribute("id", "session-expired-modal");
  document.body.appendChild(modalContainer);

  const root = createRoot(modalContainer);

  const handleLogout = () => {
    removeSecureItem("instructorToken");
    removeSecureItem("instructorDetails");

    root.unmount();
    document.body.removeChild(modalContainer);

    window.location.href = "/login";
  };

  root.render(<SessionExpiredModal onConfirm={handleLogout} />);
};

type Props = { onConfirm: () => void };

const SessionExpiredModal: React.FC<Props> = ({ onConfirm }) => (
  <Dialog open onOpenChange={(open) => !open && onConfirm()} >
    <DialogContent
      className="sm:max-w-[400px] flex flex-col items-center justify-center text-center"
       showCloseButton={false} 
    >
      <DialogHeader>
        <DialogTitle className="text-xl font-bold text-black">
          Session Expired
        </DialogTitle>
        <DialogDescription className="text-gray-600 mt-1">
          Your session has expired. Please log in again to continue.
        </DialogDescription>
      </DialogHeader>

      <div className="mt-4 w-full">
        <Button
          onClick={onConfirm}
          className="w-full bg-cyan-500 hover:bg-cyan-600 text-white"
        >
          Logout
        </Button>
      </div>
    </DialogContent>
  </Dialog>
);
