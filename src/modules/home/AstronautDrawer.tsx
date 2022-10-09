import React from "react";
import create from "zustand";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/react";
import { AstronautForm, FormFields } from "./AstronautForm";

type OpenDrawerProps =
  | { mode: "create" }
  | { mode: "edit"; values: FormFields };

type Store = {
  drawer?: OpenDrawerProps;
  setDrawer: (drawer: OpenDrawerProps) => void;
  close: () => void;
};

// Make drawer store global, because we are going to access it from deeply nested components => better developer experience
const useDrawerStore = create<Store>((set) => ({
  drawer: undefined,
  close: () => set({ drawer: undefined }),
  setDrawer: (drawer) => set((s) => ({ ...s, drawer })),
}));

// Two variants of astronaut drawer: Create | Edit
export const openDrawer = (props: OpenDrawerProps) => {
  useDrawerStore
    .getState()
    .setDrawer(
      props.mode === "create"
        ? { mode: props.mode }
        : { mode: props.mode, values: props.values }
    );
};

export const AstronautDrawer = () => {
  const drawer = useDrawerStore((state) => state.drawer);
  const close = useDrawerStore((state) => state.close);

  return (
    <Drawer placement="right" onClose={close} isOpen={!!drawer}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader borderBottomWidth="1px">
          {drawer?.mode === "create" ? "Create" : "Update"} astronaut
        </DrawerHeader>
        <DrawerBody>
          {drawer ? (
            /* Pass component props from global store `drawer` */
            <AstronautForm {...{ ...drawer, onSubmit: close }} />
          ) : null}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
