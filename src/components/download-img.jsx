const DownloadImage = async (imageurl,caption) =>{

    try{
        const response = await fetch(imageurl);

        const blob = await response.blob(); //converts to downloadable file

        const url = window.URL.createObjectURL(blob); //create a temp url  

        const link = document.createElement("a"); //<a href="blob:..."></a>
        link.href = url;  //Give the link the image URL
        link.download = `${caption}.jpg` ; //Tell browser to download

        document.body.appendChild(link); //Add link to webpage
        link.click();

        link.remove();
        window.URL.revokeObjectURL(url);
    } catch (err){
        console.log("Download failed!", err);
    }
}

export default DownloadImage;