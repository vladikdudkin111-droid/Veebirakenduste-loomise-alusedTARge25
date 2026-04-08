import { useCallback, useEffect, useState } from 'react'
import words from "./wordList.json"
import { HangmanDrawing } from './HangmanDrawing'
import { HangmanWord } from "./HangmanWord"
import { Keyboard } from './Keyboard'
import './App.css'

// случайное слово
function getWord() {
  return words[Math.floor(Math.random() * words.length)]
}

function App() {
  const [wordToGuess, setWordGuess] = useState(() => getWord())
  const [guessedLetters, setGuessedLetters] = useState<string[]>([])

  // неправильные буквы
  const inCorrectLetters = guessedLetters.filter(
    letter => !wordToGuess.includes(letter)
  )

  // проигрыш
  const isLoser = inCorrectLetters.length >= 6

  // победа
  const isWinner = wordToGuess
    .split("")
    .every(letter => guessedLetters.includes(letter))

  // добавление буквы
  const addGuessedLetter = useCallback(
    (letter: string) => {
      if (guessedLetters.includes(letter) || isLoser || isWinner) return

      setGuessedLetters(current => [...current, letter])
    },
    [guessedLetters, isLoser, isWinner]
  )

  // ввод с клавиатуры
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase()

      if (!key.match(/^[a-z]$/)) return

      e.preventDefault()
      addGuessedLetter(key)
    }

    document.addEventListener("keypress", handler)
    return () => document.removeEventListener("keypress", handler)
  }, [addGuessedLetter])

  // перезапуск по Enter
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key !== "Enter") return

      e.preventDefault()
      setGuessedLetters([])
      setWordGuess(getWord())
    }

    document.addEventListener("keypress", handler)
    return () => document.removeEventListener("keypress", handler)
  }, [])

  return (
    <div
      style={{
        maxWidth: "800px",
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        margin: "0 auto",
        alignItems: "center"
      }}
    >
      <div style={{ fontSize: "2rem", textAlign: "center" }}>
        {isWinner && "Winner! - Press Enter to try again"}
        {isLoser && "Nice try! - Press Enter to try again"}
      </div>

      <HangmanDrawing numberOfGuesses={inCorrectLetters.length} />

      <HangmanWord
        reveal={isLoser}
        guessedLetters={guessedLetters}
        wordToGuess={wordToGuess}
      />

      <div style={{ alignSelf: "stretch" }}>
        <Keyboard
          disabled={isWinner || isLoser}
          activeLetters={guessedLetters.filter(letter =>
            wordToGuess.includes(letter)
          )}
          inactiveLetters={inCorrectLetters}
          addGuessedLetter={addGuessedLetter}
        />
      </div>
    </div>
  )
}

export default App