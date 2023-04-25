import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import './Profile.scss';
import { useNavigate } from 'react-router-dom';
import { getReportsForUser, api } from '../api';
import * as jose from 'jose';
import { DataGrid } from '@mui/x-data-grid';

const Profile = () => {
  const [reports, setReports] = useState();
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
    getReportsForUser(currentUser.uid).then((data) => {
      setReports(data);
    });
  }

  useEffect(() => {
    if (!currentUser) return navigate('/');
    else getReports();
  }, [currentUser]);
  return (
    <div className="profileContainer">
      {reports ? (
        <DataGrid
          rows={reports}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default Profile;
