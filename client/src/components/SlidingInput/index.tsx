import { useContext, useEffect, useState } from "react";
import validator from "validator";
import { searchContext } from "../../contexts";

const NoteInput = () => {
  const minChars = 20;
  const maxChars = 300;
  const titleMaxChars = 50;
  const [currentChars, setCurrentChars] = useState(0);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const { notes, setNotes } = useContext(searchContext);

  useEffect(() => {
    setCurrentChars(text.length);
    setIsSubmitDisabled(
      text.length < minChars ||
        text.length > maxChars ||
        title.length > titleMaxChars
    );
    if (text.length > minChars && text.length < maxChars) {
      setErrorMessage("");
    }
  }, [text, title]);

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
      { id: Math.random().toString(), title, body: text },
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
    setText(e.target.value);
  };

  const handleChangeTitle: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setTitle(e.target.value);
  };

  return (
    <div className="container mt-3">
      <form onSubmit={handleSubmit} className="w-50 mx-auto">
        <div className="form-group">
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Title (Optional)"
            maxLength={titleMaxChars}
            value={title}
            onChange={handleChangeTitle}
          />
          <textarea
            className="form-control"
            id="noteTextarea"
            rows={3}
            maxLength={maxChars}
            value={text}
            onChange={handleChangeText}
          ></textarea>
          <small className="form-text text-muted">
            Title characters: {title.length}/{titleMaxChars} (Optional)
          </small>
          <small
            id="textareaFeedback"
            className={`form-text ${
              currentChars < minChars ? "text-danger" : "text-muted "
            }`}
          >
            Minimum characters: {minChars} /
          </small>
          <small id="textareaFeedback" className={`form-text text-muted`}>
            Maximum characters: {maxChars}
          </small>
          <small
            id="textareaFeedback"
            className={`form-text ${
              !isSubmitDisabled && currentChars >= minChars
                ? "text-success fw-bold"
                : "text-muted "
            }`}
          >
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
