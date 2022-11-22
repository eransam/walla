import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import UrlModel from "../../../Models/UrlModel";
import notify from "../../../service/NotifyService";
import urlService from "../../../service/urlService";
import "./AddUrl.css";
import companyLogo from '../../../assets/img/Walla_new.svg.png';
import {BrowserRouter as Router, Link} from 'react-router-dom';


function AddUrl(): JSX.Element {

    const { register, handleSubmit, formState } = useForm<UrlModel>();

    const navigate = useNavigate();

    function navToLink() {

        
    }
    function Browse(url: any) {
        window.location.href = `${url}`; 
    }

    var resData:any =""
    async function submit(url: UrlModel) {
        try {
            console.log("theurl in submit: " ,url);
            resData = await urlService.addurl(url);
            console.log("resData in addUrl: " , resData.type);
            const theInp = document.getElementById("inp");
            const errorDiv = document.querySelector(".error");
            const linkWrapper = document.getElementById("link-wrapper");
            const shortenedLink = document.getElementById("short-link");

            if (resData.type == "failure") {
                theInp.style.border = "2px solid red";
                errorDiv.textContent = `please try another one!`;
                console.log("linkWrapper: " ,linkWrapper);
                

              }
              if (resData.type == "success") {
                 linkWrapper.style.opacity= "1"
                 linkWrapper.style.scale = "1";
                 linkWrapper.style.display = "flex";
                theInp.style.border = "2px solid red";
                console.log("resData.type.message: " ,resData.type.message);
                shortenedLink.innerHTML = `<a href="${resData.message}" target="_blank">${resData.message}</a>`;
            
            
            // notify.success("product has been added!");

            
            // navigate("/ProductList");
        }}
        catch (err: any) {
            notify.error(err);
        }
    }

    console.log("resData: ",resData);
    
    return (
        //  <div className="AddProduct Box">
        <main>
            <div className="logoImg">
            <img src={companyLogo} alt="" width="300" height="150"/>
            </div>
      <div className="container">
        <div className="header">Walla URL shortener</div>
        <p className="InstructionsText">Instructions:</p>
        <p>After a real address has been entered and a shortened address has been received, you can also
            enter the shortened link in the box and receive the real link back</p>
        
                        <form className="form" id="form" onSubmit={handleSubmit(submit)}>
                            {/* <label>url: </label> */}
                            <input type="text" id="inp" {...register("url", {
                                required: { value: true, message: "Missing url " }
                            })} />
                            <span>{formState.errors.url?.message}</span>
                            <div className="error"></div>
                            <button className="btn">Go!</button>
                            {/* <button onClick={() => navigate(-1)}>Back</button> */}
                        </form>
                <div id="link-wrapper" className="link-wrapper">
                    <h3 className="link-text">Shortened Link</h3>
                    <div id="short-link" className="short-link"></div>
                    <p>The link above opens a new browser with the requested website</p>
                </div>
                    <div>
                        
                    </div>
            </div>
     </main>
    );
}

export default AddUrl;