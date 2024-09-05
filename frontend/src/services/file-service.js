export class FileService {
     static loadPageScript(src) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            // script.type = 'module';
            script.src = src;
            // script.defer;
            script.onload = () => resolve('Script loaded: ' + src);
            script.onerror = () => reject(new Error('Script load error for: ' + src));
            document.body.appendChild(script);
        });
    }
     static loadPageStyle(src, insertBeforeElement) {
        return new Promise((resolve, reject) => {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.type = 'text/css';
            link.href = src;
            document.head.insertBefore(link, insertBeforeElement);
        });

    }
}