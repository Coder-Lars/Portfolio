package de.karl.projects.Kontaktbuch.Repository;

import de.karl.projects.Kontaktbuch.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User,String> {
}
