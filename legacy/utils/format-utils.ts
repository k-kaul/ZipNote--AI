export function formatFileNameAsTitle(fileName: string):string{
    // remove file extension and replace special characters with spaces
    const withoutExtension = fileName.replace(/\.[^/.]+$/,'');
    const withSpaces = withoutExtension
    .replace(/[-_]+/g,'') //replace dashes and underscroes with spaces
    .replace(/([a-z])([A-Z])/g,'$1 $2'); //add space between camelCase

    //convert to title case

    return withSpaces
    .split(' ')
    .map((word)=> word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
    .trim();
}