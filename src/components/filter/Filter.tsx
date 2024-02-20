import { FC, useContext, useEffect, useState } from "react";
import { FilterContext, IFilter, IInnerFilter } from "../../common/contexts/filter.context";
import { useTranslation } from "react-i18next";
import { Button, Col, Row } from "antd";
import './sytle.scss';
import { RetweetOutlined, SearchOutlined } from "@ant-design/icons";
import { useForm } from "react-hook-form";
import { TextFieldController } from "../../common/inputs/text-feild-controller";
import { DatePickerController } from "../../common/inputs/datepicker-controller";
import dayjs from "dayjs";

export const Filter: FC = () => {
    const { filter, setFilter } = useContext(FilterContext) as IFilter;
    const { t } = useTranslation();
    const [filterObj, setFilterObj] = useState<IInnerFilter>({});
    const defaultValues: IInnerFilter = {
        title: {
            lke: ""
        },
        name: {
            lke: ""
        },
        createdAt: {
            lke: ""
        }
    }

    const { control, getValues, unregister, watch, setValue, handleSubmit, reset } = useForm<IInnerFilter>({
        defaultValues: defaultValues,
    })

    const onChange = (value: any) => {
        setFilterObj({
            ...filterObj,
            [value.currentTarget.title]: {
                [value.currentTarget.name]: value.currentTarget.value
            }
        })
    }



    const disabledEndDate = (endValue: any) => {
        const startValue = dayjs(getValues('createdAt.begin'));
        if (!endValue || !startValue) {
            return false;
        }
        return endValue.valueOf() <= startValue.valueOf();
    }

    useEffect(() => {
        if (getValues('createdAt.begin') && getValues('createdAt.end')) {
            setValue('createdAt.bt', `${getValues('createdAt.begin')}|${getValues('createdAt.end')}`);
            unregister('createdAt.lke');
        } else if (getValues('createdAt.begin') || getValues('createdAt.end')) {
            setValue('createdAt.lke', getValues('createdAt.begin') || getValues('createdAt.end'));
        } else {
            setValue('createdAt.lke', "")
            setValue('createdAt.bt', "")
        }
    }, [watch('createdAt.begin'), watch('createdAt.end')])

    useEffect(() => {
        reset()
    }, [filter.status])

    const filterValues = (object: any) => {
        for (const key in object) {
            for (const childKey in object[key]) {
                if (!object[key][childKey]) {
                    delete object[key][childKey]
                }
            }
            if (Object.values(object[key]).every(value => !value)) {
                delete object[key]
            }
        }
        return object
    }



    const onSubmit = (value: IInnerFilter) => {
        delete value.createdAt?.begin;
        delete value.createdAt?.end;

        const newState = { ...filter, ...value };



        setFilter({
            ...filterValues(newState)
        })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Row className="filter-content">
                <Col xs={24} sm={12} xl={6} className="input-filter">
                    <div className="filter-label">{t('name')}:</div>
                    <div>
                        <TextFieldController
                            control={control}
                            name="name.lke"
                            placeholder={t('name')}
                            onChange={onChange}
                        />
                    </div>
                </Col>
                <Col xs={24} sm={12} xl={6} className="input-filter">
                    <div className="filter-label">{t('title')}:</div>
                    <div>
                        <TextFieldController
                            control={control}
                            name="title.lke"
                            placeholder={t('title')}
                            onChange={onChange}
                        />
                    </div>
                </Col>

                <Col xs={24} sm={12} xl={6} className="input-filter">
                    <div className="filter-label">{t('date')}:</div>
                    <DatePickerController
                        setValue={setValue}
                        control={control}
                        placeholder={t('date')}
                        name="createdAt.begin"
                    />

                    <DatePickerController
                        disabledDate={disabledEndDate}
                        setValue={setValue}
                        control={control}
                        disabled={!getValues('createdAt.begin')}
                        placeholder={t('date')}
                        name="createdAt.end"
                    />
                </Col>
                <Col xs={24} sm={12} xl={6} >
                    <Row>
                        <Col span={11}>
                            <Button
                                htmlType="submit"
                                style={{ width: "100%" }} type="primary"><SearchOutlined />{t('search')}</Button>
                        </Col>
                        <Col span={2}>
                        </Col>
                        <Col span={11}>
                            <Button
                                htmlType="reset"
                                onClick={() => { reset(); onSubmit(defaultValues); }}
                                style={{ width: "100%" }} danger type="primary"><RetweetOutlined />{t('clear')}</Button>
                        </Col>
                    </Row>
                </Col>

            </Row>
        </form>
    )
}