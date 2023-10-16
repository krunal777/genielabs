import React, { useState, useEffect } from 'react';

type CountdownProps = {
    initialCount?: number;
    onComplete: () => void;
};

function Countdown({ initialCount = 40, onComplete }: CountdownProps) {
    const [count, setCount] = useState(initialCount);

    useEffect(() => {
        if (count <= 0) {
            onComplete && onComplete();
            return;
        }
        const timer = setTimeout(() => {
            setCount(prevCount => prevCount - 1);
        }, 1000);
        return () => clearTimeout(timer);
    }, [count, onComplete]);

    return <span>{count}</span>;
}

export default Countdown;
