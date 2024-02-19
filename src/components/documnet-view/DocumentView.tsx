import { FC } from "react";
import parser from 'html-react-parser';
import './styles.scss'
import { Col, Flex, Row } from "antd";
// import emblem from '../../assets/Emblem_of_Uzbekistan.png'
import blank_top from '../../assets/blank_top.png'
import { QrCode } from "../qr-code";

interface IContent {
    contentText: string,
    status: "seen" | "approved" | "rejected" | null,
    name: string,
    user: string
    job: string,
}

export const DocumentView: FC<IContent> = ({ contentText, status, name, user, job }) => {
    console.log(name);

    return (
        <div className="doc-view-container">
            {
                status === "approved" &&
                <div className="header-view-content">
                    <img style={{ width: "100%" }} src={blank_top} alt="top" />
                    {/* <Row className="header-view-content">
                        <Col span={8}>
                            <p className="left"> O'zbekiston Respublikasi <br />
                                Oliy ta'lim, fan va innovatsiyalar vazirligi <br />
                                Sharof Rashidov nomidagi <br />
                                Samarqand davlat universiteti <br />
                                Universitet xiyoboni, 15, Samarqand, 140104 <br />
                                Tel./Faks (366) 2391140, (366) 2403841 <br />
                                Web: <span>www.samdu.uz</span> <br />
                                E-mail: <span>rektor@samdu.uz</span> <br />
                                STIR 201213338, MFO 00278 <br />
                                SHHR 400110860184017094100079003</p>
                        </Col>
                        <Col span={8}>
                            <img className="emblem" src={emblem} alt="emblem of Uzbekistan" />
                        </Col>
                        <Col span={8}>
                            <p className="left"> Ministry of Higher education, science and <br />
                                innovations of the Republic of Uzbekistan <br />
                                Samarkand State University <br />
                                named after Sharof Rashidov <br />
                                University blvd., 15, Samarkand, 140104 <br />
                                Tel./Fax. (366) 2391140, (366) 2403841 <br />
                                Web: <span>www.samdu.uz</span> <br />
                                E-mail: <span>rektor@samdu.uz</span> <br />
                                ITN 201213338, MFI 00278 <br />
                                C/a 400110860184017094100079003</p>
                        </Col>
                        <Col>
                        </Col>
                    </Row> */}
                    <p className="register-name">{name}</p>
                </div>
            }
            <div className="content-text">{parser(contentText)}</div>
            <p><br /></p>
            <p><br /></p>
            <Row className="footer-text" justify={'space-evenly'}>
                <Col span={10}><p>{job}</p></Col>
                <Col span={5}>
                    <Flex justify="begin">
                        <QrCode status={status} value={name} />
                    </Flex>
                </Col>
                <Col span={6}><p>{user}</p></Col>
            </Row>

        </div >
    )
}