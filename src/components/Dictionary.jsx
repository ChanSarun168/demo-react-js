import axios from 'axios'
import { useState } from 'react'

function Dictionary() {
  const [word, setWord] = useState('')
  const [words, setWords] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')

  const fetchData = async (word) => {
    try {
      const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
      setWords(response.data)
      setErrorMessage('')
    } catch (error) {
      console.log("error:", error)
      setWords(null)
      if (error.response && error.response.status === 404) {
        setErrorMessage(`The word "${word}" was not found.`)
      } else {
        setErrorMessage('Something went wrong. Please try again.')
      }
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && word.trim()) {
      fetchData(word)
    }
  }

  return (
    <div className='w-screen h-screen flex justify-center items-center bg-pink-200'>
      <div className='w-[450px] h-[650px] bg-white rounded-md shadow-2xl p-4 overflow-y-auto'>
        <h1 className='text-center mt-6 ubuntu-bold text-2xl'>Kon Khmer Dictionary</h1>
        <input
          type='text'
          placeholder='search...'
          className='py-2 px-3 w-full shadow-inner rounded-md bg-gray-100 outline-none mt-3 ubuntu-medium'
          value={word}
          onChange={(e) => setWord(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        {/* Show prompt if input is empty */}
        {word === '' && !errorMessage && (
          <h3 className='ubuntu-bold text-center mt-5'>Type a word and press Enter</h3>
        )}

        {/* Show error if word not found */}
        {errorMessage && (
          <p className='text-center text-red-500 mt-5 ubuntu-medium'>{errorMessage}</p>
        )}

        {/* Show results if available */}
        {words && (
          <div className='mt-6 px-4'>
            <h2 className='text-lg font-semibold'>Meaning of: {words[0].word}</h2>

            {/* Audio */}
            {words[0].phonetics.map((phonetic, index) => (
              phonetic.audio && (
                <div key={index} className='my-2'>
                  <audio controls src={phonetic.audio}></audio>
                </div>
              )
            ))}

            {/* Definitions */}
            {words[0].meanings.map((meaning, index) => (
              <div key={index} className='mt-2'>
                <p className='italic text-sm'>{meaning.partOfSpeech}</p>
                <ul className='list-disc list-inside'>
                  {meaning.definitions.map((def, i) => (
                    <li key={i}>{def.definition}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Dictionary
