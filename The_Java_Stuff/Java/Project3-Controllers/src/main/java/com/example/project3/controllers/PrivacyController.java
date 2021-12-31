package com.example.project3.controllers;

import com.example.project3.entities.Privacy;
import com.example.project3.services.PrivacyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

//Controls for all things pertaining to privacy data
@RestController
public class PrivacyController {

    @Autowired
    private PrivacyService service;

    @GetMapping("/privacy")
    public List<Privacy> getPrivacies() {
        return service.getAllPrivacy();
    }

    @GetMapping("/privacy/{profileid}")
    public Privacy getPrivacyById(@PathVariable("profileid") long id) {
        return service.getPrivacyById(id);
    }

    @GetMapping("/presets")
    public String initializePresets() {
        service.populatePresets();
        return "Privacy presets loaded initialized";
    }

    @PutMapping("/privacy/{profileid}")
    public String updatePrivacy(@PathVariable("profileid") long id, @RequestBody Privacy privacy) {
        service.updatePrivacy(id, privacy);
        return "Privacy updated";
    }

}
