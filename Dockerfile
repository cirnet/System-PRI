FROM alpine
RUN apk update && apk add bash
WORKDIR /usr/src/app
COPY requirements.txt .
RUN apk add python3 && apk add py-pip
RUN pip install -r requirements.txt
COPY . .
WORKDIR /usr/lib/python3.10/site-packages/rest_framework_swagger/templates/rest_framework_swagger/
RUN sed -i "2 s/staticfiles/static/" index.html
WORKDIR /usr/src/app/Serwer/Serwer
RUN sed -i "91 s/localhost/postgres/" settings.py
WORKDIR /usr/src/app
ENTRYPOINT ["/bin/bash", "init.sh"]