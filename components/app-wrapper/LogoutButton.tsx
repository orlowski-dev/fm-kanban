import { useState } from "react";
import { signOut } from "next-auth/react";
import { Button } from "../button";

const LogoutButton = () => {
  const [buttonLoading, setButtonLoading] = useState(false);
  return (
    <Button
      variant="destructive"
      size="sm"
      loading={buttonLoading}
      style={{ borderRadius: "6px" }}
      onClick={() => {
        setButtonLoading(true);
        signOut();
      }}
    >
      Logout
    </Button>
  );
};

export default LogoutButton;
