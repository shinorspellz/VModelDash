import { LatestTableType } from "@/types/service";
import { cache } from "@/utils";
import { CACHE_KEYS } from "@/utils/constants";
import Env from "@/utils/env/index";
import axios from "axios";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
  type MRT_ColumnFiltersState,
  type MRT_PaginationState,
  type MRT_SortingState,
} from "material-react-table";
import { useEffect, useMemo, useState } from "react";

type TableDataApiResponse = {
  results: Array<any>;
  count: number;
};

const LatestTable = ({
  url,
  TableColumns,
  enableRowSelection,
  enableRowActions,
  renderRowActions,
}: LatestTableType) => {
  //data and fetching state
  const [data, setData] = useState<any[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefetching, setIsRefetching] = useState(false);
  const [rowCount, setRowCount] = useState(0);

  //table state
  const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>(
    []
  );
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState<MRT_SortingState>([]);
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 50,
  });

  //if you want to avoid useEffect, look at the React Query example instead
  useEffect(() => {
    //console.log(pagination.pageSize);
    const fetchData = async () => {
      const dataPageIndex = pagination.pageIndex + 1;
      const Authorization = await cache.get(CACHE_KEYS.TOKEN);
      if (!data.length) {
        setIsLoading(true);
      } else {
        setIsRefetching(true);
      }

      // console.log(dataPageIndex);

      const baseUrl = Env.API_BASE_URL;

      const params = {
        page: (dataPageIndex * pagination.pageSize) / pagination.pageSize,
        page_count: pagination.pageSize,
        search: globalFilter ?? "",
        // globalFilter: globalFilter ?? "",
        // sorting: JSON.stringify(sorting ?? []),
      };
      try {
        const response = await axios.get(url, {
          baseURL: baseUrl,
          headers: {
            Authorization: `Token ${Authorization}`,
          },
          params: params,
        });
        const json = response.data as TableDataApiResponse;
        // console.log(json);
        setData(json?.results);
        setRowCount(json?.count);
      } catch (error) {
        setIsError(true);
        console.error(error);
        return;
      }
      setIsError(false);
      setIsLoading(false);
      setIsRefetching(false);
    };
    fetchData();
  }, [
    columnFilters, //re-fetch when column filters change
    globalFilter, //re-fetch when global filter changes
    pagination.pageIndex, //re-fetch when page index changes
    pagination.pageSize, //re-fetch when page size changes
    sorting, //re-fetch when sorting changes
  ]);

  const columns = useMemo<MRT_ColumnDef<any>[]>(() => TableColumns, []);

  const table = useMaterialReactTable({
    columns,
    data,
    enableRowSelection,
    getRowId: (row) => row?.id,
    initialState: { showColumnFilters: false },
    manualFiltering: true,
    muiTableContainerProps: { sx: { maxHeight: "400px" } },
    manualPagination: true,
    enableStickyHeader: true,
    enableRowActions,
    positionActionsColumn: "last",
    enableStickyFooter: true,
    manualSorting: true,
    muiPaginationProps: {
      rowsPerPageOptions: [50, 100, 150, 200, 250, 300],
      showFirstButton: false,
      showLastButton: false,
    },
    muiToolbarAlertBannerProps: isError
      ? {
          color: "error",
          children: "Error loading data",
        }
      : undefined,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    renderRowActions,
    rowCount,
    state: {
      columnFilters,
      globalFilter,
      isLoading,
      pagination,
      showAlertBanner: isError,
      showProgressBars: isRefetching,
      sorting,
    },
  });

  return <MaterialReactTable table={table} />;
};

export default LatestTable;
