import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { getAllPendingReports, api, approveReport } from '../api';
import * as jose from 'jose';
import { DataGrid } from '@mui/x-data-grid';
import './AdminPage.scss';
import { toast } from 'react-toastify';
import { Button } from '@mui/material';

export const AdminPage = () => {
  const [reports, setReports] = useState();
  const [selected, setSelected] = useState([]);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'locationtype', headerName: 'Type', width: 200 },
    { field: 'codename', headerName: 'Name', width: 130 },
    { field: 'status', headerName: 'Status', width: 130 },
    {
      field: 'location',
      headerName: 'Address',
      width: 130,
      valueFormatter: ({ value }) => value.address,
    },
    {
      field: 'reportdate',
      headerName: 'Date',
      width: 130,
      valueFormatter: ({ value }) => new Date(value).toLocaleDateString(),
    },
  ];

  async function getReports() {
    const secret = new TextEncoder().encode('teststring');

    const jwt = await new jose.SignJWT({ uid: currentUser.uid })
      .setProtectedHeader({ alg: 'HS256' })
      .sign(secret);

    api.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
    getAllPendingReports().then((data) => {
      setReports(data);
    });
  }

  async function approveReports(reports) {
    approveReport(reports).then(() => {
      toast.success('Report(s) approved...', {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      getReports();
    });
  }

  useEffect(() => {
    if (!currentUser) return navigate('/');
    else getReports();
  }, [currentUser]);

  return (
    <div className="adminContainer">
      {reports ? (
        <DataGrid
          rows={reports}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          onRowSelectionModelChange={(newRowSelectionModel) => {
            setSelected(newRowSelectionModel);
          }}
        />
      ) : (
        <></>
      )}

      <Button
        style={{ gridColumn: 2 }}
        variant="contained"
        onClick={() => {
          approveReports(selected);
        }}
      >
        Approve
      </Button>
    </div>
  );


};
