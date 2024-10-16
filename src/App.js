import "./App.css";

import AppRoutes from "./components/AppRoutes";
import Layout from "./layout/index";

function App() {
  return (
    <div className="App">
      <Layout>
        <AppRoutes />
      </Layout>
    </div>
  );
}

export default App;
