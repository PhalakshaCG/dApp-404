FROM python:3.10

WORKDIR /truth-rater
ENV FLASK_APP=bert-model

RUN python3 -m venv env
RUN . ./env/bin/activate 
COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt

COPY . .

CMD [ "python3", "-m" , "flask", "run", "--host=0.0.0.0"]