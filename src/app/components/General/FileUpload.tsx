import React, { useState } from 'react';
import { Button } from '@nextui-org/react'; // Import Next UI button component

// Define an enum for attachment types
enum AttachmentType {
    PICTURE = 'PICTURE',
    VIDEO = 'VIDEO',
    ZIP = 'ZIP',
    AUDIO = 'AUDIO'
}

interface FileUploadProps {
    onFileSelect: (file: File, attachmentType: AttachmentType) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect }) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [attachmentType, setAttachmentType] = useState<AttachmentType | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        if (file) {
            setSelectedFile(file);
            // Determine attachment type based on file type
            const fileType = file.type;
            let type: AttachmentType | null = null;
            if (fileType.startsWith('image/')) {
                type = AttachmentType.PICTURE;
            } else if (fileType.startsWith('video/')) {
                type = AttachmentType.VIDEO;
            } else if (fileType === 'application/zip') {
                type = AttachmentType.ZIP;
            } else if (fileType.startsWith('audio/')) {
                type = AttachmentType.AUDIO;
            }
            setAttachmentType(type);
            // Call the onFileSelect callback with selected file and attachment type
            if (type) {
                onFileSelect(file, type);
            }
        }
    };

    const handleClick = () => {
        // Programmatically trigger file input click
        const fileInput = document.getElementById('fileInput');
        if (fileInput) {
            fileInput.click();
        }
    };

    return (
        <div>
            <input
                type="file"
                id="fileInput"
                onChange={handleFileChange}
                style={{ display: 'none' }} // hide the input field visually
            />
            <Button 
            color="primary"
            onClick={handleClick} >
                {/* Use Next UI button with an upload icon */}
              Upload File  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <polyline points="19 12 12 19 5 12" />
                </svg>
            </Button>
            {selectedFile && (
                <p>
                    Selected File: {selectedFile.name} ({attachmentType})
                </p>
            )}
        </div>
    );
};

export default FileUpload;
