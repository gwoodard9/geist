import { useEffect, useState } from 'react';
import GeistLogo from './GeistLogo';
import Caret from './Caret';

type LoadingScreenProps = {
    words: string[];
    subtitle?: string;
};

export default function LoadingScreen({ words, subtitle }: LoadingScreenProps) {
    const [index, setIndex] = useState(0);
    const [chars, setChars] = useState(0);
    const word = words[index % words.length];

    useEffect(() => {
        const done = chars >= word.length;
        const id = setTimeout(() => {
            if (done) {
                setChars(0);
                setIndex(i => i + 1);
            } else {
                setChars(c => c + 1);
            }
        }, done ? 1200 : 45);
        return () => clearTimeout(id);
    }, [chars, word]);

    return (
        <div className="mx-auto flex h-full max-w-[8.5in] flex-col items-center justify-center text-center">
            <GeistLogo className="h-24 w-24 animate-float text-violet-600" />
            <div className="mt-3 h-2 w-14 animate-float-shadow rounded-full bg-violet-200" />
            <p className="mt-8 h-8 text-2xl font-semibold tracking-tight">
                {word.slice(0, chars)}<Caret />
            </p>
            <p className="mt-3 max-w-md truncate text-neutral-500">{subtitle}</p>
        </div>
    )
}