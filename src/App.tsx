import { PlayerProvider, PlayGround } from "./Components";

function App() {
  return (
    <div>
      <PlayerProvider>
        <PlayGround />
      </PlayerProvider>
    </div>
  );
}

export default App;
