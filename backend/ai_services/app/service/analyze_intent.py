import json 
from pathlib import Path
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity

model = SentenceTransformer('all-MiniLM-L6-v2')

def get_intent_score(input_emb, intent_emb):
    similarties = cosine_similarity(input_emb, intent_emb)
    return similarties.mean()

def analyze_Intent(input: str)-> str:
    # Opening the json file of intents
    try: 
        intents_path = Path(__file__).resolve().parents[1] / "intents.json"
        with open(intents_path, 'r') as file:
            intents = json.load(file)
            add_task = intents['add_task']
            delete_task = intents['delete_task']
            list_task = intents['list_tasks']
            write_blog = intents['write_blog']
            upload_photo = intents['upload_photo']
            delete_photo = intents['delete_photo']

    except FileNotFoundError:
        print("File doesnt exixts")
    except json.JSONDecodeError:
         print("Not a json file")


# Generating the embedding for all the intents
    

    add_task_embeddings = model.encode(add_task)
    delete_task_embeddings = model.encode(delete_task)
    list_task_embeddings = model.encode(list_task)
    write_blog_embeddings = model.encode(write_blog)
    upload_photo_embeddings = model.encode(upload_photo)
    delete_photo_embeddings = model.encode(delete_photo)

# Generating the input text embedding
    input_embeddings = model.encode([input])

# Generating the score dictionary to find the closest intent
    scores = {
        "add_task": get_intent_score(input_embeddings, add_task_embeddings),
        "delete_task": get_intent_score(input_embeddings, delete_task_embeddings),
        "list_tasks": get_intent_score(input_embeddings, list_task_embeddings),
        "write_blog": get_intent_score(input_embeddings, write_blog_embeddings),
        "upload_photo": get_intent_score(input_embeddings, upload_photo_embeddings),
        "delete_photo": get_intent_score(input_embeddings, delete_photo_embeddings),
    }

    closest_intent = max(scores,key= scores.get)

    print(closest_intent)
    return closest_intent

# input ="yo photo hata"
# analyze_intent(input)