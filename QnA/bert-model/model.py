from . import auth
from flask_httpauth import HTTPBasicAuth
from transformers import AutoModelForQuestionAnswering, AutoTokenizer, pipeline, AutoModelForSeq2SeqLM
import redis
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import requests

from flask import (
    Blueprint, flash, g, redirect, render_template, request, session, url_for
)

app = Blueprint('qna',__name__)


def check_similiarity(str1,str2):
    model = SentenceTransformer('bert-base-nli-mean-tokens')
    sentences = [str1,str2]
    sentence_embeddings = model.encode(sentences)
    # print(sentence_embeddings)
    # print(sentence_embeddings.shape)

    val = cosine_similarity([sentence_embeddings[0]],sentence_embeddings[1:])
    
    return str(val[0][0])


def question_generator(context):
    tokenizer = AutoTokenizer.from_pretrained("iarfmoose/t5-base-question-generator")
    model = AutoModelForSeq2SeqLM.from_pretrained("iarfmoose/t5-base-question-generator")
    ans = context
    input = tokenizer.encode(ans, return_tensors="pt")
    output = model.generate(input)
    decoded = tokenizer.decode(output[0], skip_special_tokens=True)
    return decoded


@app.route('/run', methods=['GET','POST'])
#@auth.auth.login_required()
def bert_run():
    

    r = redis.Redis(
    host='redis-10029.c264.ap-south-1-1.ec2.cloud.redislabs.com',
    port=10029,
    password='s8gLjYzWIBVNO7qjGMAVTR1LvnXczm5n')

    
    # Run interface
    if request.method == 'POST':
        request_data = request.args
        # request_data = request.get_json(force=True,silent=True)
        # print(request_data.get('context'))
        # context = request_data.get('context')
        # question = request_data.get('question')
        query = request_data.get('claim',default='',type=str)
        
        # Generate Questions
        question = question_generator(query)
        print(question)

        # Get context/content
        context = requests.get('http://localhost:4000/getarticles/' + question)
        context = context.json()
        print(context)
        context = context[0]
        #context = "BEIJING, Nov 1 (Reuters) - China's President Xi Jinping sent a message of condolence to India's Prime Minister Narendra Modi and Indian President Droupadi Murmu over a deadly bridge collapse in Gujarat, Western India, state broadcaster CCTV reported.\"On behalf of the Chinese government and the Chinese people, I would like to express our deep condolences to the victims and extend our sincere sympathy to their families and the injured,\" Xi said, according to CCTV.The death toll from the foot bridge collapse rose to 135 on Tuesday with search operations entering a third day, although authorities said nearly all those believed to have been missing are now accounted for.Reporting by Martin Quin Pollard and the Beijing Newsroom; Editing by Andrew HeavensOur Standards: The Thomson Reuters Trust Principles."

        # context = request_data['context']
        # question = request_data['question']
        print(request_data)

        res = r.get(question)
        
        if res is not None:
            # Do Similiarity Checking
            res_query = query
            sim = check_similiarity(str(res),res_query)
            print(sim)
            if sim >= 0.75:
                return { "Verdict" : "True", "Answer" : res}
            return { "Verdict" : "False", "Answer" : res}
        else:
            # Initialization of model
            model_name = "deepset/roberta-base-squad2"
            nlp = pipeline('question-answering', model=model_name, tokenizer=model_name)

            QA_input = {
                'question': question,
                'context': context
            }
            
            #Results            
            res = nlp(QA_input)
            
            # Do Similiarity Checking
            res_query = query
            sim = check_similiarity(str(res['answer']),res_query)
            print(sim)
            if sim >= 0.75:
                return { "Verdict" : "True", "Answer" : res}
            return { "Verdict" : "False", "Answer" : res}

            #Uncomment LATER
            #r.set(name=question,value=res['answer'])
            
            #Forget this down
            # return {
            #     "Possible Answers" : res['answer']
            # }
    return {'error':'Enter claim using POST'}