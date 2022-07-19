import GlobalDatasContext from "./helpers/GlobalDatasContext"
import { MainComponent } from "./MainComponent"

function App() {
  
  return (
    <GlobalDatasContext>
    <MainComponent />
  </GlobalDatasContext>
  );

}

export default App
