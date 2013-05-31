from webapp2_extras.routes import RedirectRoute
import handlers.index
import handlers.information
import handlers.photos

_routes = [('/', handlers.index.IndexHandler),
           ('/information/', handlers.information.InformationHandler),
           ('/photos/', handlers.photos.PhotosHandler)
           ]

def get_routes():
    return _routes

def add_routes(app):
    for r in _routes:
        app.router.add(r)