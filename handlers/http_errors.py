import webapp2
import jinja2
import config

jinja_environment = jinja2.Environment(loader=jinja2.FileSystemLoader(config.TEMPLATE_DIR))

def handle_404(request, response, exception):
    template = jinja_environment.get_template('404.html')
    response.out.write(template.render())
    response.set_status(404)

def handle_500(request, response, exception):
    template = jinja_environment.get_template('500.html')
    response.out.write(template.render())
    response.set_status(500)

def add_handlers(app):
    app.error_handlers[404] = handle_404
    app.error_handlers[500] = handle_500