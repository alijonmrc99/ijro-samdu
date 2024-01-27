import { DatePickerProps, Space, DatePicker } from "antd";
import dayjs from "dayjs";
import { FC } from "react";
import { Control, Controller, UseFormSetValue } from "react-hook-form";
import { useTranslation } from "react-i18next";

export type DatePickerControllerProps = DatePickerProps & {
    control: Control<any>,
    name: string,
    label?: string,
    setValue: UseFormSetValue<any>,
}

export const DatePickerController: FC<DatePickerControllerProps> = ({
    control,
    name,
    label,
    setValue,
    ...props
}) => {
    const { t } = useTranslation()
    const onChange = (date: any, dateString: string) => {
        console.log(name);

        setValue(name, dateString)
    }

    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { value, ...fieldProps }, fieldState: { error } }) => (
                <Space style={{ width: "100%" }} size={'small'} direction="vertical">
                    {label && <label className="controller-label">{label}</label>}
                    <DatePicker value={value ? dayjs(value) : undefined} {...fieldProps} onChange={onChange} {...props} ></DatePicker>
                    <small>{error?.message ? t(error.message) : null}</small>
                </Space>
            )}
        ></Controller>
    )
}