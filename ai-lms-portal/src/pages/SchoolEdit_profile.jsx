











import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function SchoolEditProfile() {

  const navigate = useNavigate();
  const location = useLocation();

  const [logoPreview, setLogoPreview] = useState("");
  const [facilityInput, setFacilityInput] = useState("");
  const [facilities, setFacilities] = useState([]);
  const [classes, setClasses] = useState([]);

  const [form, setForm] = useState({
    school_name: "",
    school_address: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
    school_email: "",
    school_phone: "",
    affiliation: "",
    school_code: "",
    principal_name: "",
    principal_email: "",
    principal_phone: "",
    total_students: "",
    contact_phone: "",
    contact_email: "",
    website: "",
    contact_city: "",
    contact_state: "",
    contact_pincode: ""
  });

useEffect(() => {

  let data = location.state;

  if (!data) {
    const savedSchool = JSON.parse(localStorage.getItem("school") || "{}");
    data = savedSchool;
  }

  if (data) {

    setForm({
      school_name: data.school_name || data.institutionName || "",
      school_address: data.school_address || data.address || "",
      city: data.city || data.district || "",
      state: data.state || "",
      country: data.country || "",
      pincode: data.pincode || "",
      school_email: data.school_email || data.email || "",
      school_phone: data.school_phone || data.mobile || "",
      affiliation: data.affiliation || "",
      school_code: data.school_code || data.schoolCode || "",
      principal_name: data.principal_name || data.principalName || "",
      principal_email: data.principal_email || "",
      principal_phone: data.principal_phone || "",
      total_students: data.total_students || "",
      contact_phone: data.contact_phone || "",
      contact_email: data.contact_email || "",
      website: data.website || "",
      contact_city: data.contact_city || "",
      contact_state: data.contact_state || "",
      contact_pincode: data.contact_pincode || ""
    });

    setFacilities(data.facilities || []);
    setClasses(data.classes || []);

    if (data.logo) {
      setLogoPreview(data.logo);
    }

  }

}, [location.state]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleLogoChange = (e) => {

    const file = e.target.files[0];

    if (file) {

      const reader = new FileReader();

      reader.onload = () => {
        setLogoPreview(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleClassChange = (cls) => {

    if (classes.includes(cls)) {
      setClasses(classes.filter(c => c !== cls));
    } else {
      setClasses([...classes, cls]);
    }

  };

  const addFacility = () => {

    if (!facilityInput.trim()) return;

    setFacilities([...facilities, facilityInput]);
    setFacilityInput("");

  };

  const removeFacility = (index) => {

    setFacilities(facilities.filter((_, i) => i !== index));

  };

const handleSubmit = async (e) => {

  e.preventDefault();

  try {

    const data = {
      institutionName: form.school_name,
      address: form.school_address,
      district: form.city,
      state: form.state,
      country: form.country,
      pincode: form.pincode,
      email: form.school_email,
      mobile: form.school_phone,
      affiliation: form.affiliation,
      schoolCode: form.school_code,
      principalName: form.principal_name,
      principalEmail: form.principal_email,
      principalPhone: form.principal_phone,
      totalStudents: form.total_students,
      website: form.website,
      classes,
      facilities,
      logo: logoPreview
    };

    console.log("Sending Data:", data);

    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/school/edit-profile`,
      data
    );

    alert(res.data.message);

    localStorage.setItem("school", JSON.stringify(data));

    navigate(-1, { state: data });

  } catch (error) {

    console.log("Error:", error.response?.data);
    alert("Profile Save Failed");

  }

};

  return (

    <div className="mainBg p-8 min-h-screen">

      <div className="max-w-6xl mx-auto glassCard p-10">

        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">

          <h1 className="titleText">
            Edit School Profile
          </h1>

          <div className="text-center">

            <img
              src={logoPreview}
              alt="school logo"
              className="logoImg"
            />

            <label className="uploadBtn">

              Upload Logo

              <input
                type="file"
                onChange={handleLogoChange}
                className="hidden"
              />

            </label>

          </div>

        </div>

        <form onSubmit={handleSubmit} className="space-y-10">

          <div className="glassInner">
            <h2 className="sectionTitle">School Information</h2>

            <div className="grid md:grid-cols-2 gap-4">
              <input name="school_name" value={form.school_name} onChange={handleChange} placeholder="School Name" className="inputStyle"/>
              <textarea name="school_address" value={form.school_address} onChange={handleChange} placeholder="School Address" className="inputStyle"/>
              <input name="city" value={form.city} onChange={handleChange} placeholder="City" className="inputStyle"/>
              <input name="state" value={form.state} onChange={handleChange} placeholder="State" className="inputStyle"/>
              <input name="country" value={form.country} onChange={handleChange} placeholder="Country" className="inputStyle"/>
              <input name="pincode" value={form.pincode} onChange={handleChange} placeholder="Pincode" className="inputStyle"/>
              <input name="school_email" value={form.school_email} onChange={handleChange} placeholder="School Email" className="inputStyle"/>
              <input name="school_phone" value={form.school_phone} onChange={handleChange} placeholder="School Phone" className="inputStyle"/>
              <input name="affiliation" value={form.affiliation} onChange={handleChange} placeholder="Affiliation" className="inputStyle"/>
              <input name="school_code" value={form.school_code} onChange={handleChange} placeholder="School Code" className="inputStyle"/>
            </div>
          </div>

          <div className="glassInner">
            <h2 className="sectionTitle">Principal Information</h2>

            <div className="grid md:grid-cols-2 gap-4">
              <input name="principal_name" value={form.principal_name} onChange={handleChange} placeholder="Principal Name" className="inputStyle"/>
              <input name="principal_email" value={form.principal_email} onChange={handleChange} placeholder="Principal Email" className="inputStyle"/>
              <input name="principal_phone" value={form.principal_phone} onChange={handleChange} placeholder="Principal Phone" className="inputStyle"/>
              <input name="total_students" value={form.total_students} onChange={handleChange} placeholder="Total Students" className="inputStyle"/>
            </div>
          </div>

          <div className="glassInner">
            <h2 className="sectionTitle">Classes Available</h2>

            <div className="grid grid-cols-3 gap-3">
              {["Class 6","Class 7","Class 8","Class 9","Class 10","Class 11","Class 12"].map((cls,index)=>(
                <label key={index} className="checkboxLabel">
                  <input
                    type="checkbox"
                    checked={classes.includes(cls)}
                    onChange={()=>handleClassChange(cls)}
                  />
                  {cls}
                </label>
              ))}
            </div>
          </div>

          <div className="glassInner">
            <h2 className="sectionTitle">Facilities</h2>

            <div className="flex gap-2">
              <input
                value={facilityInput}
                onChange={(e)=>setFacilityInput(e.target.value)}
                placeholder="Add Facility"
                className="inputStyle w-full"
              />

              <button
                type="button"
                onClick={addFacility}
                className="btnPrimary"
              >
                Add
              </button>
            </div>

            <div className="flex flex-wrap gap-3 mt-5">
              {facilities.map((f,index)=>(
                <div key={index} className="tag">
                  {f}
                  <span onClick={()=>removeFacility(index)}>×</span>
                </div>
              ))}
            </div>
          </div>

          <div className="glassInner">
            <h2 className="sectionTitle">Contact Information</h2>

            <div className="grid md:grid-cols-2 gap-4">
              <input name="contact_phone" value={form.contact_phone} onChange={handleChange} placeholder="Contact Phone" className="inputStyle"/>
              <input name="contact_email" value={form.contact_email} onChange={handleChange} placeholder="Contact Email" className="inputStyle"/>
              <input name="website" value={form.website} onChange={handleChange} placeholder="Website" className="inputStyle"/>
              <input name="contact_city" value={form.contact_city} onChange={handleChange} placeholder="City" className="inputStyle"/>
              <input name="contact_state" value={form.contact_state} onChange={handleChange} placeholder="State" className="inputStyle"/>
              <input name="contact_pincode" value={form.contact_pincode} onChange={handleChange} placeholder="Pincode" className="inputStyle"/>
            </div>
          </div>

          <button
            type="submit"
            className="saveBtn"
          >
            Save School Profile
          </button>

        </form>

      </div>

<style>{`

.mainBg{
  background: linear-gradient(135deg,#001f2a,#00394d,#001a1f);
}

.glassCard{
  background: rgba(255,255,255,0.07);
  backdrop-filter: blur(25px);
  border-radius:25px;
  box-shadow:0 20px 60px rgba(0,255,255,0.15);
}

.glassInner{
  background: rgba(255,255,255,0.05);
  padding:20px;
  border-radius:18px;
  transition:0.4s;
}

.glassInner:hover{
  transform: translateY(-5px);
  box-shadow:0 10px 30px rgba(255,0,150,0.2);
}

.titleText{
  font-size:34px;
  font-weight:bold;
  background: linear-gradient(90deg,#00ffff,#ff4da6);
  -webkit-background-clip:text;
  -webkit-text-fill-color:transparent;
}

.sectionTitle{
  font-size:22px;
  margin-bottom:12px;
  color:#00eaff;
}

.logoImg{
  width:130px;
  height:130px;
  border-radius:50%;
  border:4px solid #00ffff;
  object-fit:cover;
}

.uploadBtn{
  display:inline-block;
  margin-top:10px;
  padding:8px 16px;
  border-radius:20px;
  background: linear-gradient(90deg,#00ffff,#ff4da6);
  cursor:pointer;
}

.inputStyle{
  padding:12px;
  border-radius:10px;
  border:none;
  background: rgba(255,255,255,0.08);
  color:white;
}

.inputStyle::placeholder{
  color:#ccc;
}

.btnPrimary{
  background: linear-gradient(90deg,#00ffff,#ff4da6);
  padding:10px 20px;
  border-radius:10px;
  color:white;
}

.checkboxLabel{
  display:flex;
  gap:6px;
  align-items:center;
}

.tag{
  background: rgba(255,255,255,0.1);
  padding:6px 12px;
  border-radius:20px;
}

.saveBtn{
  width:100%;
  padding:14px;
  border-radius:12px;
  background: linear-gradient(90deg,#00ffff,#ff4da6);
  font-size:18px;
  color:white;
}

`}</style>

    </div>

  );

}

export default SchoolEditProfile;