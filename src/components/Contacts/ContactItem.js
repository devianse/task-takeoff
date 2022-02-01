import classes from "./ContactItem.module.css";
const ContactItem = (props) => {
  return (
    <li className={classes.li}>
      <div>
        <h3>{props.name}</h3>
        <p>{props.phone}</p>
        <p>{props.username}</p>
        <button onClick={props.deleteItem}>Удалить контакт</button>
      </div>
    </li>
  );
};
export default ContactItem;
