import { FC, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store";
import { IPageTitleContext, PageTitleContext } from "../../../common/contexts/pageTitle.context";
import { ContentHeader } from "../../../components/content-header";
import { MainBreadcrumb } from "../../../components/main-breadcamp";
import { Helmet } from "react-helmet";
import './sytles.scss';
import { UserForm } from "../../../features/users/components";
import { userSlice } from "../../../features/users/sclices/user.slice";
import { FetchUserById } from "../../../features/users/thunks";
import { useTranslation } from "react-i18next";

export const User: FC = () => {
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const { setPageTitle } = useContext(PageTitleContext) as IPageTitleContext
    const { data } = useAppSelector(state => state.user)
    const { t } = useTranslation();
    useEffect(() => {
        setPageTitle(data?.fullName || "");
    }, [data])

    useEffect(() => {
        dispatch(FetchUserById(id))
        return () => { dispatch(userSlice.actions.emptyState()) }

    }, [])


    return (
        <div className="pages">

            <ContentHeader hasBackAction={true}>
                <MainBreadcrumb lastItem={{ key: "documnet", title: t('change_user') || "Loading..." }} />
            </ContentHeader>
            <div className="page__content">
                <UserForm />
            </div>
        </div>
    )
}