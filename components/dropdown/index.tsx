"use client";
import type { ReactElement, ReactNode } from "react";
import { useState, useRef, useEffect, useId, useLayoutEffect } from "react";
import { HiChevronDown } from "react-icons/hi";
import { motion } from "framer-motion";
import { makeClassList } from "@/lib/utils";
import "@/assets/styles/dropdown.css";

interface I_DropdownControlProps {
  children: ReactElement;
  id: string;
  expanded: boolean;
  onClickEv: () => void;
}

export interface I_DropdownProps {
  controlElement: ReactElement;
  showIndicator?: boolean;
  children: ReactNode;
  position?: "left" | "right";
  offset?: boolean;
}

const variants = {
  open: {
    opacity: 1,
    display: "block",
  },
  closed: {
    opacity: 0,
    transitionEnd: {
      display: "none",
    },
  },
};

const DropdownControl = ({
  children,
  id,
  expanded,
  onClickEv,
}: I_DropdownControlProps) => {
  return (
    <div
      onClick={onClickEv}
      role="button"
      aria-controls={id}
      aria-haspopup="true"
      aria-expanded={expanded}
      className="dropdown__control"
    >
      {children}
    </div>
  );
};

const Dropdown = ({
  controlElement,
  showIndicator,
  position,
  offset,
  children,
}: I_DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const id = useId();

  // outside click
  const checkIfOutsideClick = (e: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current?.contains(e.target as Node)
    ) {
      setIsOpen(false);
    }
  };
  useEffect(() => {
    if (isOpen) {
      document.addEventListener("click", checkIfOutsideClick);
    }

    return () => document.removeEventListener("click", checkIfOutsideClick);
  }, [isOpen]);

  // close window width change
  useLayoutEffect(() => {
    const closeDropdown = () => {
      setIsOpen(false);
    };

    window.addEventListener("resize", closeDropdown);

    return () => window.removeEventListener("resize", closeDropdown);
  }, []);

  return (
    <div className="dropdown" ref={dropdownRef}>
      <DropdownControl
        id={id}
        expanded={isOpen}
        onClickEv={() => setIsOpen((prev) => !prev)}
      >
        <>
          {controlElement}
          {showIndicator ? (
            <HiChevronDown
              className={`${
                isOpen ? "rotate-180" : "rotate-0"
              } transition-transform text-main-purple text-[1.125rem]`}
            />
          ) : undefined}
        </>
      </DropdownControl>
      <motion.div
        variants={variants}
        initial={variants["closed"]}
        animate={isOpen ? "open" : "closed"}
        transition={{ duration: 0.1 }}
        id={id}
        className={makeClassList([
          "dropdown__content",
          position ?? "left",
          offset ? "offset" : undefined,
        ])}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default Dropdown;
