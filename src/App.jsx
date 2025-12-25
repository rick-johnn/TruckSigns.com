import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { DesignProvider } from './context/DesignContext';
import { ProtectedRoute } from './components/auth';

// Pages
import Home from './pages/Home';
import Products from './pages/Products';
import About from './pages/About';
import Login from './pages/Login';
import Signup from './pages/Signup';
import DesignTool from './pages/DesignTool';
import MyDesigns from './pages/MyDesigns';

function App() {
  return (
    <AuthProvider>
      <DesignProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Routes */}
          <Route
            path="/design"
            element={
              <ProtectedRoute>
                <DesignTool />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-designs"
            element={
              <ProtectedRoute>
                <MyDesigns />
              </ProtectedRoute>
            }
          />
        </Routes>
      </DesignProvider>
    </AuthProvider>
  );
}

export default App;
