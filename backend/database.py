from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017/")
db = client["olympiad_db"]

admins = db["admins"]
otps = db["admin_otps"]