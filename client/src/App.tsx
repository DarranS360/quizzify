import { Container } from 'react-bootstrap';
import Game from './components/Game';
import './global.scss';

function App() {
  return (
    <div className="min-vh-100 py-4" style={{ backgroundColor: 'var(--heardle-dark)' }}>
      <Container>
        <h1 className="text-center mb-4" style={{ color: 'var(--heardle-green)' }}>
          Quizzify
        </h1>
        <Game />
      </Container>
    </div>
  );
}

export default App;
