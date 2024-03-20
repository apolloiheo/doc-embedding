
import re

from sklearn.metrics.pairwise import cosine_similarity
from sentence_transformers import SentenceTransformer
import numpy as np

DEFAULT_THRESHOLD = 0.5

def default(document: str, query: str) -> list[int]:
    '''Only checks paragraphs'''
    if not document or not query: return []

    words = re.split(r'(\s+)', document)
    sentences = []
    prefixSums = [0]
    
    cur_word = ''
    for w in words:
        if '\n' in w:
            if cur_word:
                sentences.append(cur_word)
                prefixSums.append(prefixSums[-1] + len(re.split(r'(\s+)', cur_word)))
            prefixSums[-1] += 1
        else:
            cur_word += w
    if cur_word: sentences.append(cur_word)

    # Load a pre-trained sentence transformer model
    model = SentenceTransformer('all-MiniLM-L6-v2')

    sentence_embeddings = model.encode(sentences)
    query_embedding = model.encode([query])

    similarities = cosine_similarity(query_embedding, sentence_embeddings)

    results = []
    for p, sentence, sim in zip(prefixSums, sentences, similarities[0]):
        if sim > DEFAULT_THRESHOLD:
            for i in range(len(re.split(r'(\s+)', cur_word))):
                results.append(p+i)
    return results

if __name__ == '__main__':
    document = """
I like cars.
I like planes.

I like eating dinos.
"""
    query = "cars"
    import pdb; pdb.set_trace()
    x = default(document, query)