FROM python:3.6

LABEL Name=ner-processor Version=0.0.1

RUN adduser dog --gecos "Dog,Room,WPhone,HPhone" --disabled-password

WORKDIR /home/dog

# Install virtualenv module
RUN python3 -m pip install virtualenv

# Create virtual env with python 3.6
ENV VIRTUAL_ENV=/opt/venv
RUN python3 -m virtualenv $VIRTUAL_ENV
ENV PATH="$VIRTUAL_ENV/bin:$PATH"

# Install dependencies
COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

# Copy py-files
COPY app.py entities_converter.py ./

# Specify app to run (if we run `python app.py` it'll start in development mode)
ENV FLASK_APP app.py

RUN chown -R dog:dog ./
USER dog

CMD gunicorn -b 0.0.0.0:$PORT --access-logfile - --error-logfile - app:app