export default function GeistLogo({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
            <path
                d="M18 30C18 16 26 8 34 8C43 8 50 16 50 28C50 38 53 46 57 51C59 54 57 57 54 57C51 57 50 55 47 55C44 55 43 59 39 59C35 59 34 55 31 55C28 55 27 59 23 59C19 59 18 55 15 55C11 55 8 53 10 51C14 46 18 40 18 30Z"
                fill="white"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinejoin="round"
            />
            <ellipse cx="28" cy="26" rx="2.6" ry="3.6" fill="currentColor" />
            <ellipse cx="37" cy="26" rx="2.6" ry="3.6" fill="currentColor" />
        </svg>
    )
}
