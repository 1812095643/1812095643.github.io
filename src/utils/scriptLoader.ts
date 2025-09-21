export function loadScriptsInOrder(urls: string[]): Promise<void> {
  return urls.reduce<Promise<void>>((prev, url) => {
    return prev.then(() => loadScriptOnce(url));
  }, Promise.resolve());
}

function loadScriptOnce(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[data-dynamic-script="${src}"]`)) {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.src = src;
    script.async = false; // preserve order
    script.setAttribute('data-dynamic-script', src);
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
    document.body.appendChild(script);
  });
}
