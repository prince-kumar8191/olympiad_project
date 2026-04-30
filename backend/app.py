
import string

from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
import bcrypt
import gridfs
import random
from datetime import datetime, timedelta
from bson import ObjectId
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
import base64
import razorpay
from flask import Flask, send_file 
import pandas as pd
import hmac
import hashlib
from datetime import datetime
from flask import Response
import string
from werkzeug.security import generate_password_hash
from werkzeug.security import check_password_hash






app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

SCREENSHOT_FOLDER = "screenshots"
os.makedirs(SCREENSHOT_FOLDER, exist_ok=True)

# ================= DATABASE =================
client = MongoClient("mongodb://localhost:27017/")
#client =  MongoClient("mongodb+srv://arpits2618_db_user:Pqe5Pody5fuTnLhN@bhayat.d8qthl6.mongodb.net/olympiad_db")
db = client["olympiad_db"]

users = db["users"]
registrations = db["registrations"]
students = db["students"]
admins = db["admins"]
admin_otps = db["admin_otps"]
schools = db["schools"]
questions_collection = db["questions"]
students_collection = db["students"]
results_collection = db["examResults"]
exam_submissions = db["results"]
mock_collection = db["MOck"]
exam_collection = db["exams"]
memberships = db["memberships"]




# GridFS for resume storage
fs = gridfs.GridFS(db)
import smtplib
from email.mime.text import MIMEText

def send_email(to_email, otp):
    sender_email = "pranavs2621@gmail.com"
    sender_password = "dyta cchu yfuq utln"

    subject = "Your OTP Code"
    body = f"Your OTP is {otp}"

    msg = MIMEText(body)
    msg["Subject"] = subject
    msg["From"] = sender_email
    msg["To"] = to_email

    try:
        server = smtplib.SMTP("smtp.gmail.com", 587)
        server.starttls()
        server.login(sender_email, sender_password)
        server.sendmail(sender_email, to_email, msg.as_string())
        server.quit()
        print("✅ Email sent successfully")
    except Exception as e:
        print("❌ Error:", e)
# ---------------- SEND EMAIL FUNCTION ----------------
def send_payment_email(to_email, name, student_id, student_class, subject, school, status):

    sender_email = "pranavs2621@gmail.com"
    sender_password = "dyta cchu yfuq utln"

    msg = MIMEMultipart()
    msg['From'] = sender_email
    msg['To'] = to_email
    msg['Subject'] = "BHAYAT Olympiad Payment Update"

    body = f"""
    <html>
    <body style="margin:0;padding:0;background:#f4f6f9;font-family:Arial;">

    <table width="100%" cellpadding="0" cellspacing="0">
    <tr><td align="center">

    <table width="600" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.1);">

    <!-- 🔵 HEADER -->
    <tr>
    <td style="background:linear-gradient(135deg,#1e3c72,#2a5298);color:white;padding:25px;text-align:center;">
        
        <img src="https://i.postimg.cc/N0xBK9FV/logo.png" width="90" style="margin-bottom:10px;" />

        <h2 style="margin:0;">BHAYAT Olympiad 2026</h2>
        <p style="margin:5px 0;font-size:16px;">
        {"Payment Successful 🎉" if status=="success" else "Payment Failed ❌"}
        </p>

    </td>
    </tr>

    <!-- 🟢 BODY -->
    <tr><td style="padding:30px;">

    <p style="font-size:16px;">Hello <b>{name}</b>,</p>

    <p style="font-size:15px;line-height:1.6;">
    {"Your payment has been successfully completed. You are now officially registered for the Olympiad."
    if status=="success"
    else "Unfortunately, your payment was not successful. Please try again to complete your registration."}
    </p>

    <h3 style="margin-top:20px;">Registration Details</h3>

    <table style="margin-top:10px;font-size:14px;">
    <tr><td><b>Name:</b></td><td>{name}</td></tr>
    <tr><td><b>Student ID:</b></td><td>{student_id}</td></tr>
    <tr><td><b>Email:</b></td><td>{to_email}</td></tr>
    <tr><td><b>Subject:</b></td><td>{subject}</td></tr>
    </table>

    <div style="text-align:center;margin-top:30px;">
    <a href="http://localhost:3000/benefits/{student_id}"
    style="background:#28a745;color:white;padding:12px 30px;text-decoration:none;border-radius:6px;font-weight:bold;display:inline-block;">
    {"Go to Dashboard" if status=="success" else "Complete Payment"}
    </a>
    </div>

    </td></tr>

    <!-- ⚫ FOOTER -->
    <tr>
    <td style="background:#f1f1f1;padding:20px;text-align:center;font-size:14px;color:#555;">

    <p style="margin:0;">Best Regards,</p>
    <p style="margin:5px 0;font-weight:bold;">BHAYAT Team</p>

    <p style="margin:10px 0 0 0;font-size:12px;color:#888;">
    This is an automated email. Please do not reply.
    </p>

    </td>
    </tr>

    </table>

    </td></tr>
    </table>

    </body>
    </html>
    """

    msg.attach(MIMEText(body, 'html'))

    try:
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login(sender_email, sender_password)
        server.send_message(msg)
        server.quit()
        print("✅ Payment email sent successfully")
    except Exception as e:
        print("❌ Email error:", e)
# ---------------- STUDENT SIGNUP ----------------#

@app.route("/signup", methods=["POST"])
def student_signup():
    data = request.json
    email = data.get("email")
    student_id = data.get("StudentId")  # frontend se ID aayegi

    # Check if email already exists
    existing_student = students.find_one({"email": email})
    if existing_student:
        return jsonify({
            "success": False,
            "message": "Email already registered"
        }), 400

    # Assign frontend StudentId
    data["StudentId"] = student_id
    data["totalReferrals"] = 0
    data["creditPoints"] = 0
    data["referredCode"]= student_id

    # Insert into DB
    students.insert_one(data)

    # Return saved student
    return jsonify({
        "success": True,
        "message": "Student Registered Successfully",
        "student": student_id,
    }), 201


# ---------------- STUDENT LOGIN ----------------


@app.route("/student-login", methods=["POST"])
def student_login():
    try:
        data = request.json

        email = str(data.get("email", "")).strip().lower()
        password = str(data.get("password", "")).strip()

        print("Login Email:", email)
        print("Login Password:", password)

        if not email or not password:
            return jsonify({
                "success": False,
                "message": "Email and Password required"
            }), 400

        # 🔥 dono collections ka data lao
        student = None

        for collection_name in ["students", "school_registation"]:
            collection = db[collection_name]

            # 🔥 email match ignore case + space
            user = collection.find_one({
                "email": {"$regex": f"^{email}$", "$options": "i"}
            })

            print(f"Checking in {collection_name} =>", user)

            if user:
                student = user
                break

        # 🔥 password check safely
        if student and str(student.get("password", "")).strip() == password:
            return jsonify({
                "success": True,
                "message": "Login Successful",
                "student": {
                    "name": student.get("name", "") or student.get("student_name", ""),
                    "email": str(student.get("email", "")).strip(),
                    "phone": student.get("phone", "") or student.get("student_phone", ""),
                    "StudentId": student.get("StudentId", ""),
                    "dob": student.get("dob", ""),
                    "school": student.get("school", "") or student.get("school_name", ""),
                    "school_name": student.get("school_name", ""),
                    "class": student.get("student_class", "") or student.get("class", ""),
                    "student_class": student.get("student_class", "") or student.get("class", ""),
                    "section": student.get("section", ""),
                    "photo": student.get("photo", ""),
                    "address": student.get("address", ""),
                    "city": student.get("city", ""),
                    "state": student.get("state", ""),
                    "pincode": student.get("pincode", ""),
                    "father_name": student.get("father_name", ""),
                    "mother_name": student.get("mother_name", ""),
                    "school_code": student.get("school_code", ""),
                    "school_address": student.get("school_address", ""),
                    "blood_group": student.get("blood_group", ""),
                    "skills": student.get("skills", []),
                    "roll_no": student.get("roll_no", ""),
                    "subject": student.get("subject", ""),
                    "parent_phone": student.get("parent_phone", ""),
                    "referredCode": student.get("StudentId", "")
                }
            }), 200

        else:
            return jsonify({
                "success": False,
                "message": "Invalid Email or Password"
            }), 401

    except Exception as e:
        print("Student Login Error:", str(e))
        return jsonify({
            "success": False,
            "message": "Server Error",
            "error": str(e)
        }), 500



# student profile update
@app.route("/update-student-profile", methods=["POST"])
def update_student_profile():
    data = request.get_json()
    email = data.get("email")

    if not email:
        return jsonify({"success": False, "message": "Email required"}), 400

    try:
        students.update_one(
            {"email": email},
            {"$set": data},
            upsert=True
        )

        return jsonify({"success": True, "message": "Profile Updated Successfully"})

    except Exception as e:
        return jsonify({"success": False, "message": str(e)})





# ================= STUDENT REGISTER =================


@app.route("/register", methods=["POST"])
def register():

    data = request.get_json()
    print("REGISTER DATA:", data)

    student_id = data.get("StudentId")
    referred_code = data.get("referredBy")

    if not student_id:
        return jsonify({"error": "StudentId is required"}), 400

    # 🔥 check student exists (important)
    student = students.find_one({"StudentId": student_id})
    if not student:
        return jsonify({"error": "Student not found"}), 404

    # 🔥 prevent duplicate registration
    existing = registrations.find_one({"StudentId": student_id})
    if existing:
        return jsonify({"error": "Already registered"}), 400

    # 🔥 prepare registration data
    registration_data = {
        **data,
        "payment_status": "pending",
        "payment_id" : None,
        "createdAt": datetime.utcnow()
    }

    # 🔥 INSERT into registrations collection
    registrations.insert_one(registration_data)
      
     
    # 🔥 Referral (Register → +5)
    if referred_code:
        referrer = students.find_one({"referralCode": referred_code})

        if referrer:
            students.update_one(
                {"referralCode": referred_code},
                {
                    "$inc": {
                        "creditPoints": 5,
                        "totalReferrals": 1
                    }
                }
            )

    return jsonify({"message": "Registration successful"}), 201


@app.route("/register", methods=["GET"])
def get_register():
    try:
        data = list( registrations.find())   # 🔥 register collection se data

        # 🔁 ObjectId ko string me convert
        for d in data:
            d["_id"] = str(d["_id"])

        return jsonify(data), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ----------School-login start---------------------------

@app.route("/school-login", methods=["POST"])
def school_login():

    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    school = schools.find_one({"email": email})

    if not school:
        return jsonify({"message": "Invalid Email or Password"}), 401

    stored_password = school.get("password")

    if bcrypt.checkpw(password.encode("utf-8"), stored_password):

        school["_id"] = str(school["_id"])
        school.pop("password", None)

        return jsonify({
            "message": "Login Successful",
            "data": school
        }), 200

    return jsonify({"message": "Invalid Email or Password"}), 401


# 🔹 YE ROUTE ALAG HOGA (FUNCTION KE BAHAR)





@app.route("/school/profile", methods=["GET"])
def get_school_profile():

    email = request.args.get("email")

    school = schools.find_one({"email": email})

    if school:

        school["_id"] = str(school["_id"])

        # password remove
        school.pop("password", None)

        return jsonify(school)

    return jsonify({"message": "School not found"})
# ===========School Signup=========================#
def generate_school_code():
    return "SCH" + ''.join(random.choices(string.digits, k=4))


@app.route("/school/signup", methods=["POST"])
def school_signup():
    data = request.json

    # check existing email
    if schools.find_one({"email": data["email"]}):
        return jsonify({"message": "School already registered"}), 400

    # ---------------------------
    # Hash the password
    # ---------------------------
    password = data["password"]
    hashed_password = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt())
    data["password"] = hashed_password

    # 🔥 GENERATE UNIQUE SCHOOL CODE
    school_code = generate_school_code()

    # ensure unique (important 🔥)
    while schools.find_one({"school_code": school_code}):
        school_code = generate_school_code()

    # 🔥 ADD IN DATA
    data["school_code"] = school_code

    # insert into DB
    schools.insert_one(data)

    return jsonify({
        "message": "School Registered Successfully",
        "school_code": school_code,          # 👈 frontend ko bhejo
        "school_name": data.get("institutionName")
    }), 200


    # get profile
@app.route("/school/edit-profile", methods=["POST"])
def school_edit_profile():

    data = request.json

    email = data.get("email")

    if not email:
        return jsonify({"message": "Email required"}), 400

    schools.update_one(
        {"email": email},
        {"$set": data}
    )

    return jsonify({"message": "Profile updated successfully"})

# =============School Bulk  Registration==============#

@app.route("/download-registration-form", methods=["GET"])
def download_registration_form():
    return send_file("uploads/registration_form.pdf", as_attachment=True)

#==============School bulk form======================#
@app.route("/bulk-register", methods=["POST"])
def bulk_register():

    data = request.json
    students_data = data.get("students", [])
    school_code = data.get("school_code")

    if not students_data:
        return jsonify({"message": "No students data"}), 400

    if not school_code:
        return jsonify({"message": "School code missing"}), 400

    inserted_students = []
    login_credentials = []

    for s in students_data:

        # 🔥 AUTO STUDENT ID
        student_id = "STU" + str(random.randint(10000, 99999))

        # 🔥 RANDOM 6 DIGIT PASSWORD
        password = str(random.randint(100000, 999999)).strip()

        student_doc = {
            "StudentId": student_id,

            # 🔥 IMPORTANT FIX (login ke liye)
            "name": s.get("student_name"),
            "phone": s.get("student_phone"),
            "student_class": s.get("class"),

            # ❌ purane fields bhi rakh diye (kuch delete nahi kiya)
            "student_name": s.get("student_name"),
            "class": s.get("class"),
            "student_phone": s.get("student_phone"),

            "subject": s.get("subject"),
            "roll_no": s.get("roll_no"),
            "email": str(s.get("email", "")).strip().lower(),

            "father_name": s.get("father_name"),
            "mother_name": s.get("mother_name"),
            "parent_phone": s.get("parent_phone"),

            "school": s.get("school_name"),
            "school_name": s.get("school_name"),
            "school_code": school_code,

            "state": s.get("state"),
            "city": s.get("city"),
            "pincode": s.get("pincode"),

            # 🔥 LOGIN DATA
            "password": password,

            "created_at": datetime.now()
        }

        # 🔥 SAME COLLECTION use karna
        students.insert_one(student_doc)

        inserted_students.append(student_id)

        login_credentials.append({
            "student_name": s.get("student_name"),
            "email": str(s.get("email", "")).strip().lower(),
            "password": password
        })

    return jsonify({
        "message": "Bulk Registration + Signup Success ✅",
        "students": inserted_students,
        "credentials": login_credentials
    }), 200

# ================= GET ALL SCHOOLS =================
@app.route("/admin/schools", methods=["GET"])
def get_all_schools():
    schools = db["schools"]
    data = []

    for s in schools.find():
        data.append({
            # 🔥 SCHOOL ID (custom wala)
            "schoolId": s.get("school_code") or "N/A",

            # 🔥 NAME
            "name": s.get("institutionName") or "No Name",

            # 🔥 TYPE (extra add kar)
            "type": s.get("institutionType") or "N/A",

            "email": s.get("email", ""),
            "phone": s.get("mobile", ""),
            "city": s.get("district", ""),

            "students": s.get("students", 0),
            "task": s.get("task", "No Task"),
            "credits": s.get("credits", 0)
        })

    return jsonify({ "data": data })


# ================= ASSIGN TASK =================
@app.route("/admin/assign-school-task", methods=["POST"])
def assign_school_task():
    data = request.json

    db["schools"].update_one(
        {"school_code": data["schoolId"]},  # 🔥 FIX
        {"$set": {"task": data["task"]}}
    )

    return jsonify({"success": True})


# ================= ADD CREDITS =================
@app.route("/admin/add-school-credits", methods=["POST"])
def add_school_credits():
    data = request.json

    db["schools"].update_one(
        {"school_code": data["schoolId"]},  # 🔥 FIX
        {"$inc": {"credits": int(data["credits"])}}
    )

    return jsonify({"success": True})

# ================= REMOVE CREDITS =================
@app.route("/admin/remove-school-credits", methods=["POST"])
def remove_school_credits():
    data = request.json

    db["schools"].update_one(
        {"school_code": data["schoolId"]},  # 🔥 FIX
        {"$inc": {"credits": -int(data["credits"])}}
    )

    return jsonify({"success": True})


# ================= ADD SCHOOL (OPTIONAL) =================
@app.route("/admin/add-school", methods=["POST"])
def add_school():
    data = request.json

    db["schools"].insert_one({
        "school_name": data.get("name"),
        "email": data.get("email"),
        "mobile": data.get("phone"),
        "district": data.get("city"),
        "students": data.get("students", 0),
        "task": "",
        "credits": 0
    })

    return jsonify({"success": True})


# ================= VOLUNTEER REGISTER =================


@app.route("/register-volunteer", methods=["POST"])
def register_volunteer():
    volunteers = db["volunteers"]

    volunteerId = request.form.get("volunteerId")
    name = request.form.get("name")
    email = request.form.get("email")
    mobile = request.form.get("mobile")
    qualification = request.form.get("qualification")
    skills = request.form.get("skills")
    availability = request.form.get("availability")
    password = request.form.get("password")

    hashed_password = bcrypt.hashpw(
        password.encode("utf-8"),
        bcrypt.gensalt()
    )

    resume = request.files.get("resume")
    resume_id = None
    if resume:
        resume_id = fs.put(resume, filename=resume.filename, content_type=resume.content_type)

        # Join date + 1 year for expiry
        join_date = datetime.utcnow()
        expiry = datetime.utcnow() + timedelta(days=365)

    volunteer_data = {
        "volunteerId": volunteerId,
        "name": name,
        "email": email,
        "mobile": mobile,
        "qualification": qualification,
        "skills": skills,
        "availability": availability,
        "password": hashed_password,
        "resume_id": str(resume_id),
        "status": "pending",   # 🔹 admin approval ke liye
        "join_date": join_date,  # 🔹 registration date track karne ke liye
        "expiry" : expiry,

         # 👇 NEW FIELDS

       "referralCode": volunteerId,   # volunteerId ko hi referral code bana sakte ho
     "creditPoints": 0,
      "totalReferrals": 0

    }

    volunteers.insert_one(volunteer_data)
    return jsonify({"message": "Volunteer Registered Successfully"}), 201

# ================= VOLUNTEER LOGIN =================



@app.route("/volunteer-login", methods=["POST"])
def volunteer_login():
    volunteers = db["volunteers"]
    data = request.json
    email = data.get("email")
    password = data.get("password")

    volunteer = volunteers.find_one({"email": email})

    if volunteer:

        if volunteer.get("status") == "pending":
            return jsonify({"message": "Waiting for admin approval"}), 403

        if volunteer.get("status") == "blocked":
            return jsonify({"message": "Your account is blocked"}), 403

        stored_password = volunteer["password"]

        # 🔥 FINAL FIX
        if isinstance(stored_password, bytes):
            pass
        elif isinstance(stored_password, str):
            stored_password = stored_password.encode("utf-8")
        else:
            stored_password = bytes(stored_password)

        if bcrypt.checkpw(password.encode("utf-8"), stored_password):
            return jsonify({
                "message": "Volunteer Login Successful",
                "email": volunteer["email"]
            }), 200

    return jsonify({"message": "Invalid Email or Password"}), 401
# ================= PENDING VOLUNTEERS =================


@app.route("/admin/pending-volunteers", methods=["GET"])
def pending_volunteers():

    volunteers = list(db["volunteers"].find({"status": "pending"}))

    for v in volunteers:
        v["_id"] = str(v["_id"])

    return jsonify({
        "success": True,
        "data": volunteers
    })

# ================= VOLUNTEER STATUS =================

@app.route("/admin/volunteer-status/<volunteerId>", methods=["PUT"])
def update_volunteer_status(volunteerId):

    data = request.json
    status = data.get("status")

    db["volunteers"].update_one(
        {"volunteerId": volunteerId},
        {"$set": {"status": status}}
    )

    return jsonify({
        "success": True,
        "message": "Status updated"
    })


# ================= VOLUNTEER PROFILE =================


# @app.route("/volunteer/profile/<email>", methods=["GET"])
# def volunteer_profile(email):

#     volunteer = db["volunteers"].find_one({"email": email})

#     if not volunteer:
#         return jsonify({"error": "Volunteer not found"}), 404

#     safe_data = {
#         "volunteerId": volunteer.get("volunteerId"),
#         "name": volunteer.get("name"),
#         "email": volunteer.get("email"),
#         "mobile": volunteer.get("mobile"),
#         "qualification": volunteer.get("qualification"),
#         "skills": volunteer.get("skills"),
#         "availability": volunteer.get("availability"),
#         "creditPoints": volunteer.get("creditPoints", 0),
#         "totalReferrals": volunteer.get("totalReferrals", 0)
#     }

#     return jsonify(safe_data), 200




@app.route("/volunteer/profile/<email>", methods=["GET"])
def volunteer_profile(email):

    volunteer = db["volunteers"].find_one({"email": email})

    if not volunteer:
        return jsonify({"error": "Volunteer not found"}), 404

    # 🔥 FULL DATA RETURN
    for key, value in volunteer.items():
        if isinstance(value, ObjectId):
            volunteer[key] = str(value)
        elif isinstance(value, bytes):
            volunteer[key] = value.decode("utf-8", errors="ignore")

    return jsonify(volunteer), 200
# ================= UPDATE VOLUNTEER PROFILE =================
# @app.route("/volunteer/update/<email>", methods=["POST"])
# def update_volunteer_profile(email):

#     data = request.json

#     # 🔥 pehle purana data uthao
#     old = db["volunteers"].find_one({"email": email})

#     if old:
#         # 🔥 merge old + new
#         updated = {**old, **data}
#     else:
#         updated = data

#     db["volunteers"].update_one(
#         {"email": email},
#         {"$set": updated}
#     )

#     return jsonify({
#         "success": True,
#         "message": "Volunteer profile updated successfully"
#     })


@app.route("/volunteer/update/<email>", methods=["PUT"])
def update_volunteer_profile(email):
    try:
        data = request.json

        if not data:
            return jsonify({"error": "No data received"}), 400
        
        data.pop("_id", None)

        # email fix
        data["email"] = email

        result = db["volunteers"].update_one(
            {"email": email},
            {"$set": data}
        )

        if result.matched_count == 0:
            return jsonify({"error": "Volunteer not found"}), 404

        updated = db["volunteers"].find_one({"email": email})

        # 🔥 SAME FIX as coordinator
        for key, value in updated.items():
            if isinstance(value, ObjectId):
                updated[key] = str(value)
            elif isinstance(value, bytes):
                updated[key] = value.decode("utf-8", errors="ignore")

        return jsonify({
            "message": "Volunteer profile updated successfully ✅",
            "profile": updated
        }), 200

    except Exception as e:
        print("Error:", e)
        return jsonify({"error": str(e)}), 500

# -=================volunteercredit===================#
@app.route("/admin/add-volunteer-credits", methods=["POST"])
def add_volunteer_credits():
    data = request.json

    volunteerId = data.get("volunteerId")
    credits = int(data.get("credits", 0))

    db["volunteers"].update_one(
        {"volunteerId": volunteerId},
        {"$inc": {"creditPoints": credits}}   # ✅ increment
    )

    return jsonify({
        "success": True,
        "message": "Credits added"
    })

#============== REMOVE CREDIT=================
@app.route("/admin/remove-volunteer-credits", methods=["POST"])
def remove_volunteer_credits():
    data = request.json

    volunteerId = data.get("volunteerId")
    credits = int(data.get("credits", 0))

    db["volunteers"].update_one(
        {"volunteerId": volunteerId},
        {"$inc": {"creditPoints": -credits}}   # ❌ minus
    )

    return jsonify({
        "success": True,
        "message": "Credits deducted"
    })



# ================= ADMIN LOGIN (OTP) =================
@app.route("/Admin_login", methods=["POST"])
def admin_login():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    admin = admins.find_one({"email": email.strip()})
    if not admin:
        return jsonify({"message": "Admin not found"}), 404

    if password != admin["password"]:
        return jsonify({"message": "Wrong password"}), 401

    otp = str(random.randint(100000, 999999))
    expiry = datetime.utcnow() + timedelta(minutes=5)

    admin_otps.insert_one({"email": email, "otp": otp, "expiry": expiry})

    send_email(email, otp)
    return jsonify({"success": True, "message": "OTP sent to your email"}), 200

# ================= VERIFY ADMIN OTP =================
@app.route("/verify-admin-otp", methods=["POST"])
def verify_admin_otp():
    data = request.json
    email = data.get("email")
    otp = data.get("otp")

    record = admin_otps.find_one({"email": email, "otp": otp})
    if not record:
        return jsonify({"message": "Invalid OTP"}), 401
    if record["expiry"] < datetime.utcnow():
        return jsonify({"message": "OTP expired"}), 401

    admin_otps.delete_one({"_id": record["_id"]})
    return jsonify({"message": "Admin Login Successful"}), 200

# ================= ADMIN FORGOT PASSWORD =================
@app.route("/admin-forgot-password", methods=["POST"])
def admin_forgot_password():
    data = request.json
    email = data.get("email")

    admin = admins.find_one({"email": email})
    if not admin:
        return jsonify({"message": "Admin not found"}), 404

    otp = str(random.randint(100000, 999999))
    expiry = datetime.utcnow() + timedelta(minutes=5)

    admin_otps.insert_one({"email": email, "otp": otp, "expiry": expiry})
    send_email(email, otp)
    return jsonify({"message": "Reset OTP sent"}), 200

# ================= RESET ADMIN PASSWORD =================
@app.route("/reset-admin-password", methods=["POST"])
def reset_admin_password():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    hashed_password = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt())
    admins.update_one({"email": email}, {"$set": {"password": hashed_password}})
    return jsonify({"message": "Password Updated Successfully"}), 200

# ================= ADMIN DASHBOARD STATS =================
@app.route("/admin/stats", methods=["GET"])
def admin_stats():
    num_volunteers = db["volunteers"].count_documents({})
    num_coordinators = db["coordinators"].count_documents({})
    num_students = db["students"].count_documents({})
    num_registrations = db["registrations"].count_documents({})

    return jsonify({
        "volunteers": num_volunteers,
        "coordinators": num_coordinators,
        "students": num_students,
        "registrations": num_registrations
    })

# ================= ADMIN - GET VOLUNTEERS =================
@app.route("/admin/volunteers", methods=["GET"])
def get_volunteers():
    volunteers = db["volunteers"]
    data = []

    for v in volunteers.find():
        data.append({
            "volunteerId": v.get("volunteerId"),
            "name": v.get("name"),
            "email": v.get("email"),
            "mobile": v.get("mobile"),
            "qualification": v.get("qualification"),
            "skills": v.get("skills"),
            "resume_id": v.get("resume_id"),
            "status": v.get("status", "pending"),
            "credits": v.get("creditPoints", 0),
             "task": v.get("task", "No Task Assigned"), 
              "city":v.get("city", "N/A"),   # ✅ IMPORTANT
              "state":v.get("state", "N/A")   # ✅ IMPORTANT
        })

    return jsonify({
        "success": True,
        "data": data
    })

# ================= ADMIN - BLOCK / UNBLOCK VOLUNTEER =================
@app.route("/admin/toggle-volunteer-block/<volunteerId>", methods=["PUT"])
def toggle_volunteer_block(volunteerId):

    volunteer = db["volunteers"].find_one({"volunteerId": volunteerId})

    if not volunteer:
        return jsonify({
            "success": False,
            "message": "Volunteer not found"
        }), 404

    # toggle logic
    current_status = volunteer.get("status", "active")

    if current_status == "blocked":
        new_status = "active"
    else:
        new_status = "blocked"

    db["volunteers"].update_one(
        {"volunteerId": volunteerId},
        {"$set": {"status": new_status}}
    )

    return jsonify({
        "success": True,
        "status": new_status
    })
# ================= VIEW RESUME  Volunteer=================
@app.route("/admin/get-volunteer-resume/<id>")
def get_resume(id):
    volunteer = db["volunteers"].find_one({"volunteerId": id})

    if not volunteer:
        return "Volunteer not found", 404

    resume_id = volunteer.get("resume_id")

    if not resume_id:
        return "No Resume Found", 404

    file = fs.get(ObjectId(resume_id))

    return Response(
        file.read(),
        mimetype=file.content_type or "application/pdf",
        headers={
            "Content-Disposition": f"inline; filename={file.filename}"
        }
    )

# ================VolunteerTask==============#
@app.route("/admin/assign-volunteer-task", methods=["POST"])
def assign_volunteer_task():
    data = request.json

    volunteerId = data.get("volunteerId")
    task = data.get("task")

    db["volunteers"].update_one(
        {"volunteerId": volunteerId},
        {"$set": {"task": task}}
    )

    return jsonify({
        "success": True,
        "message": "Task assigned"
    })

# ================= ASSIGN TASK TO ALL Volunteers =================
@app.route("/admin/assign-task-all", methods=["POST"])
def assign_task_all():
    data = request.json
    task = data.get("task")

    if not task:
        return jsonify({"message": "Task is required"}), 400

    db["volunteers"].update_many(
        {},   # sabko update karega
        {"$set": {"task": task}}
    )

    return jsonify({
        "success": True,
        "message": "Task assigned to all volunteers"
    })

#==================== GET VOLUNTEERS student =================
@app.route("/volunteer/referrals/<code>", methods=["GET"])
def volunteer_referrals(code):

    students = list(registrations.find(
        {"referredBy": code},   # same logic
        {
            "_id": 0,
            "student_name": 1,
            "class": 1,
            "subject": 1,
            "school_name": 1,
            "email": 1,
            "payment_status": 1
        }
    ))

    return jsonify(students)
# ================= COORDINATOR REGISTER =================


@app.route("/register-coordinator", methods=["POST"])
def register_coordinator():

    coordinators = db["coordinators"]

    coordinatorId = request.form.get("coordinatorId")
    name = request.form.get("name")
    email = request.form.get("email")
    mobile = request.form.get("mobile")
    qualification = request.form.get("qualification")
    experience = request.form.get("experience")
    password = request.form.get("password")

    hashed_password = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt())

    resume = request.files.get("resume")
    resume_id = None

    if resume:
        resume_id = fs.put(resume, filename=resume.filename, content_type=resume.content_type)

    join_date = datetime.utcnow()
    expiry = join_date + timedelta(days=365)

    coordinator_data = {
        "coordinatorId": coordinatorId,
        "name": name,
        "email": email,
        "mobile": mobile,
        "qualification": qualification,
        "experience": experience,
        "password": hashed_password,
        "resume_id": str(resume_id),
        "status": "pending",
        "join_date": join_date,
        "expiry": expiry,

        # Referral System
        "referralCode": coordinatorId,
        "creditPoints": 0,
        "totalReferrals": 0
    }

    coordinators.insert_one(coordinator_data)

    return jsonify({
        "message": "Registration successful. Waiting for admin approval"
    }), 201





# ================= COORDINATOR LOGIN =================

# @app.route("/coordinator-login", methods=["POST"])
# def coordinator_login():
#     coordinators = db["coordinators"]
#     data = request.json

#     email = data.get("email")
#     password = data.get("password")

#     coordinator = coordinators.find_one({"email": email})

#     if coordinator:

#         # 👇 Pending approval check
#         if coordinator.get("status") == "pending":
#             return jsonify({"message": "Waiting for admin approval"}), 403

#         # 👇 Blocked account check
#         if coordinator.get("status") == "blocked":
#             return jsonify({"message": "Your account is blocked"}), 403

#         stored_password = coordinator["password"]

#         if bcrypt.checkpw(password.encode("utf-8"), stored_password):
#             return jsonify({
#                 "message": "Coordinator Login Successful",
#                 "email": coordinator["email"],
#                 "referralCode": coordinator.get("referralCode"),    
#                 "coordinatorId": coordinator.get("coordinatorId")

#              }), 200

#     return jsonify({"message": "Invalid Email or Password"}), 401

# @app.route("/coordinator-login", methods=["POST"])
# def coordinator_login():
#     coordinators = db["coordinators"]
#     data = request.json

#     email = data.get("email")
#     password = data.get("password")

#     coordinator = coordinators.find_one({"email": email})

#     if not coordinator:
#         return jsonify({"message": "Invalid Email or Password"}), 401

#     # 🔥 1. BLOCK CHECK (FIRST)
#     if coordinator.get("blocked", False):
#         print("BLOCKED USER TRYING LOGIN")  # DEBUG
#         return jsonify({"message": "Your account is blocked"}), 403

#     # 🔥 2. STATUS CHECK
#     if coordinator.get("status") != "approved":
#         print("NOT APPROVED USER")  # DEBUG
#         return jsonify({"message": "Waiting for admin approval"}), 403

#     # 🔥 3. PASSWORD CHECK
#     stored_password = coordinator["password"]

#     if not bcrypt.checkpw(password.encode("utf-8"), stored_password):
#         return jsonify({"message": "Invalid Email or Password"}), 401

#     # ✅ SUCCESS LOGIN
#     return jsonify({
#         "message": "Coordinator Login Successful",
#         "email": coordinator["email"],
#         "referralCode": coordinator.get("referralCode"),
#         "coordinatorId": coordinator.get("coordinatorId")
#     }), 200
@app.route("/coordinator-login", methods=["POST"])
def coordinator_login():
    coordinators = db["coordinators"]
    data = request.json

    email = data.get("email")
    password = data.get("password")

    coordinator = coordinators.find_one({"email": email})

    if coordinator:

        # Pending check
        if coordinator.get("status") == "pending":
            return jsonify({"message": "Waiting for admin approval"}), 403

        # 🔥 FIX: blocked field check karo
        if coordinator.get("blocked", False):
            return jsonify({"message": "Your account is blocked"}), 403

        stored_password = coordinator["password"]

        if bcrypt.checkpw(password.encode("utf-8"), stored_password):
            return jsonify({
                "message": "Coordinator Login Successful",
                "email": coordinator["email"],
                "referralCode": coordinator.get("referralCode"),    
                "coordinatorId": coordinator.get("coordinatorId")
            }), 200

    return jsonify({"message": "Invalid Email or Password"}), 401
# ================= COORDINATOR PROFILE =================



@app.route("/coordinator/profile/<email>", methods=["GET"])
def get_coordinator_profile(email):

    coordinator = db["coordinators"].find_one({"email": email})

    if not coordinator:
        return jsonify({"message": "Coordinator not found"}), 404

    return jsonify({
        "coordinatorId": coordinator.get("coordinatorId"),
        "name": coordinator.get("name"),
        "email": coordinator.get("email"),
        "mobile": coordinator.get("mobile"),
        "qualification": coordinator.get("qualification"),
        "experience": coordinator.get("experience"),
        "resume_id": coordinator.get("resume_id"),
        "join_date": coordinator.get("join_date"),
        "expiry": coordinator.get("expiry"),
        "coordinatorId": coordinator.get("coordinatorId"),
        "creditPoints": coordinator.get("creditPoints",0),
        "totalReferrals": coordinator.get("totalReferrals",0),
         "photo": coordinator.get("photo"),  
         "task": coordinator.get("task"),
         "blood_group": coordinator.get("blood_group")

    }), 200


# ================= UPDATE COORDINATOR PROFILE =================


@app.route("/coordinator/update/<email>", methods=["PUT"])
def update_coordinator_profile(email):
    try:
        data = request.json

        if not data:
            return jsonify({"error": "No data received"}), 400

        # email fix
        data["email"] = email

        result = db["coordinators"].update_one(
            {"email": email},
            {"$set": data}
        )

        if result.matched_count == 0:
            return jsonify({"error": "Coordinator not found"}), 404

        updated = db["coordinators"].find_one({"email": email})

        # 🔥 IMPORTANT FIX
        for key, value in updated.items():
            if isinstance(value, ObjectId):
                updated[key] = str(value)
            elif isinstance(value, bytes):
                updated[key] = value.decode("utf-8", errors="ignore")

        return jsonify({
            "message": "Profile updated successfully ✅",
            "profile": updated
        }), 200

    except Exception as e:
        print("Error:", e)
        return jsonify({"error": str(e)}), 500




# COORDINATOR REFERRAL STUDENTS
# -------------------------------
@app.route("/coordinator/referrals/<code>", methods=["GET"])
def referrals(code):

    students = list(registrations.find(
        {"referredBy": code},
        {
            "_id":0,
            "student_name":1,
            "class":1,
            "subject":1,
            "school_name":1,
            "email":1,
            "payment_status": 1
        }
    ))

    return jsonify(students)





# ================= GET COORDINATORS =================
@app.route("/admin/coordinators", methods=["GET"])
def get_coordinators():
    coordinators = db["coordinators"]
    data = []

    for c in coordinators.find():
        data.append({
            "id": str(c.get("_id")),  # ✅ IMPORTANT
            "coordinatorId": c.get("coordinatorId"),
            "name": c.get("name"),
            "email": c.get("email"),
            "mobile": c.get("mobile"),
            "qualification": c.get("qualification"),
            "experience": c.get("experience"),
            "status": c.get("status", "pending"),  # ✅ FIXED
            "blocked": c.get("blocked", False),
            "credits": int(c.get("creditPoints", 0)),
            "task": c.get("task", "None"),  
            "city": c.get("city", "N/A"),
            "state": c.get("state", "N/A")
        })

    return jsonify({"success": True, "data": data})


# ================= UPDATE STATUS =================
@app.route("/admin/update-coordinator-status/<id>", methods=["PUT"])
def update_coordinator_status(id):
    try:
        data = request.json
        new_status = data.get("status")

        if new_status not in ["pending", "approved", "rejected"]:
            return jsonify({"success": False}), 400

        result = db["coordinators"].update_one(
            {"_id": ObjectId(id)},  # ✅ FIXED
            {"$set": {"status": new_status}}
        )

        if result.matched_count == 0:
            return jsonify({"success": False, "message": "Not found"}), 404

        return jsonify({"success": True})

    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500


# ================= BLOCK / UNBLOCK =================
@app.route("/admin/toggle-block/<id>", methods=["PUT"])
def toggle_block(id):
    try:
        coordinator = db["coordinators"].find_one({"coordinatorId": id})

        if not coordinator:
            return jsonify({
                "success": False,
                "message": "Coordinator not found"
            }), 404

        new_block_status = not coordinator.get("blocked", False)

        db["coordinators"].update_one(
            {"coordinatorId": id},
            {"$set": {"blocked": new_block_status}}
        )

        return jsonify({
            "success": True,
            "blocked": new_block_status,
            "message": "Coordinator blocked" if new_block_status else "Coordinator unblocked"
        })

    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500
# ================= ASSIGN TASK =================
@app.route("/admin/assign-task", methods=["POST"])
def assign_task():
    try:
        data = request.json
        coordinator_id = data.get("coordinatorId")
        task = data.get("task")

        if not task:
            return jsonify({"success": False, "message": "Task required"}), 400

        db["coordinators"].update_one(
            {"_id": ObjectId(coordinator_id)},  # ✅ FIXED
            {"$set": {"task": task}}
        )

        return jsonify({"success": True})

    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500
    
#==========View Resume=================#
@app.route("/admin/get-coordinator-resume/<id>")
def get_coordinator_resume(id):

    coordinator = db["coordinators"].find_one({"coordinatorId": id})

    if not coordinator:
        return "Coordinator not found", 404

    resume_id = coordinator.get("resume_id")

    if not resume_id:
        return "No Resume Found", 404

    file = fs.get(ObjectId(resume_id))

    return Response(
        file.read(),
        mimetype=file.content_type or "application/pdf",
        headers={
            "Content-Disposition": f"inline; filename={file.filename}"
        }
    )
#=========AsSIGN TASK TO ALL=================
@app.route("/admin/assign-task-all-coordinator", methods=["POST"])
def assign_task_all_coordinator():
    data = request.json
    task = data.get("task")

    db["coordinators"].update_many(
        {},
        {"$set": {"task": task}}
    )

    return jsonify({"message": "Task assigned to all coordinators"})
# ================= ADD CREDIT =================
@app.route("/admin/add-credits", methods=["POST"])
def add_credits():
    try:
        data = request.json
        coordinator_id = data.get("coordinatorId")
        credits = int(data.get("credits", 0))

        db["coordinators"].update_one(
            {"_id": ObjectId(coordinator_id)},  # ✅ FIXED
            {"$inc": {"creditPoints": credits}}
        )

        return jsonify({"success": True})

    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

# ================= REMOVE CREDIT =================
@app.route("/admin/remove-coordinator-credits", methods=["POST"])
def remove_coordinator_credits():
    data = request.json

    coordinatorId = data.get("coordinatorId")
    credits = int(data.get("credits", 0))

    db["coordinators"].update_one(
        {"_id": ObjectId(coordinatorId)},
        {"$inc": {"creditPoints": -credits}}
    )

    return jsonify({"message": "Credits Deducted Successfully"})





# ================= EXAM SCREENSHOT UPLOAD =================

@app.route("/upload-screenshot", methods=["POST"])
def upload_screenshot():

    data = request.json

    image = data.get("image")
    student = data.get("student", "unknown")

    if not image:
        return jsonify({"error": "No image received"}), 400

    image_data = image.split(",")[1]

    image_bytes = base64.b64decode(image_data)

    filename = f"{student}_{datetime.now().strftime('%Y%m%d%H%M%S')}.png"

    path = os.path.join(SCREENSHOT_FOLDER, filename)

    with open(path, "wb") as f:
        f.write(image_bytes)

    return jsonify({"message": "Screenshot saved"})



# ================= CHEATING LOG =================

@app.route("/exam-warning", methods=["POST"])
def exam_warning():

    warnings = db["exam_warnings"]

    data = request.json

    warnings.insert_one({
        "student": data.get("student"),
        "warning": data.get("warning"),
        "time": datetime.utcnow()
    })

    return jsonify({"message": "Warning saved"})

# ------------PAYMENT WORK ----------------------------#

RAZORPAY_KEY_ID = "rzp_test_SXSRaYXP2vwXGu"
RAZORPAY_SECRET = "veZa4RLH698WKHhAFOSVz78A"

client = razorpay.Client(auth=(RAZORPAY_KEY_ID, RAZORPAY_SECRET))


# ✅ CREATE ORDER
@app.route("/create-order", methods=["POST"])
def create_order():
    try:
        data = request.json
        amount = int(data.get("amount"))  # MUST be int

        order = client.order.create({
            "amount": amount,
            "currency": "INR",
            "receipt": f"receipt_{amount}",
            "payment_capture": 1
        })

        return jsonify({
            "id": order["id"],
            "amount": order["amount"],
            "currency": order["currency"]
        })

    except Exception as e:
        print("CREATE ORDER ERROR:", str(e))
        return jsonify({"error": str(e)}), 500


# ✅ VERIFY PAYMENT
@app.route("/verify-payment", methods=["POST"])
def verify_payment():
    try:
        data = request.json

        payment_id = data.get("paymentId")
        order_id = data.get("orderId")
        signature = data.get("signature")

        generated_signature = hmac.new(
            RAZORPAY_SECRET.encode(),
            f"{order_id}|{payment_id}".encode(),
            hashlib.sha256
        ).hexdigest()

        if generated_signature == signature:
            return jsonify({"status": "success"})
        else:
            return jsonify({"status": "failed"}), 400

    except Exception as e:
        print("VERIFY ERROR:", str(e))
        return jsonify({"error": str(e)}), 500

# -----------PAYMENT STATUS--------#





@app.route("/update-payment", methods=["POST"])
def update_payment():

    data = request.json
    student_id = data.get("studentId")
    status = data.get("status")
    payment_id = data.get("paymentId")

    print("DATA:", data)

    try:
        registration = db["registrations"].find_one({"StudentId": student_id})
            

        if not registration:
            return jsonify({"error": "Registration not found"}), 404

        # ✅ Duplicate protection (before update)
        if registration.get("payment_status") == "success":
            return jsonify({"message": "Already paid"}), 200

        # ❗ Ignore duplicate failed calls
        if registration.get("payment_status") == "failed" and status == "failed":
          return jsonify({"message": "Already failed"}), 200

        # ✅ Update payment
        db["registrations"].update_one(
            {"StudentId": student_id},
            {
                "$set": {
                    "payment_status": status,
                    "payment_id": payment_id
                }
            }
        )

          # ✅ STUDENT DETAILS (EMAIL KE LIYE)
        student = db["students"].find_one({
            "$or": [
                {"StudentId": student_id},
                {"studentId": student_id}
            ]
        })

        if not student:
            return jsonify({"error": "Student not found"}), 404

        name = student.get("name")
        email = student.get("email")
        subject = registration.get("subject") or "N/A"
  
        # 🔥 Referral logic only on SUCCESS
        if status == "success" and registration.get("referredBy"):

            referred_code = registration.get("referredBy")

            # ================= STUDENT =================
            ref_student = db["registrations"].find_one({"StudentId": referred_code})

            if ref_student:
                total = ref_student.get("totalReferrals", 0) + 1

                if total <= 10:
                    credit = 10
                elif total <= 20:
                    credit = 20
                else:
                    credit = 30

                db["registrations"].update_one(
                    {"StudentId": referred_code},
                    {
                        "$set": {"totalReferrals": total},
                        "$inc": {"creditPoints": credit}
                    }
                )

                print("Student credit added")

            # ================= VOLUNTEER =================
            volunteer = db["volunteers"].find_one({"referralCode": referred_code})

            if volunteer:
                total = volunteer.get("totalReferrals", 0) + 1

                if total <= 10:
                    credit = 30
                elif total <= 50:
                    credit = 40
                else:
                    credit = 50

                db["volunteers"].update_one(
                    {"referralCode": referred_code},
                    {
                        "$set": {"totalReferrals": total},
                        "$inc": {"creditPoints": credit}
                    }
                )

                print("Volunteer credit added")

            # ================= COORDINATOR =================
            coordinator = db["coordinators"].find_one({"referralCode": referred_code})

            if coordinator:
                total = coordinator.get("totalReferrals", 0) + 1

                if total <= 20:
                    credit = 40
                elif total <= 50:
                    credit = 50
                elif total <= 100:
                    credit = 60
                else:
                    credit = 70

                db["coordinators"].update_one(
                    {"referralCode": referred_code},
                    {
                        "$set": {"totalReferrals": total},
                        "$inc": {"creditPoints": credit}
                    }
                )

                print("Coordinator credit added")
            #---------------------membership-------------------
            referred_code = registration.get("referredBy")

            

            if status == "success" and referred_code:

                member = db["memberships"].find_one({"referredCode": referred_code})

    

                if member:

                        total = member.get("totalReferrals", 0) + 1

                        if total <= 10:
                            rank = "⭐ Beginner"
                            credit = 1
                        elif total <= 50:
                            rank = "⭐⭐ Rising Star"
                            credit = 1
                        elif total <= 100:
                            rank = "⭐⭐⭐ Pro Referrer"
                            credit = 1
                        else:
                            rank = "⭐⭐⭐⭐ Superstar 🌟"
                            credit = 1

                        db["memberships"].update_one(
                            {"referredCode": referred_code},
                            {
                                "$set": {
                                    "totalReferrals": total,
                                    "rank": rank
                                },
                                "$inc": {
                                    "creditPoints": credit
                                }
                            }
                        )

        print("member credit added")

 # 📧 EMAIL LOGIC (FINAL FIXED)
        if status == "success":
                send_payment_email(email, name, student_id, "", subject, "", "success")

        elif status == "failed":
            # ❗ sirf real fail pe (payment_id nahi ho)
                if not payment_id:
                    send_payment_email(email, name, student_id, "", subject, "", "failed")
        

        return jsonify({"message": "Payment updated successfully"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
 # ===========Payment Status===============#
@app.route("/get-payment-status/<student_id>", methods=["GET"])
def get_payment_status(student_id):
    try:
        student = db["registrations"].find_one({"StudentId": student_id})

        if not student:
            return jsonify({"error": "Student not found"}), 404

        status = student.get("payment_status", "pending")

        return jsonify({
            "payment_status": status
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


#===================UploadExcelFile============


@app.route("/upload-questions", methods=["POST"])
def upload_questions():
    print("API HIT ✅")
    print("DATA:", request.json)

    data = request.json
    questions = data.get("questions")

    if not questions:
        return jsonify({"message": "No data received"}), 400

    formatted_questions = []

    for row in questions:

        options = [
            row.get("option1"),
            row.get("option2"),
            row.get("option3"),
            row.get("option4")
        ]

        correct_value = row.get("correctAnswer")

        # Find index of correct answer
        if correct_value in options:
            index = options.index(correct_value)
            label_map = ["A", "B", "C", "D"]
            correct_label = label_map[index]
        else:
            correct_label = "Invalid"

        question_data = {
            "examCode": row.get("examCode"),
            "question": row.get("question"),
            "options": options,
            "correctAnswers": correct_label
        }

        formatted_questions.append(question_data)

    # ✅ loop ke baad insert hoga
    if formatted_questions:
        questions_collection.insert_many(formatted_questions)

    return jsonify({"message": "Questions saved in DB successfully ✅"})




#------------------Question Fetch Exam portal------------------



@app.route("/get-questions/<exam_code>", methods=["GET"])
def get_questions(exam_code):

    questions = list(db["questions"].find({"examCode": exam_code}, {"correctAnswer": 0}))

    for q in questions:
        q["_id"] = str(q["_id"])

    return jsonify(questions)


#--------------------verfiy student-------------#

@app.route("/verify-student", methods=["POST"])
def verify_student():
    data = request.json

    student_id = data.get("studentId")
    name = data.get("name")
    exam_code = data.get("examCode")

    student = students_collection.find_one({
        "studentId": student_id,
        "name": name,
        "examCode": exam_code
    })

    if not student:
        return jsonify({"success": False, "message": "Invalid Details ❌"})

    return jsonify({"success": True, "message": "Valid Student ✅"})

#--------------------ExampageSubmit--------


@app.route("/submit-exam", methods=["POST"])
def submit_exam():

    data = request.json

    student_id = data.get("studentId")
    exam_code = data.get("examCode")
    answers = data.get("answers")  # {0:"A",1:"B",...}

    if not student_id or not exam_code:
        return jsonify({"error": "Missing data"}), 400

    questions = list(questions_collection.find(
        {"examCode": exam_code}, {"_id": 0}
    ))

    updated_answers = []
    updated_correct_answers = []

    score = 0
    wrong = 0
    not_attempted = 0

    label_map = {"A": 0, "B": 1, "C": 2, "D": 3}

    for i, q in enumerate(questions):

        user_label = answers.get(str(i))  # A/B/C/D
        correct_label = q.get("correctAnswers")  # ✅ FIXED

        user_value = None
        correct_value = None

        # ✅ Convert label → actual option value
        if user_label in label_map:
            user_value = q["options"][label_map[user_label]]

        if correct_label in label_map:
            correct_value = q["options"][label_map[correct_label]]

        updated_answers.append(user_value)
        updated_correct_answers.append(correct_value)

        # ✅ NOT ATTEMPTED
        if user_label is None or user_label == "":
            not_attempted += 1

        # ✅ CORRECT
        elif user_label == correct_label:
            score += 1

        # ✅ WRONG
        else:
            wrong += 1

    total = len(questions)

    results_collection.update_one(
        {"studentId": student_id, "examCode": exam_code},
        {
            "$set": {
                "studentId": student_id,
                "examCode": exam_code,
                "answers": updated_answers,
                "correctAnswers": updated_correct_answers,
                "score": score,
                "wrong": wrong,
                "notAttempted": not_attempted,
                "total": total
            }
        },
        upsert=True
    )

    return jsonify({
        "message": "Exam submitted successfully ✅",
        "score": score,
        "wrong": wrong,
        "notAttempted": not_attempted,
        "total": total
    })




#---------------ExamResult--------------------------




@app.route("/get-result/<student_id>", methods=["GET"])
def get_result(student_id):

    result = results_collection.find_one({"studentId": student_id})

    if not result:
        return jsonify({"error": "Result not found"})

    # 🔥 STATUS CHECK FIRST
    if result.get("status") != "published":
        return jsonify({"error": "Result not declared yet"})

    exam_code = result.get("examCode")

    # 🔥 same exam ke sab results
    all_results = list(results_collection.find({"examCode": exam_code}))

    # sort by score
    all_results.sort(key=lambda x: x.get("score", 0), reverse=True)

    # ============================
    # 🏆 NATIONAL RANK
    # ============================
    rank = 1
    for i in range(len(all_results)):

        if i > 0 and all_results[i]["score"] < all_results[i-1]["score"]:
            rank = i + 1

        all_results[i]["nationalRank"] = rank

        results_collection.update_one(
            {"studentId": all_results[i]["studentId"]},
            {"$set": {"nationalRank": rank}}
        )

    # ============================
    # 🏆 STATE RANK
    # ============================
    from collections import defaultdict
    state_groups = defaultdict(list)

    for r in all_results:
        state_groups[r.get("state")].append(r)

    for state in state_groups:
        group = sorted(state_groups[state], key=lambda x: x.get("score", 0), reverse=True)

        rank = 1
        for i in range(len(group)):
            if i > 0 and group[i]["score"] < group[i-1]["score"]:
                rank = i + 1

            group[i]["stateRank"] = rank

            results_collection.update_one(
                {"studentId": group[i]["studentId"]},
                {"$set": {"stateRank": rank}}
            )

    # ============================
    # 🏆 DISTRICT RANK
    # ============================
    district_groups = defaultdict(list)

    for r in all_results:
        district_groups[r.get("district")].append(r)

    for district in district_groups:
        group = sorted(district_groups[district], key=lambda x: x.get("score", 0), reverse=True)

        rank = 1
        for i in range(len(group)):
            if i > 0 and group[i]["score"] < group[i-1]["score"]:
                rank = i + 1

            group[i]["districtRank"] = rank

            results_collection.update_one(
                {"studentId": group[i]["studentId"]},
                {"$set": {"districtRank": rank}}
            )

    # ============================
    # 🎯 CURRENT STUDENT RANK
    # ============================
    current_student = results_collection.find_one({"studentId": student_id})

    # questions
    questions = list(
        questions_collection.find(
            {"examCode": exam_code},
            {"_id": 0}
        )
    )
    
    return jsonify({
        "score": result.get("score", 0),
        "wrong": result.get("wrong", 0),
        "notAttempted": result.get("notAttempted", 0),
        "total": result.get("total", 0),
        "answers": result.get("answers", []),
        "correctAnswers": result.get("correctAnswers", []),
        "questions": questions,
        
        # 🔥 NEW RANKS
        "nationalRank": current_student.get("nationalRank"),
        "stateRank": current_student.get("stateRank"),
        "districtRank": current_student.get("districtRank"),

        "status": "hidden"
    })


#--------------MockTextUpload----------------



@app.route("/upload-mock-questions", methods=["POST"])
def upload_mock_questions():

    try:
        file = request.files.get("file")

        if not file:
            return jsonify({"error": "No file uploaded"}), 400

        df = pd.read_excel(file)

        df = df.fillna("")
        df = df.astype(str)

        required_cols = ["question", "optionA", "optionB", "optionC", "optionD", "correctAnswer", "subject", "class"]

        # 🔥 Check columns exist
        for col in required_cols:
            if col not in df.columns:
                return jsonify({"error": f"Missing column: {col}"}), 400

        questions = []
        errors = []

        for index, row in df.iterrows():

            row_num = index + 2  # Excel row number (header ke baad)

            question = row["question"].strip()
            A = row["optionA"].strip()
            B = row["optionB"].strip()
            C = row["optionC"].strip()
            D = row["optionD"].strip()
            correct = row["correctAnswer"].strip().upper()
            subject = row["subject"].strip().lower()
            cls = row["class"].strip().lower()

            # 🔥 VALIDATIONS
            if not question:
                errors.append(f"Row {row_num}: Question missing")

            if not A or not B or not C or not D:
                errors.append(f"Row {row_num}: All options required")

            if correct not in ["A", "B", "C", "D"]:
                errors.append(f"Row {row_num}: CorrectAnswer must be A/B/C/D")

            if not subject:
                errors.append(f"Row {row_num}: Subject missing")

            if not cls:
                errors.append(f"Row {row_num}: Class missing")

            questions.append({
                "question": question,
                "options": [A, B, C, D],
                "correctAnswer": correct,
                "subject": subject,
                "class": cls
            })

        # ❌ Agar errors hain → upload reject
        if errors:
            return jsonify({
                "error": "Validation failed",
                "details": errors
            }), 400

        # ✅ Save only if all good
        mock_collection.delete_many({})
        mock_collection.insert_many(questions)

        return jsonify({"message": "Upload successful ✅"})

    except Exception as e:
        print("ERROR:", e)
        return jsonify({"error": "Upload failed"}), 500

#-------------------MockSubmit--------------
@app.route("/submit-mock", methods=["POST"])
def submit_mock():

    data = request.json
    answers = data.get("answers")
    questions = data.get("questions")  # frontend shuffled list

    if answers is None or questions is None:
        return jsonify({"error": "Missing data"}), 400

    score = 0
    result_details = []

    for i, q in enumerate(questions):

        correct = q.get("correctAnswer")
        user_ans = answers.get(str(i))

        is_correct = user_ans == correct

        if is_correct:
            score += 1

        result_details.append({
            "question": q.get("question"),
            "correctAnswer": correct,
            "yourAnswer": user_ans,
            "isCorrect": is_correct
        })

    return jsonify({
        "total": len(questions),
        "score": score,
        "percentage": round((score / len(questions)) * 100, 2),
        "details": result_details
    })

#--------------------MockResult----------------


@app.route("/get-mock-questions/<cls>/<subject>", methods=["GET"])
def get_mock_questions(cls, subject):

    try:
        questions = list(
            mock_collection.aggregate([
                {
                    "$match": {
                        "class": cls,
                        "subject": subject
                    }
                },
                {
                    "$sample": {"size": 50}   #Sirf 50 random questions
                },
                {
                    "$project": {"_id": 0}
                }
            ])
        )

        return jsonify(questions)

    except Exception as e:
        return jsonify({"error": "Failed", "msg": str(e)}), 500
    

#------------------admin Result-----------------
@app.route("/all-results", methods=["GET"])
def all_results():
    results = list(results_collection.find({}, {"_id": 0}))

    formatted = []
    for r in results:
        formatted.append({
            "studentId": r.get("studentId"),
            "examCode": r.get("examCode") or r.get("examcode"),
            "score": r.get("score"),
            "total": r.get("total"),
            "status": r.get("status", "hidden")
        })

    return jsonify(formatted)




@app.route("/publish-by-exam/<examCode>", methods=["PUT"])
def publish_by_exam(examCode):
    try:
        results_collection.update_many(
            {"examCode": examCode},
            {"$set": {"status": "published"}}
        )
        return jsonify({"message": "All results published"})
    except Exception as e:
        return jsonify({"error": str(e)})
    



@app.route("/hide-by-exam/<examCode>", methods=["PUT"])
def hide_by_exam(examCode):
    try:
        results_collection.update_many(
            {"examCode": examCode},
            {"$set": {"status": "hidden"}}
        )
        return jsonify({"message": "All results hidden"})
    except Exception as e:
        return jsonify({"error": str(e)})





@app.route("/students", methods=["GET"])
def get_students():
    students = list(db.students.find({}, {"_id": 0}))

    # 🔥 normalize key
    for s in students:
        if "StudentId" in s:
            s["studentId"] = s.pop("StudentId")

    return jsonify(students)

@app.route("/student/<id>", methods=["GET"])
def get_single_student(id):

    student = db.students.find_one(
        {"StudentId": id},   # ✅ IMPORTANT (ObjectId nahi)
        {"_id": 0}
    )

    if not student:
        return jsonify({"error": "Student not found"}), 404

    return jsonify(student)


#=================Admin student management====================

@app.route("/student/<id>", methods=["GET"])
def get_student(id):
    try:
        student = students.find_one({"StudentId": id}, {"_id": 0})

        if student:
            return jsonify(student)

        return jsonify({"error": "Student not found"}), 404

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route("/add-exam", methods=["POST"])
def add_exam():
    try:
        data = request.json

        exam = {
            
            "examDate": data.get("examDate"),
            "examTime": data.get("examTime"),
            "reportingTime": data.get("reportingTime"),
            "examMode": data.get("examMode"),
            "examCode": data.get("examCode"),
            "subject": data.get("subject")
        }

        exam_collection.insert_one(exam)

        return jsonify({"message": "✅ Exam added successfully"})

    except Exception as e:
        return jsonify({"error": str(e)})
    
@app.route("/get-exam/<student_id>", methods=["GET"])
def get_exam(student_id):
    try:
        student = db.students.find_one(
            {"studentId": student_id},
            {"_id": 0}
        )

        if not student:
            return jsonify({"error": "Student not found"}), 404

        # ✅ FIXED SUBJECT
        subject = student.get("subject") or student.get("Subject")

        exam = db.exams.find_one(
            {"subject": subject},
            {"_id": 0},
            sort=[("examDate", -1)]
        )

        if not exam:
            return jsonify({"error": "Exam not found"}), 404

        return jsonify(exam)

    except Exception as e:
        return jsonify({"error": str(e)}), 500

#===============Skill Report====================
@app.route("/get-skill-result/<examCode>/<studentId>")
def get_skill_result(examCode, studentId):

    print("API HIT 👉", examCode, studentId)

    examCode = examCode.strip()
    studentId = studentId.strip()

    # 🔍 STEP 1: FIND STUDENT RESULT
    result = db.examResults.find_one({
        "examCode": {"$regex": f"^{examCode}$", "$options": "i"},
        "studentId": {"$regex": f"^{studentId}$", "$options": "i"}
    })

    # ❌ NOT FOUND
    if not result:
        return jsonify({"error": "Result not found"})

    # 🔥 STATUS CHECK (MAIN LOGIC)
    if result.get("status") != "published":
        return jsonify({"error": "Result not declared yet"})

    # 🏆 STEP 2: GET ALL RESULTS OF SAME EXAM (ONLY PUBLISHED)
    all_results = list(db.examResults.find({
        "examCode": {"$regex": f"^{examCode}$", "$options": "i"},
        "status": "published"
    }))

    # 🔥 STEP 3: SORT BY SCORE
    all_results.sort(key=lambda x: x.get("score", 0), reverse=True)

    # 🧠 STEP 4: RANK CALCULATION
    rank = 1
    for i in range(len(all_results)):

        if i > 0 and all_results[i]["score"] < all_results[i-1]["score"]:
            rank = i + 1

        db.examResults.update_one(
            {"_id": all_results[i]["_id"]},
            {"$set": {"rank": rank}}
        )

        # current student rank pakad le
        if all_results[i]["studentId"].lower() == studentId.lower():
            student_rank = rank

    # 🔍 STEP 5: FINAL DATA FETCH
    final_result = db.examResults.find_one({
        "examCode": {"$regex": f"^{examCode}$", "$options": "i"},
        "studentId": {"$regex": f"^{studentId}$", "$options": "i"},
        "status": "published"
    }, {"_id": 0})

    print("FINAL RESULT 👉", final_result)

    return jsonify({
        "score": final_result.get("score", 0),
        "total": final_result.get("total", 0),
        "answers": final_result.get("answers", []),
        "correctAnswers": final_result.get("correctAnswers", []),
        "questions": final_result.get("questions", []),

        # 🔥 RANK
        "rank": final_result.get("rank", "-"),

        # 🔥 STATUS (frontend ke liye)
        "status": "published"
    })
#=========Rank System Admin===========#
@app.route("/top-national", methods=["GET"])
def top_national():
    exam_code = request.args.get("examCode")

    match_stage = {"status": "published"}

    if exam_code:
        match_stage["examCode"] = exam_code

    pipeline = [
        {"$match": match_stage},

        {
            "$lookup": {
                "from": "students",
                "localField": "studentId",
                "foreignField": "studentId",
                "as": "student"
            }
        },
        {"$unwind": "$student"},

        {"$sort": {"score": -1}},
        {"$limit": 5},

        {
            "$project": {
                "_id": 0,
                "name": "$student.name",
                "score": 1
            }
        }
    ]

    return jsonify(list(results_collection.aggregate(pipeline)))



@app.route("/top-state/<state>", methods=["GET"])
def top_state(state):
    exam_code = request.args.get("examCode")

    match_stage = {"status": "published"}

    if exam_code:
        match_stage["examCode"] = exam_code

    pipeline = [
        {"$match": match_stage},

        {
            "$lookup": {
                "from": "students",
                "localField": "studentId",
                "foreignField": "studentId",
                "as": "student"
            }
        },
        {"$unwind": "$student"},

        {
            "$match": {
                "student.state": {
                    "$regex": f"^{state.strip()}$",
                    "$options": "i"
                }
            }
        },

        {"$sort": {"score": -1}},
        {"$limit": 5},

        {
            "$project": {
                "_id": 0,
                "name": "$student.name",
                "score": 1
            }
        }
    ]

    return jsonify(list(results_collection.aggregate(pipeline)))


@app.route("/top-city/<city>", methods=["GET"])
def top_city(city):
    exam_code = request.args.get("examCode")

    match_stage = {"status": "published"}

    if exam_code:
        match_stage["examCode"] = exam_code

    pipeline = [
        {"$match": match_stage},

        {
            "$lookup": {
                "from": "students",
                "localField": "studentId",
                "foreignField": "studentId",
                "as": "student"
            }
        },
        {"$unwind": "$student"},

        {
            "$match": {
                "student.city": {
                    "$regex": city.strip(),
                    "$options": "i"
                }
            }
        },

        {"$sort": {"score": -1}},
        {"$limit": 5},

        {
            "$project": {
                "_id": 0,
                "name": "$student.name",
                "score": 1
            }
        }
    ]

    return jsonify(list(results_collection.aggregate(pipeline)))

#=============Find student by name or id (SChool)================
@app.route("/school/results", methods=["POST"])
def school_results():
    try:
        data = request.json

        school_code = data.get("school_code")
        selectedClass = data.get("class")
        subject = data.get("subject")

        print("REQUEST:", data)

        query = {"school_code": school_code}

        if selectedClass:
            query["class"] = str(selectedClass)

        if subject:
            query["subject"] = subject.lower()

        print("QUERY:", query)

        students = list(db["students"].find(query, {"_id": 0}))

        return jsonify({
            "total": len(students),
            "students": students
        })

    except Exception as e:
        print("ERROR:", str(e))
        return jsonify({"error": str(e)}), 500
    #------------------Bulk registration payment (SChool)------------------#
@app.route("/school/all-students", methods=["POST"])
def get_all_students():
    data = request.json
    school_code = data.get("school_code")

    students_list = list(
        db["students"]
        .find({"school_code": school_code}, {"_id": 0})
        .sort("class", 1)   # 🔥 class wise sorting
    )

    return jsonify({
        "students": students_list
    })



@app.route("/school/update-all-payment", methods=["POST"])
def update_all_payment():
    try:
        data = request.get_json()
        school_code = data.get("school_code")

        if not school_code:
            return jsonify({"message": "School code missing"}), 400

        print("School Code:", school_code)

        # 🔥 DEBUG: pehle check karo kitne students hai
        total = db["students"].count_documents({"school_code": school_code})
        print("TOTAL STUDENTS:", total)

        # 🔥 UPDATE
        result = db["students"].update_many(
            {
                "school_code": school_code,
                "$or": [
                    {"payment_status": "unsuccessful"},
                    {"payment_status": {"$exists": False}},
                    {"payment_status": ""}
                ]
            },
            {
                "$set": {"payment_status": "pending"}
            }
        )

        print("UPDATED:", result.modified_count)

        return jsonify({
            "message": "Pay All Success",
            "total_students": total,
            "updated": result.modified_count
        }), 200

    except Exception as e:
        print("ERROR:", str(e))
        return jsonify({"message": "Server error", "error": str(e)}), 500



@app.route("/school/save-payment-method", methods=["POST"])
def save_payment_method():
    data = request.json

    school_code = data.get("school_code")
    payment_method = data.get("payment_method")
    payment_details = data.get("payment_details")

    if not school_code:
        return jsonify({"message": "School code missing"}), 400

    # 🔥 ALL STUDENTS UPDATE
    result = db["students"].update_many(
        {"school_code": school_code},
        {
            "$set": {
                "payment_method": payment_method,
                "payment_details": payment_details
            }
        }
    )

    return jsonify({
        "message": "Payment method saved",
        "updated": result.modified_count
    }), 200






@app.route("/school/update-payment", methods=["POST", "OPTIONS"])
def update_payment_status():

    # 🔥 CORS preflight handle
    if request.method == "OPTIONS":
        return jsonify({"message": "OK"}), 200

    data = request.json
    studentId = data.get("studentId")

    db["students"].update_one(
        {"StudentId": studentId},
        {"$set": {"payment_status": "pending"}}
    )

    return jsonify({"message": "Payment moved to pending"}), 200
#------------------Bulk registration payment (Admin) END------------------#
@app.route("/admin/all-students", methods=["GET"])
def admin_all_students():

    # ❌ PURANA (galat)
    # {"payment_status": "pending"}

    # ✅ NAYA (sab show hoga)
    students = list(
        db["students"].find({}, {"_id": 0})
    )

    final_data = []

    for s in students:
        school = db["schools"].find_one(
            {"school_code": s.get("school_code")},
            {"_id": 0}
        )

        final_data.append({
            "name": s.get("name"),
            "class": s.get("class"),
            "email": s.get("email"),
            "phone": s.get("phone"),
            "subject": s.get("subject"),
            "payment_status": s.get("payment_status"),
            "payment_method": s.get("payment_method", "N/A"),

            "school_name": school.get("institutionName") if school else "N/A",
            "school_code": s.get("school_code"),
            "address": school.get("address") if school else "N/A"
        })

    return jsonify({"students": final_data})






# ==============payemt plus studentlist=========
@app.route("/admin/approve-school", methods=["POST"])
def approve_school():

    data = request.json
    school_code = data.get("school_code")

    if not school_code:
        return jsonify({"message": "School code missing"}), 400

    result = db["students"].update_many(
        {
            "school_code": school_code,
            "payment_status": "pending"
        },
        {
            "$set": {"payment_status": "successful"}
        }
    )

    return jsonify({
        "message": "School payments approved",
        "updated": result.modified_count
    }), 200

#Studebt payment unpiad or paid #-------------------
@app.route("/api/student/<student_id>", methods=["GET"])
def get_piad_student(student_id):
    student_id = student_id.strip()

    def normalize(value):
        return str(value or "").strip().lower()

    def build_response(data):
        cls = data.get("class") or data.get("student_class")

        status = normalize(
            data.get("payment_status")
            or data.get("paymentStatus")
            or data.get("payment")
            or data.get("status")
        )

        is_paid = status in [
            "success",
            "successful",
            "paid",
            "completed",
            "succeeded"
        ]

        return {
            "name": data.get("student_name") or data.get("name"),
            "class": cls if cls else "N/A",
            "studentId": data.get("StudentId"),
            "payment_status": "paid" if is_paid else "unpaid"
        }

    # 🔥 1. registrations first
    reg = registrations.find_one({"StudentId": student_id})
    if reg:
        return jsonify(build_response(reg))

    # 🔥 2. fallback students
    student = students.find_one({"StudentId": student_id})
    if student:
        return jsonify(build_response(student))

    return jsonify({"message": "Student not found"}), 404

#-----------------Check Exam Status-----------------
@app.route("/check-exam", methods=["POST", "OPTIONS"])
def check_exam():

    if request.method == "OPTIONS":
        return jsonify({}), 200

    data = request.json
    student_id = data.get("studentId")
    exam_code = data.get("examCode")

    result = results_collection.find_one({
        "studentId": student_id,
        "examCode": exam_code
    })

    if result:
        return jsonify({"alreadyGiven": True})
    else:
        return jsonify({"alreadyGiven": False})
    
    #------------------Admit Card permissions------------------#
@app.route("/get-admit-card/<student_id>", methods=["GET"])
def get_admit_card(student_id):

    registrations = db["registrations"]
    exams = db["exams"]

    # 🔍 Student
    student = registrations.find_one({"StudentId": student_id})

    if not student:
        return jsonify({"error": "Student not found"}), 404

    # ❌ Payment
    if student.get("payment_status") != "success":
        return jsonify({"error": "Payment not completed"}), 403

    # ❌ Admin
    if student.get("admit_permission") != True:
        return jsonify({"error": "Admit card not released by admin"}), 403

    # 🔥 Subject match
    exam = exams.find_one({
        "subject": student.get("subject")
    })

    if not exam:
        return jsonify({"error": "Exam not found for this subject"}), 404

    # ✅ Response
    return jsonify({
        "student": {
            "StudentId": student.get("StudentId"),
            "student_name": student.get("student_name"),
            "dob": student.get("dob"),
            "class": student.get("class"),
            "subject": student.get("subject"),
        },
        "exam": {
            "subject": exam.get("subject"),
            "examDate": exam.get("examDate"),
            "examTime": exam.get("examTime"),
            "reportingTime": exam.get("reportingTime"),
            "examMode": exam.get("examMode"),
            "examCode": exam.get("examCode")
        }
    })


@app.route("/admin/alls-students", methods=["GET"])
def get_alls_students():
    registrations = db["registrations"]

    students = list(
        registrations.find({}, {"_id": 0})
    )

    return jsonify({"data": students})


@app.route("/admin/admit-permission/<student_id>", methods=["PUT"])
def update_admit_status(student_id):

    registrations = db["registrations"]
    data = request.json

    new_status = data.get("admit_permission")

    result = registrations.update_one(
        {"StudentId": student_id},  # ⚠️ match with DB
        {"$set": {"admit_permission": new_status}}
    )

    if result.matched_count == 0:
        return jsonify({"error": "Student not found"}), 404

    return jsonify({
        "message": f"Admit permission updated"
    }), 200

#---------------Membership Management-----------------
#--------------membershipsignup-------------
@app.route("/api/membership/signup", methods=["POST"])
def membership_signup():
    data = request.get_json()

    # ❌ SAME EMAIL CHECK
    existing = memberships.find_one({"email": data.get("email")})
    if existing:
        return jsonify({"message": "Email already registered"}), 400

    hashed_password = generate_password_hash(data.get("password"))

    memberships.insert_one({
        "membershipId": data.get("membershipId"),
        "bhayatId": data.get("bhayatId"),
        "name": data.get("name"),
        "email": data.get("email"),
        "password": hashed_password,
        "roleType": data.get("roleType"),
        "membershipType": data.get("membershipType"),   # ✅ NEW
        "morcha": data.get("morcha"),                   # ✅ NEW
        "field": data.get("field"),
        "state": data.get("state"),
        "pincode": data.get("pincode"),
        "city": data.get("city"),
        "joiningDate": data.get("joiningDate"),
        "referredCode": data.get("membershipId")
    })

    return jsonify({"message": "Membership Created"})

#-------------------membership profile-----------
@app.route("/api/membership/<membership_id>", methods=["GET"])
def get_membership(membership_id):
    try:
        member = memberships.find_one({"membershipId": membership_id})

        if not member:
            return jsonify({"message": "Not found"}), 404

        member["_id"] = str(member["_id"])
        member.pop("password", None)

        return jsonify(member)

    except Exception as e:
        print(e)
        return jsonify({"message": "Server error"}), 500


#-------------membershipeditpro--------------

@app.route("/api/membership/update/<membership_id>", methods=["PUT"])
def update_membership(membership_id):
    try:
        data = request.get_json()

        memberships.update_one(
            {"membershipId": membership_id},
            {
                "$set": {
                    "name": data.get("name"),
                    "email": data.get("email"),
                    "phone": data.get("phone"),
                    "bhayatId": data.get("bhayatId"),
                    "roleType": data.get("roleType"),
                    "field": data.get("field"),
                    "state": data.get("state"),
                    "city": data.get("city"),
                    "pincode": data.get("pincode"),
                    "blood_group": data.get("blood_group")
                }
            }
        )

        return jsonify({"message": "Profile updated successfully"})

    except Exception as e:
        print("UPDATE ERROR:", e)
        return jsonify({"message": "Server error"}), 500

#---------------------membershiplogin------------

@app.route("/api/membership/login", methods=["POST"])
def membership_login():
    try:
        data = request.get_json()

        user = memberships.find_one({"email": data.get("email")})

        if not user:
            return jsonify({
                "success": False,
                "message": "Email not found"
            }), 404

        # 🔐 password check
        if not check_password_hash(user["password"], data.get("password")):
            return jsonify({
                "success": False,
                "message": "Invalid password"
            }), 400

        # ❌ remove password before sending
        user["_id"] = str(user["_id"])
        user.pop("password", None)

        return jsonify({
            "success": True,
            "message": "Login successful",
            "user": user
        })

    except Exception as e:
        print("LOGIN ERROR:", e)
        return jsonify({
            "success": False,
            "message": "Server error"
        }), 500


#------------------memberrefer---------------
@app.route("/get-member/<code>", methods=["GET"])
def get_member(code):

    user = memberships.find_one({"referredCode": code})

    if not user:
        return jsonify({"message": "Member not found"}), 404

    refs = user.get("totalReferrals", 0)

    # ⭐ Rank Logic (clean & reusable)
    if refs <= 10:
        rank = "⭐ Beginner"
    elif refs <= 50:
        rank = "⭐⭐ Rising Star"
    elif refs <= 100:
        rank = "⭐⭐⭐ Pro Referrer"
    else:
        rank = "⭐⭐⭐⭐ Superstar 🌟"

    return jsonify({
        "referredCode": user.get("referredCode"),
        "totalReferrals": refs,
        "creditPoints": user.get("creditPoints", 0),
        "rank": rank
    }), 200
    

if __name__ == "__main__":
    app.run(debug=True)

