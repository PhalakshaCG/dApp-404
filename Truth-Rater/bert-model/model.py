from . import auth
from flask_httpauth import HTTPBasicAuth
from transformers import AutoModelForQuestionAnswering, AutoTokenizer, pipeline, AutoModelForSeq2SeqLM, AutoModelWithLMHead
import redis
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import requests

import warnings
warnings.filterwarnings("ignore")

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
    # tokenizer = AutoTokenizer.from_pretrained("iarfmoose/t5-base-question-generator")
    # model = AutoModelForSeq2SeqLM.from_pretrained("iarfmoose/t5-base-question-generator")
    # ans = context
    # input = tokenizer.encode(ans, return_tensors="pt")
    # output = model.generate(input)
    # decoded = tokenizer.decode(output[0], skip_special_tokens=True)
    # return decoded
    tokenizer = AutoTokenizer.from_pretrained("mrm8488/t5-base-finetuned-question-generation-ap")
    model = AutoModelWithLMHead.from_pretrained("mrm8488/t5-base-finetuned-question-generation-ap")
    qs = []
    for i in range(3):
        input_text = "answer: %s  context: %s </s>" % ("" if i == 0 else context, context if i != 2 else "")
        features = tokenizer([input_text], return_tensors='pt')

        output = model.generate(input_ids=features['input_ids'], 
                attention_mask=features['attention_mask'],
                max_length=64)

        qs.append(tokenizer.decode(output[0]))
    return qs


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
        query = request_data.get('claim',default='',type=str)
        
        # Generate Questions
        questions = question_generator(query)
        question = ""
        m_q_similar = 0.0
        for qs in questions:
            qs = qs.split("<pad> question: ")[1]
            qs = qs.split("</s>")[0]
            print("Query Question : ",qs)
            q_similar = float(check_similiarity(qs,query))
            if q_similar >= m_q_similar:
                m_q_similar = q_similar
                question = qs
        print("\nProper Query Question : ",question)

        # context = request_data['context']
        # question = request_data['question']
        #Still to DO !!!!
        print("Claim : ",query)

        res = r.get(question)
        
        if res is not None:
            # Do Similiarity Checking
            res_query = query
            sim = check_similiarity(str(res),res_query)
            print("Similiarity = ",sim)
            if float(sim) >= 0.75:
                return { "Verdict" : "True", "Answer" : res.decode("utf-8")}
            return { "Verdict" : "False", "Answer" : res.decode("utf-8")}
        else:
            # Get context/content
            try:
                context = requests.get('http://localhost:4000/getarticles/' + question)
                context = context.json()
                print("Context : ", context)
                context = context[0]        #For now
            except Exception:
                return {"Verdict" : "False"}

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
            print("Similiarity = ",sim)
            if float(sim) >= 0.75:
                r.set(name=question,value=res['answer'])
                return { "Verdict" : "True", "Answer" : res}
            return { "Verdict" : "False", "Answer" : res}

            #Uncomment LATER
            #r.set(name=question,value=res['answer'])
            
            #Forget this down
            # return {
            #     "Possible Answers" : res['answer']
            # }
    return {'error':'Enter claim using POST'}