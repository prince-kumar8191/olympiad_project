from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import uuid

db = SQLAlchemy()

class School(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    school_name = db.Column(db.String(100))
    credits = db.Column(db.Integer, default=0)
    coordinator_id = db.Column(db.Integer, db.ForeignKey('coordinator.id'))

class Coordinator(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    credits = db.Column(db.Integer, default=0)

class Student(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    email = db.Column(db.String(100), unique=True)
    password = db.Column(db.String(200))
    school_id = db.Column(db.Integer, db.ForeignKey('school.id'))
    referral_code = db.Column(db.String(20), unique=True, default=lambda: str(uuid.uuid4())[:8])
    referred_by = db.Column(db.String(20), nullable=True)
    credits = db.Column(db.Integer, default=0)
    referral_count = db.Column(db.Integer, default=0)

class Payment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey('student.id'))
    amount = db.Column(db.Integer)
    status = db.Column(db.String(20))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)