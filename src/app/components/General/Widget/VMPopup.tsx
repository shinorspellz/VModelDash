import React, { useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

const VMPopup = ({
  children,
  isClose,
  footer,
  title,
  size = "md",
}: {
  children?: React.ReactNode;
  isClose: any;
  footer?: React.ReactNode;
  title?: string;
  size?:
    | "md"
    | "sm"
    | "lg"
    | "full"
    | "xs"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "5xl"
    | undefined;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    setTimeout(() => {
      onOpen();
    }, 0);
  }, []);

  const _handleClose = () => {
    onClose();
    isClose();
  };

  return (
    <>
      <Modal
        backdrop={"blur"}
        isOpen={isOpen}
        size={size}
        onClose={_handleClose}
        classNames={{
          wrapper: "z-[888]",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              {title && (
                <ModalHeader className="flex flex-col gap-1">
                  {title}
                </ModalHeader>
              )}

              <ModalBody>{children}</ModalBody>
              {!footer && <ModalFooter>{footer}</ModalFooter>}
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default VMPopup;
