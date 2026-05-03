import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import './styles.css';

function RootFallback({ reset }) {
  return (
    <div role="alert" className="root-error">
      <h1>Something went wrong.</h1>
      <p>The page hit an unexpected error. Try reloading.</p>
      <button onClick={reset} className="btn primary">
        Try again
      </button>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary label="App" fallback={({ reset }) => <RootFallback reset={reset} />}>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
);
