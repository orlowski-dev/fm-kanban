"use client";

import { IconButton } from "@/components/button";
import Dropdown, {
  DropdownOptionsList,
  DropdownOptionsListItem,
  DropdownOptionsListSeparator,
} from "@/components/dropdown";
import { MainContext, ModalContext } from "@/lib/contexts";
import { signOut } from "next-auth/react";
import { useContext } from "react";
import { HiDotsVertical, HiLogout, HiPlus, HiTrash } from "react-icons/hi";
import RemoveBoardModal from "../modals/RemoveBoardModal";
import Modal from "@/components/modal";
import CreateNewColumnForm from "@/components/forms/CreateNewColumnForm";

const BoardActionsDropdown = () => {
  const modalContext = useContext(ModalContext);

  return (
    <Dropdown
      position="right"
      offset
      controlElement={
        <IconButton size="sm" variant="ghost" title="Options">
          <HiDotsVertical />
        </IconButton>
      }
    >
      <DropdownOptionsList>
        <DropdownOptionsListItem
          startIcon={<HiPlus />}
          onClick={() =>
            modalContext?.dispatch({
              type: "setModal",
              payload: (
                <Modal title="Create new column">
                  <CreateNewColumnForm />
                </Modal>
              ),
            })
          }
        >
          Add new column
        </DropdownOptionsListItem>
        <DropdownOptionsListItem
          startIcon={<HiTrash />}
          variant="danger"
          onClick={() =>
            modalContext?.dispatch({
              type: "setModal",
              payload: <RemoveBoardModal />,
            })
          }
        >
          Remove this board
        </DropdownOptionsListItem>
        <DropdownOptionsListSeparator />
        <DropdownOptionsListItem startIcon={<HiLogout />} onClick={signOut}>
          Logout
        </DropdownOptionsListItem>
      </DropdownOptionsList>
    </Dropdown>
  );
};

export default BoardActionsDropdown;
