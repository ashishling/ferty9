// Audio file utilities for handling large files

export interface AudioChunk {
  blob: Blob;
  startTime: number;
  endTime: number;
  index: number;
}

export interface TranscriptionResult {
  text: string;
  startTime: number;
  endTime: number;
  index: number;
}

/**
 * Split an audio file into smaller chunks for processing
 * @param file - The audio file to split
 * @param chunkDurationMs - Duration of each chunk in milliseconds (default: 10 minutes)
 * @returns Promise<AudioChunk[]> - Array of audio chunks
 */
export async function splitAudioFile(
  file: File, 
  chunkDurationMs: number = 10 * 60 * 1000 // 10 minutes
): Promise<AudioChunk[]> {
  return new Promise((resolve, reject) => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const fileReader = new FileReader();

    fileReader.onload = async (event) => {
      try {
        const arrayBuffer = event.target?.result as ArrayBuffer;
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
        
        const sampleRate = audioBuffer.sampleRate;
        const totalSamples = audioBuffer.length;
        const totalDurationMs = (totalSamples / sampleRate) * 1000;
        
        const chunks: AudioChunk[] = [];
        let currentTime = 0;
        let chunkIndex = 0;

        while (currentTime < totalDurationMs) {
          const startSample = Math.floor((currentTime / 1000) * sampleRate);
          const endTime = Math.min(currentTime + chunkDurationMs, totalDurationMs);
          const endSample = Math.floor((endTime / 1000) * sampleRate);
          
          // Create a new AudioBuffer for this chunk
          const chunkBuffer = audioContext.createBuffer(
            audioBuffer.numberOfChannels,
            endSample - startSample,
            sampleRate
          );

          // Copy audio data for each channel
          for (let channel = 0; channel < audioBuffer.numberOfChannels; channel++) {
            const channelData = audioBuffer.getChannelData(channel);
            const chunkData = chunkBuffer.getChannelData(channel);
            for (let i = 0; i < endSample - startSample; i++) {
              chunkData[i] = channelData[startSample + i];
            }
          }

          // Convert AudioBuffer to Blob
          const chunkBlob = await audioBufferToBlob(chunkBuffer, file.type);
          
          chunks.push({
            blob: chunkBlob,
            startTime: currentTime,
            endTime: endTime,
            index: chunkIndex
          });

          currentTime = endTime;
          chunkIndex++;
        }

        resolve(chunks);
      } catch (error) {
        reject(error);
      }
    };

    fileReader.onerror = () => reject(new Error('Failed to read file'));
    fileReader.readAsArrayBuffer(file);
  });
}

/**
 * Convert AudioBuffer to Blob
 */
async function audioBufferToBlob(audioBuffer: AudioBuffer, mimeType: string): Promise<Blob> {
  const numberOfChannels = audioBuffer.numberOfChannels;
  const length = audioBuffer.length;
  const sampleRate = audioBuffer.sampleRate;
  
  // Create WAV file
  const buffer = new ArrayBuffer(44 + length * numberOfChannels * 2);
  const view = new DataView(buffer);
  
  // WAV header
  const writeString = (offset: number, string: string) => {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  };
  
  writeString(0, 'RIFF');
  view.setUint32(4, 36 + length * numberOfChannels * 2, true);
  writeString(8, 'WAVE');
  writeString(12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, numberOfChannels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * numberOfChannels * 2, true);
  view.setUint16(32, numberOfChannels * 2, true);
  view.setUint16(34, 16, true);
  writeString(36, 'data');
  view.setUint32(40, length * numberOfChannels * 2, true);
  
  // Write audio data
  let offset = 44;
  for (let i = 0; i < length; i++) {
    for (let channel = 0; channel < numberOfChannels; channel++) {
      const sample = Math.max(-1, Math.min(1, audioBuffer.getChannelData(channel)[i]));
      view.setInt16(offset, sample < 0 ? sample * 0x8000 : sample * 0x7FFF, true);
      offset += 2;
    }
  }
  
  return new Blob([buffer], { type: mimeType });
}

/**
 * Merge transcription results from multiple chunks
 */
export function mergeTranscriptions(results: TranscriptionResult[]): string {
  return results
    .sort((a, b) => a.index - b.index)
    .map(result => result.text)
    .join('\n\n');
}

/**
 * Check if a file is too large and needs splitting
 */
export function shouldSplitFile(file: File, maxSizeMB: number = 25): boolean {
  return file.size > maxSizeMB * 1024 * 1024;
}

/**
 * Get file size in human readable format
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
} 