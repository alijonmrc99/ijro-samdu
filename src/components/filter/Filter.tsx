import { FC, useContext, useState } from "react";
import { FilterContext, IFilter, IInnerFilter } from "../../common/contexts/filter.context";
import { useTranslation } from "react-i18next";
import { Button, Checkbox, DatePicker, Flex, Input } from "antd";
import './sytle.scss';

export const Filter: FC = () => {
    const { setFilter } = useContext(FilterContext) as IFilter;
    const { t } = useTranslation();
    const [filterObj, setFilterObj] = useState<IInnerFilter>({});
    const [checkTitle, setcheckTitle] = useState(false)
    const onTitleChange = (value: any) => {
        if (value === 0) {
            setFilterObj({
                ...filterObj,
                title: {}
            })
        } else
            if (!checkTitle)
                setFilterObj({
                    ...filterObj,
                    title: {
                        lke: value.target.value
                    }
                })
            else setFilterObj({
                ...filterObj,
                title: {
                    eq: value.target.value
                }
            })

        console.log(filterObj);

    }


    return (
        <div className="filter-content">
            <h4 className="filter-title">{t('filter')}</h4>
            <div>
                <div className="filter-label">{t('title')}</div>
                <Input name="title" onChange={onTitleChange} />
                <Checkbox ><div className="filter-label">{t('equal')}</div></Checkbox>
            </div>
            <div>
                <div className="filter-label">{t('name')}</div>
                <Input name="name" onChange={onTitleChange} />
                <Checkbox ><div className="filter-label">{t('equal')}</div></Checkbox>
            </div>
            <div className="filter-label">{t('date_filter')}</div>
            <div>
                <div className="filter-label">{t('date')}</div>
                <DatePicker placeholder={t('placeholder_data')} name="date_begin" />
                <div className="filter-label">{t('end_date')}</div>
                <DatePicker placeholder={t('placeholder_data')} name="date_end" />
                <div><Checkbox ><div className="filter-label">{t('equal')}</div></Checkbox></div>
            </div>

            <Button type="primary">Filter qo'shish</Button>
        </div>
    )
}