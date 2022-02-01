import ContactItem from "./ContactItem";
import { useState, useEffect, useRef } from "react";
import classes from "./Contacts.module.css";

const Contacts = () => {
  const [data, setData] = useState();
  const [filteredData, setFilteredData] = useState();
  const [visible, setVisible] = useState(false);
  const [input, setInput] = useState();

  const nameInputRef = useRef();
  const userNameInputRef = useRef();
  const timer = useRef(null);

  const fetchData = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const dataResponse = await response.json();
    setData(dataResponse);
  };
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (input) {
      setFilteredData(
        data.filter(
          (item) =>
            item.name.toLowerCase().includes(input) ||
            item.username.toLowerCase().includes(input)
        )
      );
    } else {
      setFilteredData(data);
    }
  }, [data, input]);

  const changeHandler = (event) => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setInput(event.target.value);
    }, 500);
  };

  const deleteHandler = (id) => {
    setData(data.filter((el) => el.id !== id));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredUserName = userNameInputRef.current.value;
    const contact = {
      name: enteredName,
      username: enteredUserName,
      id: Math.floor(Math.random() * 1000),
    };
    setData((prevState) => [...prevState, contact]);
    setVisible(false);
  };

  return (
    <section className={classes.contacts}>
      <h1>Контакты</h1>
      <div className={classes.nav}>
        <button onClick={() => setVisible((prevState) => !prevState)}>
          Добавить контакт
        </button>
        <input type="text" id="search" onChange={changeHandler}></input>
      </div>
      <div>
        {visible && (
          <form onSubmit={submitHandler}>
            <div className={classes.control}>
              <label htmlFor="name">Имя</label>
              <input type="text" id="name" ref={nameInputRef} />
            </div>
            <div className={classes.control}>
              <label htmlFor="username">Ник</label>
              <input type="text" id="username" ref={userNameInputRef} />
            </div>
            <div className={classes.actions}>
              <button> Добавить</button>
            </div>
          </form>
        )}
      </div>
      <div>
        <ul>
          {filteredData &&
            filteredData.map((item) => (
              <ContactItem
                key={item.id}
                name={item.name}
                username={item.username}
                id={item.id}
                deleteItem={() => deleteHandler(item.id)}
              />
            ))}
        </ul>
      </div>
    </section>
  );
};

export default Contacts;
