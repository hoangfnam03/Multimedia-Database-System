import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme";
import Layout from "./components/Layout";
import ModernImageSearch from "./components/ModernImageSearch";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout>
        <ModernImageSearch />
      </Layout>
    </ThemeProvider>
  );
}

export default App;
