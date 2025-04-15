import { useState } from 'react'
import './App.css'
import TextToSpeech from './components/TextToSpeech'
import UploadVoice from './components/UploadVoice'
import VoiceList from './components/VoiceList'
import { Voice } from './types'

function App() {
  const [selectedVoice, setSelectedVoice] = useState<Voice | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [enteredCode, setEnteredCode] = useState('')

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEnteredCode(e.target.value)
  }

  const handleSubmit = () => {
    if (enteredCode === import.meta.env.VITE_TEMP_CODE) {
      setIsAuthenticated(true)
    } else {
      alert('Incorrect code. Please try again.')
    }
  }

  if (!isAuthenticated) {
    return (
      <form className="login-container" onSubmit={handleSubmit}>
        <input
          type="text"
          value={enteredCode}
          onChange={handleCodeChange}
          placeholder="Enter code"
          className="w-[200px] m-4 p-3 border border-gray-300 rounded-md focus:outline-blue-500"
        />
        <button type="submit">Submit</button>
      </form>
    )
  }

  return (
    <>
      <UploadVoice />
      <VoiceList
        selectedVoice={selectedVoice}
        onSelect={(voice) => setSelectedVoice(voice)}
      />
      {selectedVoice && <TextToSpeech voiceId={selectedVoice.voice_id} />}
    </>
  )
}

export default App
