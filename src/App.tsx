import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Welcome from './pages/Welcome';
import SelfieCapture from './pages/SelfieCapture';
import FaceAnalysis from './pages/FaceAnalysis';
import FaceAnalysisLoading from './pages/FaceAnalysisLoading';
import HairStyleRecommendation from './pages/HairStyleRecommendation';
import HairStylePreview from './pages/HairStylePreview';
import HairStyleGuide from './pages/HairStyleGuide';
import HairStyleRating from './pages/HairStyleRating';
import RatingResults from './pages/RatingResults';
import './App.css';

// 创建深色主题
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#9c6eff',
    },
    secondary: {
      main: '#ffffff',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/selfie" element={<SelfieCapture />} />
          <Route path="/face-analysis-loading" element={<FaceAnalysisLoading />} />
          <Route path="/face-analysis" element={<FaceAnalysis />} />
          <Route path="/recommendation" element={<HairStyleRecommendation />} />
          <Route path="/preview/:id" element={<HairStylePreview />} />
          <Route path="/guide/:id" element={<HairStyleGuide />} />
          <Route path="/rate/:shareId" element={<HairStyleRating />} />
          <Route path="/rating-results/:shareId" element={<RatingResults />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
