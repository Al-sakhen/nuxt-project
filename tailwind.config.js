import { blackA, grass, green, mauve } from "@radix-ui/colors";

/** @type {import('tailwindcss').Config} */
export default {
    content: ["./**/*.vue"],
    theme: {
        extend: {
            colors: {
                ...blackA,
                ...grass,
                ...green,
                ...mauve,
            },
        },
        keyframes: {
            enterFromLeft: {
                from: { opacity: 0, transform: "translateX(-200px)" },
                to: { opacity: 1, transform: "translateX(0)" },
            },
            enterFromRight: {
                from: { opacity: 0, transform: "translateX(200px)" },
                to: { opacity: 1, transform: "translateX(0)" },
            },
            exitToLeft: {
                from: { opacity: 1, transform: "translateX(0)" },
                to: { opacity: 0, transform: "translateX(-200px)" },
            },
            exitToRight: {
                from: { opacity: 1, transform: "translateX(0)" },
                to: { opacity: 0, transform: "translateX(200px)" },
            },
            fadeIn: {
                from: { opacity: 0 },
                to: { opacity: 1 },
            },
            fadeOut: {
                from: { opacity: 1 },
                to: { opacity: 0 },
            },
            hide: {
                from: { opacity: 1 },
                to: { opacity: 0 },
            },
            scaleIn: {
                from: { opacity: 0, transform: "rotateX(-30deg) scale(0.9)" },
                to: { opacity: 1, transform: "rotateX(0deg) scale(1)" },
            },
            scaleOut: {
                from: { opacity: 1, transform: "rotateX(0deg) scale(1)" },
                to: { opacity: 0, transform: "rotateX(-10deg) scale(0.95)" },
            },
            slideIn: {
                from: {
                    transform:
                        "translateX(calc(100% + var(--viewport-padding)))",
                },
                to: { transform: "translateX(0)" },
            },
            swipeOut: {
                from: {
                    transform: "translateX(var(--reka-toast-swipe-end-x))",
                },
                to: {
                    transform:
                        "translateX(calc(100% + var(--viewport-padding)))",
                },
            },
        },
        animation: {
            enterFromLeft: "enterFromLeft 250ms ease",
            enterFromRight: "enterFromRight 250ms ease",
            exitToLeft: "exitToLeft 250ms ease",
            exitToRight: "exitToRight 250ms ease",
            fadeIn: "fadeIn 200ms ease",
            fadeOut: "fadeOut 200ms ease",
            hide: "hide 100ms ease-in",
            scaleIn: "scaleIn 200ms ease",
            scaleOut: "scaleOut 200ms ease",
            slideIn: "slideIn 150ms cubic-bezier(0.16, 1, 0.3, 1)",
            swipeOut: "swipeOut 100ms ease-out",
        },
    },
    plugins: [],
};
