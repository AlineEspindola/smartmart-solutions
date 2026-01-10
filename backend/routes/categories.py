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