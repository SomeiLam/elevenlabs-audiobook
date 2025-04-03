import { useState } from 'react'
import './App.css'
import TextToSpeech from './components/TextToSpeech'
import UploadVoice from './components/UploadVoice'
import VoiceList from './components/VoiceList'
import { Voice } from './types'

function App() {
  const [selectedVoice, setSelectedVoice] = useState<Voice | null>(null)
  return (
    <>
      <UploadVoice />
      <VoiceList onSelect={(voice) => setSelectedVoice(voice)} />
      {selectedVoice && <TextToSpeech voiceId={selectedVoice.voice_id} />}
    </>
  )
}

export default App
