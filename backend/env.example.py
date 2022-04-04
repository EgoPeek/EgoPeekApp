# EgoPeek database credentials
DB_NAME = 'DB NAME'
USER = 'USER'
PASSWORD ='PASSWORD'
ENDPOINT = 'YOUR-ENDPOINT-HERE.COM'
PORT = 9999999
DATABASE_URL = f'DATABASE_URL://{USER}:{PASSWORD}@{ENDPOINT}:{PORT}/{DB_NAME}'

# secret string for generating oauth2 bearer token, use 'openssl rand -hex 32' to generate
TOKEN_SECRET = 'insert your secret string here'

# EgoPeek gmail credentials
MAIL_USERNAME = 'EMAIL USERNAME'
MAIL_PASSWORD = 'EMAIL PASSWORD'
MAIL_FROM = 'YOUR EMAIL HERE'
MAIL_PORT = 999
MAIL_SERVER = 'MAIL SERVER'
MAIL_FROM_NAME= 'MAIL FROM'