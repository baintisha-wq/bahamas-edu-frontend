import { useState } from "react";

function UploadFiles() {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    const formData = new FormData();

    formData.append("title", title);
    formData.append("file", file);

    const res = await fetch(
      "http://localhost:5000/upload",
      {
        method: "POST",
        headers: {
          Authorization:
            "Bearer " + localStorage.getItem("token"),
        },
        body: formData,
      }
    );

    const data = await res.json();

    alert("File uploaded successfully!");
    console.log(data);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Upload Study Material</h1>

      <input
        placeholder="File Title"
        onChange={(e) =>
          setTitle(e.target.value)
        }
      />

      <br />
      <br />

      <input
        type="file"
        onChange={(e) =>
          setFile(e.target.files[0])
        }
      />

      <br />
      <br />

      <button onClick={handleUpload}>
        Upload File
      </button>
    </div>
  );
}

export default UploadFiles;