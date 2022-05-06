import psycopg2
import psycopg2.extras

hostname = 'localhost'
database = 'postgres'
username = 'postgres'
pwd = 'postgres'
port_id = '5433'
conn = None
cur = None

try:
    with psycopg2.connect(
                host = hostname,
                dbname = database,
                user = username,
                password = pwd,
                port = port_id) as conn:

        with conn.cursor(cursor_factory=psycopg2.extras.DictCursor) as cur:

            cur.execute('DROP TABLE IF EXISTS employee')

            create_script = ''' CREATE TABLE IF NOT EXISTS users (
                                    id int PRIMARY KEY,
                                    name varchar(40) NOT NULL,
                                    surname varchar(40) NOT NULL,
                                    index varchar(6) NOT NULL,
                                    role varchar(10))'''
            cur.execute(create_script)

            insert_script  = 'INSERT INTO users (id, name, surname, index, role) VALUES (%s, %s, %s, %s, %s)'
            insert_values = [(1, 'Piotr', 'Walczak', '440555', 1), (2, 'Arkadiusz', 'Nowakowski', 123456, 1), (3, 'Małgorzata', 'Bąk', 123452, 1)]
            for record in insert_values:
                cur.execute(insert_script, record)




            cur.execute('SELECT * FROM users')
            for record in cur.fetchall():
                print(record['name'], record['surname'])
except Exception as error:
    print(error)
finally:
    if conn is not None:
        conn.close()