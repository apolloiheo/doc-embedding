from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel

app = FastAPI()

# origins = [
#     "http://localhost:3000"
#     "127.0.0.1"
# ]

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Data(BaseModel):
    document: str
    query: str

from embedding import default

@app.post("/highlight")
async def highlight(request: Data):
    data = request
    print(data)
    document = data.document
    query = data.query
    return JSONResponse({'result': default(document, query)})

