export interface FileUploadProps {
    file?: File;
    isValid?: boolean;
    onChange: (file: File) => void;
}
