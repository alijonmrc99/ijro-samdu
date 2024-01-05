import { FC, useState } from "react";
import { DownOutlined } from "@ant-design/icons";
import './style.scss'
import { useTranslation } from "react-i18next";

const items = [
    {
        label: 'Русский',
        key: 'ru',
        short: 'RU'
    },
    {
        label: "O'zbekcha",
        key: 'uz',
        short: 'UZ'
    }
];

export const Languages: FC = () => {

    const { t, i18n } = useTranslation();

    const [open, setOpen] = useState(false);

    const onClick = (values: string) => {
        i18n.changeLanguage(values)
        setOpen(false)
    }

    return <div className="languages">
        <div className={`languages__content ${open ? 'open' : ''}`}>
            <div className="languages__trigger">
                <div className="language_open_contnent">
                    <button onClick={() => setOpen(!open)} className="languages__btn languages__btn--1">
                        <span>{t('current_lang')}</span>
                        {/* <span className="icon"><DownOutlined /></span> */}
                    </button>
                </div>
                <div className="languages__buttons">
                    {items.map(item => (
                        <button onClick={() => onClick(item.key)} key={item.key} className="languages__btn languages__btn--2">
                            <span className="lang_icon"> {item.short}</span>{item.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    </div>
}