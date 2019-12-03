import Reddit from "snoowrap";

const connectReddit = () => {
    return new Reddit({
        userAgent: "Sample", // can be empty in browser
        clientId: "kGIauqfm0O94rg",
        clientSecret: "Y0_dTxb6UAeQrgn2Xv9ERSgmvlo",
        username: "gingerin0",
        password: "A&lexander7395"
      });
}

export default connectReddit;
