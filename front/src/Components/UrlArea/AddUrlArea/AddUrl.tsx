import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import UrlModel from "../../../Models/UrlModel";
import notify from "../../../service/NotifyService";
import urlService from "../../../service/urlService";
import "./AddUrl.css";

function AddUrl(): JSX.Element {

    const { register, handleSubmit, formState } = useForm<UrlModel>();

    const navigate = useNavigate();

    async function submit(url: UrlModel) {
        try {
            console.log("theurl in submit: " ,url);
            
            await urlService.addurl(url);
            
            notify.success("product has been added!");

            
            navigate("/ProductList");
        }
        catch (err: any) {
            notify.error(err);
        }
    }

    return (
        //  <div className="AddProduct Box">
        <main>
      <div className="container">
        <div className="header">URL SH.RTNE.</div>
        
                        <form className="form" id="form" onSubmit={handleSubmit(submit)}>

                            <h2>Add product</h2>

                            <label>url: </label>
                            <input type="text" {...register("url", {
                                required: { value: true, message: "Missing url " }
                            })} />
                            <span>{formState.errors.url?.message}</span>

                            <button className="btn">Go!</button>
                            {/* <button onClick={() => navigate(-1)}>Back</button> */}
                        </form>
                <div className="link-wrapper">
                    <h3 className="link-text">Shortened Link</h3>
                    <div className="short-link"></div>
                </div>
    </div>
     </main>
    );
}

export default AddUrl;