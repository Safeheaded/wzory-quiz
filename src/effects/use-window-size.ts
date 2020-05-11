import { useState, useEffect } from 'react';
function getSize(isClient: boolean) {
    return {
        width: isClient ? window.innerWidth : undefined,
        height: isClient ? window.innerHeight : undefined
    };
}
export function useWindowSize() {
    const isClient = typeof window === 'object';

    const [windowSize, setWindowSize] = useState(() => getSize(isClient));

    useEffect(() => {
        if (isClient) {
            window.addEventListener('resize', handleResize);
            return () => {
                window.removeEventListener('resize', handleResize);
            };
        }

        function handleResize() {
            setWindowSize(getSize(isClient));
        }
    }, [isClient]);

    return windowSize;
}
