export default function SubjectsSection({ selectedClass }) {
  const subjectMap = {
    "Class 1": ["Math", "English", "EVS"],
    "Class 2": ["Math", "English", "EVS"],
    "Class 3": ["Math", "English", "EVS"],
    "Class 4": ["Math", "English", "EVS", "GK"],
    "Class 5": ["Math", "English", "Science", "Social Studies"],
    "Class 6": ["Math", "English", "Science", "Social Science"],
    "Class 7": ["Math", "English", "Science", "Social Science"],
    "Class 8": ["Math", "English", "Science", "Social Science"],
    "Class 9": ["Math", "Physics", "Chemistry", "Biology"],
    "Class 10": ["Math", "Science", "Social Science", "English"],
    "Class 11": ["Physics", "Chemistry", "Math", "Biology", "Computer Science"],
    "Class 12": ["Physics", "Chemistry", "Math", "Biology", "Computer Science"],
  };

  const subjects = subjectMap[selectedClass] || [];

  if (!selectedClass) {
    return (
      <p className="text-gray-500">
        Please select a class to see subjects.
      </p>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">
        Subjects for {selectedClass}
      </h2>

      <div className="flex flex-wrap gap-3">
        {subjects.map((sub) => (
          <div
            key={sub}
            className="px-4 py-2 bg-white border rounded-lg shadow-sm hover:bg-blue-100 cursor-pointer transition"
          >
            {sub}
          </div>
        ))}
      </div>
    </div>
  );
}