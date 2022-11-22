import axios from "axios";
import UrlModel from "../Models/UrlModel";


class urlService {


    public async addurl(urls: UrlModel): Promise<UrlModel> {
        console.log("urls.url in service: " ,urls.url);
        

        let formData = new FormData();
        formData.append("url", urls.url);
        console.log("formData in service: " ,formData);
        
        const response = await axios.post<UrlModel>(
            "http://localhost:8000/link",
            urls
        );
        console.log("response: " ,response);
        const resData = response.data.type;
        console.log("the-response: " ,resData);

//   if (response.data.type == "failure") {
//     input.style.border = "2px solid red";
//     errorDiv.textContent = `${response.message}, please try another one!`;
//   }
//   if (response.type == "success") {
//     linkWrapper.style.opacity = 1;
//     linkWrapper.style.scale = 1;
//     linkWrapper.style.display = "flex";
//     shortenedLink.textContent = response.message;
//   }
        
        const addedpro = response.data;
    

        return addedpro;
      }
}

const urlsService = new urlService();

export default urlsService;
