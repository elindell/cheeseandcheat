import webapp2
import jinja2
import config

jinja_environment = jinja2.Environment(loader=jinja2.FileSystemLoader(config.TEMPLATE_DIR))

class PhotosHandler(webapp2.RequestHandler):
    def get(self):
        template = jinja_environment.get_template('photos.html')
        self.response.out.write(template.render())