import { useRef, useState, useEffect } from 'react';

type Dimensions = { width: number; height: number; offsetTop: number; offsetLeft: number };

export function useMeasure(): [React.RefObject<HTMLImageElement>, Dimensions] {
    const ref = useRef<HTMLImageElement | null>(null);
    const [dimensions, setDimensions] = useState<Dimensions>({ width: 0, height: 0, offsetTop: 0, offsetLeft: 0 });

    useEffect(() => {
        function updateDimensions() {
          if (ref.current) {
            const { offsetWidth, offsetHeight, offsetTop, offsetLeft } = ref.current;
            setDimensions({
              width: offsetWidth,
              height: offsetHeight,
              offsetTop,
              offsetLeft,
            });
          }
        }
    
        window.addEventListener('resize', updateDimensions);
    
        // Initial update
        updateDimensions();
    
        // Cleanup function
        return () => {
          window.removeEventListener('resize', updateDimensions);
        };
      }, []);

    return [ref, dimensions];
}