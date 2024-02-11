"use client";

import Modal, { WarningModal } from "@/components/modal";
import { MainContext } from "@/lib/contexts";
import type { I_Column } from "@/lib/models/Column";
import { deleteDocument } from "@/lib/server-actions/simple-actions";
import { useContext } from "react";

export interface I_RemoveColumnModalProps {
  column: I_Column;
}

const RemoveColumnModal = ({ column }: I_RemoveColumnModalProps) => {
  const mainContext = useContext(MainContext);

  const onConfirm = async () => {
    const res = await deleteDocument("columns", column._id);

    if (res.status !== 200) return;

    mainContext?.dispatch({ type: "removeColumn", objId: column._id });
  };

  return (
    <Modal>
      <WarningModal
        title="Remove column"
        description={`Are you sure you want to delete '${column.name}' column? This action will remove this column and tasks and cannot be reversed.`}
        confirmOnClick={onConfirm}
      />
    </Modal>
  );
};

export default RemoveColumnModal;
