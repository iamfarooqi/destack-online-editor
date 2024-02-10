import { ContentProvider } from 'destack'
import 'grapesjs/dist/css/grapes.min.css'
import html2canvas from 'html2canvas';
import { useRef } from 'react';
import domToImage from 'dom-to-image';
export default function Page(props) {
    const captureFullPage = async () => {
        // Assuming you want to capture the current page; otherwise, replace `document.location.href` with the desired URL
        const currentPageUrl = document.location.href
        const apiUrl = `http://localhost:5000/screenshot?url=${currentPageUrl}`;

        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const blob = await response.blob();
            const downloadUrl = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.download = "screenshot.png"; // You can customize the filename as needed
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(downloadUrl); // Clean up
        } catch (error) {
            console.error('Error taking screenshot:', error.stack);
        }

    };


    return <>
        <button onClick={captureFullPage}>Take Screenshot</button>
        <ContentProvider {...props} showEditorInProd={true} standaloneServer={true} />
    </>
}