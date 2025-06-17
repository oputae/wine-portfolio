import { Suspense } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import our NEW test map component
const MinimalMap = dynamic(() => import('./components/MinimalMap'), {
    ssr: false, // Make sure it only runs on the client
    loading: () => <div style={{height: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}><p>Loading Test Map...</p></div>
});

export default function HomePage() {
    return (
        <div>
            <h1 style={{textAlign: 'center', margin: '2rem', fontSize: '2rem'}}>Minimal Map Test</h1>
            <div style={{ height: '80vh', width: '100%', border: '1px solid #333' }}>
                <Suspense>
                    <MinimalMap />
                </Suspense>
            </div>
        </div>
    );
}