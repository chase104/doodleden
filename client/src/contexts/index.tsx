import React, { useState, createContext } from "react";

export interface NoteType {
  id: string;
  title: string;
  body: string;
}

interface SearchContextType {
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
  notes: NoteType[];
  setNotes: (notes: NoteType[]) => void;
}

export const searchContext = createContext<SearchContextType>({
  searchTerm: "",
  setSearchTerm: () => {
    console.log("default function");
  },
  notes: [],
  setNotes: () => {
    console.log("default function");
  },
});

interface MyProviderProps {
  children: React.ReactNode;
}
export const SearchProvider: React.FC<MyProviderProps> = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [notes, setNotes] = useState<NoteType[]>([]);

  return (
    <searchContext.Provider
      value={{ searchTerm, setSearchTerm, setNotes, notes }}
    >
      {children}
    </searchContext.Provider>
  );
};
