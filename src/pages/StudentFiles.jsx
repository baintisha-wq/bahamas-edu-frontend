import { useEffect, useState } from "react";

function StudentFiles() {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const res = await fetch(
          "http://localhost:5000/files",
          {
            headers: {
              Authorization:
                "Bearer " +
                localStorage.getItem("token"),
            },
          }
        );

        const data = await res.json();
        setFiles(data);
      } catch (err) {
        console.log("File fetch error:", err);
      }
    };

    fetchFiles();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Study Materials 📚</h1>

      {files.length === 0 ? (
        <p>No files uploaded yet</p>
      ) : (
        files.map((file) => (
          <div
            key={file._id}
            style={{
              border: "1px solid #ddd",
              padding: 15,
              marginBottom: 10,
              borderRadius: 10,
            }}
          >
            <h3>{file.title}</h3>

            <a
              href={`http://localhost:5000/uploads/${file.filename}`}
              target="_blank"
              rel="noreferrer"
              style={{
                color: "blue",
                textDecoration: "underline",
              }}
            >
              Download / View File
            </a>
          </div>
        ))
      )}
    </div>
  );
}

export default StudentFiles;