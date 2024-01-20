import Breadcrumb, { ItemType } from "antd/es/breadcrumb/Breadcrumb";
import { FC, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {useLocation, Link } from "react-router-dom";

export const MainBreadcrumb: FC<{lastItem?: ItemType}> = ({lastItem}) => {
    const {t} = useTranslation()
    const location = useLocation();
    const [pathItems, setPathItems] = useState<string[]>([]);

    useEffect(() => {
        const path = location.pathname.split('/').slice(1,3);
        setPathItems(path)
    },[location.pathname])

    const breadcrambItems: ItemType[] = useMemo(() => {        
        return pathItems.map((path, index) => {
            return{
                key: path,
                title: (<Link to={`/${pathItems.slice(0, index + 1).join('/')}`}>{t(path)}</Link>)
            }
        })
    }, [t, pathItems]);

    return(
        <Breadcrumb items={lastItem? [...breadcrambItems, lastItem] : breadcrambItems} />
    )
}