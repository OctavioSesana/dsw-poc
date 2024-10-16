import { useState } from "react";
import { toast } from "react-hot-toast";
import { desktopDir, join } from "@tauri-apps/api/path";
import { writeTextFile } from "@tauri-apps/api/fs";
import { useSnippetStore } from "../store/snippetsStore";

function SnippetForm() {
  const [snippetName, setSnippetName] = useState<string>("");
  const addSnippetName = useSnippetStore((state) => state.addSnippetName);
  const snippetNames = useSnippetStore((state) => state.snippetsNames);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!snippetName || snippetName === "") {
      // alert("Please write a snippet name");
      toast.error("Por favor, ingrese un nombre válido", {
        duration: 2000,
        position: "bottom-right",
        style: {
          background: "#202020",
          color: "#fff",
        },
      });
      return;
    }

    // file already exists
    if (snippetNames.includes(snippetName)) {
      toast.error("La categoría ingresada ya existe", {
        duration: 2000,
        position: "bottom-right",
        style: {
          background: "#202020",
          color: "#fff",
        },
      });
      return;
    }

    const desktopPath = await desktopDir();
    writeTextFile(`${desktopPath}/taurifiles/${snippetName}.json`, "");
    addSnippetName(snippetName);
    setSnippetName("");

    toast.success("Categoría guardada", {
      duration: 2000,
      position: "bottom-right",
      style: {
        background: "#202020",
        color: "#fff",
      },
    });
  };
  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="Escribe una categoría..."
        onChange={(e) => setSnippetName(e.target.value)}
        className="bg-zinc-900 w-full border-none outline-none p-4"
        autoFocus
        value={snippetName}
      />
      <button className="hidden">save</button>
    </form>
  );
}

export default SnippetForm;
