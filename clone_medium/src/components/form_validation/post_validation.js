import * as Yup from "yup";

export const PostSchema = Yup.object({
        Title: Yup.string().min(2).max(60).required("Please enter your title"),
        Topic: Yup.string().max(40).required("Please enter the topic"),
        // FeaturedImage: Yup.string().required("Please fill this field"),
        // postText: Yup.string().required("Please type post"),
        Author : Yup.string().min(2).required("Please enter your name")
});