import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Quize from './Quize';
import Header from './components/Header';
import Home from './components/Home';
import GanrateApiForm from './components/GanrateApiForm';

export default function App() {

  const theme = createTheme();


  return (

    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ganrate" element={<GanrateApiForm />} />
          <Route path="/quize" element={<Quize />} />

          {/* <Route path="/" element={<Quize />} /> */}
        </Routes>
      </Router>

    </ThemeProvider>
  )
}
