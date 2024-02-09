"use client";

import type { ReactElement, ReactNode } from "react";
import type { Variants } from "framer-motion";
import type { DropdownOptionsList } from "../dropdown";
import { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { HiDotsVertical, HiX } from "react-icons/hi";
import { ModalContext } from "@/lib/contexts";
import "@/assets/styles/modal.css";
import Dropdown from "../dropdown";
import { Button } from "../button";

const variants: Variants = {
  closed: {
    opacity: 0,
    transition: {
      duration: 0.1,
    },
  },
  open: {
    opacity: 1,
    transition: {
      duration: 0.1,
    },
  },
};

export interface I_ModalProps {
  children: ReactNode;
  title?: string;
  optionsList?: ReactElement<typeof DropdownOptionsList>;
}

const Modal = ({ children, title, optionsList }: I_ModalProps) => {
  const context = useContext(ModalContext);
  const [isModalOpen, setIsModalOpen] = useState(true);

  useEffect(() => {
    if (!context || !isModalOpen) return;
    if (context.states.signal === "close") {
      setIsModalOpen(false);
      setTimeout(() => {
        context.dispatch({ type: "setModal", payload: null });
      }, 101);
    }
  }, [context, isModalOpen]);

  if (!context) return;

  return (
    <motion.div
      variants={variants}
      animate={isModalOpen ? "open" : "closed"}
      initial="closed"
      className="modal"
    >
      <div className="w-full max-w-[30rem] bg-white dark:bg-dark-grey transition-colors rounded-md p-6">
        <div className="max-h-modal overflow-y-auto no-scrollbar grid gap-6">
          <header className="sticky top-0 left-0 z-10 bg-white dark:bg-dark-grey transition-colors pb-2 flex items-center justify-between gap-2">
            <p className="text-bodysm">{title ?? ""}</p>
            <div className="flex items-center gap-2">
              {optionsList ? (
                <Dropdown
                  position="right"
                  controlElement={
                    <button className="modal__button">
                      <HiDotsVertical />
                    </button>
                  }
                >
                  {optionsList}
                </Dropdown>
              ) : null}
              <button
                className="modal__button"
                title="Close"
                onClick={() =>
                  context.dispatch({ type: "setSignal", payload: "close" })
                }
              >
                <HiX />
              </button>
            </div>
          </header>
          <div className="relative">{children}</div>
        </div>
      </div>
    </motion.div>
  );
};

export default Modal;

export interface I_WarningModalProps {
  title: string;
  description: string;
  confirmOnClick?: () => void;
  cancelOnClick?: () => void;
}

export const WarningModal = ({
  title,
  description,
  confirmOnClick,
  cancelOnClick,
}: I_WarningModalProps) => {
  const context = useContext(ModalContext);
  return (
    <section className="grid gap-6">
      <h2 className="text-hlg text-red">{title}</h2>
      <p className="text-body text-medium-grey">{description}</p>
      <div className="grid gap-2">
        <Button
          variant="destructive"
          onClick={() => {
            confirmOnClick && confirmOnClick();
            context?.dispatch({ type: "setSignal", payload: "close" });
          }}
        >
          Delete
        </Button>
        <Button
          variant="secondary"
          onClick={() => {
            cancelOnClick && cancelOnClick();
            context?.dispatch({ type: "setSignal", payload: "close" });
          }}
        >
          Cancel
        </Button>
      </div>
    </section>
  );
};
