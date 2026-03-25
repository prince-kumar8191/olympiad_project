
from flask import Blueprint, request, jsonify
from models import db, Student, School, Coordinator, Payment

payments_bp = Blueprint("payments", __name__)

@payments_bp.route("/payment-success", methods=["POST"])
def payment_success():

    student_id = request.json.get("student_id")

    student = Student.query.get(student_id)
    school = School.query.get(student.school_id)
    coordinator = Coordinator.query.get(school.coordinator_id)

    # Save payment
    payment = Payment(student_id=student_id, amount=299, status="success")
    db.session.add(payment)

    # Business Logic
    school.credits += 50
    coordinator.credits += 50

    # Referral bonus 10
    if student.referred_by:
        referrer = Student.query.filter_by(referral_code=student.referred_by).first()
        if referrer:
            referrer.credits += 10

    db.session.commit()

    return jsonify({"message": "Payment processed & credits updated"})