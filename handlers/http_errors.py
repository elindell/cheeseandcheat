import webapp2

def handle_404(request, response, exception):
    response.write('404d!')
    response.set_status(404)

def handle_500(request, response, exception):
    response.write('500d..ed..!')
    response.set_status(500)

def add_handlers(app):
    app.error_handlers[404] = handle_404
    app.error_handlers[500] = handle_500