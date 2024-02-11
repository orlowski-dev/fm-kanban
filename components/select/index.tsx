"use client";
import type { ForwardedRef, InputHTMLAttributes } from "react";
import { forwardRef, useEffect, useId, useRef, useState } from "react";
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
  const [mouseOnOptions, setMouseOnOptions] = useState(false);
  const [optionsPosition, setOptionsPosition] = useState<{
    [key: string]: number | string;
  }>({ left: 0, top: 0 });
  const selectRef = useRef<HTMLInputElement>(null);
  const optionsRef = useRef<HTMLUListElement>(null);
  const id = useId();

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

  // on wheel
  useEffect(() => {
    const closeOptions = () => !mouseOnOptions && setOptionsVisible(false);
    window.addEventListener("wheel", closeOptions);

    return () => window.removeEventListener("wheel", closeOptions);
  }, [mouseOnOptions]);

  const setOptionListPosition = () => {
    if (!selectRef.current || !optionsRef.current) return;
    const selectRect = selectRef.current.getBoundingClientRect();
    const screenH = document.body.offsetHeight;

    if (selectRect.bottom + 202 > screenH) {
      console.log(selectRect.bottom);
      setOptionsPosition({
        left: selectRect.left,
        top: selectRect.bottom,
        translateY: `calc(-100% - ${selectRef.current.offsetHeight}px - 16px)`,
      });
      return;
    }

    setOptionsPosition({
      left: selectRect.left,
      top: selectRect.bottom,
      translateY: "0",
    });
  };

  const showOptions = () => {
    if (!optionsRef.current || !selectRef.current) return;

    optionsRef.current.style.width = `${selectRef.current.offsetWidth}px`;

    setOptionListPosition();

    setOptionsVisible((prev) => !prev);
  };

  return (
    <div className="select" role="select" ref={selectRef}>
      <input
        {...other}
        ref={ref}
        value={inpValue}
        readOnly
        className="absolute -z-10 w-0 h-0 select-none opacity-0"
      />
      <button
        className="select__input input"
        type="button"
        role="button"
        aria-controls={id}
        aria-haspopup="true"
        aria-expanded={optionsVisible}
        onClick={showOptions}
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
        id={id}
        onMouseEnter={() => setMouseOnOptions(true)}
        onMouseLeave={() => setMouseOnOptions(false)}
        style={optionsPosition}
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
