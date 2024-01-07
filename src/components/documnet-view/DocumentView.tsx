import { FC } from "react";
import parser from 'html-react-parser';
import './styles.scss'
import { Col, Row } from "antd";
import emblem from '../../assets/Emblem_of_Uzbekistan.png'

interface IContent {
    contentText: string,
    status: "seen" | "approved" | "rejected" | null,
}

export const DocumentView: FC<IContent> = ({ contentText, status }) => {
    return (
        <div className="doc-view-container">
            {
                status === "approved" &&
                <Row className="header-view-content">
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
                </Row>
            }
            <div className="content-text">{parser(contentText)}</div>

        </div >
    )
}