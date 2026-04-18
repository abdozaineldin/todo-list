import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { TaskProvider } from "./contexts/TaskContext";

function App() {
  const [email, setEmail] = useState<string | null>(() => {
    const saved = localStorage.getItem("email");
    return saved ? saved : null;
  });

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  function toggleDarkMode() {
    setDarkMode((prev) => !prev);
  }

  return (
    <TaskProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              email ? (
                <Home
                  setEmail={setEmail}
                  toggleDarkMode={toggleDarkMode}
                  darkMode={darkMode}
                />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route
            path="/login"
            element={
              !email ? <Login setEmail={setEmail} /> : <Navigate to="/" />
            }
          />
        </Routes>
      </BrowserRouter>
    </TaskProvider>
  );
}

export default App;
