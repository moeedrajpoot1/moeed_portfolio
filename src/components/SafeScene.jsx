import { Suspense, lazy, useEffect, useState } from 'react';
import WebGLFallback from './WebGLFallback.jsx';
import ErrorBoundary from './ErrorBoundary.jsx';

const Scene3D = lazy(() => import('./Scene3D.jsx'));

function detectWebGL() {
  if (typeof window === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    const gl =
      canvas.getContext('webgl2') ||
      canvas.getContext('webgl') ||
      canvas.getContext('experimental-webgl');
    return !!(gl && gl.getParameter);
  } catch {
    return false;
  }
}

export default function SafeScene() {
  const [supported, setSupported] = useState(null);

  useEffect(() => {
    setSupported(detectWebGL());
  }, []);

  if (supported === null) return null;
  if (!supported) return <WebGLFallback />;

  return (
    <ErrorBoundary label="Scene3D" fallback={<WebGLFallback />}>
      <Suspense fallback={null}>
        <Scene3D />
      </Suspense>
    </ErrorBoundary>
  );
}
