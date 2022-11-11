from . import auth
from flask_httpauth import HTTPBasicAuth
from transformers import AutoModelForQuestionAnswering, AutoTokenizer, pipeline
import redis

from flask import (
    Blueprint, flash, g, redirect, render_template, request, session, url_for
)

app = Blueprint('qna',__name__)

@app.route('/run', methods=['GET','POST'])
#@auth.auth.login_required()
def bert_run():
    

    r = redis.Redis(
    host='redis-10029.c264.ap-south-1-1.ec2.cloud.redislabs.com',
    port=10029,
    password='s8gLjYzWIBVNO7qjGMAVTR1LvnXczm5n')

    
    # Run inference
    if request.method == 'POST':
        request_data = request.get_json(force=True,silent=True)
        # print(request_data.get('context'))
        # context = request_data.get('context')
        # question = request_data.get('question')
        context = request_data['context']
        question = request_data['question']
        print(request_data)
        res = r.get(question)
        
        if res is not None:
            return { "Possible Answers" : res.decode("utf-8")}
        else:
            # Initialization
            model_name = "deepset/roberta-base-squad2"
            nlp = pipeline('question-answering', model=model_name, tokenizer=model_name)

            QA_input = {
                'question': question,
                'context': context
            }

            # Put Question Generation Model                    

            #Results
            
            res = nlp(QA_input)
            
            # Do Similiarity Checking


            r.set(name=question,value=res['answer'])
            return {
                "Possible Answers" : res['answer']
            }
    return {'error':'Enter context and question using POST'}