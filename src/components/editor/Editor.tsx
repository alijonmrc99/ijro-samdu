import { FC, useState } from "react";
import ReactQuill from "react-quill";
import 'quill/dist/quill.snow.css'
import { string } from "yup";
import { generatePdf } from "../make-pdf";
export const Editor: FC = () => {
    var modules = {
        toolbar: [

            ["bold", "italic", "underline",],
            [{ list: "ordered" }, { list: "bullet" }],
            // ["link", "image"],
            [
                { indent: "-1" },
                { indent: "+1" },
                { align: [] }
            ],
            // [{ "color": ["#000000", "#e60000", "#ff9900", "#ffff00", "#008a00", "#0066cc", "#9933ff", "#ffffff", "#facccc", "#ffebcc", "#ffffcc", "#cce8cc", "#cce0f5", "#ebd6ff", "#bbbbbb", "#f06666", "#ffc266", "#ffff66", "#66b966", "#66a3e0", "#c285ff", "#888888", "#a10000", "#b26b00", "#b2b200", "#006100", "#0047b2", "#6b24b2", "#444444", "#5c0000", "#663d00", "#666600", "#003700", "#002966", "#3d1466", 'custom-color'] }],
        ]

    };

    var formats = [
        "bold", "italic", "underline",
        "list", "color", "bullet", "indent",
        "link", "image", "align", "size",
    ];

    const handleProcedureContentChange = (content: any) => {
        console.log("content---->", content);
        setContent(content)
    };

    function getTexts(htmlString: string) {
        const divELement = document.createElement('div');
        divELement.innerHTML = htmlString;

        const regxStrong = new RegExp("<strong>|<\/strong>", "gim");
        const regxUnderLine = new RegExp("<u>|<\/u>", "gim");
        const regxItalic = new RegExp("<em>|<\/em>", "gim");

        const rightElements = divELement.querySelectorAll('.ql-align-right');
        const centerElements = divELement.querySelectorAll('.ql-align-center');


        let rightText = "";
        rightElements.forEach(item => {
            rightText += item.innerHTML;
            item.remove()
        });
        rightText = rightText.replace("<br>", "").replace(regxStrong, "").replace(regxItalic, "").replace(regxUnderLine, "")

        let centerText = '';
        centerElements.forEach(item => {
            centerText += item.innerHTML;
            item.remove()
        });
        centerText = centerText.replace("<br>", "").replace(regxStrong, "**").replace(regxItalic, "__").replace(regxUnderLine, "++")

        const bodyElements = divELement.querySelectorAll('p');
        let bodyText = "";
        bodyElements.forEach(item => {
            bodyText += item.innerHTML;
            item.remove()
        });
        bodyText = bodyText.replace("<br>", "").replace(regxStrong, "**").replace(regxItalic, "__").replace(regxUnderLine, "++")

        console.log(rightText, centerText, bodyText);

        generatePdf(bodyText)

    }




    const [content, setContent] = useState<string>("")
    return (
        <div>
            <div >
                <h1 style={{ textAlign: "center" }}>Text Editor In React JS</h1>
                <button onClick={() => getTexts(content)}>boss</button>
                <div className="m-2" style={{ display: "flex", justifyContent: "center" }}>
                    <ReactQuill
                        theme="snow"
                        modules={modules}
                        formats={formats}
                        placeholder="write your content ...."
                        onChange={handleProcedureContentChange}
                        style={{ height: "50vh", width: "80%" }}
                    >
                    </ReactQuill>
                </div>

                <div>{content}</div>
            </div>
        </div>
    )
}