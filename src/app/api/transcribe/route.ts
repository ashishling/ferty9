import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import FormData from 'form-data';

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextRequest) {
  try {
    const data = await req.formData();
    const file = data.get('file') as File | null;
    const apiKey = data.get('apiKey') as string | null;

    if (!apiKey || !file) {
      return NextResponse.json({ error: 'API key and file are required.' }, { status: 400 });
    }

    const fileBuffer = Buffer.from(await file.arrayBuffer());

    const formData = new FormData();
    formData.append('file', fileBuffer, file.name);
    formData.append('model_id', 'scribe_v1');

    const headers = {
      'xi-api-key': apiKey,
      ...formData.getHeaders(),
    };

    const response = await axios.post('https://api.elevenlabs.io/v1/speech-to-text', formData, { headers });

    // The API returns the transcription directly in the response data for synchronous requests.
    // Based on the provided documentation, the result for a single transcript is in `response.data`.
    // If the whole object is the transcription, we'll pass that. If it's a field, we'll adjust.
    // The test with curl showed `response.data.text` but the doc is a bit ambiguous, so let's check for text first.
    const transcription = response.data.text ?? response.data;

    return NextResponse.json({ transcription });

  } catch (error: any) {
    console.error('Error transcribing audio:', error.response ? error.response.data : error.message);
    if (error.response && error.response.status === 401) {
        return NextResponse.json({ error: 'Invalid ElevenLabs API key.' }, { status: 401 });
    }
    return NextResponse.json({ error: 'Error transcribing audio.' }, { status: 500 });
  }
} 