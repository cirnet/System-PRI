# System-PRI

Inżynierski projekt zespołowy System-PRI

## Uruchomienie

Przejdź do katalogu głównego i wykonaj polecenie:

`docker-compose up --build &`

Jeśli nie chcemy cały czas przebudowywać obrazu Dockera:

## Instalacja na przykładzie Ubuntu:

`sudo apt install python`

`sudo apt install python3-pip`

`pip install wheel==0.38.4`

`pip install -r requirements.txt`

### Postawienie Postgresa:

`sudo apt install postgresql postgresql-contrib`

`sudo apt install pgadmin3`

`sudo -u postgres psql postgres` - zalogowanie się do postgres jako użytkownik lokalny 'postgres'

`\password postgres` - ustawienie hasła dla użytkownika 'postgres' (ustawiamy: postgres)

`sudo apt install libpq-dev`

### React:

`sudo apt install nodejs`

`sudo apt install npm`

`npm install`

`npm start`

### Django:

W folderze projektu:

`python3 manage.py makemigrations`

`python3 manage.py migrate`

Możliwe, że Django zainstaluje część skryptów w folderze użytkownika:

>the script sqlformat is installed in home/username/.local/bin which is not on PATH.

w takim wypadku należy dodać ten folder do PATH, w tym celu dodajemy poniższą linijkę do naszego .bashrc:

`export PATH="$HOME/.local/bin:$PATH"`

oraz sprawdzamy czy w .profile mamy:

`if [ -d "$HOME/.local/bin" ] ; then
    PATH="$HOME/.local/bin:$PATH"
fi`

Jeśli nie, to dodajemy.