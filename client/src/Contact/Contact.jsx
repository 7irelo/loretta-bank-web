import styles from "./Contact.module.css"

function Contact()
{
    return(
        <div className={styles.contact}>
            <form method="">
                <input type="text" placeholder="email..." className={styles.email} required/>
                <textarea className={styles.message} placeholder="Message..." required/>
                <input type="submit" className={styles.submit}/>
            </form>  
        </div>  
    );
}

export default Contact