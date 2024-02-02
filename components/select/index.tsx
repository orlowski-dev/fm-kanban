"use client";
import type { ForwardedRef, InputHTMLAttributes } from "react";
import { forwardRef, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { HiChevronDown } from "react-icons/hi";
import "@/assets/styles/input.css";
import "@/assets/styles/select.css";

export interface I_SelectOption {
  key: string;
  value: string;
}

export interface I_SelectProps extends InputHTMLAttributes<HTMLInputElement> {
  options: I_SelectOption[];
  defaultSelected?: string;
}

const variants = {
  open: {
    display: "block",
    opacity: 1,
    y: "0rem",
  },
  closed: {
    opacity: 0,
    y: "-0.5rem",
    transitionEnd: {
      display: "none",
    },
  },
};

const Select = forwardRef(function Select(
  { options, defaultSelected, ...other }: I_SelectProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  if (
    defaultSelected &&
    !options.find((elem) => elem.key !== defaultSelected)
  ) {
    throw new Error("The defaultFawrard key is not included in the options!");
  }

  const [inpValue, setInpValue] = useState(defaultSelected ?? options[0].key);
  const [optionsVisible, setOptionsVisible] = useState(false);
  const optionsRef = useRef<HTMLUListElement>(null);

  // outside click
  useEffect(() => {
    const func = (e: MouseEvent) => {
      optionsVisible && e.target !== optionsRef.current
        ? setOptionsVisible(false)
        : undefined;
    };
    document.addEventListener("click", func);

    return () => document.removeEventListener("click", func);
  }, [optionsVisible]);

  return (
    <div className="select" role="select">
      <input
        {...other}
        ref={ref}
        value={inpValue}
        readOnly
        className="absolute -z-10 w-0 h-0 select-none opacity-0"
      />
      <button
        className="select__input input"
        onClick={() => setOptionsVisible((prev) => !prev)}
      >
        <span>{options.find((option) => option.key === inpValue)?.value}</span>
        <HiChevronDown
          className={`text-main-purple dark:text-white transition-transform ${
            optionsVisible ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>
      <motion.ul
        animate={optionsVisible ? "open" : "closed"}
        variants={variants}
        initial={variants["closed"]}
        transition={{ bounce: 0, duration: 0.1 }}
        className="select__option_list"
        ref={optionsRef}
      >
        {options.map((option, index: number) => (
          <li
            key={index}
            className="select__option"
            onClick={() => {
              setInpValue(option.key);
              setOptionsVisible(false);
            }}
          >
            {option.value}
          </li>
        ))}
      </motion.ul>
    </div>
  );
});

export default Select;
