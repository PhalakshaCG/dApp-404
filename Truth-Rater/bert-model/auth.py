import functools
from flask_httpauth import HTTPTokenAuth
from werkzeug.security import generate_password_hash, check_password_hash

from flask import (
    Blueprint, flash, g, redirect, render_template, request, session, url_for
)

bp = Blueprint('auth',__name__)
auth = HTTPTokenAuth(scheme='Bearer')

tokens = {
    "bert-model": "Shrujan"
}

@auth.verify_token
def verify_token(token):
    if token in tokens:
        return tokens[token]


# Sample auth using tokens, just in case for security reasons during model re-training or reloading

@bp.route('/login', methods=['GET', 'POST'])
@auth.login_required
def auth_me():
    return f'<p1> HIII </p>'