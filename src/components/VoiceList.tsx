import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Voice } from '../types'

type Props = {
  onSelect: (voice: Voice) => void
  selectedVoice: Voice | null
}

const VoiceList: React.FC<Props> = ({ onSelect, selectedVoice }) => {
  const [voices, setVoices] = useState<Voice[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchVoices = async () => {
      setLoading(true)
      try {
        const res = await axios.get('https://api.elevenlabs.io/v1/voices', {
          headers: {
            'xi-api-key': import.meta.env.VITE_ELEVENLABS_API_KEY,
          },
        })
        console.log('Fetched voices:', res.data.voices) // Debugging line to check fetched voices
        const customVoices = res.data.voices.filter(
          (voice: Voice) => voice.category === 'cloned'
        )

        setVoices(customVoices)
      } catch (err) {
        console.error('Error fetching voices:', err)
        setError('Failed to load voices.')
      } finally {
        setLoading(false)
      }
    }

    fetchVoices()
  }, [])

  return (
    <div className="bg-white p-6 rounded-xl shadow-md max-w-2xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Your Instant Voices
      </h2>

      {loading && <p className="text-blue-600">Loading voices...</p>}
      {error && <p className="text-red-600">{error}</p>}

      <ul className="space-y-2">
        {voices.map((voice) => (
          <li
            key={voice.voice_id}
            onClick={() => onSelect(voice)}
            className={`cursor-pointer p-3 border rounded hover:bg-gray-100 transition ${
              selectedVoice && selectedVoice.voice_id === voice.voice_id
                ? 'border-gray-600 border-2'
                : 'border-gray-300'
            }`}
          >
            <div className="font-semibold">{voice.name}</div>
            <div className="text-sm text-gray-500">{voice.category}</div>
          </li>
        ))}
        {voices.length === 0 && !loading && (
          <p className="text-gray-600">
            No custom voices found. Try uploading one above.
          </p>
        )}
      </ul>
    </div>
  )
}

export default VoiceList
