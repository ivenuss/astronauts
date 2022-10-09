import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import create from "zustand";

type Store = {
  message: { title: string; description: string };
  onConfirm: (() => void) | undefined;
  closeModal: () => void;
  setModal: (
    message: { title: string; description: string },
    onCofirm: () => void
  ) => void;
};

const useConfirmModalStore = create<Store>((set) => ({
  message: { title: "", description: "" },
  onConfirm: undefined,
  closeModal: () => {
    set((c) => ({
      ...c,
      onConfirm: undefined,
      message: { title: "", description: "" },
    }));
  },
  setModal: (message, onConfirm) => {
    set((c) => ({ ...c, message, onConfirm }));
  },
}));

// Two variants of astronaut drawer: Create | Edit
export const confirmModal: Store["setModal"] = (message, onConfirm) => {
  useConfirmModalStore.getState().setModal(message, onConfirm);
};

const ConfirmModal: React.FC = () => {
  const { message, onConfirm, closeModal } = useConfirmModalStore();

  const handleConfirm = () => {
    closeModal();
    onConfirm?.();
  };

  return (
    <Modal isCentered size="md" isOpen={!!onConfirm} onClose={closeModal}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{message?.title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{message?.description}</ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={closeModal}>
            Cancel
          </Button>
          <Button colorScheme="linkedin" onClick={handleConfirm}>
            Confirm
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ConfirmModal;
