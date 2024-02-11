"use client";

import Modal, { WarningModal } from "@/components/modal";
import { MainContext } from "@/lib/contexts";
import { useContext, useState } from "react";
import { redirect } from "next/navigation";
import { deleteDocument } from "@/lib/server-actions/simple-actions";

const RemoveBoardModal = () => {
  const mainContext = useContext(MainContext);
  const [canRedirect, setCanRedirect] = useState(false);

  if (canRedirect) {
    return redirect("/");
  }

  const onConfirm = async () => {
    if (!mainContext?.states.currentBoardId) return;

    const res = await deleteDocument(
      "boards",
      mainContext.states.currentBoardId
    );

    if (res.status !== 200) return;

    mainContext?.dispatch({
      type: "removeBoard",
      objId: mainContext.states.currentBoardId,
    });
    setCanRedirect(true);
  };

  return (
    <Modal>
      <WarningModal
        title="Remove this board"
        description={`Are you sure you want to delete this board? This action will remove all columns and tasks and cannot be reversed.`}
        confirmOnClick={onConfirm}
      />
    </Modal>
  );
};

export default RemoveBoardModal;
