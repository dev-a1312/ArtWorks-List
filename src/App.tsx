import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Checkbox } from "primereact/checkbox";
import axios from "axios";
import './index.css'; // Import the styles here

const App: React.FC = () => {
  const [artworks, setArtworks] = useState<any[]>([]);
  const [selectedArtworks, setSelectedArtworks] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("https://api.artic.edu/api/v1/artworks?page=1");
        setArtworks(res.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleSelectionChange = (e: any) => {
    setSelectedArtworks(e.value);
  };

  return (
    <div className="datatable-container">
      <h2>Artworks List</h2>
      <DataTable
        value={artworks}
        selection={selectedArtworks}
        onSelectionChange={handleSelectionChange}
        paginator
        rows={5}
        responsiveLayout="scroll"
        selectionMode="multiple"
        dataKey="id"
      >
        <Column selectionMode="multiple" headerStyle={{ width: '3em' }} />
        <Column field="title" header="Title" />
        <Column field="artist_display" header="Artist" />
        <Column field="date_start" header="Start Date" />
        <Column field="date_end" header="End Date" />
        <Column field="place_of_origin" header="Place of Origin" />
      </DataTable>

      <div className="selection-panel">
        <h3>Selected Artworks</h3>
        <ul>
          {selectedArtworks.map((artwork: any, index: number) => (
            <li key={index}>{artwork.title}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
