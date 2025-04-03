import React, { useState } from 'react'
import axios from 'axios'

const UploadVoice: React.FC = () => {
  const [file, setFile] = useState<File | null>(null)
  const [voiceName, setVoiceName] = useState('')
  const [uploading, setUploading] = useState(false)
  const [voiceId, setVoiceId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null
    setFile(selectedFile)
  }

  const handleUpload = async () => {
    if (!file || !voiceName) {
      setError('Please provide both a voice name and a file.')
      return
    }

    setUploading(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append('name', voiceName)
      formData.append('files', file)

      const response = await axios.post(
        'https://api.elevenlabs.io/v1/voices/add',
        formData,
        {
          headers: {
            'xi-api-key': import.meta.env.VITE_ELEVENLABS_API_KEY,
            'Content-Type': 'multipart/form-data',
          },
        }
      )

      setVoiceId(response.data.voice_id)
    } catch (err) {
      console.error('Upload failed:', err)
      setError('Failed to upload voice. Please try again.')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-md max-w-2xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Upload Custom Voice
      </h2>

      <input
        type="text"
        placeholder="Voice name"
        value={voiceName}
        onChange={(e) => setVoiceName(e.target.value)}
        className="w-full mb-4 p-3 border border-gray-300 rounded-md focus:outline-blue-500"
      />

      <input
        type="file"
        accept="audio/*"
        onChange={handleFileChange}
        className="mb-4 mx-4 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 file:cursor-pointer file:border-0 file:bg-blue-50 file:text-blue-700 file:font-medium hover:file:bg-blue-100"
      />

      <button
        onClick={handleUpload}
        disabled={uploading}
        className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded disabled:opacity-50"
      >
        {uploading ? 'Uploading...' : 'Upload Voice'}
      </button>

      {voiceId && (
        <p className="mt-4 text-green-600">
          ✅ Voice uploaded successfully! Voice ID:{' '}
          <span className="font-mono">{voiceId}</span>
        </p>
      )}

      {error && <p className="mt-4 text-red-600 font-medium">{error}</p>}
    </div>
  )
}

export default UploadVoice
