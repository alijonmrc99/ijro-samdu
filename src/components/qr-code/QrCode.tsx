import { QRCode } from 'react-qrcode-logo';
import { FC } from "react";
import logo from '../../assets/logo copy.png';
import { Flex } from 'antd';
export const QrCode: FC<{ value: string, status: "seen" | "approved" | "rejected" | null }> = ({ value, status }) => {
    if (status === "approved") {
        return (
            <Flex justify='center'>
                <QRCode value={`${document.location.origin}/check-documents/${value}`}
                    size={130}
                    logoImage={logo}
                    logoWidth={30}
                    eyeRadius={[
                        [2, 2, 0, 2], // top/left eye
                        [2, 2, 2, 0], // top/right eye
                        [2, 0, 2, 2], // bottom/left
                    ]}
                />
            </Flex>
        )
    }
    else return ""
} 