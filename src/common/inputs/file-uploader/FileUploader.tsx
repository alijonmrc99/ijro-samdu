import { ChangeEvent, FC } from "react";
import { UseFormSetValue } from "react-hook-form";
import { uploadFile } from "../../utils/functions";
interface FileUploaderProps {
    // onChange: (value: any) => void,
    name: string,
    filePath: string,
    setValue: UseFormSetValue<any>,
}
export const FileUploader: FC<FileUploaderProps> = ({ setValue, name, filePath }) => {

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length) {

            uploadFile(event.target.files[0], filePath).then(data => {
                setValue('id', data?.id)
            })


        }
    }
    return (
        <div className="image-uploader">
            <input onChange={onChange} name={name} type="file" accept="application/msword, application/vnd.ms-powerpoint,text/plain, application/pdf" />
        </div>
    )
}