#!/bin/bash

# Set UTF-8 encoding
export LC_ALL=C.UTF-8
export LANG=C.UTF-8

# Change directory to the location of this script
cd "$(dirname "$0")"

# Set environment variables
export MECAB_KO_DIC_PATH=./mecab/mecab-ko-dic
export TTS_MODEL_FILE=home/ubuntu/S10P12C210/src/main/resources/tts-server/models/glowtts-v2/best_model.pth.tar
export TTS_MODEL_CONFIG=home/ubuntu/S10P12C210/src/main/resources/tts-server/models/glowtts-v2/config.json
export VOCODER_MODEL_FILE=home/ubuntu/S10P12C210/src/main/resources/tts-server/models/hifigan-v2-v2/checkpoint_325000.pth.tar
export VOCODER_MODEL_CONFIG=home/ubuntu/S10P12C210/src/main/resources/tts-server/models/hifigan-v2/config.json

# Run the server
./server.exe

# Wait for 40 seconds
sleep 40