# Запуск
## Вход в  venv:
Надо зайти в корневую папку проекта и прописать эту команду
```cmd
.\venv\Scripts\activate
```
## Запуск:
```cmd
python manage.py runserver
```

## Ошибки:
- Не удалось подключиться к базе данных ( Требуется использовать бекап **module_b.sql** ):
```cmd
django.db.utils.OperationalError: (2002, "Can't connect to server on '127.0.1.16' (10061)")
```
- Не активирован venv:
```cmd
ImportError: Couldn't import Django. Are you sure it's installed and available on your PYTHONPATH environment variable? Did you forget to activate a virtual environment?
```
