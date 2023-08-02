from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, SubmitField
from wtforms.validators import DataRequired  #, ValidationError
# from ..models.server import Channel

# def channel_name_exists(form, field):
#     # Checking if the channel's name is already in usee
#     name = field.data
#     channel = Channel.query.filter(Channel.name == name).first()
#     if channel:
#         raise ValidationError('Channel name is is already in use.')

class CreateChannelForm(FlaskForm):
    name = StringField("Name", validators=[DataRequired()]) # channel_name_exists()
    description = TextAreaField("Description")
    submit = SubmitField("Submit")
