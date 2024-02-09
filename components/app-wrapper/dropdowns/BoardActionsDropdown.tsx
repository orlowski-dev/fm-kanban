"use client";

import { IconButton } from "@/components/button";
import Dropdown, {
  DropdownOptionsList,
  DropdownOptionsListItem,
  DropdownOptionsListSeparator,
} from "@/components/dropdown";
import { signOut } from "next-auth/react";
import { HiDotsVertical, HiLogout, HiTrash } from "react-icons/hi";

const BoardActionsDropdown = () => {
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
        <DropdownOptionsListItem startIcon={<HiTrash />} variant="danger">
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
