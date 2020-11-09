exports.allAccess = (req, res) => {
    res.status(200).send("Public Content")
};

exports.homePage = (req, res) => {
    res.status(200).send("User Content")
};

exports.Child1 = (req, res) => {
    res.status(200).send("Child 1 Content")
};