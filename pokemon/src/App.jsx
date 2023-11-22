import { useState } from 'react'
import './App.css'
import TablaTipos from './components/tablaTipos'

function App() {
  const [activeComponent, setActiveComponent] = useState(null);

  const handleTablaTiposClick = () => {
    setActiveComponent('tablaTipos');
  };

  const handleHomeClick = () => {
    setActiveComponent('');
  }

  return (
    <>
      <main>
        {activeComponent !== 'tablaTipos' && activeComponent !== 'pokedex' && (
          <>
            <h1>Pokemongol</h1>
            <button onClick={handleTablaTiposClick}>Tabla de Tipos</button>
          </>
        )}

        {activeComponent === 'tablaTipos' && ( 
        <>
        <button onClick={handleHomeClick}>Atrás</button>
        <TablaTipos />
        </>
        )}
      </main>
    </>
  )
}

export default App