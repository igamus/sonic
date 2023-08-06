import boto3
import botocore
import os
import uuid

def __getattr__client(self, item):
	if item not in vars(self):
		raise AttributeError

	event_name = "getattr.%s.%s" % (self._service_model.service_id.hyphenize(), item)
	handler, event_response = self.meta.events.emit_until_response(
		event_name, client=self
	)

	if event_response is not None:
		return event_response

	raise AttributeError(
		"'%s' object has no attribute '%s'" % (self.__class__.__name__, item)
	)

botocore.client.BaseClient.__getattr__ = __getattr__client

def __getattr__errorfactory(self, name):
	if name not in vars(self):
		raise AttributeError

	exception_cls_names = [
		exception_cls.__name__ for exception_cls in self._code_to_exception.values()
	]
	raise AttributeError(
		"%r object has no attribute %r. Valid exceptions are: %s"
		% (self, name, ", ".join(exception_cls_names))
	)

botocore.errorfactory.BaseClientExceptions.__getattr__ = __getattr__errorfactory

BUCKET_NAME = os.environ.get("S3_BUCKET")
S3_LOCATION = f"http://{BUCKET_NAME}.s3.amazonaws.com/"
ALLOWED_EXTENSIONS = {"pdf", "png", "jpg", "jpeg", "gif"}

s3 = boto3.client(
   "s3",
   aws_access_key_id=os.environ.get("S3_KEY"),
   aws_secret_access_key=os.environ.get("S3_SECRET")
)


def get_unique_filename(filename):
    ext = filename.rsplit(".", 1)[1].lower()
    unique_filename = uuid.uuid4().hex
    return f"{unique_filename}.{ext}"

def upload_file_to_s3(file, acl="public-read"):
    try:
        print ('------------------------------ upload_file_to_s3 --------')
        print ('bucket ',BUCKET_NAME)
        print ('acl', acl)
        print ('file', file)
        print ('content type ', file.content_type)
        print (os.environ.get("S3_KEY"))
        print (os.environ.get("S3_SECRET"))
        print ('s3.upload_fileobj function', s3.upload_fileobj)
        s3.upload_fileobj(
            file,
            BUCKET_NAME,
            file.filename,
            ExtraArgs={
                "ACL": acl,
                "ContentType": file.content_type
            }
        )
    except Exception as e:
        # in case your s3 upload fails
        print ('hi from the exception handler')
        return {"errors": str(e)}

    return {"url": f"{S3_LOCATION}{file.filename}"}

def remove_file_from_s3(image_url):
    # AWS needs the image file name, not the URL,
    # so you split that out of the URL
    key = image_url.rsplit("/", 1)[1]
    try:
        s3.delete_object(
        Bucket=BUCKET_NAME,
        Key=key
        )
    except Exception as e:
        return { "errors": str(e) }
    return True
