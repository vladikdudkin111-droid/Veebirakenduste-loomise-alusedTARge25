import { useState } from 'react'
import { motion, AnimatePresence } from "framer-motion";
import './App.css'

interface JokeResponse {
  value: string;
}

export default function App() {
  const [joke, setJoke] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchJoke = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("https://api.chucknorris.io/jokes/random");
      if (!response.ok) {
        throw new Error("API error")
      }

      const data: JokeResponse = await response.json();
      setJoke(data.value);

    } catch (err) {
      setError("Failed to fetch joke");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col itmes-center justify-center bg-gray-100 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-white shadow-lg rounded-2x1 p-6 max-w-md text-center"
        >
          <h1 className="text-2x1 font-bold mb-4">Chuck Norris Joke</h1>

          <div className="min-h-[80px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              {loading && (
                <motion.p
                  key="loading"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
              >
                Loading...
                </motion.p>
              )}

              {error && (
                <motion.p
                  key="error"
                  className="text-red-500"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
              >
                {error}
                </motion.p>
              )}

              {!loading && !error && joke && (
                <motion.p
                  key={joke}
                  className="mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3}}
              >
                {joke}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <motion.button
            onClick={fetchJoke}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-500 text-white px-4 py-2 rounded-x1 hover:bg-blue-600 transition"
          >
            Get New Joke
          </motion.button>
      </motion.div>
    </div>
  );
}
