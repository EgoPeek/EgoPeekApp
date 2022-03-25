# EgoPeek database credentials
DB_NAME = 'DB NAME'
USER = 'USER'
PASSWORD ='PASSWORD'
ENDPOINT = 'YOUR-ENDPOINT-HERE.COM'
PORT = 9999999
DATABASE_URL = f'DATABASE_URL://{USER}:{PASSWORD}@{ENDPOINT}:{PORT}/{DB_NAME}'

# secret string for generating oauth2 bearer token, use 'openssl rand -hex 32' to generate
TOKEN_SECRET = 'insert your secret string here'