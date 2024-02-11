"use client";

import Dropdown, {
  DropdownOptionsList,
  DropdownOptionsListItem,
} from "@/components/dropdown";
import TaskForm from "@/components/forms/TaskForm";
import Modal from "@/components/modal";
import { ModalContext } from "@/lib/contexts";
import { I_Column } from "@/lib/models/Column";
import { useContext } from "react";
import { HiDotsVertical, HiPlus, HiTrash } from "react-icons/hi";
import RemoveColumnModal from "../modals/RemoveColumnModal";

export interface I_ColumnDropdownProps {
  column: I_Column;
}

const ColumnDropdown = ({ column }: I_ColumnDropdownProps) => {
  const modalContext = useContext(ModalContext);
  return (
    <Dropdown
      position="right"
      controlElement={
        <button className="text-medium-grey">
          <HiDotsVertical />
        </button>
      }
    >
      <DropdownOptionsList>
        <DropdownOptionsListItem
          startIcon={<HiPlus />}
          onClick={() =>
            modalContext?.dispatch({
              type: "setModal",
              payload: (
                <Modal title="Add task">
                  <TaskForm action="create" initColumn={column} />
                </Modal>
              ),
            })
          }
        >
          Add task
        </DropdownOptionsListItem>
        <DropdownOptionsListItem
          variant="danger"
          startIcon={<HiTrash />}
          onClick={() =>
            modalContext?.dispatch({
              type: "setModal",
              payload: <RemoveColumnModal column={column} />,
            })
          }
        >
          Remove column
        </DropdownOptionsListItem>
      </DropdownOptionsList>
    </Dropdown>
  );
};

export default ColumnDropdown;
