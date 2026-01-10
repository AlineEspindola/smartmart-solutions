from flask import Blueprint, request, jsonify
from models import db, Sale
from services.csv_import import import_sales_from_csv
from sqlalchemy import func, extract
from datetime import datetime

sales_bp = Blueprint("sales", __name__)

@sales_bp.route("", methods=["POST"])
def create_sale():
    data = request.json
    sale = Sale(**data)
    db.session.add(sale)
    db.session.commit()
    return jsonify({"id": sale.id, "message": "Sale created"}), 201

@sales_bp.route("", methods=["GET"])
def list_sales():
    sales = Sale.query.all()
    result = [
        {
            "id": s.id,
            "product_id": s.product_id,
            "quantity": s.quantity,
            "total_price": s.total_price,
            "date": s.date.isoformat()
        } for s in sales
    ]
    return jsonify(result)

@sales_bp.route("/upload", methods=["POST"])
def upload_sales():
    file = request.files["file"]
    imported = import_sales_from_csv(file.read())
    return jsonify({"message": "Sales CSV imported", "total_imported": imported})

@sales_bp.route("/dashboard", methods=["GET"])
def sales_dashboard():
    data = db.session.query(
        extract("month", Sale.date).label("month"),
        func.sum(Sale.quantity).label("quantity"),
        func.sum(Sale.total_price).label("total_price")
    ).group_by("month").order_by("month").all()
    return jsonify([{"month": int(d.month), "quantity": d.quantity, "total_price": d.total_price} for d in data])
