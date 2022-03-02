from passlib.context import CryptContext


password_context = CryptContext(schemes=['bcrypt'], deprecated='auto')

class Hash():
    def encrypt(password: str):
        return password_context.hash(password)

    def verify(hashed_password, raw_password):
        return password_context.verify(raw_password, hashed_password)