import ContactUsModel from "../model/contactUsModel.js";

export const postContactUsForm = (req, res) => {
  const { username, company, email, subject, phone, message } = req.body;

  try {
    if (!username || !company || !email || !phone) {
      return res.status(402).json({ messgae: "Please fill all fields" });
    }

    if (phone.split("").length !== 10) {
      return res.status(402).json({ message: "Enter 10 digit phone Number" });
    }

    const newContactUsForm = new ContactUsModel({
      username,
      company,
      email,
      subject,
      phone,
      message,
    });

    newContactUsForm
      .save()
      .then(() =>
        res.status(200).json({ message: "Form submitted successfully" })
      )
      .catch((err) => {
        throw new Error(err);
      });
  } catch (err) {
    res.json(401).json({ message: err });
  }
};


export const getContactUsForm = (req,res)=>{
  res.send("Getting all post")
}