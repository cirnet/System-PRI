# System-PRI

Inżynierski projekt zespołowy System-PRI

## Uruchomienie z Dockerem

Przejdź do katalogu głównego i wykonaj polecenie:

`docker-compose up --build &`

## Uruchomienie bez Dockera

`sudo apt install python`

`sudo apt install python3-pip`

Przejdź do folderu z projektem i stwórz środowisko wirtualne:

`python3 -m venv venv`

Aktywuj środowisko wirtualne:

`source venv/bin/activate`

(deaktywujemy je poprzez **deactivate**)

Następnie zainstaluj niezbędne moduły:

`pip install wheel==0.38.4`

`pip install -r requirements.txt`

### Postawienie Postgresa

`sudo apt install postgresql postgresql-contrib`

`sudo apt install pgadmin3`

`sudo -u postgres psql postgres` - zalogowanie się do postgres jako użytkownik lokalny 'postgres'

`\password postgres` - ustawienie hasła dla użytkownika 'postgres' (ustawiamy: postgres)

`sudo apt install libpq-dev`

Za pomocą pgadmina połącz się z postgresem i stwórz bazę o nazwie **test_db**

### React

`sudo apt install nodejs`

`sudo apt install npm`

`npm install`

`npm start`

### Django

W folderze projektu:

`python3 manage.py makemigrations defenseSchedule`

`python3 manage.py migrate`

Zmienamy jedną linijkę w swaggerze, bez tego nie zadziała:

`RUN sed -i "2 s/staticfiles/static/" venv/lib/python3.10/site-packages/rest_framework_swagger/templates/rest_framework_swagger/index.html`

Możliwe, że Django zainstaluje część skryptów w folderze użytkownika:

>the script sqlformat is installed in home/username/.local/bin which is not on PATH.

w takim wypadku należy dodać ten folder do PATH, w tym celu dodajemy poniższą linijkę do naszego .bashrc:

`export PATH="$HOME/.local/bin:$PATH"`

oraz sprawdzamy czy w .profile mamy:

`if [ -d "$HOME/.local/bin" ] ; then
    PATH="$HOME/.local/bin:$PATH"
fi`

Jeśli nie, to dodajemy.