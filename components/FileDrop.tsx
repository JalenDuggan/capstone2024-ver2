import { DragEvent, useState } from "react";
import PDFDisplay from "./PDFDisplay";

export function FileDrop() {
  const [isOver, setIsOver] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  // Define the event handlers
  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsOver(true);
  };

  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsOver(false);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => { //CAN CALL THIS FUNCTION TO SEND PDFS TO DATABASE JUST HAVE TO EDIT UP FUNCTIONALITY
    event.preventDefault();
    setIsOver(false);

    // Fetch the files
    const droppedFiles = Array.from(event.dataTransfer.files);
    setFiles(droppedFiles);

    // Use FileReader to read file content
    droppedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onloadend = () => {
        console.log(reader.result);
      };

      reader.onerror = () => {
        console.error("There was an issue reading the file.");
      };

      reader.readAsDataURL(file);
      return reader;
    });
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "700px",
        width: "500px",
        border: "1px",
        backgroundColor: isOver ? "lightgray" : "black",
        marginTop:50,
        marginLeft: 200,
        position: "fixed",
        zIndex: 2,
        
      }}
    >
      <PDFDisplay file={files.length > 0 ? files[0] : null} />
    </div>
    
  );
}
