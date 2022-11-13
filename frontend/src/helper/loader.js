function getLoaderStyle(){
    return '<style>'+
    '.loader {'+
      'border: 5px solid #f3f3f3;'+
      'border-radius: 50%;'+
      'border-top: 5px solid #3498db;'+
     ' width: 60px;'+
      'height: 60px;'+
     ' -webkit-animation: spin 2s linear infinite; /* Safari */'+
     ' animation: spin 2s linear infinite;'+
    '}'+
    
    /* Safari */
    '@-webkit-keyframes spin {'+
      '0% { -webkit-transform: rotate(0deg); }'+
     ' 100% { -webkit-transform: rotate(360deg); }'+
    '}'+
    
    '@keyframes spin {'+
     ' 0% { transform: rotate(0deg); }'+
      '100% { transform: rotate(360deg); }'+
    '}'+
    '</style>'
}

export const startLoading = () => {
    document.head.innerHTML+=getLoaderStyle()
    let div = document.createElement('div')
    div.className="loader"
    div.style.position="absolute"
    div.style.top="40px"
    div.style.left="700px"
    div.style.zIndex="1001"
    let h = document.createElement('h1');
    h.style.position="absolute"
    h.style.top="100px"
    h.style.left="680px"
    h.style.zIndex="1002"
    h.innerHTML="Loading..."
    h.className="Loading."
    h.style.fontSize="25px"
    h.style.color="white"
    document.body.appendChild(div)
    document.body.appendChild(h)
}

export const stopLoading = () => {
    document.body.removeChild(document.getElementsByClassName("loader").item(0))
    document.body.removeChild(document.getElementsByClassName("Loading.").item(0))
}