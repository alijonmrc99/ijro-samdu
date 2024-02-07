import { FC, useEffect, useState } from "react";
import { DocumentView } from "../../components/documnet-view";
import { IDocuments } from "../../features/vise-rector-docs/models";
import { http } from "../vise-reactor-docs";
import { IResponse } from "../../common/models";
import { useParams } from "react-router-dom";
import { Spin } from "antd";
import './style.scss'
import { ScreenError404 } from "../../components/screens";

export const CheckDocuments: FC = () => {
    const { id } = useParams();
    const [doc, setDoc] = useState<IDocuments | null | false>(null)
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
        setIsLoading(true);
        http.get<IResponse<IDocuments>>(`/check/${id}`, {}).then(response => {
            setDoc(response.data);
        }).catch(err => {
            setDoc(false)
            console.log(err);

        })
            .finally(() => setIsLoading(false))
    }, [])
    return (<>
        {doc !== false ?
            <div className="check-documents">
                <Spin spinning={isLoading} tip="Loading">
                    <DocumentView contentText={doc?.body || ""} status={doc?.status || 'seen'} name={doc?.name || ""} job={doc?.user.job || ""} user={doc?.user.fullName || ""} />
                </Spin>
            </div> :
            <ScreenError404 />}
    </>

    )
}