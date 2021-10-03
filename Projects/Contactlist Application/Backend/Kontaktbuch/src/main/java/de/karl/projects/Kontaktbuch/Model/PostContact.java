package de.karl.projects.Kontaktbuch.Model;

public class PostContact {
    User user;
    Contact contact;

    public PostContact(User user, Contact contact) {
        this.user = user;
        this.contact = contact;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Contact getContact() {
        return contact;
    }

    public void setContact(Contact contact) {
        this.contact = contact;
    }
}
