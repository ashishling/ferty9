import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import FormData from 'form-data';

// Configuration constants
const MAX_FILE_SIZE = 25 * 1024 * 1024; // 25MB - safe limit for ElevenLabs
const TIMEOUT_MS = 300000; // 5 minutes timeout
const CHUNK_DURATION_MS = 10 * 60 * 1000; // 10 minutes per chunk

export async function POST(req: NextRequest) {
  try {
    const data = await req.formData();
    const file = data.get('file') as File | null;
    const apiKey = data.get('apiKey') as string | null;

    if (!apiKey || !file) {
      return NextResponse.json({ error: 'API key and file are required.' }, { status: 400 });
    }

    // Check file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ 
        error: `File too large. Maximum size is ${MAX_FILE_SIZE / (1024 * 1024)}MB. Please split your audio into smaller chunks.` 
      }, { status: 400 });
    }

    const fileBuffer = Buffer.from(await file.arrayBuffer());

    const formData = new FormData();
    formData.append('file', fileBuffer, file.name);
    formData.append('model_id', 'scribe_v1');

    const headers = {
      'xi-api-key': apiKey,
      ...formData.getHeaders(),
    };

    // Configure axios with timeout
    const response = await axios.post(
      'https://api.elevenlabs.io/v1/speech-to-text', 
      formData, 
      { 
        headers,
        timeout: TIMEOUT_MS,
        maxContentLength: Infinity,
        maxBodyLength: Infinity
      }
    );

    const transcription = response.data.text ?? response.data;

    return NextResponse.json({ transcription });

  } catch (error: any) {
    console.error('Error transcribing audio:', error.response ? error.response.data : error.message);
    console.error('Full server error details:', {
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      message: error.message,
      config: error.config
    });
    
    // Handle specific error types
    if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
      return NextResponse.json({ 
        error: 'Transcription timed out. The file may be too large or the server is busy. Please try with a smaller file or split your audio into chunks.' 
      }, { status: 408 });
    }
    
    if (error.response && error.response.status === 401) {
      return NextResponse.json({ error: 'Invalid ElevenLabs API key.' }, { status: 401 });
    }
    
    if (error.response && error.response.status === 413) {
      return NextResponse.json({ 
        error: 'File too large for processing. Please use a smaller file or split your audio.' 
      }, { status: 413 });
    }
    
    if (error.response && error.response.status === 400) {
      const errorMessage = error.response?.data?.error || error.response?.data?.detail || 'Bad request';
      return NextResponse.json({ 
        error: `ElevenLabs API error: ${errorMessage}` 
      }, { status: 400 });
    }
    
    return NextResponse.json({ 
      error: 'Error transcribing audio. Please try again or use a smaller file.' 
    }, { status: 500 });
  }
} 