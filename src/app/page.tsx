"use client";

import { useState, useRef, ChangeEvent } from 'react';
import axios from 'axios';

type FileStatus = {
  file: File;
  status: 'pending' | 'transcribing' | 'completed' | 'failed';
  transcription?: string;
};

export default function HomePage() {
  const [apiKey, setApiKey] = useState('');
  const [files, setFiles] = useState<FileStatus[]>([]);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const selectedFiles = Array.from(event.target.files);
      const newFiles: FileStatus[] = selectedFiles
        .filter(file => file.size <= 100 * 1024 * 1024)
        .map(file => ({ file, status: 'pending' }));
      setFiles(prevFiles => [...prevFiles, ...newFiles]);
    }
  };

  const updateFileStatus = (index: number, status: FileStatus['status'], transcription?: string) => {
    setFiles(prevFiles => {
      const newFiles = [...prevFiles];
      newFiles[index] = { ...newFiles[index], status, transcription };
      return newFiles;
    });
  };

  const handleTranscribe = async () => {
    if (!apiKey || files.length === 0) {
      alert('Please provide an API key and select files to transcribe.');
      return;
    }

    setIsTranscribing(true);

    for (let i = 0; i < files.length; i++) {
      if (files[i].status === 'completed') continue;

      updateFileStatus(i, 'transcribing');
      
      const formData = new FormData();
      formData.append('file', files[i].file);
      formData.append('apiKey', apiKey);

      try {
        const response = await axios.post('/api/transcribe', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        updateFileStatus(i, 'completed', response.data.transcription);
      } catch (error: any) {
        console.error('Error transcribing file:', files[i].file.name, error);
        updateFileStatus(i, 'failed');
        if (error.response && error.response.status === 401) {
          alert('Invalid ElevenLabs API key.');
        }
      }
    }

    setIsTranscribing(false);
  };

  const openFileSelector = () => {
    fileInputRef.current?.click();
  };

  const removeFile = (fileName: string) => {
    setFiles(files.filter(f => f.file.name !== fileName));
  };

  const downloadAllTranscriptions = () => {
    const completedFiles = files.filter(f => f.status === 'completed' && f.transcription);
    
    if (completedFiles.length === 0) {
      alert('No completed transcriptions to download.');
      return;
    }

    let combinedText = '';
    completedFiles.forEach((fileStatus, index) => {
      combinedText += `=== ${fileStatus.file.name} ===\n\n`;
      combinedText += fileStatus.transcription || '';
      combinedText += '\n\n';
      if (index < completedFiles.length - 1) {
        combinedText += '─'.repeat(50) + '\n\n';
      }
    });

    const blob = new Blob([combinedText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `all_transcriptions_${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const hasCompletedTranscriptions = files.some(f => f.status === 'completed' && f.transcription);

  return (
    <div className="container mx-auto py-6 min-h-screen">
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold gradient-text mb-2">F9Transcribe</h1>
        <p className="text-lg text-gray-600">Transform your audio into text with ElevenLabs</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="modern-card p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
            </svg>
            ElevenLabs API Key
          </h2>
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Enter your ElevenLabs API key"
            className="modern-input w-full"
          />
        </div>

        <div className="modern-card p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            Upload Audio Files
          </h2>
          <div 
            className="upload-area"
            onClick={openFileSelector}
          >
            <svg className="w-8 h-8 mx-auto mb-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <p className="text-sm font-medium mb-1">Click to select files</p>
            <p className="text-xs text-gray-500">Supports audio and video files up to 100MB each</p>
            <input
              type="file"
              multiple
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept="audio/*,video/*"
            />
          </div>
          <div className="mt-3 space-y-2 max-h-32 overflow-y-auto">
            {files.map((fileStatus, index) => (
              <div key={index} className="flex justify-between items-center glass p-2 rounded">
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                  </svg>
                  <span className="text-sm font-medium truncate max-w-32">{fileStatus.file.name}</span>
                </div>
                <button 
                  onClick={() => removeFile(fileStatus.file.name)} 
                  className="btn-destructive text-xs px-2 py-1"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="text-center mb-6">
        <button
          onClick={handleTranscribe}
          disabled={isTranscribing || !apiKey || files.length === 0}
          className="btn-primary text-base px-8 py-3"
        >
          {isTranscribing ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Transcribing...
            </span>
          ) : (
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
              Transcribe Files
            </span>
          )}
        </button>
      </div>

      <div className="modern-card p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold flex items-center">
            <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Transcription Status
          </h2>
          {hasCompletedTranscriptions && (
            <button
              onClick={downloadAllTranscriptions}
              className="btn-secondary text-sm px-4 py-2 flex items-center"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download All
            </button>
          )}
        </div>
        <div className="space-y-3">
          {files.map((fileStatus, index) => (
            <div key={index} className="glass p-4 rounded-lg">
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                  </svg>
                  <span className="font-medium text-sm">{fileStatus.file.name}</span>
                </div>
                <span className={`status-badge ${
                  fileStatus.status === 'pending' ? 'status-pending' :
                  fileStatus.status === 'transcribing' ? 'status-transcribing' :
                  fileStatus.status === 'completed' ? 'status-completed' :
                  'status-failed'
                }`}>
                  {fileStatus.status}
                </span>
              </div>
              {fileStatus.status === 'completed' && fileStatus.transcription && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium mb-1">Transcription:</label>
                    <textarea
                      readOnly
                      value={fileStatus.transcription}
                      className="modern-textarea w-full"
                      rows={3}
                    />
                  </div>
                  <button
                    onClick={() => {
                      const blob = new Blob([fileStatus.transcription || ''], { type: 'text/plain' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = `${fileStatus.file.name.split('.')[0]}.txt`;
                      a.click();
                      URL.revokeObjectURL(url);
                    }}
                    className="btn-secondary text-xs"
                  >
                    <svg className="w-3 h-3 mr-1 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Download
                  </button>
                </div>
              )}
            </div>
          ))}
          {files.length === 0 && (
            <div className="text-center py-8">
              <svg className="w-12 h-12 mx-auto text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
              </svg>
              <p className="text-gray-500 text-sm">No files uploaded yet</p>
              <p className="text-gray-400 text-xs">Upload audio or video files to get started</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
