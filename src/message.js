import { words } from "./words"

export function generateRandomWord() {
    const randomIndex = Math.floor(Math.random() * words.length)
    return words[randomIndex];
}