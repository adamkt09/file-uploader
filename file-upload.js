import React, { useState } from 'react';

function FileUpload() {
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);

    const handleFileChange = (event) => {  
        const selectedFile = event.target.files[0];
        setFile(selectedFile);

        const filePreview = URL.createObjectURL(selectedFile);
        setPreview(filePreview);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!file) {
            alert("Please select a file first!");
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        fetch('https://your-api-endpoint.com/upload', {
            method: 'POST',
            body: formData,
          })
            .then((response) => response.json())
            .then((data) => {
              console.log('Success:', data);
            })
            .catch((error) => {
              console.error('Error:', error);
            });
        };

    return (  
        <div>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleFileChange} />  {/* Consistent function name */}
                {preview && (
                    <div>
                        <h3>File Preview:</h3>
                        <img src={preview} alt="Preview" style={{ width: '200px' }} />
                    </div>
                )}
                <button type="submit">Upload</button>
            </form>
        </div>
    );
}

export default FileUpload;
