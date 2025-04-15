# ElevenLabs Audiobook

A web application that uses the ElevenLabs API to allow users to upload custom voices, clone them, and generate speech from text using the cloned voices. This project allows users to upload their voice, create instant clones of it, and then generate speech from any text input.

## Features

- **Upload Custom Voice**: Allows users to upload their own voice files to be used for text-to-speech.
- **Instant Voice Cloning**: Instantly clones uploaded voices and makes them available for text-to-speech generation.
- **Text to Speech**: Users can type in any text, and the application will generate speech using the selected cloned voice.

## Tech Stack

- **React**: The frontend is built using React for a smooth and interactive user experience.
- **ElevenLabs API**: Used for voice cloning and text-to-speech generation.
- **TailwindCSS**: Used for styling the application to make it responsive and visually appealing.
- **Vite**: Used as the development server for fast builds and hot module replacement.
- **Axios**: For handling API requests to the ElevenLabs API.

## Installation

### Clone the repository

```bash
git clone https://github.com/your-username/elevenlabs-audiobook.git
cd elevenlabs-audiobook
```

### Install dependencies

```bash
npm install
```

### Run the development server

```bash
npm run dev
```

### Usage

- **Upload your voice**: Use the file input to upload your custom voice.
- **Clone your voice**: Once the voice is uploaded, it will appear in the "Your Instant Voices" section.
- **Generate Voice**: Type text into the "Text to Speech" section and click "Generate Voice" to hear your cloned voice speak the text.

### License

This project is private and available for personal use. Modify and redistribute as needed.
