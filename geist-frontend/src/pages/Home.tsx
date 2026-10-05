import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LoadingScreen from "../components/LoadingScreen"
import Caret from "../components/Caret"
import GeistLogo from "../components/GeistLogo"

const LOADING_WORDS = [
    'Researching the topic',
    'Building an outline',
    'Drafting the introduction',
    'Finding supporting evidence',
    'Writing body paragraphs',
    'Formatting in MLA',
    'Proofreading',
];

export default function Home() {
    const devURL = import.meta.env.VITE_DEV_URL;
    const [response, setResponse] = useState<string>('');
    const [prompt, setPrompt] = useState<string>('');
    const [topic, setTopic] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [shown, setShown] = useState<number>(0);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
        setPrompt(e.target.value);
    }

    const handleClick = async (): Promise<void> => {
        if (!prompt.trim() || loading) return;
        setTopic(prompt);
        setPrompt('');
        setResponse('');
        setLoading(true);
        try {
            const res = await axios.post(devURL, { prompt });
            const resData = res.data;
            setShown(0);
            setResponse(resData);
        } catch (error) {
            console.error("error: ", error);
        } finally {
            setLoading(false);
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
        if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
            e.preventDefault();
            handleClick();
        }
    }

    const step = Math.max(2, Math.ceil(response.length / 1500));

    useEffect(() => {
        if (shown >= response.length) return;
        const id = setTimeout(() => setShown(n => n + step), 16);
        return () => clearTimeout(id);
    }, [shown, response, step]);

    const visible = response.slice(0, shown);
    const [title = '', ...paragraphs] = visible.split(/\n+/).map(p => p.trim()).filter(Boolean);
    const wordCount = visible.split(/\s+/).filter(Boolean).length;
    const typing = shown < response.length;
    const today = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

    return (
        <div className="flex h-screen flex-col bg-violet-50 font-sans text-neutral-950">
            <header className="flex h-16 shrink-0 items-center gap-2.5 border-b-2 border-neutral-950 bg-white px-6">
                <GeistLogo className="h-8 w-8 text-violet-600" />
                <span className="text-xl font-bold tracking-tight">Geist</span>
            </header>

            <main className="flex-1 overflow-y-auto px-6 py-12">
                {loading ? (
                    <LoadingScreen words={LOADING_WORDS} subtitle={topic} />
                ) : response ? (
                    // Could become a <PaperView> component, reused by the history tab.
                    <div className="mx-auto max-w-[8.5in]">
                        <div className="mb-4 flex items-center justify-between gap-4">
                            <div className="flex min-w-0 items-center gap-3">
                                <span className="shrink-0 bg-neutral-950 px-2.5 py-1 text-xs font-semibold uppercase tracking-widest text-white">
                                    Draft
                                </span>
                                <span className="truncate text-sm font-medium text-neutral-700">{topic}</span>
                            </div>
                            {/* toolbar slot for future save pdf & open docs */}
                            <span className="shrink-0 text-sm tabular-nums text-neutral-500">{wordCount} words</span>
                        </div>

                        <article className="relative min-h-[11in] border border-neutral-950 bg-white px-6 py-12 font-['Times_New_Roman',Times,serif] text-[12pt] leading-[2] text-black shadow-[6px_6px_0_0_var(--color-violet-300)] sm:p-[1in]">
                            <span className="absolute right-6 top-4 sm:right-[1in] sm:top-[0.5in]">
                                <Placeholder>Last Name</Placeholder> 1
                            </span>
                            <p><Placeholder>Student Name</Placeholder></p>
                            <p><Placeholder>Instructor Name</Placeholder></p>
                            <p><Placeholder>Course</Placeholder></p>
                            <p>{today}</p>
                            <h2 className="text-center">{title.replace(/^[#*\s]+|[*\s]+$/g, '')}</h2>
                            {paragraphs.map((p, i) => (
                                <p key={i} className="indent-[0.5in]">{p}</p>
                            ))}
                            {typing && <Caret />}
                        </article>
                    </div>
                ) : (
                    <div className="mx-auto flex h-full max-w-[8.5in] flex-col justify-center">
                        <GeistLogo className="h-16 w-16 text-violet-600" />
                        <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">
                            What paper should we write?
                        </h1>
                        <p className="mt-4 max-w-md text-lg text-neutral-600">
                            Describe a topic below. The paper will show up here.
                        </p>
                    </div>
                )}
            </main>

            <div className="shrink-0 px-6 pb-6 pt-2">
                <div className="mx-auto flex max-w-[8.5in] items-end gap-2 rounded-lg border-2 border-neutral-950 bg-white p-2 focus-within:shadow-[4px_4px_0_0_var(--color-violet-600)]">
                    <textarea
                        rows={1}
                        value={prompt}
                        placeholder="Enter a paper topic..."
                        className="flex-1 resize-none bg-transparent px-3 py-2.5 text-base text-neutral-950 placeholder-neutral-500 outline-none"
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                    />
                    <button className="rounded-md bg-violet-600 px-5 py-2.5 font-semibold text-white hover:bg-violet-700 disabled:bg-violet-300"
                        onClick={handleClick}
                        disabled={loading}
                    >
                        Generate
                    </button>
                </div>
                <p className="mx-auto mt-2 max-w-[8.5in] px-1 text-xs text-neutral-500">
                    Enter to generate, Shift + Enter for a new line
                </p>
            </div>
        </div>
    )
}

function Placeholder({ children }: { children: React.ReactNode }) {
    return <span className="text-neutral-400">{children}</span>
}