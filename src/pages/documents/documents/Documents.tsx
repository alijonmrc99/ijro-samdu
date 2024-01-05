import { FC } from "react";
import { Editor } from "../../../components/editor";
import { Divider } from "antd";

export const Documents: FC = () => {
    return (
        <div>
            Editorlar
            <Divider orientation="right">Align Bottom</Divider>
            <Editor />
        </div>
    )
}