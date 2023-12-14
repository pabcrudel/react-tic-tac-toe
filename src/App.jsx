import { Suspense, lazy } from 'react';

const TicTacToe = lazy(() => import('./TicTacToe'));

export default function App () {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TicTacToe/>
    </Suspense>
  );
}
