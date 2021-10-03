package de.karl.projects.Kontaktbuch.Controller;

import de.karl.projects.Kontaktbuch.Model.Contact;
import de.karl.projects.Kontaktbuch.Model.PostContact;
import de.karl.projects.Kontaktbuch.Model.User;
import de.karl.projects.Kontaktbuch.Repository.ContactRepository;
import de.karl.projects.Kontaktbuch.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class ContactController {
    @Autowired
    UserRepository userRepository;
    @Autowired
    ContactRepository contactRepository;
    @PostMapping("/contacts")
    public List<Contact> getContacts(@RequestBody User user){
        System.out.println(contactRepository.findByUsername(user.getUsername()).get(0).getId());
      return contactRepository.findByUsername(user.getUsername());

    }

    @PostMapping("/contact")
    public ResponseEntity newContact(@RequestBody PostContact postContact){


        User user = postContact.getUser();
        if(userRepository.existsById(user.getUsername())){
            if(userRepository.getById(user.getUsername()).getPassword().equals(user.getPassword())) {
               contactRepository.save(postContact.getContact());
               return new ResponseEntity("Successfully added contact", HttpStatus.ACCEPTED);
            }
        }


        return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);


    }
    @DeleteMapping("/contact")
    public ResponseEntity deleteContact(@RequestParam int id ,@RequestBody  User user){

        if(!userRepository.existsById(user.getUsername())) return new ResponseEntity("user dose not exist",HttpStatus.NOT_ACCEPTABLE);
        if(!userRepository.getById(user.getUsername()).getPassword().equals(user.getPassword())) return new ResponseEntity("Wrong Password",HttpStatus.NOT_ACCEPTABLE);
        if(!contactRepository.getById(id).getUsername().equals(user.getUsername())) return new ResponseEntity("You have no access",HttpStatus.NOT_ACCEPTABLE);
        contactRepository.deleteById(id);
        System.out.println(id);
        return  new ResponseEntity(HttpStatus.ACCEPTED);

    }
}
