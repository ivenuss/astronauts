import React from "react";
import {
  Table as ChakraTable,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Button,
  Flex,
  Spinner,
  TableContainer,
  Menu,
  MenuButton,
  MenuList,
  MenuItemOption,
  MenuOptionGroup,
  Fade,
  Box,
  TableCellProps,
} from "@chakra-ui/react";
import { flexRender, Table, Header, ColumnMeta } from "@tanstack/react-table";
import {
  ArrowUpDownIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@chakra-ui/icons";

interface ExtendedColumnMeta<T> extends ColumnMeta<T, unknown> {
  style?: React.CSSProperties;
  truncate?: boolean;
  chakra?: TableCellProps;
}

interface DynamicDataTableProps<T> {
  table: Table<T>;
  itemsCount?: number | null;
  tableCaption?: string;
  isFetching: boolean;
}

const SortButton = <T,>({ header }: { header: Header<T, unknown> }) => {
  return (
    <Button size="sm" variant="unstyled">
      {{
        false: <ArrowUpDownIcon fontSize="10px" />, // Unsorted
        asc: <ChevronUpIcon />, // Asc
        desc: <ChevronDownIcon />, // Desc
      }[header.column.getIsSorted() as string] ?? null}
    </Button>
  );
};

export const DynamicDataTable = <T,>({
  table,
  itemsCount,
  tableCaption,
  isFetching,
}: DynamicDataTableProps<T>) => {
  return (
    <>
      <Box rounded="md" border="1px" borderColor="gray.700">
        {tableCaption ? (
          <Box
            py="4"
            px="6"
            fontSize="md"
            fontWeight="bold"
            borderBottom="1px"
            borderColor="gray.700"
          >
            {tableCaption}
          </Box>
        ) : null}

        <TableContainer>
          <ChakraTable size="sm" variant="simple">
            <Thead>
              {table.getHeaderGroups().map((group) => (
                <Tr key={group.id}>
                  {group.headers.map((header) => (
                    <Th
                      key={header.id}
                      py="3"
                      backgroundColor="gray.900"
                      colSpan={header.colSpan}
                      style={{ width: header.getSize() }}
                    >
                      <Box
                        display="flex"
                        alignItems="center"
                        {...{
                          style: header.column.getCanSort()
                            ? { cursor: "pointer", userSelect: "none" }
                            : undefined,
                          onClick: header.column.getToggleSortingHandler(),
                        }}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}

                        {header.column.getCanSort() && (
                          <SortButton header={header} />
                        )}
                      </Box>
                    </Th>
                  ))}
                </Tr>
              ))}
            </Thead>
            <Tbody>
              {table.getRowModel().rows.map((row) => (
                <Tr key={row.id} _hover={{ backgroundColor: "gray.900" }}>
                  {row.getVisibleCells().map((cell) => {
                    const meta = cell.column.columnDef
                      ?.meta as ExtendedColumnMeta<T>;

                    return (
                      <Td
                        key={cell.id}
                        style={{
                          width: cell.column.getSize(),
                          ...meta?.style,
                        }}
                        {...(meta?.truncate
                          ? {
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              maxInlineSize: 0,
                            }
                          : undefined)}
                        {...meta?.chakra}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </Td>
                    );
                  })}
                </Tr>
              ))}
            </Tbody>
          </ChakraTable>
        </TableContainer>

        <TableControls
          table={table}
          isFetching={isFetching}
          itemsCount={itemsCount}
        />
      </Box>
    </>
  );
};

export const TableControls = <T,>({
  table,
  isFetching,
  itemsCount,
}: Pick<DynamicDataTableProps<T>, "table" | "isFetching" | "itemsCount">) => {
  return (
    <Flex alignItems="center" justifyContent="space-between" my="4" px="6">
      <Box display={{ base: "none", md: "block" }}>
        {itemsCount || "-"} items
      </Box>

      <Flex alignItems="center" gap={{ base: "1", md: "2" }}>
        <Button
          size="sm"
          colorScheme="linkedin"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          First
        </Button>
        <Button
          size="sm"
          colorScheme="linkedin"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Prev
        </Button>

        <Box display={{ base: "none", md: "block" }}>
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </Box>

        <Button
          size="sm"
          colorScheme="linkedin"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
        <Button
          size="sm"
          colorScheme="linkedin"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          Last
        </Button>
      </Flex>
      <Flex alignItems="center" gap="6">
        <Fade in={isFetching} style={{ display: "flex" }}>
          <Spinner color="accent" size="sm" />
        </Fade>
        <Menu>
          <MenuButton
            as={Button}
            px="4"
            py="2"
            size="sm"
            colorScheme="linkedin"
          >
            Show {table.getState().pagination.pageSize}
          </MenuButton>
          <MenuList>
            <MenuOptionGroup
              type="radio"
              value={String(table.getState().pagination.pageSize)}
              onChange={(value) => table.setPageSize(Number(value))}
            >
              {[5, 10, 20, 30, 40, 50].map((pageSize) => (
                <MenuItemOption key={pageSize} value={String(pageSize)}>
                  Show {pageSize}
                </MenuItemOption>
              ))}
            </MenuOptionGroup>
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  );
};
