import React from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import img from "../images/404.jpg"

export default function PageNotFound() {
  return (
    <div className='MC'>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh'
        }}
      >
        <Container maxWidth="md">
          <Grid container spacing={2}>
            <Grid xs={6}>
              <Typography variant="h1">
                404
              </Typography>
              <Typography variant="h6">
                The page you’re looking for doesn’t exist.
              </Typography>
              <button
                style={{
                  position: 'relative',
                  borderRadius: '5px',
                  bottom: '0',
                  backgroundColor: '#007dfe',
                  color: 'white',
                  padding: '10px',
                  fontWeight: 'bold',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                <Link to="/login">Go to Login Page</Link>
              </button>

            </Grid>
            <Grid xs={6}>
              <img
                src={img}
                alt=""
                width={500} height={500}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </div>
  );
}
