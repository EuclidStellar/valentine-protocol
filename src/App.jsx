import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Home from './pages/Home';
import DayView from './pages/DayView';
import Layout from './components/Layout';
import { KeepsakeProvider } from './utils/KeepsakeContext';

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/day/:dayId" element={<DayView />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <KeepsakeProvider>
          <Layout>
            <AnimatedRoutes />
          </Layout>
      </KeepsakeProvider>
    </Router>
  );
}

export default App;
