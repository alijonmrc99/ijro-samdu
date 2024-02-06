import { ChangeEvent, FC, useState } from "react";
import { UseFormSetValue, set } from "react-hook-form";
import { uploadFile } from "../../utils/functions";
import { CloudUploadOutlined } from "@ant-design/icons";
import { Col, Row } from "antd";
import { useTranslation } from "react-i18next";
import './styles.scss'
interface FileUploaderProps {
    errorsMassage: string,
    name: string,
    filePath: string,
    setValue: UseFormSetValue<any>,
}
export const FileUploader: FC<FileUploaderProps> = ({ setValue, name, filePath, errorsMassage }) => {
    const { t } = useTranslation();
    const [fileStatus, setFileStatus] = useState(t("choose_file"))

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length) {

            console.log(setValue(name, 1312));

            uploadFile(event.target.files[0], filePath).then(data => {
                if (data?.id) {
                }
                setFileStatus(data?.id || data?.error || "")
            })
        }
    };

    return (
        <div className="file-uploader">
            <label htmlFor="upload-file">
                <Row className="input-box">
                    <Col className="uploader-label" span={12}>
                        <CloudUploadOutlined style={{ marginRight: "10px" }} />{t('file-upload')}
                    </Col>
                    <Col className="text-box" span={12}>
                        {fileStatus}
                    </Col>
                </Row>
                <span style={{ color: "red" }}>{t(errorsMassage)}</span>

                <input id="upload-file"
                    onChange={onChange}
                    name={name}
                    type="file"
                    accept="application/msword, application/vnd.ms-powerpoint,text/plain, application/pdf" />
            </label>
        </div>
    )
}