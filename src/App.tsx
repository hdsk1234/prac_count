import { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
      <button 
        onClick={() => setCount(count + 1)}
        style={{ fontSize: '24px', padding: '10px 20px', cursor: 'pointer' }}
      >
        {count}
      </button>
    </div>
  );
}

export default App;