"use client";

import { Button } from "../button";
import { HiPlus } from "react-icons/hi";
import { motion } from "framer-motion";

const EmptyBoardPage = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="absolute inset-0 p-6 flex items-center justify-center flex-col gap-4"
    >
      <h1 className="text-hlg text-medium-grey text-center">
        This board is empty. Create a new column to get started.
      </h1>
      <Button size="lg" startIcon={<HiPlus />}>
        Add New Column
      </Button>
    </motion.section>
  );
};

export default EmptyBoardPage;
