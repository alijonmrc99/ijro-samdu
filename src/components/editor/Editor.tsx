import { FC, useEffect, useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import 'quill/dist/quill.snow.css'
import './styles.scss';
import { UseFormSetValue } from "react-hook-form";
import { IDocuments } from "../../features/documents/models";


type getParams = {
    setValue: UseFormSetValue<IDocuments>,
    hasValue?: string
}

export const Editor: FC<getParams> = ({ hasValue, setValue }) => {
    var modules = {
        toolbar: [

            ["bold", "italic", "underline",],
            [{ list: "ordered" }, { list: "bullet" }],
            [
                { indent: "-1" },
                { indent: "+1" },
                { align: [] }
            ],
        ]

    };

    var formats = [
        "bold", "italic", "underline",
        "list", "color", "bullet", "indent",
        "link", "image", "align", "size",
    ];

    const handleProcedureContentChange = (content: any) => {
        setContent(content);
        setValue('body', content)
    };


    useEffect(() => {
        if (hasValue) {
            setContent(hasValue)
            setValue('body', hasValue)
        }
    }, [hasValue])

    // function getTexts(htmlString: string) {
    //     const divELement = document.createElement('div');
    //     divELement.innerHTML = htmlString;

    //     const regxStrong = new RegExp("<strong>|<\/strong>", "gim");
    //     const regxUnderLine = new RegExp("<u>|<\/u>", "gim");
    //     const regxItalic = new RegExp("<em>|<\/em>", "gim");

    //     const rightElements = divELement.querySelectorAll('.ql-align-right');
    //     const centerElements = divELement.querySelectorAll('.ql-align-center');


    //     let rightText = "";
    //     rightElements.forEach(item => {
    //         rightText += item.innerHTML;
    //         item.remove()
    //     });
    //     rightText = rightText.replace("<br>", "").replace(regxStrong, "").replace(regxItalic, "").replace(regxUnderLine, "")

    //     let centerText = '';
    //     centerElements.forEach(item => {
    //         centerText += item.innerHTML;
    //         item.remove()
    //     });
    //     centerText = centerText.replace("<br>", "").replace(regxStrong, "**").replace(regxItalic, "__").replace(regxUnderLine, "++")

    //     const bodyElements = divELement.querySelectorAll('p');
    //     let bodyText = "";
    //     bodyElements.forEach(item => {
    //         bodyText += item.innerHTML;
    //         item.remove()
    //     });
    //     bodyText = bodyText.replace("<br>", "").replace(regxStrong, "**").replace(regxItalic, "__").replace(regxUnderLine, "++")

    //     console.log(rightText, centerText, bodyText);

    //     generatePdf(bodyText)

    // }

    const [content, setContent] = useState<string>("")

    return (
        <div className="main-editor" style={{ display: "flex", justifyContent: "center" }}>
            <ReactQuill
                theme="snow"
                value={content}
                modules={modules}
                formats={formats}
                defaultValue={"fa sd asfd asf"}
                placeholder="write your content ...."
                onChange={handleProcedureContentChange}
            >
            </ReactQuill>
        </div>
    )
}