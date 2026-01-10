from flask import Blueprint, jsonify
from models import Category

categories_bp = Blueprint("categories", __name__)

@categories_bp.route("", methods=["GET"])
def list_categories():
    categories = Category.query.all()
    return jsonify([{"id": c.id, "name": c.name} for c in categories])
