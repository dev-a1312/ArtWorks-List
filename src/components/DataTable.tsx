import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Checkbox } from "primereact/checkbox";
import { fetchArtworks } from "../services/apiService";

interface Artwork {
  id: number;
  title: string;
  place_of_origin: string;
  artist_display: string;
  inscriptions: string;
  date_start: number;
  date_end: number;
}

const DataTableComponent: React.FC = () => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [totalRecords, setTotalRecords] = useState<number>(0);
  const [selectedRows, setSelectedRows] = useState<Artwork[]>([]);

  useEffect(() => {
    loadArtworks(page, pageSize);
  }, [page, pageSize]);

  const loadArtworks = async (page: number, pageSize: number) => {
    try {
      const data = await fetchArtworks(page, pageSize);
      setArtworks(data.data.map((item: any) => ({
        ...item,
        id: item.id,
      })));
      setTotalRecords(data.pagination.total);
    } catch (error) {
      console.error("Error fetching artworks:", error);
    }
  };

  const onPageChange = (event: any) => {
    setPage(event.page + 1); // PrimeReact pages are 0-indexed, adjust accordingly.
    setPageSize(event.rows);
  };

  const onRowSelectionChange = (event: any) => {
    setSelectedRows(event.value);
  };

  const rowSelectionTemplate = (rowData: Artwork) => {
    return <Checkbox checked={selectedRows.includes(rowData)} onChange={() => handleRowSelect(rowData)} />;
  };

  const handleRowSelect = (rowData: Artwork) => {
    let updatedSelection = [...selectedRows];
    if (updatedSelection.includes(rowData)) {
      updatedSelection = updatedSelection.filter((row) => row !== rowData);
    } else {
      updatedSelection.push(rowData);
    }
    setSelectedRows(updatedSelection);
  };

  const columns = [
    { field: "title", header: "Title" },
    { field: "place_of_origin", header: "Place of Origin" },
    { field: "artist_display", header: "Artist Display" },
    { field: "inscriptions", header: "Inscriptions" },
    { field: "date_start", header: "Date Start" },
    { field: "date_end", header: "Date End" },
  ];

  return (
    <div className="datatable-container">
      <h2>Artworks List</h2>
      <DataTable
        value={artworks}
        paginator
        rows={pageSize}
        totalRecords={totalRecords}
        onPage={onPageChange}
        selectionMode="multiple"
        selection={selectedRows}
        onSelectionChange={onRowSelectionChange}
        dataKey="id"
        rowClassName="datatable-row"
        emptyMessage="No artworks found"
      >
        {columns.map((col) => (
          <Column key={col.field} field={col.field} header={col.header} />
        ))}
        <Column
          header="Select"
          body={rowSelectionTemplate}
          style={{ width: '3rem', textAlign: 'center' }}
        />
      </DataTable>

      <div className="selection-panel">
        <h3>Selected Artworks</h3>
        <ul>
          {selectedRows.map((row, index) => (
            <li key={index}>{row.title}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DataTableComponent;
