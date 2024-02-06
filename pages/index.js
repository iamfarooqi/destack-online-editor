import { ContentProvider } from 'destack'
import 'grapesjs/dist/css/grapes.min.css'
import html2canvas from 'html2canvas';
import { useRef } from 'react';

export default function Page(props) {
    // const editorRef = useRef(null);
    // const takeScreenshot = () => {
    //     const editorCanvas = editorRef.current;
    //     html2canvas(editorCanvas).then(canvas => {
    //         const image = canvas.toDataURL('image/png');
    //         const downloadLink = document.createElement('a');
    //         downloadLink.href = image;
    //         downloadLink.download = 'screenshot.png';
    //         downloadLink.click();
    //     });
    // };
    // const takeScreenshot = () => {
    //     html2canvas(document.body).then(canvas => {
    //         // Alternatively, you can use document.documentElement to capture the whole document
    //         // html2canvas(document.documentElement).then(canvas => {
    //         const image = canvas.toDataURL('image/png');
    //         const downloadLink = document.createElement('a');
    //         downloadLink.href = image;
    //         downloadLink.download = 'screenshot.png';
    //         downloadLink.click();
    //     });
    // };

    const takeScreenshot = () => {
        // Wait a bit to ensure all content has loaded
        setTimeout(() => {
            // Use html2canvas options to attempt a full capture
            html2canvas(document.body, {
                scale: 1,
                scrollX: 0,
                scrollY: 100,
                width: document.documentElement.offsetWidth,
                height: document.documentElement.offsetHeight,
                windowWidth: document.documentElement.scrollWidth,
                windowHeight: document.documentElement.scrollHeight
            }).then(canvas => {
                const image = canvas.toDataURL('image/png');
                const downloadLink = document.createElement('a');
                downloadLink.href = image;
                downloadLink.download = 'screenshot.png';
                downloadLink.click();
            });
        }, 1000); // Delay in milliseconds
    };

    return <>
        <button onClick={takeScreenshot}>Take Screenshot</button>
        <ContentProvider {...props} showEditorInProd={true} />
    </>
}