"use client";

import { HiPlus } from "react-icons/hi";
import { Button } from "../button";
import { useContext } from "react";
import { ModalContext } from "@/lib/contexts";
import Modal from "../modal";
import CreateNewBoardForm from "../forms/CreateNewBoardForm";

const NoBoardsFoundPage = () => {
  const modalContext = useContext(ModalContext);
  return (
    <section className="absolute inset-0 p-6 flex items-center justify-center flex-col gap-4">
      <h1 className="text-hlg text-medium-grey text-center">
        No boards have been created yet.
      </h1>
      <Button
        size="lg"
        startIcon={<HiPlus />}
        onClick={() =>
          modalContext?.dispatch({
            type: "setModal",
            payload: (
              <Modal title="Create new board">
                <CreateNewBoardForm />
              </Modal>
            ),
          })
        }
      >
        Create New Board
      </Button>
    </section>
  );
};

export default NoBoardsFoundPage;
