from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, BooleanField
from wtforms.validators import DataRequired,  ValidationError
from ..models.server import Server
from flask_wtf.file import  FileField, FileAllowed
from ..api.AWS_helpers import ALLOWED_EXTENSIONS

def server_name_exists(form, field):
    # Checking if Servername is already in usee
    name = field.data
    server = Server.query.filter(Server.name == name).first()
    if server:
        raise ValidationError('Servername is already in use.')

class CreateServerForm(FlaskForm):
    name = StringField("Name", validators=[DataRequired(), server_name_exists])
    public = BooleanField("Public")
    server_image = StringField("Server Image")
    banner_image = StringField("Banner Image")
    description = StringField("Description")
    submit = SubmitField("Submit")
