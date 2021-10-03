package de.karl.projects.Kontaktbuch.Repository;

import de.karl.projects.Kontaktbuch.Model.Contact;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ContactRepository extends JpaRepository<Contact,Integer> {

    public List<Contact> findByUsername(String username);
}
