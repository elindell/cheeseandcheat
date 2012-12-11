from webapp2_extras.routes import RedirectRoute
import handlers.index
import handlers.about_us
import handlers.directions
import handlers.photos
import handlers.registry

_routes = [('/', handlers.index.IndexHandler),
           ('/about/', handlers.about_us.AboutUsHandler),
           ('/directions/', handlers.directions.DirectionsHandler),
           ('/photos/', handlers.photos.PhotosHandler),
           ('/registry/', handlers.registry.RegistryHandler)
           ]

def get_routes():
    return _routes

def add_routes(app):
    for r in _routes:
        app.router.add(r)