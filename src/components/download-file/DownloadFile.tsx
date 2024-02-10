import { Button, Flex } from "antd";
import { BASE_AUTH_TOKEN, ENDPOINT_ROOT } from "../../common/constants";
import axios, { AxiosRequestConfig } from "axios";
import qs from "qs";
import { FC } from "react";
import { DownloadOutlined } from "@ant-design/icons";

interface DownloadFileProps {
    path: string,
    fileName: string
}


export const DownlaodFile: FC<DownloadFileProps> = ({ path, fileName }) => {

    const onDownload = async () => {
        try {
            downloadFile(path, fileName)
        } catch (error) {
            console.log(error);
        }
    }
    return <Flex align="center">
        <Button
            type="primary"
            disabled={!fileName}
            icon={<DownloadOutlined />}
            onClick={(e) => { e.stopPropagation(); onDownload() }}
        />
    </Flex>
}

export const downloadFile = async (path: string, fileName: string, params?: any) => {
    const token = localStorage.getItem(BASE_AUTH_TOKEN);

    const headers = { 'Content-Type': 'Blob' }
    const config: AxiosRequestConfig = {
        method: "GET",
        url: `${ENDPOINT_ROOT}/file/${path}/${fileName}`,
        responseType: "arraybuffer",
        headers,
        params: params,
        paramsSerializer: () => {
            return qs.stringify(params, { arrayFormat: 'repeat' })
        }
    };


    try {
        axios.defaults.headers.common = { Authorization: `Bearer ${token}` }

        const response = await axios(config);
        console.log(response.data);
        const url = URL.createObjectURL(new Blob([response.data]))

        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', fileName.length ? fileName : `${Date.now()}.xlsx`);
        document.body.appendChild(link);
        link.click()

    } catch (err) {
        return err
    }
} 