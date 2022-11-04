from . import auth
from flask_httpauth import HTTPBasicAuth
from transformers import AutoModelForQuestionAnswering, AutoTokenizer, pipeline

from flask import (
    Blueprint, flash, g, redirect, render_template, request, session, url_for
)

app = Blueprint('qna',__name__,url_prefix='/qna')

@app.route('/run', methods=['GET','POST'])
#@auth.auth.login_required()
def bert_run():
    
    # Initialization
    model_name = "deepset/roberta-base-squad2"
    nlp = pipeline('question-answering', model=model_name, tokenizer=model_name)

    #answerer = text.BertQuestionAnswerer.create_from_file("lite-model_mobilebert_1_metadata_1.tflite")

    # Run inference
    if request.method == 'POST':
        request_data = request.args
        # print(request_data.get('context'))
        context = request_data.get('context')
        question = request_data.get('question')

        QA_input = {
            'question': question,
            'context': context
        }

        # bert_qa_result = answerer.answer(context, question)

        #Results
        
        res = nlp(QA_input)
        # model = AutoModelForQuestionAnswering.from_pretrained(model_name)
        # tokenizer = AutoTokenizer.from_pretrained(model_name)


        # for i in bert_qa_result.answers:
        #     print(i.text)

        return {
            "Possible Answers" : res
        }
    flash('Enter context and question using POST','error')
    return None