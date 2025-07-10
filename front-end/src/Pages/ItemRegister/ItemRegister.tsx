import { useState } from "react";
import BookForm from "../../Components/Forms/BookForm/BookForm";
import Sidebar from "../../Components/Sidebar/Sidebar";
import AuthorForm from "../../Components/Forms/AuthorForm/AuthorForm";
import PublisherForm from "../../Components/Forms/PublisherForm/PublisherForm";

const NewBook = () => {
    const [item, setItem] = useState<"book" | "author" | "publisher">("book");

    const sidebarItems = [
        {
            key: "book",
            label: "Livros",
            active: item === "book",
            onClick: () => setItem("book"),
        },
        {
            key: "author",
            label: "Autores",
            active: item === "author",
            onClick: () => setItem("author"),
        },
        {
            key: "publisher",
            label: "Editoras",
            active: item === "publisher",
            onClick: () => setItem("publisher"),
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
                    ) : item === "author" ? (
                        <AuthorForm />
                    ) : (
                        <PublisherForm />
                    )}
                </div>
            </div>
        </div>
    )
}

export default NewBook;