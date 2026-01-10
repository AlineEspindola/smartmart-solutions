from .products import products_bp
from .categories import categories_bp
from .sales import sales_bp

def register_routes(app):
    app.register_blueprint(products_bp, url_prefix="/products")
    app.register_blueprint(categories_bp, url_prefix="/categories")
    app.register_blueprint(sales_bp, url_prefix="/sales")
