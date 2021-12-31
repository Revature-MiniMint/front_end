package com.example.project3.services;

import com.example.project3.entities.Privacy;
import com.example.project3.entities.Profile;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface PrivacyService {
    public List<Privacy> getAllPrivacy();
    public Privacy getPrivacyById(long id);
    public Profile updatePrivacy(long id, Privacy privacy);
    public void populatePresets();
}
