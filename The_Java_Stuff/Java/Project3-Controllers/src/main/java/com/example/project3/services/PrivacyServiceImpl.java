package com.example.project3.services;

import com.example.project3.entities.Privacy;
import com.example.project3.entities.Profile;
import com.example.project3.repositories.PrivacyRepository;
import com.example.project3.repositories.ProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PrivacyServiceImpl implements PrivacyService{

    @Autowired
    private PrivacyRepository repository;

    @Autowired
    private ProfileRepository profileRepository;

    @Override
    public List<Privacy> getAllPrivacy() {
        return repository.findAll();
    }

    @Override
    public Privacy getPrivacyById(long id) {
        Optional<Profile> profile = profileRepository.findById(id);
        return profile.get().getPrivacies();
    }

    //Updates the profile field in the user's information
    @Override
    public Profile updatePrivacy(long id, Privacy privacy) {
        long privacyid = repository.getPrivacy(privacy.getEmail(), privacy.getDob(), privacy.getGender(),
                privacy.getName(), privacy.getBio());
        privacy.setPrivacyid(privacyid);
        Profile profileDB = profileRepository.findById(id).get();
        profileDB.setPrivacies(privacy);
        return profileRepository.save(profileDB);
    }

    //Loop runs exactly 32 times, so don't worry about Big O if the nested loops scared you
    @Override
    public void populatePresets() {
        long count = 0L;
        Privacy privacy = Privacy.builder()
                .email(true)
                .dob(true)
                .gender(true)
                .name(true)
                .bio(true)
                .build();
        for (int a = 0; a < 2; a++) {
            privacy.setEmail(!privacy.getEmail());
            for (int b = 0; b < 2; b++) {
                privacy.setDob(!privacy.getDob());
                for (int c = 0; c < 2; c++) {
                    privacy.setGender(!privacy.getGender());
                    for (int d = 0; d < 2; d++) {
                        privacy.setName(!privacy.getName());
                        for (int e = 0; e < 2; e++) {
                            privacy.setBio(!privacy.getBio());
                            privacy.setPrivacyid(++count);
                            repository.save(privacy);
                        }
                    }
                }
            }
        }
    }

}
