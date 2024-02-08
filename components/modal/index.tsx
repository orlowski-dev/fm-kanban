"use client";

import type { ReactNode } from "react";
import type { Variants } from "framer-motion";
import { useCallback, useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { HiX } from "react-icons/hi";
import { ModalContext } from "@/lib/contexts";
import "@/assets/styles/modal.css";

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
  title: string;
}

const Modal = ({ children, title }: I_ModalProps) => {
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
            <p className="text-bodysm">{title ?? "Modal"}</p>
            <button
              title="Close"
              onClick={() =>
                context.dispatch({ type: "setSignal", payload: "close" })
              }
            >
              <HiX />
            </button>
          </header>
          <div className="relative">{children}</div>
        </div>
      </div>
    </motion.div>
  );
};

export default Modal;
