import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

function EditIdiom() {
  const { id } = useParams();
  const [element, setElement] = useState(null);
  const [editedElement, setEditedElement] = useState({
    abbr: "",
    phrase: "",
    meaning: "",
    usage: "",
    elNum: 0,
  });
  const trackInput = (e) => {
    {
      const value = e.target.value;
      setEditedElement({
        ...editedElement,
        [e.target.name]: value,
      });
    }
  }
  

  useEffect(() => {
    fetch(`/idioms/${id}`)
      .then(response => response.json())
      .then(data => {
        setElement(data)
        setEditedElement({
          abbr: data.abbr,
    phrase: data.phrase,
    meaning: data.meaning,
    usage: data.usage,
    elNum: data.elNum,
    category: data.category,
        })
      })
      .catch(console.error);
  }, [id]);

  if (!element) {
    return <div>Loading...</div>;
  }



  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`/idioms/${id}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedElement),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        alert("Idiom updated successfully!");
        // refreshIdioms();
      })
      .catch(console.error);
  
  };

  return (
    <div id="add-Idiom">
        <form id="addElement" onSubmit={handleSubmit}>
          <h1>Edit Idiom</h1>
          <div className="field">
            <label htmlFor="abbr">Abbr:</label>
            <input
              type="text"
              id="abbr"
              name="abbr"
              placeholder="Enter the custom abbreviation"
              value={editedElement.abbr}
              onChange={trackInput}
            />
            <small></small>
          </div>
          <div className="field">
            <label htmlFor="phrase">phrase:</label>
            <input
              type="text"
              id="phrase"
              name="phrase"
              placeholder="Enter the phrase"
              value={editedElement.phrase}
              onChange={trackInput}
            />
            <small></small>
          </div>
          <div className="field">
            <label htmlFor="meaning">meaning:</label>
            <input
              type="text"
              id="meaning"
              name="meaning"
              placeholder="Enter the meaning"
              value={editedElement.meaning}
              onChange={trackInput}
            />
            <small></small>
          </div>
          <div className="field">
            <label htmlFor="usage">usage:</label>
            <input
              type="text"
              id="usage"
              name="usage"
              placeholder="Enter the usage"
              value={editedElement.usage}
              onChange={trackInput}
            />
            <small></small>
          </div>
          {/* <div className="field">
            <label htmlFor="tags">tags:</label>
            <input
              type="text"
              id="tags"
              name="tags"
              placeholder="Enter the tags"
              value={editedElement.tags}
              onChange={trackInput}
            />
            <small></small>
          </div> */}
          <div className="field">
            <label htmlFor="elementNumber">Element Number:</label>
            <input
              type="text"
              id="elementNumber"
              name="elNum"
              placeholder="Enter the element number"
              value={editedElement.elNum}
              onChange={trackInput}
            />
            <small></small>
          </div>
          <div className="field">
            <label htmlFor="category">category:</label>
            <input
              type="text"
              id="elementCategory"
              name="category"
              placeholder="Enter the category"
              value={editedElement.category}
              onChange={trackInput}
            />
            <small></small>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
  );
}

export default EditIdiom;
