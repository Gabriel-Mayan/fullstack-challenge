import React, { Suspense } from 'react';
import { Router } from './routes';

function App() {
  return (
    <Suspense fallback={null}>
      <Router />
    </Suspense>
  );
}

export default App;
