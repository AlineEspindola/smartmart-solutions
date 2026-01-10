import csv
import io
from models import Product, Sale, db
from datetime import datetime

def import_products_from_csv(file_bytes):
    content = file_bytes.decode("utf-8")
    reader = csv.DictReader(io.StringIO(content))
    count = 0
    for row in reader:
        product = Product(
            name=row["name"],
            description=row.get("description"),
            price=float(row["price"]),
            brand=row.get("brand"),
            category_id=int(row["category_id"])
        )
        db.session.add(product)
        count += 1
    db.session.commit()
    return count

def import_sales_from_csv(file_bytes):
    content = file_bytes.decode("utf-8")
    reader = csv.DictReader(io.StringIO(content))
    count = 0
    for row in reader:
        sale = Sale(
            product_id=int(row["product_id"]),
            quantity=int(row["quantity"]),
            total_price=float(row["total_price"]),
            date=datetime.strptime(row["date"], "%Y-%m-%d").date()
        )
        db.session.add(sale)
        count += 1
    db.session.commit()
    return count
