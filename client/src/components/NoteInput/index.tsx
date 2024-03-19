import { useContext, useEffect, useState } from "react";
import validator from "validator";
import { searchContext } from "../../contexts";

const NoteInput = () => {
  const minChars = 20;
  const maxChars = 300;
  const [currentChars, setCurrentChars] = useState(0);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [overMaxIntent, setOverMaxIntent] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { notes, setNotes } = useContext(searchContext);

  useEffect(() => {
    setCurrentChars(text.length);
    setIsSubmitDisabled(text.length < minChars || text.length > maxChars);
    if (text.length >= minChars && text.length <= maxChars) {
      setErrorMessage("");
    }
  }, [text]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validator.isLength(text, { min: minChars, max: maxChars })) {
      setErrorMessage(
        `Text must be between ${minChars} and ${maxChars} characters.`
      );
      return;
    }

    const newNotes = [
      ...notes,
      { id: Math.random().toString(), title: title, body: text },
    ];
    setNotes(newNotes);
    localStorage.setItem("notes", JSON.stringify(newNotes));
    setTitle("");
    setText("");
    setErrorMessage("");
  };

  const handleChangeText: React.ChangeEventHandler<HTMLTextAreaElement> = (
    e
  ) => {
    if (e.target.value.length > maxChars) {
      setOverMaxIntent(true);
    } else {
      setText(e.target.value);
      setOverMaxIntent(false);
    }
  };

  const handleChangeTitle: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setTitle(e.target.value);
  };

  return (
    <div className="container mt-5">
      <form onSubmit={handleSubmit} className="w-50 mx-auto">
        <div className="form-group">
          <label htmlFor="noteTitle">Note Title (Optional)</label>
          <input
            type="text"
            className="form-control mb-2"
            id="noteTitle"
            placeholder="Note Title"
            value={title}
            onChange={handleChangeTitle}
          />
          <label htmlFor="descTextarea">Description</label>

          <textarea
            className="form-control"
            id="descTextarea"
            rows={3}
            maxLength={maxChars + 1}
            value={text}
            onChange={handleChangeText}
          ></textarea>
          <small
            id="textareaFeedback"
            className={`form-text ${
              currentChars < minChars ? "text-danger" : "text-muted "
            }`}
          >
            Minimum characters: {minChars} /{" "}
          </small>
          <small
            id="textareaFeedback"
            className={`form-text ${
              overMaxIntent ? "text-danger" : "text-muted "
            }`}
          >
            Maximum characters: {maxChars}
          </small>
          <small
            id="textareaFeedback"
            className={`form-text ${
              !overMaxIntent && currentChars > minChars
                ? "text-success fw-bold"
                : "text-muted "
            }`}
          >
            {" "}
            / Current characters: {currentChars}
          </small>
        </div>
        {errorMessage && (
          <div className="alert alert-danger" role="alert">
            {errorMessage}
          </div>
        )}
        <button
          type="submit"
          className="btn btn-primary"
          disabled={isSubmitDisabled}
        >
          Submit
        </button>
      </form>
    </div>
  );
};
export default NoteInput;
