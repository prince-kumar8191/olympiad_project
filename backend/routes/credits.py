from flask import Blueprint, request, jsonify
from models import db, Student

credits_bp = Blueprint("credits", __name__)

@credits_bp.route("/apply-referral", methods=["POST"])
def apply_referral():
    referral_code = request.json.get("referral_code")
    student_id = request.json.get("student_id")

    student = Student.query.get(student_id)
    referrer = Student.query.filter_by(referral_code=referral_code).first()

    if not referrer:
        return jsonify({"error": "Invalid referral code"}), 400

    # +5 points for normal referral
    referrer.credits += 5
    referrer.referral_count += 1

    student.referred_by = referral_code

    db.session.commit()

    return jsonify({"message": "Referral applied successfully"})