const fs = require("fs");

// For Windows
// const filePath = "C:\Windows\System32\drivers\etc\hosts";

// For Linux
const filePath = "/etc/hosts";
const redirectPath = "127.0.0.1";
let websites = [
  "www.youtube.com",
  "youtube.com",
  "facebook.com",
  "www.facebook.com",
];
let delay = 10000;

let blocker = () => {
    let date = new Date();
    let hours = date.getHours();
    // block websites from 9 AM to 6 PM
    if (hours >= 9 && hours < 18) {
        console.log("Time to block websites");

        fs.readFile(filePath, (err, data) => {
            if (err) return console.log(err);
            fileContents = data.toString();
            for (let i = 0; i < websites.length; i++) {
                let addWebsite = "\n" + redirectPath + " " + websites[i];
                if (fileContents.indexOf(addWebsite) < 0) {
                console.log("Website not present in hosts file");
                fs.appendFile(filePath, addWebsite, (err) => {
                    if (err) return console.log(err);
                    console.log("File Updated Successfully");
                });
                } else {
                console.log("Website is present");
                }
            }
        });
    } else {
        console.log("Time to unblock websites");
        let completeContent = "";
        fs.readFileSync(filePath)
            .toString()
            .split("\n")
            .forEach((line) => {
                let flag = 1;
                for (let i = 0; i < websites.length; i++) {
                if (line.indexOf(websites[i]) >= 0) {
                    // line contains website
                    flag = 0;
                    break;
                }
                }

                if (flag == 1) {
                if (line === "") completeContent += line;
                else completeContent += line + "\n";
                }
            });
        // Replace the file contents by `completeContent`
        fs.writeFile(filePath, completeContent, (err) => {
        if (err) {
            return console.log("Error!", err);
        }
        });
    }
};

blocker();

setInterval(blocker, delay);
