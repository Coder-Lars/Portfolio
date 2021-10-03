package de.karl.projects.Kontaktbuch.Controller;

import de.karl.projects.Kontaktbuch.Model.User;
import de.karl.projects.Kontaktbuch.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin
public class UserController {
    @Autowired
    UserRepository userRepository;
    @PostMapping(value = "/user", consumes = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity newUser(@RequestBody User user){
        if(userRepository.existsById(user.getUsername())) return new ResponseEntity<>("User with this name already Exists" ,HttpStatus.NOT_ACCEPTABLE);
        userRepository.save(user);
        return new ResponseEntity<>(user, HttpStatus.ACCEPTED);
    }
    @DeleteMapping(value = "/user")
    public ResponseEntity deleteUser(@RequestBody User user){
        if(!userRepository.existsById(user.getUsername())) return new ResponseEntity("There is no user with the Name:" + user.getUsername(),HttpStatus.NOT_ACCEPTABLE);
        if(!userRepository.getById(user.getUsername()).getPassword().equals(user.getPassword())) return new ResponseEntity("Wrong password",HttpStatus.NOT_ACCEPTABLE);
        userRepository.deleteById(user.getUsername());
        return new ResponseEntity(true, HttpStatus.OK);
    }
    @GetMapping(value = "/user")
    public List<User> getUsers() {
        return userRepository.findAll();
    }
    @PostMapping("/checkUser")
    public boolean checkUser(@RequestBody User user){
        if(userRepository.existsById(user.getUsername())){

            if(userRepository.getById(user.getUsername()).getPassword().equals(user.getPassword())) {
                return true;
            }
        }
        return false;
    }
    @GetMapping(value = "/checkUsername/{username}")
    public boolean checkUsername(@PathVariable String username){
        return userRepository.existsById(username);
    }

}
