import { MotivationalQuotes } from '../constants/MotivationalQuotes';

export const getMotivationalQuote = () => (
    MotivationalQuotes[Math.floor(Math.random() * MotivationalQuotes.length)]
);
