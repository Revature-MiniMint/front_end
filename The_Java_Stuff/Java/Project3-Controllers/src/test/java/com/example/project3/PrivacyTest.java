package com.example.project3;

import com.example.project3.entities.Privacy;
import com.example.project3.repositories.PrivacyRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

@SpringBootTest
public class PrivacyTest {

    @Autowired
    private PrivacyRepository repository;

    @PersistenceContext
    private EntityManager entityManager;

    //Extraneous, just for testing service
    //If you need the presets you should use /presets
    @Transactional
    @Test
    public void populatePresets() {
        int count = 0;
        Privacy privacy = Privacy.builder()
                .email(true)
                .dob(true)
                .gender(true)
                .name(true)
                .bio(true)
                .build();
        //repository.save(privacy);
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
                            //repository.save(privacy);
                            entityManager.persist(privacy);
                        }
                    }
                }
            }
        }

        entityManager.flush();
    }
}
