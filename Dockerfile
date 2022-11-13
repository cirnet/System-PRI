FROM alpine
RUN apk update && apk add bash
WORKDIR /usr/src/app
COPY requirements.txt .
RUN apk add python3 && apk add py-pip
RUN pip install -r requirements.txt
COPY . .
WORKDIR /usr/lib/python3.10/site-packages/rest_framework_swagger/templates/rest_framework_swagger/
RUN sed -i "2 s/staticfiles/static/" index.html
WORKDIR /usr/src/app/Serwer
CMD ["python3", "manage.py", "runserver", "0.0.0.0:8000"]
