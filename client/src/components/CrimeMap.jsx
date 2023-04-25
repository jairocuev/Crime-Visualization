import React, { useState, useEffect } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import './NavCss/CrimeMap.css';
import Map, { Marker, Popup } from 'react-map-gl';
import { getTopAllReports } from '../api';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const CrimeMap = () => {
  const navigate = useNavigate();
  const token = import.meta.env.VITE_APP_MAPBOX_TOKEN;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const [popupInfo, setPopupInfo] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [modalInfo, setModalInfo] = React.useState(null);

  const { currentUser } = useAuth();

  const handleClickOpen = (e) => {
    if (!currentUser) {
      return;
    }

    setModalInfo(e);
    setOpen(true);
  };

  const handleClose = () => {
    setModalInfo(null);
    setOpen(false);
  };

  const modalReport = (lat, lng) => {
    navigate(`/report?latitude=${lat}&longitude=${lng}`);
  };

  useEffect(() => {
    async function fetchData() {
      const res = await getTopAllReports(2000);
      setData(res);
    }
    setLoading(true);
    fetchData();
    setLoading(false);
  }, []);

  return (
    <div>
      {!loading ? (
        <Map
          initialViewState={{
            latitude: 33.753746,
            longitude: -84.38633,
            zoom: 15,
          }}
          style={{ width: '99%', height: '50vh', textAlign: 'center' }}
          mapStyle="mapbox://styles/jccuev/clg31mlr2002m01qorq6w62aq"
          mapboxAccessToken={token}
          onClick={(e) => {
            handleClickOpen(e);
          }}
        >
          {data ? (
            data?.map((crime, index) => (
              <Marker
                key={`marker-${crime.id}`}
                longitude={crime.location.long}
                latitude={crime.location.lat}
                color="red"
                onClick={(e) => {
                  e.originalEvent.stopPropagation();
                  setPopupInfo(crime);
                }}
              />
            ))
          ) : (
            <></>
          )}

          {popupInfo && (
            <Popup
              anchor="top"
              longitude={Number(popupInfo.location.long)}
              latitude={Number(popupInfo.location.lat)}
              onClose={() => setPopupInfo(null)}
            >
              <div style={{ color: 'red' }}>
                {popupInfo.location.address}
                <br />
                {popupInfo.codename}
                <br />
                {popupInfo.locationtype}
                <br />
                {new Date(popupInfo.reportdate).toLocaleDateString('en-US')}
              </div>
            </Popup>
          )}
        </Map>
      ) : (
        <>Loading...</>
      )}

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Report Crime?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <b>Latitude: </b> {modalInfo?.lngLat.lat}
            <br />
            <b>Longitude: </b>
            {modalInfo?.lngLat.lng}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={() =>
              modalReport(modalInfo?.lngLat.lat, modalInfo?.lngLat.lng)
            }
          >
            Report
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
