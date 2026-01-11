from flask import Blueprint, request, jsonify
from models import db, Product
from services.csv_import import import_products_from_csv

products_bp = Blueprint("products", __name__)

@products_bp.route("", methods=["POST"])
def create_product():
    data = request.json
    product = Product(**data)
    db.session.add(product)
    db.session.commit()
    return jsonify({"id": product.id, "message": "Product created"}), 201

@products_bp.route("", methods=["GET"])
def list_products():
    products = Product.query.all()
    result = [
        {
            "id": p.id,
            "name": p.name,
            "description": p.description,
            "price": p.price,
            "brand": p.brand,
            "category_id": p.category_id
        } for p in products
    ]
    return jsonify(result)

@products_bp.route("/upload", methods=["POST"])
def upload_products():
    file = request.files["file"]
    imported = import_products_from_csv(file.read())
    return jsonify({"message": "Products CSV imported", "total_imported": imported})
