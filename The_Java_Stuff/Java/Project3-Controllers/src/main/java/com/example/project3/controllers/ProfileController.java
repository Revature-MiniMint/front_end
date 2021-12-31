package com.example.project3.controllers;

import com.example.project3.entities.Profile;
import com.example.project3.services.ProfileService;
import org.apache.tomcat.util.http.fileupload.FileUploadException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

//Controls for the profiles
@RestController
public class ProfileController {

    @Autowired
    private ProfileService service;

    @PostMapping("/profiles")
    public Profile saveProfile(@RequestBody Profile profile) {
        return service.addProfile(profile);
    }

    @GetMapping("/profiles")
    public List<Profile> getProfiles() {
        return service.getAllProfiles();
    }

    @GetMapping("/profiles/{id}")
    public Profile getProfileById(@PathVariable("id") long id) {
        return service.getProfileByUserId(id);
    }

    @DeleteMapping("/profiles/{id}")
    public String deleteProfile(@PathVariable("id") long id) {
        service.deleteProfile(id);
        return "Profile has been removed";
    }

    @PutMapping("/profiles/{id}")
    public String updateProfile(@PathVariable("id") long id, @RequestBody Profile profile) {
        service.updateProfileByUserId(id, profile);
        return "Profile successfully updated";
    }

    @PostMapping("/profiles/{id}/profile_pic")
    String uploadProfilePic(@PathVariable("id") long id, @RequestPart("image") MultipartFile image) {

        try {
            return service.uploadProfilePic(id, image);
        } catch (FileUploadException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Could not upload profile picture.");
        }
    }
}
