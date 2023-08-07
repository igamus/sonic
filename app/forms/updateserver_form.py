from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, BooleanField
from wtforms.validators import DataRequired,  ValidationError
from ..models.server import Server
from flask_wtf.file import  FileField, FileAllowed
from ..api.AWS_helpers import ALLOWED_EXTENSIONS

class UpdateServerForm(FlaskForm):
    name = StringField("Name", validators=[DataRequired()])
    public = BooleanField("Public")
    server_image = StringField("Server Image")
    banner_image = StringField("Banner Image")
    description = StringField("Description")
    submit = SubmitField("Submit")
