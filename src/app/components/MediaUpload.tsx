import { ImagePlus, X } from "lucide-react";
import Image from "next/image";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

interface MediaUploadProps {
  files: File[];
  onChange: (files: File[]) => void;
  error: string | null;
  setError: (msg: string | null) => void;
}

export function MediaUpload({
  files,
  onChange,
  error,
  setError,
}: MediaUploadProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      let updatedFiles = [...files];
      let hasVideo = updatedFiles.some((f) => f.type.startsWith("video"));

      for (const file of acceptedFiles) {
        const isVideo = file.type.startsWith("video");

        // Only allow one video
        if (isVideo && hasVideo) {
          setError("You can only upload 1 video");
          continue;
        }

        // Duplicate check
        if (updatedFiles.some((f) => f.name === file.name)) {
          setError(`File "${file.name}" is already selected`);
          continue;
        }

        // File size check (10MB)
        if (file.size > 10 * 1024 * 1024) {
          setError(`File "${file.name}" exceeds 10MB`);
          continue;
        }

        updatedFiles.push(file);
        if (isVideo) hasVideo = true;
      }

      // Max files check
      if (updatedFiles.length > 4) {
        setError("You can upload up to 4 files");
        updatedFiles = updatedFiles.slice(0, 4);
      }

      onChange(updatedFiles);
    },
    [files, onChange, setError]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [], "video/*": [] },
    onDrop,
  });

  const removeFile = (name: string) => {
    const updated = files.filter((f) => f.name !== name);
    onChange(updated);
    setError(null);
  };

  return (
    <div>
      <label className="block text-sm font-medium mb-2">
        Photo / Video (Optional)
      </label>
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded p-4 text-center cursor-pointer transition ${
          isDragActive ? "bg-gray-100" : ""
        }`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center gap-2">
          <ImagePlus size={48} className="text-gray-400" />
          <p>Drag & drop photos/videos here, or click to browse</p>
          <p className="text-xs text-gray-500">Max 4 files, 10MB each</p>
        </div>
      </div>

      {/* Preview */}
      <div className="mt-3 flex gap-3 flex-wrap">
        {files.map((file) => {
          const isImage = file.type.startsWith("image");
          const isVideo = file.type.startsWith("video");

          return (
            <div key={file.name} className="relative group w-[100px] h-[100px]">
              {isImage && (
                <Image
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  fill
                  className="object-cover rounded border"
                />
              )}
              {isVideo && (
                <video
                  src={URL.createObjectURL(file)}
                  className="w-full h-full object-cover rounded border"
                  muted
                  controls={false}
                />
              )}

              {/* Delete button */}
              <button
                type="button"
                onClick={() => removeFile(file.name)}
                className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
              >
                <X size={14} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
