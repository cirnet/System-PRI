FROM alpine
RUN apk update && apk add bash
WORKDIR /usr/src/app
COPY requirements.txt .
RUN apk add python3 && apk add py-pip
RUN pip install -r requirements.txt
COPY . .
WORKDIR /usr/src/app/Serwer
CMD ["python3", "manage.py", "runserver", "0.0.0.0:8000"]

