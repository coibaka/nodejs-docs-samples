// Copyright 2022 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

function main(
  projectId,
  recognizerName,
  audioFilePath = 'resources/brooklyn.flac'
) {
  // [START speech_transcribe_file_v2]

  // Import the Cloud Speech-to-Text library
  const speech = require('@google-cloud/speech').v2;
  const fs = require('fs');

  async function transcribeFile() {
    // Instantiate the client
    const client = new speech.SpeechClient();

    const content = fs.readFileSync(audioFilePath).toString('base64');
    const transcriptionRequest = {
      recognizer: recognizerName,
      config: {
        // Automatically detects audio encoding
        autoDecodingConfig: {},
      },
      content: content,
    };

    const response = await client.recognize(transcriptionRequest);
    for (const result of response[0].results) {
      console.log(`Transcript: ${result.alternatives[0].transcript}`);
    }
  }

  transcribeFile();
  // [END speech_transcribe_file_v2]
}

process.on('unhandledRejection', err => {
  console.error(err.message);
  process.exitCode = 1;
});
main(...process.argv.slice(2));
