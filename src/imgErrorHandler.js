export function imgErrorHandler(event) {
    //set to desired default image (placeholder src value for now)
    event.target.setAttribute("src", "/img/MiniMintLogo2.png");
    event.target.setAttribute("onError", "");
}