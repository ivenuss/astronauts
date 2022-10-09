import React, { useState } from "react";
import { trpc } from "~/utils/trpc";
import { Button, Flex, Tooltip, useToast } from "@chakra-ui/react";
import { EditIcon, DeleteIcon, WarningTwoIcon } from "@chakra-ui/icons";
import { openDrawer } from "./AstronautDrawer";
import {
  getCoreRowModel,
  PaginationState,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { DynamicDataTable } from "~/components/DynamicDataTable";
import { LOCALE, TABLE_PAGE_SIZE } from "~/utils/constants";
import { confirmModal } from "~/components/ConfirmModal";
import type { Astronaut } from "@prisma/client";

const AstronautTable: React.FC = () => {
  const toast = useToast();
  const queryClient = trpc.useContext();

  // React table states
  const [sorting, setSorting] = useState<SortingState>([]);
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: TABLE_PAGE_SIZE,
  });

  // Format sort query string according to API, no need to memoize, because it is string
  const sortQuery = `${sorting?.[0]?.id}:${
    sorting?.[0]?.desc ? "desc" : "asc"
  }`;

  // Avoid recreating new object in memory on every re-render
  const pagination = React.useMemo(
    () => ({ pageIndex, pageSize }),
    [pageIndex, pageSize]
  );

  // tRPC hooks
  const { mutate, isLoading: isDeleting } =
    trpc.astronauts.delete.useMutation();
  const { data: count } = trpc.astronauts.count.useQuery();
  const { data, isFetching, isError } = trpc.astronauts.getAll.useQuery(
    {
      start: pageIndex * pageSize,
      limit: pageSize,
      sort: sorting.length ? sortQuery : undefined,
    },
    { keepPreviousData: true }
  );

  // Functions
  const deleteAstronaut = (astronaut: Astronaut) => {
    confirmModal(
      {
        title: `Do you wish to delete astronaut '${astronaut.firstName} ${astronaut.lastName}'`,
        description: "This change cannot be reversed.",
      },
      () => {
        mutate(
          { id: astronaut.id },
          {
            onSuccess: (astronaut) => {
              queryClient.astronauts.invalidate();
              toast({
                status: "success",
                title: `Deleted astronaut ${astronaut.firstName} ${astronaut.lastName}`,
              });
            },
          }
        );
      }
    );
  };

  const editAstronaut = (astronaut: Astronaut) => {
    openDrawer({ mode: "edit", values: astronaut });
  };

  // Table related stuff

  const table = useReactTable({
    data: data ?? [],
    columns: [
      {
        header: "ID",
        accessorKey: "id",
        maxSize: 50,
      },
      {
        header: "First Name",
        accessorKey: "firstName",
      },
      {
        header: "Last Name",
        accessorKey: "lastName",
      },
      {
        header: "Birth Date",
        accessorKey: "birthDate",
        cell: (props) => props.getValue().toLocaleDateString(LOCALE),
      },
      {
        header: "Superpower",
        accessorKey: "superpower",
      },
      {
        header: "Actions",
        accessorFn: (originalRow) => originalRow,
        enableSorting: false,
        cell: (props) => {
          const astronaut = props.getValue();
          return (
            <>
              <Tooltip placement="top" label="Edit astronaut">
                <Button
                  variant="ghost"
                  colorScheme="linkedin"
                  onClick={() => editAstronaut(astronaut)}
                >
                  <EditIcon />
                </Button>
              </Tooltip>
              <Tooltip placement="top" label="Delete astronaut">
                <Button
                  variant="ghost"
                  colorScheme="linkedin"
                  isLoading={isDeleting}
                  onClick={() => deleteAstronaut(astronaut)}
                >
                  <DeleteIcon />
                </Button>
              </Tooltip>
            </>
          );
        },
      },
    ],
    manualPagination: true,
    pageCount: count ? Math.ceil(count / pageSize) : -1, // Get number of pages
    state: { sorting, pagination },
    enableColumnResizing: true,
    columnResizeMode: "onChange",
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isError) {
    return (
      <Flex my="12" gap="3" alignItems="center" justifyContent="center">
        <WarningTwoIcon color="yellow.500" /> Failed to load astronauts from the
        table
      </Flex>
    );
  }

  return (
    <DynamicDataTable
      table={table}
      tableCaption="Astronaut List"
      isFetching={isFetching}
      itemsCount={count}
    />
  );
};

export default React.memo(AstronautTable);
