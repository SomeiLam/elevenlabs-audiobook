import React, { useState } from 'react'
import axios from 'axios'

interface TextToSpeechProps {
  voiceId: string
}

const TextToSpeech: React.FC<TextToSpeechProps> = ({ voiceId }) => {
  const [text, setText] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)

  const handleGenerate = async () => {
    if (!text) return

    setLoading(true)
    setAudioUrl(null)

    try {
      const response = await axios.post(
        `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
        {
          text: text,
          model_id: 'eleven_monolingual_v1',
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.5,
          },
        },
        {
          responseType: 'arraybuffer',
          headers: {
            'xi-api-key': import.meta.env.VITE_ELEVENLABS_API_KEY,
            'Content-Type': 'application/json',
            Accept: 'audio/mpeg',
          },
        }
      )

      const blob = new Blob([response.data], { type: 'audio/mpeg' })
      const url = URL.createObjectURL(blob)
      setAudioUrl(url)
    } catch (err) {
      console.error('Failed to generate audio:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg max-w-2xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Text to Speech</h2>

      <textarea
        className="w-full p-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows={6}
        placeholder="Enter some text to convert to speech..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button
        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded disabled:opacity-50"
        onClick={handleGenerate}
        disabled={loading}
      >
        {loading ? 'Generating...' : 'Generate Voice'}
      </button>

      {loading && (
        <div className="mt-4 text-blue-600 font-medium animate-pulse">
          Generating audio...
        </div>
      )}

      {audioUrl && (
        <div className="mt-6">
          <audio controls src={audioUrl} className="w-full rounded-lg" />
        </div>
      )}
    </div>
  )
}

export default TextToSpeech
