
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


app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

SCREENSHOT_FOLDER = "screenshots"
os.makedirs(SCREENSHOT_FOLDER, exist_ok=True)

# ================= DATABASE =================
# client = MongoClient("mongodb://localhost:27017/")
client =  MongoClient("mongodb+srv://arpits2618_db_user:Pqe5Pody5fuTnLhN@bhayat.d8qthl6.mongodb.net/olympiad_db")
db = client["olympiad_db"]

users = db["users"]
collection = db["registrations"]
students = db["students"]
admins = db["admins"]
admin_otps = db["admin_otps"]
schools = db["schools"]
questions_collection = db["questions"]
students_collection = db["students"]

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
    data = request.json
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"success": False, "message": "Email and Password required"}), 400

    student = students.find_one({"email": email, "password": password})

    if student:
        return jsonify({
            "success": True,
            "message": "Login Successful",
            "student": {
                "name": student.get("name", ""),
                "email": student.get("email", ""),
                "phone": student.get("phone", ""),
                "StudentId": student.get("StudentId", ""),
                "dob": student.get("dob", ""),
                "school": student.get("school", ""),
                "class": student.get("student_class", ""),
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
                "referredCode": student.get("StudentId", "")
            }
        }), 200
    else:
        return jsonify({
            "success": False,
            "message": "Invalid Email or Password"
        }), 401


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


# ================= ADMIN - GET STUDENTS =================
@app.route("/admin/students", methods=["GET"])
def get_students():

    students = db["students"]
    data = []

    for s in students.find():

        data.append({
            "studentId": str(s["_id"]),
            "name": s.get("name"),
            "class": s.get("class"),
            "school": s.get("school"),
            "email": s.get("email")
        })

    return jsonify(data)




# ================= STUDENT REGISTER =================
# @app.route("/register", methods=["POST"])
# def register():

#     data = request.get_json()

#     if not data:
#         return jsonify({"error": "No data received"}), 400

#     # referral code jo student ne dala
#     referred_code = data.get("referredBy", "").strip()

#     # frontend se studentId aana chahiye
#     student_id = data.get("StudentId", "").strip()


#     data["StudentId"] = student_id
#     data["totalReferrals"] = 0
#     data["creditPoints"] = 0

#     # ✅ PAYMENT STATUS ADD
#     data["payment_status"] = "pending"
#     data["payment_id"] = None

#     # student save
#     collection.insert_one(data)

#     # ===== referral system =====
#     if referred_code:

#         ref_student = collection.find_one({"StudentId": referred_code})

#         if ref_student:

#             total = ref_student.get("totalReferrals", 0) + 1

#             credit = 10 if ref_student.get("payment_status")== "success" else 5

#             collection.update_one(
#                 {"StudentId": referred_code},
#                 {
#                     "$set": {"totalReferrals": total},
#                     "$inc": {"creditPoints": credit}
#                 }
#             )

#             print("Referral credit added")

#         else:
#             print("Referral student not found:", referred_code)

        

#     return jsonify({
#         "success": True,
#         "message": "Student Registered Successfully",
#         "StudentId": student_id
#     }), 201



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
    existing = collection.find_one({"StudentId": student_id})
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
    collection.insert_one(registration_data)
      
     
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
@app.route("/school/signup", methods=["POST"])
def school_signup():
    data = request.json

    # check existing email
    if schools.find_one({"email": data["email"]}):
        return jsonify({"message": "School already registered"}), 400

    # ---------------------------
    # Hash the password
    # ---------------------------
    password = data["password"]  # plain password from form
    hashed_password = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt())
    # store bytes in DB
    data["password"] = hashed_password

    # insert into DB
    schools.insert_one(data)

    return jsonify({
        "message": "School Registered Successfully"
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

# ================= ADMIN - GET SCHOOLS =================
@app.route("/admin/schools", methods=["GET"])
def get_schools():
    coordinator_login
    schools = db["schools"]
    data = []

    for s in schools.find():
        data.append({
            "schoolId": str(s.get("_id")),
            "name": s.get("school_name"),
            "email": s.get("email"),
            "phone": s.get("phone"),
            "address": s.get("address"),
            "status": s.get("status", "active")
        })

    return jsonify(data)

# ================= ADMIN - BLOCK / UNBLOCK SCHOOL =================
@app.route("/admin/school-status/<id>", methods=["PUT"])
def update_school_status(id):
    data = request.json
    new_status = data.get("status")

    db["schools"].update_one(
        {"_id": ObjectId(id)},
        {"$set": {"status": new_status}}
    )

    return jsonify({"message": f"School status updated to {new_status}"}), 200

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

        # Pending approval check
        if volunteer.get("status") == "pending":
            return jsonify({"message": "Waiting for admin approval"}), 403

        # Blocked check
        if volunteer.get("status") == "blocked":
            return jsonify({"message": "Your account is blocked"}), 403

        stored_password = volunteer["password"]
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

@app.route("/volunteer/profile/<email>", methods=["GET"])
def volunteer_profile(email):

    volunteers = db["volunteers"]

    volunteer = volunteers.find_one({"email": email})

    if not volunteer:
        return jsonify({"error": "Volunteer not found"}), 404

    profile_data = {
        "volunteerId": volunteer.get("volunteerId"),
        "name": volunteer.get("name"),
        "email": volunteer.get("email"),
        "mobile": volunteer.get("mobile"),
        "qualification": volunteer.get("qualification"),
        "skills": volunteer.get("skills"),
        "availability": volunteer.get("availability"),
        "resume_id": volunteer.get("resume_id"),
         "credits": int(volunteer["creditPoints"]) if "creditPoints" in volunteer else 0,
        "totalReferrals": volunteer.get("totalReferrals", 0)
    }

    return jsonify(profile_data), 200


# ================= UPDATE VOLUNTEER PROFILE =================
@app.route("/volunteer/update/<email>", methods=["POST"])
def update_volunteer_profile(email):

    data = request.json

    # 🔥 pehle purana data uthao
    old = db["volunteers"].find_one({"email": email})

    if old:
        # 🔥 merge old + new
        updated = {**old, **data}
    else:
        updated = data

    db["volunteers"].update_one(
        {"email": email},
        {"$set": updated}
    )

    return jsonify({
        "success": True,
        "message": "Volunteer profile updated successfully"
    })

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
             "task": v.get("task", "No Task Assigned")   # ✅ IMPORTANT
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
# ================= VIEW RESUME =================
@app.route("/resume/<id>", methods=["GET"])
def view_resume(id):
    file = fs.get(ObjectId(id))
    return file.read()

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

@app.route("/coordinator-login", methods=["POST"])
def coordinator_login():
    coordinators = db["coordinators"]
    data = request.json

    email = data.get("email")
    password = data.get("password")

    coordinator = coordinators.find_one({"email": email})

    if coordinator:

        # 👇 Pending approval check
        if coordinator.get("status") == "pending":
            return jsonify({"message": "Waiting for admin approval"}), 403

        # 👇 Blocked account check
        if coordinator.get("status") == "blocked":
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

    students = list(collection.find(
        {"referredBy": code},
        {
            "_id":0,
            "student_name":1,
            "class":1,
            "subject":1,
            "school_name":1,
            "email":1
        }
    ))

    return jsonify(students)



# ================= ADMIN - GET COORDINATORS =================

@app.route("/admin/coordinators", methods=["GET"])
def get_coordinators():
    coordinators = db["coordinators"]
    data = []

    for c in coordinators.find():
      data.append({
    "id": str(c.get("_id")),
    "coordinatorId": c.get("coordinatorId"),
    "name": c.get("name"),
    "email": c.get("email"),
    "mobile": c.get("mobile"),
    "qualification": c.get("qualification"),
    "experience": c.get("experience"),
    "status": "approved" if c.get("status") == "active" else c.get("status", "pending"),
    "blocked": c.get("blocked", False),
    "credits": int(c["creditPoints"]) if "creditPoints" in c else 0,
    "task": c.get("task", "None")
})
    return jsonify({"success": True, "data": data})

# ================= ADMIN - GET PENDING COORDINATORS =================

@app.route("/admin/update-coordinator-status/<id>", methods=["PUT"])
def update_coordinator_status(id):
    try:
        data = request.json
        new_status = data.get("status")  # pending / approved / rejected

        if new_status not in ["pending", "approved", "rejected"]:
            return jsonify({"success": False, "message": "Invalid status"}), 400

        result = db["coordinators"].update_one(
            {"coordinatorId": id},
            {"$set": {"status": new_status}}
        )

        if result.matched_count == 0:
            return jsonify({"success": False, "message": "Coordinator not found"}), 404

        return jsonify({
            "success": True,
            "message": f"Status updated to {new_status}"
        })

    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500



# # ================= ADMIN - BLOCK / UNBLOCK COORDINATOR =================
@app.route("/admin/toggle-block/<id>", methods=["PUT"])
def toggle_block(id):
    try:
        coordinator = db["coordinators"].find_one({"coordinatorId": id})

        if not coordinator:
            return jsonify({"success": False, "message": "Not found"}), 404

        new_block_status = not coordinator.get("blocked", False)

        db["coordinators"].update_one(
            {"coordinatorId": id},
            {"$set": {"blocked": new_block_status}}
        )

        return jsonify({
            "success": True,
            "blocked": new_block_status
        })

    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500
    


    # ================= ASSIGN TASK =================
@app.route("/admin/assign-task", methods=["POST"])
def assign_task():
    data = request.json
    coordinator_id = data.get("coordinatorId")
    task = data.get("task")

    if not task:
        return jsonify({"success": False, "message": "Task required"}), 400

    db["coordinators"].update_one(
        {"coordinatorId": coordinator_id},
        {"$set": {"task": task}}
    )

    return jsonify({"success": True})


# ================= ADD CREDITS =================
@app.route("/admin/add-credits", methods=["POST"])
def add_credits():
    data = request.json
    coordinator_id = data.get("coordinatorId")
    credits = int(data.get("credits", 0))

    db["coordinators"].update_one(
        {"coordinatorId": coordinator_id},
        {"$inc": {"credits": credits}}
    )

    return jsonify({"success": True})

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



# Razorpay client
# razorpay_client = razorpay.Client(auth=("rzp_live_SF6LUag8RAirKb", "9Fz1N8AxDtFtOR1RIBW7xhzK"))

# @app.route("/create-order", methods=["POST"])
# def create_order():
#     try:
#         data = request.json
#         amount_rupees = data.get("amount", 1)  # Default 1 ₹ if not provided

#         # Convert to paise
#         amount_paise = amount_rupees * 100

#         order = razorpay_client.order.create({
#             "amount": amount_paise,
#             "currency": "INR",
#             "payment_capture": 1
#         })

#         return jsonify(order)
#     except Exception as e:
#         print("Error creating Razorpay order:", e)
#         return jsonify({"error": str(e)}), 500



razorpay_client = razorpay.Client(auth=("rzp_test_SSLBnarMv2zq8F", "RWweI63CPWQW7kEcv8cYjINR"))

@app.route("/create-order", methods=["POST"])
def create_order():
    try:
        order = razorpay_client.order.create({
            "amount": 100,   # ₹1 = 100 paise
            "currency": "INR",
            "payment_capture": 1
        })

        return jsonify(order)

    except Exception as e:
        return jsonify({"error": str(e)}), 500





# -----------PAYMENT STATUS--------#


# @app.route("/update-payment", methods=["POST"])
# def update_payment():

#     data = request.json
#     student_id = data.get("studentId")
#     status = data.get("status")
#     payment_id = data.get("paymentId")

#     print("DATA:", data)
#     print("STATUS FROM FRONTEND:", status)

#     try:

#         # 1️⃣ Student fetch
#         student = db["registrations"].find_one({"StudentId": student_id})

#         if not student:
#             return jsonify({"error": "Student not found"}), 404

#         referred_code = student.get("referredBy")

#         # 2️⃣ IMPORTANT CONDITION (only first success)
#         if status == "success" and student.get("payment_status", "").lower().strip() != "success":

#             if referred_code:

               
             

#                 # ✅ 2. VOLUNTEER REFERRAL
#                 volunteer = db["volunteers"].find_one({"referralCode": referred_code})

#                 if volunteer:
#                     total = volunteer.get("totalReferrals", 0) + 1

#                     if total <= 10:
#                         credit = 10
#                     elif total <= 50:
#                         credit = 12
#                     else:
#                         credit = 15

#                     db["volunteers"].update_one(
#                         {"referralCode": referred_code},
#                         {
#                             "$set": {"totalReferrals": total},
#                             "$inc": {"creditPoints": credit}
#                         }
#                     )

#                     print("Volunteer credit added")


#                 # ✅ 3. COORDINATOR REFERRAL (FIXED 🔥)
#                 coordinator = db["coordinators"].find_one({"referralCode": referred_code})

#                 if coordinator:
#                     previous_count = coordinator.get("totalReferrals", 0)
#                     new_count = previous_count + 1

#                     # slab logic
#                     if new_count <= 20:
#                         credit = 40
#                     elif new_count <= 50:
#                         credit = 50
#                     elif new_count <= 100:
#                         credit = 60
#                     else:
#                         credit = 70

#                     db["coordinators"].update_one(
#                         {"referralCode": referred_code},
#                         {
#                             "$inc": {"creditPoints": credit},
#                             "$set": {"totalReferrals": new_count}
#                         }
#                     )

#                     print("Coordinator credit added")

#         # 3️⃣ Payment update (always run)
#         db["registrations"].update_one(
#             {"StudentId": student_id},
#             {
#                 "$set": {
#                     "payment_status": status,
#                     "payment_id": payment_id
#                 }
#             }
#         )

#         return jsonify({"message": "Payment status updated"}), 200

#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

    # ============New payment update ==========#
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
        question_data = {
            "examCode": row.get("examCode"),
            "question": row.get("question"),
            "options": [
                row.get("option1"),
                row.get("option2"),
                row.get("option3"),
                row.get("option4")
            ],
            "correctAnswer": str(row.get("correctAnswer"))
        }
        formatted_questions.append(question_data)

    if formatted_questions:
        questions_collection.insert_many(formatted_questions)

    return jsonify({"message": "Questions saved in DB successfully ✅"})






#------------------Question Fetch Exam portal------------------


@app.route("/get-questions/<exam_code>", methods=["GET"])
def get_questions(exam_code):
    questions = list(questions_collection.find({"examCode": exam_code}, {"_id": 0}))
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

# @app.route("/")
# def home():
#     return "Backend is LIVE 🚀"

if __name__ == "__main__":
    app.run(debug=True)

# if __name__ == "__main__":
    
#     port = int(os.environ.get("PORT", 5000))
#     app.run(host="0.0.0.0", port=port)
  