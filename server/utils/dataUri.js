import DataUriParser from "datauri/parser.js";
import path from "path";

const getdataUri=(file) =>{

    const parser=new DataUriParser();

    const extname=path.extname(file.originalname).toString();
    console.log(extname);
   return parser.format(extname , file.buffer);

}

export default getdataUri;
