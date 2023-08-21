import Header from "./components/Header";
import Router from "./routes/Router";

function App() {
  return (
    <div className="w-full">
      <Header />
      <div className="w-[678px] mx-auto py-2">
        <Router />
      </div>
    </div>
  );
}

export default App;
