import jsPDF from "jspdf";
import { FC, useRef } from "react";
import { typedEntries } from "../../common/utils/functions";

export function generatePdf(inputValue: string) {
    const doc = new jsPDF("p", "pt", "a4", true).setProperties({
        title: "Buyruq "
    });
    const fontSize = 14;
    const lineSpacing = 15;
    let startY = 20;
    const pageWidth = doc.internal.pageSize.getWidth()
    const margin = 28.34;
    const maxLineWidth = pageWidth - margin * 2;

    doc.setFont("Helvetica", "normal")
        .setFontSize(fontSize)


    const regex = /(\*{2})+/g; // all "**" words
    const textWithoutBoldMarks = inputValue.replace(regex, '');

    let splitTextWithoutBIUMarks = doc.splitTextToSize(
        textWithoutBoldMarks,
        maxLineWidth, {

    }
    );

    let charsMapLength = 0;
    let position = 0;
    let isBold = false;
    let isItalic = false;
    let isUnder = false;

    // power algorithm to determine which char is bold italic and under line
    let textRows = splitTextWithoutBIUMarks.map((row: any, i: number) => {
        const charsMap = row.split('');

        const chars = charsMap.map((_char: string, j: number) => {
            position = charsMapLength + j + i;

            let currentChar = inputValue.charAt(position);

            if (currentChar === "*") {
                const spyNextChar = inputValue.charAt(position + 1);
                if (spyNextChar === "*") {
                    // double asterix marker exist on these position's so we toggle the bold state
                    isBold = !isBold;
                    currentChar = inputValue.charAt(position + 2);

                    // now we remove the markers, so loop jumps to the next real printable char
                    let removeMarks = inputValue.split('');
                    removeMarks.splice(position, 2);
                    inputValue = removeMarks.join('');
                }
            }

            if (currentChar === "_") {
                const spyNextChar = inputValue.charAt(position + 1);
                if (spyNextChar === "_") {
                    // double asterix marker exist on these position's so we toggle the italic state
                    isItalic = !isItalic;
                    currentChar = inputValue.charAt(position + 2);

                    // now we remove the markers, so loop jumps to the next real printable char
                    let removeMarks = inputValue.split('');
                    removeMarks.splice(position, 2);
                    inputValue = removeMarks.join('');
                }
            }

            if (currentChar === "+") {
                const spyNextChar = inputValue.charAt(position + 1);
                if (spyNextChar === "+") {
                    // double asterix marker exist on these position's so we toggle the udderline state
                    isUnder = !isUnder;
                    currentChar = inputValue.charAt(position + 2);

                    // now we remove the markers, so loop jumps to the next real printable char
                    let removeMarks = inputValue.split('');
                    removeMarks.splice(position, 2);
                    inputValue = removeMarks.join('');
                }
            }

            return { char: currentChar, bold: isBold, italic: isItalic, under: isUnder };
        });
        charsMapLength += charsMap.length;

        return [...chars];
    });

    printCharacters(doc, textRows, startY * 4, margin, fontSize, lineSpacing);

    doc.save(`boldAndNormal-multiline2.pdf`);
}
export const printCharacters = (doc: jsPDF, textObject: [string], startY: number, startX: number, fontSize: number, lineSpacing: number) => {
    const startXCached = startX;

    const boldStr = 'bold';
    const boldItl = 'italic';
    const normalStr = 'normal';


    textObject.map(row => {

        typedEntries(row).map((value: [number, { italic: boolean, under: boolean, char: string, bold: boolean }]) => {

            doc.setFont("times", value[1]?.italic ? boldItl : normalStr, value[1]?.bold ? boldStr : normalStr,);

            if (value[1].under)
                doc.line(startX, startY + 1, startX + doc.getStringUnitWidth(value[1]?.char) * fontSize + 2, startY + 1)


            doc.text(value[1]?.char, startX, startY);
            doc.setLineWidth(1)
            startX = startX + doc.getStringUnitWidth(value[1]?.char) * fontSize;
        });
        startX = startXCached;
        startY += lineSpacing;
    });
};


export const MakePdf: FC = () => {
    const demoRef = useRef(null)



    let inputValue = `If you __look at the live demo ** examples of jsPDF**, you can see it’s possible__ to convert images, font faces, ++font sizes,  circles, rectangles,     triangles++, tables, lines, languages, and more into PDF format. You can also convert HTML into multiple pages **with** page breaks and add  password protection and annotations. t’s also possible to change the orientation of a page to landscape or portrait.`;





    return (
        <div>
            Salom dunyu
            <div ref={demoRef}>
                <h3>Salom dunyo</h3>
                <p>
                    {inputValue}
                </p>
            </div>
            <button >yukla</button>
        </div>
    )
}