import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Login from "./components/Login";
import Users from "./scenes/users/Users";
import SubCategory from "./scenes/subcategory";
import Product from "./scenes/product";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const token = localStorage.getItem("tekin_market_token");

  return (
    <ColorModeContext.Provider value={colorMode}>
      {token ? (
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="app">
            <Sidebar isSidebar={isSidebar} />
            <main className="content">
              <Topbar setIsSidebar={setIsSidebar} />
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/team" element={<Team />} />
                <Route path="/contacts" element={<Contacts />} />
                <Route path="/invoices" element={<Invoices />} />
                <Route path="/users" element={<Users />} />
                <Route path="/category" element={<SubCategory />} />
                <Route path="/product" element={<Product />} />
              </Routes>
            </main>
          </div>
        </ThemeProvider>
      ) : (
        <Login />
      )}
    </ColorModeContext.Provider>
  );
}

export default App;
