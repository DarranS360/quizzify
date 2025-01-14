import { Container } from "react-bootstrap";
import Game from "./components/Game";
import "./global.scss";

function App() {
  return (
    <Container className="py-4">
      <h1 className="text-center mb-4">Quizzify Music Guessing Game</h1>
      <Game />
    </Container>
  );
}

export default App;
