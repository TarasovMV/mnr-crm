/*eslint no-inner-declarations: ["off"]*/

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace FileSaver {
    const url = window.URL || (window as any).webkitURL;

    export function download(blobData: Blob, fileName: string = '') {
        if (isEdgeOrIE()) {
            saveFromEdgeOrIE(blobData, fileName);
        } else if (isSafari() && linkSaveAvailable()) {
            saveFromSafari(blobData, fileName);
        } else if (linkSaveAvailable()) {
            saveFromLink(blobData, fileName);
        } else {
            saveFromWindow(blobData);
        }
    }

    function isEdgeOrIE(): boolean {
        return Boolean((window.navigator as any).msSaveOrOpenBlob);
    }

    function saveFromEdgeOrIE(blobData: Blob, fileName: string) {
        (window.navigator as any).msSaveOrOpenBlob(blobData, fileName);
    }

    function linkSaveAvailable(): boolean {
        const link = document.createElement('a');

        return 'download' in link;
    }

    function saveFromLink(blobData: Blob, fileName: string) {
        const downloadUrl = url.createObjectURL(blobData);

        saveLink(downloadUrl, fileName);
    }

    function isSafari(): boolean {
        const { userAgent } = window.navigator;

        return userAgent.toLowerCase().includes('safari');
    }

    function saveFromSafari(blobData: Blob, fileName: string) {
        const reader = new FileReader();

        reader.onloadend = () => {
            saveLink(`${reader.result}`, fileName);
        };

        reader.readAsDataURL(blobData);
    }

    function saveLink(url: string, fileName: string) {
        const link = document.createElement('a');

        link.href = url;
        link.download = fileName;
        link.style.display = 'none';

        document.body.appendChild(link);

        link.click();
        link.parentElement?.removeChild(link);

        clear(url);
    }

    function saveFromWindow(blobData: Blob) {
        const downloadUrl = url.createObjectURL(blobData);
        const popup = window.open(downloadUrl, '_blank');

        if (!popup) {
            window.location.href = downloadUrl;
        }

        clear(downloadUrl);
    }

    function clear(downloadUrl: string) {
        url.revokeObjectURL(downloadUrl);
    }
}
