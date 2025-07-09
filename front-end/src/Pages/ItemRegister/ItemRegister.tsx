import { useState } from "react";
import BookForm from "../../Components/Forms/BookForm/BookForm";
import Sidebar from "../../Components/Sidebar/Sidebar";
import AuthorForm from "../../Components/Forms/AuthorForm/AuthorForm";

const NewBook = () => {
    const [item, setItem] = useState<"book" | "author">("book");

    const sidebarItems = [
        {
            key: "book",
            label: "Livros",
            active: item === "book",
            onClick: () => setItem("book"),
        },
        {
            key: "itauthorems",
            label: "Autores",
            active: item === "author",
            onClick: () => setItem("author"),
        },
    ];

    return (
        <div className="container-fluid">
            <div className="row">
                <Sidebar
                    items={sidebarItems}
                    title="Cadastros"
                    col={3}
                />
                <div className="col">
                    {item === "book" ? (
                        <BookForm />
                    ) : (
                        <AuthorForm />
                    )}
                </div>
            </div>
        </div>
    )
}

export default NewBook;