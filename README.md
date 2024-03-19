# doc-embedding
Generative AI at Berkeley | NMEP | Document Embedding

## Setup
1. Backend
`cd api`
`python3 -m venv env`
`source env/bin/activate`
`pip install -r requirements.txt`
`uvicorn main:app --port 8000`

2. Frontend
`cd web`
`npm i`
`npm run dev`

## App
Go to `localhost:3000` on your browser

## Project Spec
In `api/embedding.py`, 
