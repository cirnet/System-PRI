managefile="/usr/src/app/Serwer/manage.py"
json_path="/usr/src/app/Serwer/json_files"
python3 $managefile makemigrations defenseSchedule &&
python3 $managefile migrate &&
python3 $managefile loaddata $json_path/admin.json &&
python3 $managefile loaddata $json_path/EvaluationCriteria.json &&
python3 $managefile loaddata $json_path/groups.json &&
python3 $managefile loaddata $json_path/users.json &&
python3 $managefile runserver 0.0.0.0:8000

