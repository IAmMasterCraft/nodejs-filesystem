const http = require("http");
const fileSystem = require('fs');

const getJsonData = async () => {
    try {
        const data = [];
        http.get("http://jsonplaceholder.typicode.com/posts", (response) => {
            response.on("data", (responseData) => {
                data.push(responseData);
            })
            response.on("end", () => {
                if (data) saveToFile(data);
            })
        }).on("error", (error) => {
            console.error(`Error: ${error.message}`);
            return false;
        });
    } catch (error) {
        console.error(`Error: ${error.message}`);
        return false;
    }
}

const saveToFile = (data) => {
    const path = "./result/posts.json";
    try {
        fileSystem.writeFileSync(path, data.toString());
        console.log("Response Data Written to posts.json file Successfully!");
    } catch (error) {
        console.error(error);
    }
}

getJsonData();
