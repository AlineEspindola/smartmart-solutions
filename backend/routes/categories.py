from services.csv_import import import_categories_from_csv
from flask import Blueprint, jsonify, request
from models import Category, db

categories_bp = Blueprint("categories", __name__)

@categories_bp.route("", methods=["GET"])
def list_categories():
    categories = Category.query.all()
    return jsonify([{"id": c.id, "name": c.name} for c in categories])

@categories_bp.route("", methods=["POST"])
def create_category():
    data = request.json
    category = Category(**data)
    db.session.add(category)
    db.session.commit()
    return jsonify({"id": category.id, "message": "Category created"}), 201
  
@categories_bp.route("/upload", methods=["POST"])
def upload_categories():
    file = request.files["file"]
    imported = import_categories_from_csv(file.read())

    return jsonify({
        "message": "Categories CSV imported",
        "total_imported": imported
    })