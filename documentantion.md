---
title: Speech to Text
subtitle: Learn how to turn spoken audio into text with ElevenLabs.
---

## Overview

The ElevenLabs [Speech to Text (STT)](/docs/api-reference/speech-to-text) API turns spoken audio into text with state of the art accuracy. Our Scribe v1 [model](/docs/models) adapts to textual cues across 99 languages and multiple voice styles and can be used to:

- Transcribe podcasts, interviews, and other audio or video content
- Generate transcripts for meetings and other audio or video recordings

<CardGroup cols={2}>
  <Card
    title="Developer tutorial"
    icon="duotone book-sparkles"
    href="/docs/cookbooks/speech-to-text/quickstart"
  >
    Learn how to integrate speech to text into your application.
  </Card>
  <Card
    title="Product guide"
    icon="duotone book-user"
    href="/docs/product-guides/playground/speech-to-text"
  >
    Step-by-step guide for using speech to text in ElevenLabs.
  </Card>
</CardGroup>

<Info>
  Companies requiring HIPAA compliance must contact [ElevenLabs
  Sales](https://elevenlabs.io/contact-sales) to sign a Business Associate Agreement (BAA)
  agreement. Please ensure this step is completed before proceeding with any HIPAA-related
  integrations or deployments.
</Info>

## State of the art accuracy

The Scribe v1 model is capable of transcribing audio from up to 32 speakers with high accuracy. Optionally it can also transcribe audio events like laughter, applause, and other non-speech sounds.

The transcribed output supports exact timestamps for each word and audio event, plus diarization to identify the speaker for each word.

The Scribe v1 model is best used for when high-accuracy transcription is required rather than real-time transcription. A low-latency, real-time version will be released soon.

## Pricing

<Tabs>
  <Tab title="Developer API">

| Tier     | Price/month | Hours included      | Price per included hour | Price per additional hour |
| -------- | ----------- | ------------------- | ----------------------- | ------------------------- |
| Free     | \$0         | Unavailable         | Unavailable             | Unavailable               |
| Starter  | \$5         | 12 hours 30 minutes | \$0.40                  | Unavailable               |
| Creator  | \$22        | 62 hours 51 minutes | \$0.35                  | \$0.48                    |
| Pro      | \$99        | 300 hours           | \$0.33                  | \$0.40                    |
| Scale    | \$330       | 1,100 hours         | \$0.30                  | \$0.33                    |
| Business | \$1,320     | 6,000 hours         | \$0.22                  | \$0.22                    |

  </Tab>
  <Tab title="Product interface pricing">

| Tier     | Price/month | Hours included  | Price per included hour |
| -------- | ----------- | --------------- | ----------------------- |
| Free     | \$0         | 12 minutes      | Unavailable             |
| Starter  | \$5         | 1 hour          | \$5                     |
| Creator  | \$22        | 4 hours 53 min  | \$4.5                   |
| Pro      | \$99        | 24 hours 45 min | \$4                     |
| Scale    | \$330       | 94 hours 17 min | \$3.5                   |
| Business | \$1,320     | 440 hours       | \$3                     |

  </Tab>

</Tabs>

<Note>
  For reduced pricing at higher scale than 6,000 hours/month in addition to custom MSAs and DPAs,
  please [contact sales](https://elevenlabs.io/contact-sales).

**Note: The free tier requires attribution and does not have commercial licensing.**

</Note>

Scribe has higher concurrency limits than other services from ElevenLabs.
Please see other concurrency limits [here](/docs/models#concurrency-and-priority)

| Plan       | STT Concurrency Limit |
| ---------- | --------------------- |
| Free       | 10                    |
| Starter    | 15                    |
| Creator    | 25                    |
| Pro        | 50                    |
| Scale      | 75                    |
| Business   | 75                    |
| Enterprise | Elevated              |

## Examples

The following example shows the output of the Scribe v1 model for a sample audio file.

<elevenlabs-audio-player
    audio-title="Nicole"
    audio-src="https://storage.googleapis.com/eleven-public-cdn/audio/marketing/nicole.mp3"
/>

```javascript
{
  "language_code": "en",
  "language_probability": 1,
  "text": "With a soft and whispery American accent, I'm the ideal choice for creating ASMR content, meditative guides, or adding an intimate feel to your narrative projects.",
  "words": [
    {
      "text": "With",
      "start": 0.119,
      "end": 0.259,
      "type": "word",
      "speaker_id": "speaker_0"
    },
    {
      "text": " ",
      "start": 0.239,
      "end": 0.299,
      "type": "spacing",
      "speaker_id": "speaker_0"
    },
    {
      "text": "a",
      "start": 0.279,
      "end": 0.359,
      "type": "word",
      "speaker_id": "speaker_0"
    },
    {
      "text": " ",
      "start": 0.339,
      "end": 0.499,
      "type": "spacing",
      "speaker_id": "speaker_0"
    },
    {
      "text": "soft",
      "start": 0.479,
      "end": 1.039,
      "type": "word",
      "speaker_id": "speaker_0"
    },
    {
      "text": " ",
      "start": 1.019,
      "end": 1.2,
      "type": "spacing",
      "speaker_id": "speaker_0"
    },
    {
      "text": "and",
      "start": 1.18,
      "end": 1.359,
      "type": "word",
      "speaker_id": "speaker_0"
    },
    {
      "text": " ",
      "start": 1.339,
      "end": 1.44,
      "type": "spacing",
      "speaker_id": "speaker_0"
    },
    {
      "text": "whispery",
      "start": 1.419,
      "end": 1.979,
      "type": "word",
      "speaker_id": "speaker_0"
    },
    {
      "text": " ",
      "start": 1.959,
      "end": 2.179,
      "type": "spacing",
      "speaker_id": "speaker_0"
    },
    {
      "text": "American",
      "start": 2.159,
      "end": 2.719,
      "type": "word",
      "speaker_id": "speaker_0"
    },
    {
      "text": " ",
      "start": 2.699,
      "end": 2.779,
      "type": "spacing",
      "speaker_id": "speaker_0"
    },
    {
      "text": "accent,",
      "start": 2.759,
      "end": 3.389,
      "type": "word",
      "speaker_id": "speaker_0"
    },
    {
      "text": " ",
      "start": 4.119,
      "end": 4.179,
      "type": "spacing",
      "speaker_id": "speaker_0"
    },
    {
      "text": "I'm",
      "start": 4.159,
      "end": 4.459,
      "type": "word",
      "speaker_id": "speaker_0"
    },
    {
      "text": " ",
      "start": 4.44,
      "end": 4.52,
      "type": "spacing",
      "speaker_id": "speaker_0"
    },
    {
      "text": "the",
      "start": 4.5,
      "end": 4.599,
      "type": "word",
      "speaker_id": "speaker_0"
    },
    {
      "text": " ",
      "start": 4.579,
      "end": 4.699,
      "type": "spacing",
      "speaker_id": "speaker_0"
    },
    {
      "text": "ideal",
      "start": 4.679,
      "end": 5.099,
      "type": "word",
      "speaker_id": "speaker_0"
    },
    {
      "text": " ",
      "start": 5.079,
      "end": 5.219,
      "type": "spacing",
      "speaker_id": "speaker_0"
    },
    {
      "text": "choice",
      "start": 5.199,
      "end": 5.719,
      "type": "word",
      "speaker_id": "speaker_0"
    },
    {
      "text": " ",
      "start": 5.699,
      "end": 6.099,
      "type": "spacing",
      "speaker_id": "speaker_0"
    },
    {
      "text": "for",
      "start": 6.099,
      "end": 6.199,
      "type": "word",
      "speaker_id": "speaker_0"
    },
    {
      "text": " ",
      "start": 6.179,
      "end": 6.279,
      "type": "spacing",
      "speaker_id": "speaker_0"
    },
    {
      "text": "creating",
      "start": 6.259,
      "end": 6.799,
      "type": "word",
      "speaker_id": "speaker_0"
    },
    {
      "text": " ",
      "start": 6.779,
      "end": 6.979,
      "type": "spacing",
      "speaker_id": "speaker_0"
    },
    {
      "text": "ASMR",
      "start": 6.959,
      "end": 7.739,
      "type": "word",
      "speaker_id": "speaker_0"
    },
    {
      "text": " ",
      "start": 7.719,
      "end": 7.859,
      "type": "spacing",
      "speaker_id": "speaker_0"
    },
    {
      "text": "content,",
      "start": 7.839,
      "end": 8.45,
      "type": "word",
      "speaker_id": "speaker_0"
    },
    {
      "text": " ",
      "start": 9,
      "end": 9.06,
      "type": "spacing",
      "speaker_id": "speaker_0"
    },
    {
      "text": "meditative",
      "start": 9.04,
      "end": 9.64,
      "type": "word",
      "speaker_id": "speaker_0"
    },
    {
      "text": " ",
      "start": 9.619,
      "end": 9.699,
      "type": "spacing",
      "speaker_id": "speaker_0"
    },
    {
      "text": "guides,",
      "start": 9.679,
      "end": 10.359,
      "type": "word",
      "speaker_id": "speaker_0"
    },
    {
      "text": " ",
      "start": 10.359,
      "end": 10.409,
      "type": "spacing",
      "speaker_id": "speaker_0"
    },
    {
      "text": "or",
      "start": 11.319,
      "end": 11.439,
      "type": "word",
      "speaker_id": "speaker_0"
    },
    {
      "text": " ",
      "start": 11.42,
      "end": 11.52,
      "type": "spacing",
      "speaker_id": "speaker_0"
    },
    {
      "text": "adding",
      "start": 11.5,
      "end": 11.879,
      "type": "word",
      "speaker_id": "speaker_0"
    },
    {
      "text": " ",
      "start": 11.859,
      "end": 12,
      "type": "spacing",
      "speaker_id": "speaker_0"
    },
    {
      "text": "an",
      "start": 11.979,
      "end": 12.079,
      "type": "word",
      "speaker_id": "speaker_0"
    },
    {
      "text": " ",
      "start": 12.059,
      "end": 12.179,
      "type": "spacing",
      "speaker_id": "speaker_0"
    },
    {
      "text": "intimate",
      "start": 12.179,
      "end": 12.579,
      "type": "word",
      "speaker_id": "speaker_0"
    },
    {
      "text": " ",
      "start": 12.559,
      "end": 12.699,
      "type": "spacing",
      "speaker_id": "speaker_0"
    },
    {
      "text": "feel",
      "start": 12.679,
      "end": 13.159,
      "type": "word",
      "speaker_id": "speaker_0"
    },
    {
      "text": " ",
      "start": 13.139,
      "end": 13.179,
      "type": "spacing",
      "speaker_id": "speaker_0"
    },
    {
      "text": "to",
      "start": 13.159,
      "end": 13.26,
      "type": "word",
      "speaker_id": "speaker_0"
    },
    {
      "text": " ",
      "start": 13.239,
      "end": 13.3,
      "type": "spacing",
      "speaker_id": "speaker_0"
    },
    {
      "text": "your",
      "start": 13.299,
      "end": 13.399,
      "type": "word",
      "speaker_id": "speaker_0"
    },
    {
      "text": " ",
      "start": 13.379,
      "end": 13.479,
      "type": "spacing",
      "speaker_id": "speaker_0"
    },
    {
      "text": "narrative",
      "start": 13.479,
      "end": 13.889,
      "type": "word",
      "speaker_id": "speaker_0"
    },
    {
      "text": " ",
      "start": 13.919,
      "end": 13.939,
      "type": "spacing",
      "speaker_id": "speaker_0"
    },
    {
      "text": "projects.",
      "start": 13.919,
      "end": 14.779,
      "type": "word",
      "speaker_id": "speaker_0"
    }
  ]
}
```

The output is classified in three category types:

- `word` - A word in the language of the audio
- `spacing` - The space between words, not applicable for languages that don't use spaces like Japanese, Mandarin, Thai, Lao, Burmese and Cantonese
- `audio_event` - Non-speech sounds like laughter or applause

## Models

<CardGroup cols={1} rows={1}>
  <Card title="Scribe v1" href="/docs/models#scribe-v1">
    State-of-the-art speech recognition model
    <div className="mt-4 space-y-2">
      <div className="text-sm">Accurate transcription in 99 languages</div>
      <div className="text-sm">Precise word-level timestamps</div>
      <div className="text-sm">Speaker diarization</div>
      <div className="text-sm">Dynamic audio tagging</div>
    </div>
  </Card>
</CardGroup>


<div className="text-center">
  <div>[Explore all](/docs/models)</div>
</div>

## Concurrency and priority

Concurrency is the concept of how many requests can be processed at the same time.

For Speech to Text, files that are over 8 minutes long are transcribed in parallel internally in order to speed up processing. The audio is chunked into four segments to be transcribed concurrently.

You can calculate the concurrency limit with the following calculation:

$$
Concurrency = \min(4, \text{round\_up}(\frac{\text{audio\_duration\_secs}}{480}))
$$

For example, a 15 minute audio file will be transcribed with a concurrency of 2, while a 120 minute audio file will be transcribed with a concurrency of 4.

## Supported languages

The Scribe v1 model supports 99 languages, including:

_Afrikaans (afr), Amharic (amh), Arabic (ara), Armenian (hye), Assamese (asm), Asturian (ast), Azerbaijani (aze), Belarusian (bel), Bengali (ben), Bosnian (bos), Bulgarian (bul), Burmese (mya), Cantonese (yue), Catalan (cat), Cebuano (ceb), Chichewa (nya), Croatian (hrv), Czech (ces), Danish (dan), Dutch (nld), English (eng), Estonian (est), Filipino (fil), Finnish (fin), French (fra), Fulah (ful), Galician (glg), Ganda (lug), Georgian (kat), German (deu), Greek (ell), Gujarati (guj), Hausa (hau), Hebrew (heb), Hindi (hin), Hungarian (hun), Icelandic (isl), Igbo (ibo), Indonesian (ind), Irish (gle), Italian (ita), Japanese (jpn), Javanese (jav), Kabuverdianu (kea), Kannada (kan), Kazakh (kaz), Khmer (khm), Korean (kor), Kurdish (kur), Kyrgyz (kir), Lao (lao), Latvian (lav), Lingala (lin), Lithuanian (lit), Luo (luo), Luxembourgish (ltz), Macedonian (mkd), Malay (msa), Malayalam (mal), Maltese (mlt), Mandarin Chinese (zho), Māori (mri), Marathi (mar), Mongolian (mon), Nepali (nep), Northern Sotho (nso), Norwegian (nor), Occitan (oci), Odia (ori), Pashto (pus), Persian (fas), Polish (pol), Portuguese (por), Punjabi (pan), Romanian (ron), Russian (rus), Serbian (srp), Shona (sna), Sindhi (snd), Slovak (slk), Slovenian (slv), Somali (som), Spanish (spa), Swahili (swa), Swedish (swe), Tamil (tam), Tajik (tgk), Telugu (tel), Thai (tha), Turkish (tur), Ukrainian (ukr), Umbundu (umb), Urdu (urd), Uzbek (uzb), Vietnamese (vie), Welsh (cym), Wolof (wol), Xhosa (xho) and Zulu (zul)._


### Breakdown of language support

Word Error Rate (WER) is a key metric used to evaluate the accuracy of transcription systems. It measures how many errors are present in a transcript compared to a reference transcript. Below is a breakdown of the WER for each language that Scribe v1 supports.

<AccordionGroup>
  <Accordion title="Excellent (≤ 5% WER)">
    Bulgarian (bul), Catalan (cat), Czech (ces), Danish (dan), Dutch (nld), English (eng), Finnish
    (fin), French (fra), Galician (glg), German (deu), Greek (ell), Hindi (hin), Indonesian (ind),
    Italian (ita), Japanese (jpn), Kannada (kan), Malay (msa), Malayalam (mal), Macedonian (mkd),
    Norwegian (nor), Polish (pol), Portuguese (por), Romanian (ron), Russian (rus), Serbian (srp),
    Slovak (slk), Spanish (spa), Swedish (swe), Turkish (tur), Ukrainian (ukr) and Vietnamese (vie).
  </Accordion>
  <Accordion title="High Accuracy (>5% to ≤10% WER)">
    Bengali (ben), Belarusian (bel), Bosnian (bos), Cantonese (yue), Estonian (est), Filipino (fil),
    Gujarati (guj), Hungarian (hun), Kazakh (kaz), Latvian (lav), Lithuanian (lit), Mandarin (cmn),
    Marathi (mar), Nepali (nep), Odia (ori), Persian (fas), Slovenian (slv), Tamil (tam) and Telugu
    (tel)
  </Accordion>
  <Accordion title="Good (>10% to ≤25% WER)">
    Afrikaans (afr), Arabic (ara), Armenian (hye), Assamese (asm), Asturian (ast), Azerbaijani
    (aze), Burmese (mya), Cebuano (ceb), Croatian (hrv), Georgian (kat), Hausa (hau), Hebrew (heb),
    Icelandic (isl), Javanese (jav), Kabuverdianu (kea), Korean (kor), Kyrgyz (kir), Lingala (lin),
    Maltese (mlt), Mongolian (mon), Māori (mri), Occitan (oci), Punjabi (pan), Sindhi (snd), Swahili
    (swa), Tajik (tgk), Thai (tha), Urdu (urd), Uzbek (uzb) and Welsh (cym).
  </Accordion>
  <Accordion title="Moderate (>25% to ≤50% WER)">
    Amharic (amh), Chichewa (nya), Fulah (ful), Ganda (lug), Igbo (ibo), Irish (gle), Khmer (khm),
    Kurdish (kur), Lao (lao), Luxembourgish (ltz), Luo (luo), Northern Sotho (nso), Pashto (pus),
    Shona (sna), Somali (som), Umbundu (umb), Wolof (wol), Xhosa (xho) and Zulu (zul).
  </Accordion>
</AccordionGroup>

## FAQ

<AccordionGroup>
  <Accordion title="Can I use speech to text with video files?">
    Yes, the API supports uploading both audio and video files for transcription.
  </Accordion>
   <Accordion title="What are the file size and duration limits?">
    Files up to 1 GB in size and up to 4.5 hours in duration are supported.
  </Accordion>
  <Accordion title="Which audio and video formats are supported?">
    The audio supported audio formats include:

    - audio/aac
    - audio/x-aac
    - audio/x-aiff
    - audio/ogg
    - audio/mpeg
    - audio/mp3
    - audio/mpeg3
    - audio/x-mpeg-3
    - audio/opus
    - audio/wav
    - audio/x-wav
    - audio/webm
    - audio/flac
    - audio/x-flac
    - audio/mp4
    - audio/aiff
    - audio/x-m4a

    Supported video formats include:

    - video/mp4
    - video/x-msvideo
    - video/x-matroska
    - video/quicktime
    - video/x-ms-wmv
    - video/x-flv
    - video/webm
    - video/mpeg
    - video/3gpp

  </Accordion>
  <Accordion title="When will you support more languages?">
    ElevenLabs is constantly expanding the number of languages supported by our models. Please check back frequently for updates.
  </Accordion>
     <Accordion title="Does speech to text API support webhooks?">
    Yes, asynchronous transcription results can be sent to webhooks configured in webhook settings in the UI. Learn more in the [webhooks cookbook](/docs/cookbooks/speech-to-text/webhooks).
  </Accordion>
</AccordionGroup>
