import { FC, useContext, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { ProfileForm } from "../../../features/users/components/profile-form/ProfileForm";
import { Helmet } from "react-helmet";
import { ContentHeader } from "../../../components/content-header";
import { MainBreadcrumb } from "../../../components/main-breadcamp";
import { IPageTitleContext, PageTitleContext } from "../../../common/contexts/pageTitle.context";

export const Profile: FC = () => {
    const { t } = useTranslation();
    const { setPageTitle } = useContext(PageTitleContext) as IPageTitleContext;

    useEffect(() => {
        setPageTitle(t('profile'))
    }, [])
    return (
        <div>
            <Helmet>
                <title>Foydalanuchilar</title>
            </Helmet>
            <ContentHeader >
                <MainBreadcrumb />
            </ContentHeader>
            <div>
                <ProfileForm />
            </div>
        </div >
    )
}